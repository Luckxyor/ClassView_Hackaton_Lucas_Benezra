import type { classroom_v1 } from 'googleapis';
import type { ClassroomCourse, ClassroomCourseWork, ClassroomStudent, ClassroomTeacher, ClassroomSubmission } from '@shared-types/google';

function mapUserProfile (profile?: classroom_v1.Schema$UserProfile): ClassroomStudent['profile'] {
  if (!profile) {
    return {};
  }

  return {
    emailAddress: profile.emailAddress ?? undefined,
    photoUrl: profile.photoUrl ?? undefined,
    name: profile.name
      ? {
          fullName: profile.name.fullName ?? undefined,
          givenName: profile.name.givenName ?? undefined,
          familyName: profile.name.familyName ?? undefined
        }
      : undefined
  };
}

export function mapCourse (course: classroom_v1.Schema$Course): ClassroomCourse {
  return {
    id: course.id ?? '',
    name: course.name ?? '',
    section: course.section,
    descriptionHeading: course.descriptionHeading,
    ownerId: course.ownerId ?? '',
    enrollmentCode: course.enrollmentCode,
    room: course.room
  };
}

export function mapCourseWork (courseWork: classroom_v1.Schema$CourseWork): ClassroomCourseWork {
  return {
    id: courseWork.id ?? '',
    courseId: courseWork.courseId ?? '',
    title: courseWork.title ?? '',
    description: courseWork.description,
    dueDate: courseWork.dueDate ? new Date(
      courseWork.dueDate.year ?? 0,
      (courseWork.dueDate.month ?? 1) - 1,
      courseWork.dueDate.day ?? 1
    ).toISOString() : null,
    dueTime: courseWork.dueTime ? `${courseWork.dueTime.hours ?? '00'}:${courseWork.dueTime.minutes ?? '00'}` : null,
    state: (courseWork.state ?? 'DRAFT') as ClassroomCourseWork['state'],
    maxPoints: courseWork.maxPoints,
    alternateLink: courseWork.alternateLink
  };
}

export function mapStudent (student: classroom_v1.Schema$Student): ClassroomStudent {
  return {
    userId: student.userId ?? '',
    profile: mapUserProfile(student.profile)
  };
}

export function mapTeacher (teacher: classroom_v1.Schema$Teacher): ClassroomTeacher {
  return {
    userId: teacher.userId ?? '',
    profile: mapUserProfile(teacher.profile)
  };
}

export function mapSubmission (submission: classroom_v1.Schema$StudentSubmission): ClassroomSubmission {
  return {
    id: submission.id ?? '',
    courseId: submission.courseId ?? '',
    courseWorkId: submission.courseWorkId ?? '',
    userId: submission.userId ?? '',
    state: (submission.state ?? 'NEW') as ClassroomSubmission['state'],
    late: Boolean(submission.late),
    assignedGrade: submission.assignedGrade,
    updateTime: submission.updateTime
  };
}
