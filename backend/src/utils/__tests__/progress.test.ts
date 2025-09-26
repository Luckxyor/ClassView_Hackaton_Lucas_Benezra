import { describe, it, expect } from 'vitest';
import { summarizeStudentProgress } from '@utils/progress';
import type { ClassroomCourseWork, ClassroomStudent, ClassroomSubmission } from '@shared-types/google';

describe('summarizeStudentProgress', () => {
  it('calcula métricas básicas del estudiante', () => {
    const students: ClassroomStudent[] = [
      {
        userId: '1',
        profile: {
          emailAddress: 'alumno@example.com',
          name: { fullName: 'Alumno Demo' }
        }
      }
    ];

    const courseWork: ClassroomCourseWork[] = [
      { id: 'cw1', courseId: 'course1', title: 'Tarea 1', state: 'PUBLISHED' },
      { id: 'cw2', courseId: 'course1', title: 'Tarea 2', state: 'PUBLISHED' }
    ];

    const submissions: ClassroomSubmission[] = [
      {
        id: 'sub1',
        courseId: 'course1',
        courseWorkId: 'cw1',
        userId: '1',
        state: 'TURNED_IN',
        late: false,
        assignedGrade: 90,
        updateTime: '2024-01-01T10:00:00Z'
      },
      {
        id: 'sub2',
        courseId: 'course1',
        courseWorkId: 'cw2',
        userId: '1',
        state: 'RETURNED',
        late: true,
        assignedGrade: 70,
        updateTime: '2024-01-02T10:00:00Z'
      }
    ];

    const result = summarizeStudentProgress(students, courseWork, submissions, 'course1', 'Curso Demo');

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      studentEmail: 'alumno@example.com',
      deliveredOnTime: 1,
      deliveredLate: 1,
      pending: 0,
      averageGrade: 80
    });
  });
});
