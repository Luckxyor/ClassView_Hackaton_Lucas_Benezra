import { useCourseMetrics } from '@/hooks/useCourseMetrics';
import { CoordinatorMetrics } from '@/components/CoordinatorMetrics';
import { NotificationComposer } from '@/components/NotificationComposer';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { EmptyState } from '@/components/EmptyState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPercentage } from '@/utils/format';
import { BellRing, ChartLine, PieChart, Users } from 'lucide-react';

export function CoordinatorView (): JSX.Element {
  const { data, isLoading, isError, error } = useCourseMetrics();
  const metrics = data ?? [];

  const totalCourses = metrics.length;
  const totalStudents = metrics.reduce((acc, course) => acc + course.totalStudents, 0);
  const formattedTotalStudents = totalStudents.toLocaleString('es-ES');
  const formattedTotalCourses = totalCourses.toLocaleString('es-ES');
  const avgSubmissionRate = totalCourses > 0
    ? metrics.reduce((acc, course) => acc + course.submissionRate, 0) / totalCourses
    : 0;
  const avgOnTimeRate = totalCourses > 0
    ? metrics.reduce((acc, course) => acc + course.onTimeRate, 0) / totalCourses
    : 0;
  const avgGrade = totalCourses > 0
    ? metrics.reduce((acc, course) => acc + ((course.averageGrade ?? 0) / 100), 0) / totalCourses
    : 0;
  const highPriorityCourses = metrics.filter(
    course => course.onTimeRate < 0.75 || ((course.averageGrade ?? 0) / 100) < 0.7
  ).length;
  const leaderCourse = metrics
    .slice()
    .sort((a, b) => b.onTimeRate - a.onTimeRate)[0];
  const formattedAlerts = highPriorityCourses.toLocaleString('es-ES');

  return (
    <div className="space-y-10">
      <PageHeader
        title="Visión general de Semillero"
        description="Sigue el pulso de cada cohorte, detecta riesgos temprano y coordina acciones que eleven la experiencia estudiantil."
        action={{ label: 'Exportar resumen', icon: <ChartLine className="h-4 w-4" /> }}
      >
        <div className="flex flex-col items-end gap-2 text-right">
          <Badge variant="primary">{formattedTotalCourses} cohortes activas</Badge>
          <span className="text-xs text-slate-500">
            Participación promedio {formatPercentage(avgSubmissionRate)} · Puntualidad {formatPercentage(avgOnTimeRate)}
          </span>
        </div>
      </PageHeader>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total de estudiantes"
          value={formattedTotalStudents}
          helper="Personas activas este periodo."
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          label="Participación promedio"
          value={formatPercentage(avgSubmissionRate)}
          helper="Entrega promedio de actividades por cohorte."
          icon={<PieChart className="h-6 w-6" />}
        />
        <StatCard
          label="Puntualidad general"
          value={formatPercentage(avgOnTimeRate)}
          helper="Promedio de envíos a tiempo en todos los cursos."
          icon={<ChartLine className="h-6 w-6" />}
          tone="success"
        />
        <StatCard
          label="Cohortes con alerta"
          value={formattedAlerts}
          helper="Necesitan acompañamiento adicional esta semana."
          icon={<BellRing className="h-6 w-6" />}
          tone={highPriorityCourses > 0 ? 'warning' : 'default'}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <Card className="border-transparent shadow-lg">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-2xl">Panorama de cohortes</CardTitle>
            <CardDescription>Explora rendimiento, puntualidad y oportunidades a nivel macro y por curso.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isLoading && <p className="text-sm text-slate-500">Cargando métricas...</p>}
            {isError && (
              <p className="text-sm text-rose-600">
                No pudimos cargar los datos: {error instanceof Error ? error.message : 'error desconocido'}
              </p>
            )}
            {!isLoading && !isError && metrics.length > 0 && <CoordinatorMetrics metrics={metrics} />}
            {!isLoading && !isError && metrics.length === 0 && (
              <EmptyState
                title="Sin datos disponibles"
                description="Conecta Google Classroom para comenzar a visualizar el rendimiento de tus cohortes."
                actionLabel="Configurar integración"
              />
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card variant="glass" className="border-white/50">
            <CardHeader className="flex flex-col gap-2">
              <CardTitle className="text-xl">Curso destacado</CardTitle>
              <CardDescription>
                Reconoce la cohorte con mejor desempeño puntual para compartir buenas prácticas.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {leaderCourse != null ? (
                <div className="space-y-3 rounded-2xl border border-white/60 bg-white/80 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold text-slate-900">{leaderCourse.courseName}</p>
                      <p className="text-sm text-slate-500">{leaderCourse.teacherName ?? leaderCourse.teacherEmail}</p>
                    </div>
                    <Badge variant="success">{formatPercentage(leaderCourse.onTimeRate)} a tiempo</Badge>
                  </div>
                  <div className="grid gap-3 text-sm text-slate-600">
                    <div className="flex justify-between"><span>Participación</span><span>{formatPercentage(leaderCourse.submissionRate)}</span></div>
                    <div className="flex justify-between"><span>Promedio general</span><span>{formatPercentage((leaderCourse.averageGrade ?? 0) / 100)}</span></div>
                  </div>
                  <Button variant="tonal">Ver detalles</Button>
                </div>
              ) : (
                <p className="text-sm text-slate-500">Aún no hay datos destacados.</p>
              )}
            </CardContent>
          </Card>

          <NotificationComposer />
        </div>
      </div>
    </div>
  );
}
