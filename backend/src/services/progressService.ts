import { GoogleClassroomService } from '@services/googleClassroomService';
import { CacheRepository } from '@repositories/cacheRepository';
import { mapCourse, mapCourseWork, mapStudent, mapSubmission } from '@utils/mappers';
import { summarizeStudentProgress } from '@utils/progress';
import type { StudentProgressSummary } from '@shared-types/domain';

export interface CourseProgressPayload {
  courseId: string;
  courseName: string;
  courseSection?: string | null;
  teacherEmail: string;
  teacherName?: string;
  students: StudentProgressSummary[];
}

export class ProgressService {
  private readonly cache = new CacheRepository<CourseProgressPayload[]>(1000 * 60);

  constructor (private readonly classroom: GoogleClassroomService = GoogleClassroomService.forServiceAccount()) {}

  async getProgressForTeacher (teacherEmail: string, courseId?: string): Promise<CourseProgressPayload[]> {
    const cacheKey = courseId ? `${teacherEmail}:${courseId}` : teacherEmail;
    const cached = this.cache.get(cacheKey);
    if (cached) return cached;

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
          return await this.classroom.listSubmissions(course.id!, work.id);
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
  }
}
