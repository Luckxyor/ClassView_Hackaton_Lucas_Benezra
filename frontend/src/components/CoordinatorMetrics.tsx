import type { CourseMetricsSummary } from '@/types/domain';
import { formatPercentage } from '@/utils/format';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

interface CoordinatorMetricsProps {
  metrics: CourseMetricsSummary[];
}

export function CoordinatorMetrics ({ metrics }: CoordinatorMetricsProps): JSX.Element {
  const chartData = metrics.map((course) => ({
    name: course.courseName,
    submissionRate: Math.round(course.submissionRate * 100),
    onTimeRate: Math.round(course.onTimeRate * 100)
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="border-transparent bg-white/90 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Resumen por curso</CardTitle>
          <CardDescription>Comparativo de participación y puntualidad para detectar tendencias rápidamente.</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} angle={-10} dy={10} height={60} />
              <YAxis tickFormatter={(value) => `${value}%`} domain={[0, 100]} />
              <Tooltip formatter={(value: number) => `${value}%`} />
              <Legend />
              <Bar dataKey="submissionRate" fill="#60a5fa" name="Participación (%)" radius={[4, 4, 0, 0]} />
              <Bar dataKey="onTimeRate" fill="#34d399" name="A tiempo (%)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-white/70 bg-white/90 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Detalle de cohortes</CardTitle>
          <CardDescription>Profundiza en cada curso para coordinar acciones específicas con docentes y mentores.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {metrics.map(course => (
              <div
                key={course.courseId}
                className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{course.courseName}</p>
                    <p className="text-sm text-slate-500">{course.teacherName ?? course.teacherEmail}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="primary">{course.totalStudents} estudiantes</Badge>
                    <Badge variant={course.onTimeRate >= 0.85 ? 'success' : 'warning'}>
                      {formatPercentage(course.onTimeRate)} a tiempo
                    </Badge>
                  </div>
                </div>
                <div className="grid gap-4 text-sm text-slate-600 md:grid-cols-3">
                  <div className="rounded-xl bg-primary-50/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-primary-700">Participación</p>
                    <p className="mt-2 text-xl font-semibold text-primary-700">{formatPercentage(course.submissionRate)}</p>
                  </div>
                  <div className="rounded-xl bg-success-50/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-success-700">Puntualidad</p>
                    <p className="mt-2 text-xl font-semibold text-success-700">{formatPercentage(course.onTimeRate)}</p>
                  </div>
                  <div className="rounded-xl bg-warning-50/80 p-4">
                    <p className="text-xs font-semibold uppercase tracking-wide text-warning-700">Promedio</p>
                    <p className="mt-2 text-xl font-semibold text-warning-700">
                      {formatPercentage(course.averageGrade ? course.averageGrade / 100 : null)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
