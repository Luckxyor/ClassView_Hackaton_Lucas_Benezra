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

export interface CourseProgressSummary {
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
  courses: CourseProgressSummary[];
  attendanceRate?: number;
  communicationHealthScore?: number;
}

export interface NotificationMessage {
  channel: 'email' | 'whatsapp' | 'telegram';
  to: string;
  subject?: string;
  templateId?: string;
  body: string;
  metadata?: Record<string, unknown>;
}
