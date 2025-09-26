import type { CourseProgressPayload } from '@shared-types/domain';

export const SAMPLE_PROGRESS_DATA: CourseProgressPayload[] = [
  {
    courseId: 'course-101',
    courseName: 'Introducción al Desarrollo Web',
    courseSection: 'A',
    teacherEmail: 'profesor@semillerodigital.org',
    teacherName: 'María Pérez',
    students: [
      {
        studentId: 'student-1',
        studentEmail: 'ana.garcia@semillerodigital.org',
        studentName: 'Ana García',
        courseId: 'course-101',
        courseName: 'Introducción al Desarrollo Web',
        totalAssignments: 8,
        deliveredOnTime: 7,
        deliveredLate: 1,
        pending: 0,
        averageGrade: 92,
        lastSubmissionAt: '2024-05-02T15:10:00Z'
      },
      {
        studentId: 'student-2',
        studentEmail: 'bruno.herrera@semillerodigital.org',
        studentName: 'Bruno Herrera',
        courseId: 'course-101',
        courseName: 'Introducción al Desarrollo Web',
        totalAssignments: 8,
        deliveredOnTime: 5,
        deliveredLate: 2,
        pending: 1,
        averageGrade: 78,
        lastSubmissionAt: '2024-04-28T18:45:00Z'
      },
      {
        studentId: 'student-3',
        studentEmail: 'camila.rojas@semillerodigital.org',
        studentName: 'Camila Rojas',
        courseId: 'course-101',
        courseName: 'Introducción al Desarrollo Web',
        totalAssignments: 8,
        deliveredOnTime: 4,
        deliveredLate: 1,
        pending: 3,
        averageGrade: 71,
        lastSubmissionAt: '2024-04-20T12:30:00Z'
      }
    ]
  },
  {
    courseId: 'course-202',
    courseName: 'JavaScript Avanzado',
    courseSection: 'B',
    teacherEmail: 'profesor@semillerodigital.org',
    teacherName: 'María Pérez',
    students: [
      {
        studentId: 'student-4',
        studentEmail: 'diego.montoya@semillerodigital.org',
        studentName: 'Diego Montoya',
        courseId: 'course-202',
        courseName: 'JavaScript Avanzado',
        totalAssignments: 6,
        deliveredOnTime: 6,
        deliveredLate: 0,
        pending: 0,
        averageGrade: 96,
        lastSubmissionAt: '2024-05-03T09:00:00Z'
      },
      {
        studentId: 'student-5',
        studentEmail: 'elena.sandoval@semillerodigital.org',
        studentName: 'Elena Sandoval',
        courseId: 'course-202',
        courseName: 'JavaScript Avanzado',
        totalAssignments: 6,
        deliveredOnTime: 4,
        deliveredLate: 1,
        pending: 1,
        averageGrade: 85,
        lastSubmissionAt: '2024-04-30T16:20:00Z'
      },
      {
        studentId: 'student-6',
        studentEmail: 'fernando.torres@semillerodigital.org',
        studentName: 'Fernando Torres',
        courseId: 'course-202',
        courseName: 'JavaScript Avanzado',
        totalAssignments: 6,
        deliveredOnTime: 3,
        deliveredLate: 2,
        pending: 1,
        averageGrade: 68,
        lastSubmissionAt: '2024-04-25T11:55:00Z'
      }
    ]
  }
];
