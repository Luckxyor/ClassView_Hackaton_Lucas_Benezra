import type { ClassroomCourseWork, ClassroomSubmission, ClassroomStudent } from '@shared-types/google';
import type { StudentProgressSummary } from '@shared-types/domain';

type SubmissionMap = Record<string, ClassroomSubmission[]>;

type StudentMap = Record<string, ClassroomStudent>;

type CourseWorkMap = Record<string, ClassroomCourseWork>;

export function buildSubmissionIndex (submissions: ClassroomSubmission[]): SubmissionMap {
  return submissions.reduce<SubmissionMap>((acc, submission) => {
    const key = `${submission.courseId}:${submission.userId}`;
    acc[key] = acc[key] ?? [];
    acc[key].push(submission);
    return acc;
  }, {});
}

export function summarizeStudentProgress (
  students: ClassroomStudent[],
  courseWork: ClassroomCourseWork[],
  submissions: ClassroomSubmission[],
  courseId: string,
  courseName: string
): StudentProgressSummary[] {
  const submissionIndex = buildSubmissionIndex(submissions);
  const courseWorkIndex: CourseWorkMap = Object.fromEntries(courseWork.map(cw => [cw.id, cw]));
  const studentIndex: StudentMap = Object.fromEntries(students.map(student => [student.userId, student]));

  return Object.entries(submissionIndex).map(([key, studentSubmissions]) => {
    const [, studentId] = key.split(':');
    const student = studentIndex[studentId];
    const totalAssignments = courseWork.length;

    let deliveredOnTime = 0;
    let deliveredLate = 0;
    let pending = totalAssignments;
    let gradeAccumulator = 0;
    let gradedCount = 0;
    let lastSubmissionAt: string | null = null;

    for (const submission of studentSubmissions) {
      const assignment = courseWorkIndex[submission.courseWorkId];
      if (!assignment) continue;

      pending -= 1;
      if (submission.late) {
        deliveredLate += 1;
      } else if (submission.state === 'TURNED_IN' || submission.state === 'RETURNED') {
        deliveredOnTime += 1;
      }

      if (typeof submission.assignedGrade === 'number') {
        gradedCount += 1;
        gradeAccumulator += submission.assignedGrade;
      }

      if (submission.updateTime && (!lastSubmissionAt || submission.updateTime > lastSubmissionAt)) {
        lastSubmissionAt = submission.updateTime;
      }
    }

    const studentEmail = student?.profile.emailAddress ?? 'desconocido';
    const studentName = student?.profile.name?.fullName ?? student?.profile.name?.givenName;

    return {
      studentId,
      studentEmail,
      studentName,
      courseId,
      courseName,
      totalAssignments,
      deliveredOnTime,
      deliveredLate,
      pending: Math.max(pending, 0),
      averageGrade: gradedCount > 0 ? gradeAccumulator / gradedCount : null,
      lastSubmissionAt
    };
  });
}
