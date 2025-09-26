import type { CohortMetrics, CourseProgressSummary, StudentProgressSummary } from '@shared-types/domain';

export class MetricsService {
  buildCourseSummary (courseId: string, courseName: string, teacherEmail: string, teacherName: string | undefined, students: StudentProgressSummary[]): CourseProgressSummary {
    const totalStudents = students.length;
    const totalAssignments = students.reduce((acc, student) => acc + student.totalAssignments, 0);
    const totalDelivered = students.reduce((acc, student) => acc + student.deliveredOnTime + student.deliveredLate, 0);
    const onTime = students.reduce((acc, student) => acc + student.deliveredOnTime, 0);

    const totalGrades = students.reduce((acc, student) => acc + (student.averageGrade ?? 0), 0);
    const gradedCount = students.filter(student => student.averageGrade !== null && student.averageGrade !== undefined).length;

    return {
      courseId,
      courseName,
      teacherEmail,
      teacherName,
      totalStudents,
      submissionRate: totalAssignments > 0 ? totalDelivered / totalAssignments : 0,
      onTimeRate: totalAssignments > 0 ? onTime / totalAssignments : 0,
      averageGrade: gradedCount > 0 ? totalGrades / gradedCount : null
    };
  }

  buildCohortMetrics (cohortId: string, cohortName: string, courses: CourseProgressSummary[]): CohortMetrics {
    const submissionRates = courses.map(course => course.submissionRate);
    const onTimeRates = courses.map(course => course.onTimeRate);

    const averageSubmission = submissionRates.length > 0 ? submissionRates.reduce((a, b) => a + b, 0) / submissionRates.length : 0;
    const averageOnTime = onTimeRates.length > 0 ? onTimeRates.reduce((a, b) => a + b, 0) / onTimeRates.length : 0;

    const communicationHealthScore = (averageSubmission + averageOnTime) / 2;

    return {
      cohortId,
      cohortName,
      courses,
      communicationHealthScore
    };
  }
}
