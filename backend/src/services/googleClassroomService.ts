import { google, classroom_v1 } from 'googleapis';
import { env } from '@config/env';
import { JWT } from 'google-auth-library';

const REQUIRED_SCOPES = [
  'https://www.googleapis.com/auth/classroom.courses.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.me.readonly',
  'https://www.googleapis.com/auth/classroom.coursework.students.readonly',
  'https://www.googleapis.com/auth/classroom.rosters.readonly',
  'https://www.googleapis.com/auth/classroom.profile.emails',
  'https://www.googleapis.com/auth/classroom.profile.photos'
];

export class GoogleClassroomService {
  private readonly classroom: classroom_v1.Classroom;

  constructor (private readonly authClient: JWT) {
    this.classroom = google.classroom({ version: 'v1', auth: authClient });
  }

  static forServiceAccount (): GoogleClassroomService {
    if (!env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !env.GOOGLE_SERVICE_ACCOUNT_KEY) {
      throw new Error('Se requiere configuración de cuenta de servicio');
    }

    const authClient = new google.auth.JWT({
      email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: env.GOOGLE_SERVICE_ACCOUNT_KEY.replace(/\\n/g, '\n'),
      scopes: REQUIRED_SCOPES,
      subject: env.GOOGLE_ADMIN_EMAIL
    });

    return new GoogleClassroomService(authClient);
  }

  async impersonateUser (userEmail: string): Promise<void> {
    this.authClient.subject = userEmail;
    await this.authClient.authorize();
  }

  async listCoursesByTeacher (teacherEmail: string): Promise<classroom_v1.Schema$Course[]> {
    const { data } = await this.classroom.courses.list({ teacherId: teacherEmail });
    return data.courses ?? [];
  }

  async listStudents (courseId: string): Promise<classroom_v1.Schema$Student[]> {
    const response = await this.classroom.courses.students.list({ courseId });
    return response.data.students ?? [];
  }

  async listTeachers (courseId: string): Promise<classroom_v1.Schema$Teacher[]> {
    const response = await this.classroom.courses.teachers.list({ courseId });
    return response.data.teachers ?? [];
  }

  async listCourseWork (courseId: string): Promise<classroom_v1.Schema$CourseWork[]> {
    const response = await this.classroom.courses.courseWork.list({ courseId });
    return response.data.courseWork ?? [];
  }

  async listSubmissions (courseId: string, courseWorkId: string): Promise<classroom_v1.Schema$StudentSubmission[]> {
    const response = await this.classroom.courses.courseWork.studentSubmissions.list({ courseId, courseWorkId });
    return response.data.studentSubmissions ?? [];
  }
}
