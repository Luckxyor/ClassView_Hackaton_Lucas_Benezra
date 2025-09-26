export interface ClassroomCourse {
  id: string;
  name: string;
  section?: string | null;
  descriptionHeading?: string | null;
  ownerId: string;
  enrollmentCode?: string | null;
  room?: string | null;
}

export interface ClassroomCourseWork {
  id: string;
  courseId: string;
  title: string;
  description?: string | null;
  dueDate?: string | null;
  dueTime?: string | null;
  state: 'PUBLISHED' | 'DRAFT' | 'DELETED';
  maxPoints?: number | null;
  alternateLink?: string | null;
}

export interface ClassroomSubmission {
  id: string;
  courseId: string;
  courseWorkId: string;
  userId: string;
  state: 'NEW' | 'CREATED' | 'TURNED_IN' | 'RETURNED' | 'RECLAIMED_BY_STUDENT';
  late: boolean;
  assignedGrade?: number | null;
  updateTime?: string | null;
}

export interface ClassroomStudent {
  userId: string;
  profile: {
    name?: {
      fullName?: string;
      givenName?: string;
      familyName?: string;
    };
    emailAddress?: string;
    photoUrl?: string;
  };
}

export interface ClassroomTeacher {
  userId: string;
  profile: ClassroomStudent['profile'];
}
