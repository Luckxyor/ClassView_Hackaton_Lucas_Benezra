export type SubmissionStatus = 'onTime' | 'late' | 'pending';

export interface StudentProgressSummary {
  studentId: string;
  studentEmail: string;
  studentName?: string;
  courseId: string;
  courseName: string;
  totalAssignments: number;
  deliveredOnTime: number;
  deliveredLate: number;
  pending: number;
  averageGrade?: number | null;
  lastSubmissionAt?: string | null;
}

export interface CourseProgressPayload {
  courseId: string;
  courseName: string;
  courseSection?: string | null;
  teacherEmail: string;
  teacherName?: string;
  students: StudentProgressSummary[];
}

export interface CourseMetricsSummary {
  courseId: string;
  courseName: string;
  teacherEmail: string;
  teacherName?: string;
  totalStudents: number;
  submissionRate: number;
  onTimeRate: number;
  averageGrade?: number | null;
}

export interface CohortMetrics {
  cohortId: string;
  cohortName: string;
  courses: CourseMetricsSummary[];
  communicationHealthScore?: number;
}
