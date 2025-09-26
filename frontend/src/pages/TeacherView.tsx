import { useTeacherProgress } from '@/hooks/useTeacherProgress';
import { TeacherProgressTable } from '@/components/TeacherProgressTable';
import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { EmptyState } from '@/components/EmptyState';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { formatPercentage } from '@/utils/format';
import { AlertTriangle, ClipboardList, Layers, RefreshCcw, Users } from 'lucide-react';

export function TeacherView (): JSX.Element {
  const { data, isLoading, isError, error, refetch } = useTeacherProgress();
  const courses = data ?? [];

  const totalStudents = courses.reduce((acc, course) => acc + course.students.length, 0);
  const formattedCourses = courses.length.toLocaleString('es-ES');
  const formattedStudents = totalStudents.toLocaleString('es-ES');
  const totals = courses.reduce(
    (acc, course) => {
      course.students.forEach((student) => {
        acc.onTime += student.deliveredOnTime;
        acc.late += student.deliveredLate;
        acc.pending += student.pending;
      });
      return acc;
    },
    { onTime: 0, late: 0, pending: 0 }
  );

  const totalSubmissions = totals.onTime + totals.late + totals.pending;
  const onTimeRate = totalSubmissions > 0 ? totals.onTime / totalSubmissions : 0;
  const riskStudents = courses.reduce(
    (acc, course) =>
      acc +
      course.students.filter((student) => student.pending >= 2 || (student.averageGrade ?? 100) < 70).length,
    0
  );
  const formattedRiskStudents = riskStudents.toLocaleString('es-ES');
  const formattedSubmissions = totalSubmissions.toLocaleString('es-ES');

  const lastUpdated = new Intl.DateTimeFormat('es-ES', {
    dateStyle: 'long',
    timeStyle: 'short'
  }).format(new Date());

  const handleRefresh = async (): Promise<void> => {
    await refetch();
  };

  return (
    <div className="space-y-10">
      <PageHeader
        title="Seguimiento docente"
        description="Visualiza el pulso de tus cursos, entiende dónde acompañar y actúa con confianza."
        action={{
          label: isLoading ? 'Actualizando…' : 'Actualizar datos',
          icon: <RefreshCcw className={cn('h-4 w-4', isLoading && 'animate-spin')} />,
          onClick: handleRefresh
        }}
      >
        <div className="flex flex-col items-end gap-2 text-right">
          <Badge variant="primary">{formattedCourses} cursos activos</Badge>
          <span className="text-xs text-slate-500">Última actualización: {lastUpdated}</span>
        </div>
      </PageHeader>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Cursos activos"
          value={formattedCourses}
          helper="Actualmente acompañas cohortes en marcha."
          icon={<ClipboardList className="h-6 w-6" />}
        />
        <StatCard
          label="Estudiantes acompañados"
          value={formattedStudents}
          helper="Incluye todos los inscritos en tus cursos."
          icon={<Users className="h-6 w-6" />}
        />
        <StatCard
          label="Entregas puntuales"
          value={formatPercentage(onTimeRate)}
          helper={`Sobre ${formattedSubmissions} envíos registrados.`}
          icon={<Layers className="h-6 w-6" />}
          tone="success"
        />
        <StatCard
          label="Alertas prioritarias"
          value={formattedRiskStudents}
          helper="Estudiantes con 2+ pendientes o promedio inferior a 70%."
          icon={<AlertTriangle className="h-6 w-6" />}
          tone={riskStudents > 0 ? 'warning' : 'default'}
        />
      </section>

      <Card className="border-transparent shadow-lg">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-2xl">Estado de tus cursos</CardTitle>
          <CardDescription>Profundiza en cada grupo para detectar tendencias y oportunidades de acompañamiento.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isLoading && <p className="text-sm text-slate-500">Cargando progreso...</p>}
          {isError && (
            <p className="text-sm text-rose-600">
              No pudimos obtener los datos: {error instanceof Error ? error.message : 'error desconocido'}
            </p>
          )}
          {!isLoading && !isError && courses.length > 0 && <TeacherProgressTable courses={courses} />}
          {!isLoading && !isError && courses.length === 0 && (
            <EmptyState
              title="Sin cursos asignados"
              description="Cuando Google Classroom te asigne clases, aparecerán aquí automáticamente."
              actionLabel="Importar desde Classroom"
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
