import type { CourseProgressPayload } from '@/types/domain';
import { formatPercentage, formatDate } from '@/utils/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TeacherProgressTableProps {
  courses: CourseProgressPayload[];
}

export function TeacherProgressTable ({ courses }: TeacherProgressTableProps): JSX.Element {
  return (
    <div className="space-y-6">
      {courses.map((course) => {
        const totals = course.students.reduce(
          (acc, student) => {
            acc.onTime += student.deliveredOnTime;
            acc.late += student.deliveredLate;
            acc.pending += student.pending;
            acc.averageGrade += student.averageGrade ?? 0;
            return acc;
          },
          { onTime: 0, late: 0, pending: 0, averageGrade: 0 }
        );

        const totalStudents = course.students.length || 1;
        const totalSubmissions = totals.onTime + totals.late + totals.pending;
        const onTimeRate = totalSubmissions > 0 ? totals.onTime / totalSubmissions : 0;
        const averageGrade = totals.averageGrade / totalStudents / 100;
        const studentsWithPending = course.students.filter(student => student.pending > 0).length;

        return (
          <Card key={course.courseId} className="border-white/70 bg-white/90 shadow-md">
            <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <CardTitle className="text-xl font-semibold text-slate-900">{course.courseName}</CardTitle>
                <CardDescription>
                  {course.teacherName ?? course.teacherEmail}
                  {course.courseSection ? ` • ${course.courseSection}` : ''}
                </CardDescription>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="primary">{course.students.length} estudiantes</Badge>
                <Badge variant={studentsWithPending > 0 ? 'warning' : 'success'}>
                  {studentsWithPending} con pendientes
                </Badge>
                <Badge variant="neutral">{formatPercentage(onTimeRate)} a tiempo</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-inner">
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left text-sm text-slate-600">
                    <thead>
                      <tr className="bg-primary-50 text-xs font-semibold uppercase tracking-wide text-primary-700">
                        <th className="rounded-l-2xl px-4 py-3">Estudiante</th>
                        <th className="px-4 py-3">Email</th>
                        <th className="px-4 py-3">A tiempo</th>
                        <th className="px-4 py-3">Tarde</th>
                        <th className="px-4 py-3">Pendientes</th>
                        <th className="px-4 py-3">Promedio</th>
                        <th className="rounded-r-2xl px-4 py-3">Última entrega</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {course.students.map(student => (
                        <tr key={student.studentId} className="transition-colors hover:bg-primary-50/40">
                          <td className="px-4 py-3 font-semibold text-slate-900">{student.studentName ?? 'Sin nombre'}</td>
                          <td className="px-4 py-3 text-slate-500">{student.studentEmail}</td>
                          <td className="px-4 py-3 text-success-600">{student.deliveredOnTime}</td>
                          <td className="px-4 py-3 text-warning-600">{student.deliveredLate}</td>
                          <td className="px-4 py-3 text-rose-600">{student.pending}</td>
                          <td className="px-4 py-3 font-medium text-slate-700">
                            {formatPercentage(student.averageGrade ? student.averageGrade / 100 : null)}
                          </td>
                          <td className="px-4 py-3 text-slate-500">{formatDate(student.lastSubmissionAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="grid gap-4 rounded-2xl border border-white/60 bg-white/80 p-4 text-sm text-slate-600 md:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Entregas registradas</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{totalSubmissions}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Promedio del curso</p>
                  <p className="mt-1 text-lg font-semibold text-slate-900">{formatPercentage(averageGrade)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Pendientes por revisar</p>
                  <p className="mt-1 text-lg font-semibold text-warning-600">{totals.pending}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
