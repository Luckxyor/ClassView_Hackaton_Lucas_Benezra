import pino from 'pino';
import { env } from '@config/env';
import { GoogleClassroomService } from '@services/googleClassroomService';
import { CacheRepository } from '@repositories/cacheRepository';
import { mapCourse, mapCourseWork, mapStudent, mapSubmission } from '@utils/mappers';
import { summarizeStudentProgress } from '@utils/progress';
import type { CourseProgressPayload, StudentProgressSummary } from '@shared-types/domain';
import { SAMPLE_PROGRESS_DATA } from '@data/sampleProgress';

export class ProgressService {
  private readonly cache = new CacheRepository<CourseProgressPayload[]>(1000 * 60);
  private readonly logger = pino().child({ module: 'ProgressService' });
  private readonly classroom?: GoogleClassroomService;
  private readonly useMockData: boolean;

  constructor (classroom?: GoogleClassroomService) {
    this.useMockData = this.shouldUseMock();
    if (!this.useMockData) {
      this.classroom = classroom ?? GoogleClassroomService.forServiceAccount();
    }
  }

  private shouldUseMock(): boolean {
    if (env.USE_CLASSROOM_MOCK === 'true') return true;
    if (!env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_SERVICE_ACCOUNT_KEY) return true;
    return false;
  }

  async getProgressForTeacher (teacherEmail: string, courseId?: string): Promise<CourseProgressPayload[]> {
    const cacheKey = courseId ? `${teacherEmail}:${courseId}` : teacherEmail;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

    if (this.useMockData || !this.classroom) {
      const mockResult = this.buildMockProgress(teacherEmail, courseId);
      this.cache.set(cacheKey, mockResult);
      return mockResult;
    }

    try {
      await this.classroom.impersonateUser(teacherEmail);
      const courses = await this.classroom.listCoursesByTeacher(teacherEmail);

      const filteredCourses = courseId ? courses.filter(course => course.id === courseId) : courses;

      const payload: CourseProgressPayload[] = [];

      for (const course of filteredCourses) {
        if (!course.id) continue;

        const [students, courseWork, teachers] = await Promise.all([
          this.classroom.listStudents(course.id),
          this.classroom.listCourseWork(course.id),
          this.classroom.listTeachers(course.id)
        ]);

        const submissions = await Promise.all(
          courseWork.map(async work => {
            if (!work.id) return [];
            return await this.classroom!.listSubmissions(course.id!, work.id);
          })
        );

        const flattenedSubmissions = submissions.flat();

        const domainStudents = students.map(mapStudent);
        const domainCourseWork = courseWork.map(mapCourseWork);
        const domainSubmissions = flattenedSubmissions.map(mapSubmission);
        const domainCourse = mapCourse(course);

        const studentSummaries = summarizeStudentProgress(
          domainStudents,
          domainCourseWork,
          domainSubmissions,
          domainCourse.id,
          domainCourse.name
        );

        const primaryTeacher = teachers.find(teacher => teacher.profile?.emailAddress === teacherEmail) ?? teachers[0];
        const teacherName = primaryTeacher?.profile?.name?.fullName ?? primaryTeacher?.profile?.name?.givenName ?? undefined;

        payload.push({
          courseId: domainCourse.id,
          courseName: domainCourse.name,
          courseSection: domainCourse.section,
          teacherEmail: primaryTeacher?.profile?.emailAddress ?? teacherEmail,
          teacherName,
          students: studentSummaries
        });
      }

      this.cache.set(cacheKey, payload);
      return payload;
    } catch (error) {
      this.logger.error({ err: error, teacherEmail, courseId }, 'Error al obtener progreso desde Google Classroom');
      const fallback = this.buildMockProgress(teacherEmail, courseId);
      if (fallback.length > 0) {
        this.cache.set(cacheKey, fallback);
        return fallback;
      }
      throw error;
    }
  }

  private buildMockProgress (teacherEmail: string, courseId?: string): CourseProgressPayload[] {
    const normalizedTeacher = teacherEmail.toLowerCase();
    const byTeacher = SAMPLE_PROGRESS_DATA.filter((course: CourseProgressPayload) => course.teacherEmail.toLowerCase() === normalizedTeacher);
    const matchingCourses = courseId ? byTeacher.filter((course: CourseProgressPayload) => course.courseId === courseId) : byTeacher;

    return matchingCourses.map((course: CourseProgressPayload) => ({
      ...course,
      students: course.students.map((student: StudentProgressSummary) => ({ ...student }))
    }));
  }
}
