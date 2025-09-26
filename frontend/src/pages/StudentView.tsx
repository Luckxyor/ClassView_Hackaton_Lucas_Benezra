import { PageHeader } from '@/components/PageHeader';
import { StatCard } from '@/components/StatCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatPercentage, formatDate } from '@/utils/format';
import { CalendarDays, Clock, Download, Notebook, Trophy } from 'lucide-react';

const mockAssignments = [
  {
    id: '1',
    title: 'Diseño de landing page',
    status: 'Entregado a tiempo',
    grade: 95,
    dueDate: '2025-09-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Campaña de redes sociales',
    status: 'Pendiente',
    grade: null,
    dueDate: '2025-09-28T10:00:00Z'
  }
];

export function StudentView (): JSX.Element {
  const onTimeRate = 0.82;
  const deliveredAssignments = mockAssignments.filter(assignment => assignment.grade != null);
  const averageGrade = deliveredAssignments.reduce((acc, assignment) => acc + (assignment.grade ?? 0), 0) /
    (deliveredAssignments.length || 1) / 100;
  const nextAssignment = mockAssignments.find(assignment => assignment.status === 'Pendiente') ?? mockAssignments[0];
  const pendingAssignments = mockAssignments.filter(assignment => assignment.status === 'Pendiente').length;
  const formattedPendingAssignments = pendingAssignments.toLocaleString('es-ES');
  const dailyFocus = [
    {
      title: 'Revisa avances de la campaña',
      description: 'Confirma que tu entrega de redes sociales incluye métricas de alcance y engagement.'
    },
    {
      title: 'Solicita feedback a tu mentor',
      description: 'Envía tus bocetos de la landing page al profesor para recibir observaciones tempranas.'
    },
    {
      title: 'Reserva tiempo de estudio',
      description: 'Bloquea 1 hora el miércoles para preparar los próximos entregables y evitar retrasos.'
    }
  ];

  return (
    <div className="space-y-10">
      <PageHeader
        title="Tu progreso general"
        description="Monitorea tus entregas, identifica lo que sigue y mantente al día con tus metas académicas en Semillero Digital."
        action={{ label: 'Descargar reporte', icon: <Download className="h-4 w-4" /> }}
      >
        <div className="flex flex-col items-end">
          <span className="text-4xl font-semibold text-primary-600">{formatPercentage(averageGrade)}</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Promedio actual</span>
        </div>
      </PageHeader>

      <section className="grid gap-6 md:grid-cols-3">
        <StatCard
          label="Entregas puntuales"
          value={formatPercentage(onTimeRate)}
          helper="Mejoraste 5% respecto a la última semana."
          icon={<Clock className="h-6 w-6" />}
          trend={{ value: 5.2, label: 'vs. semana anterior' }}
        />
        <StatCard
          label="Promedio de notas"
          value={formatPercentage(averageGrade)}
          helper="Incluye tareas calificadas entregadas hasta hoy."
          icon={<Trophy className="h-6 w-6" />}
          tone="success"
          trend={{ value: 2.8, label: 'último mes' }}
        />
        <StatCard
          label="Próxima entrega"
          value={formatDate(nextAssignment.dueDate)}
          helper={`${formattedPendingAssignments} entregas pendientes por enviar.`}
          icon={<CalendarDays className="h-6 w-6" />}
          tone={pendingAssignments > 0 ? 'warning' : 'default'}
        />
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <Card className="border-transparent shadow-lg">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-2xl">Tus entregables</CardTitle>
            <CardDescription>Revisa el detalle y estado de cada trabajo. Mantén tus entregas priorizadas.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockAssignments.map(assignment => {
              const statusVariant = assignment.status.startsWith('Pendiente') ? 'warning' : 'success';
              return (
                <div
                  key={assignment.id}
                  className="group rounded-2xl border border-white/70 bg-white/90 p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-slate-900">{assignment.title}</h3>
                      <p className="text-sm text-slate-500">Entrega: {formatDate(assignment.dueDate)}</p>
                    </div>
                    <Badge variant={statusVariant}>{assignment.status}</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                    <span>
                      Nota:{' '}
                      <strong className="text-slate-800">
                        {assignment.grade != null ? `${assignment.grade}/100` : 'Pendiente de calificar'}
                      </strong>
                    </span>
                    <Button variant="link" size="sm" className="px-0 text-primary-600">
                      Ver detalles
                    </Button>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card variant="glass" className="border-white/50">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary-100 text-primary-600">
                <Notebook className="h-5 w-5" />
              </span>
              Tu foco del día
            </CardTitle>
            <CardDescription>Pequeñas acciones para cerrar la semana con tranquilidad.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {dailyFocus.map(item => (
              <div key={item.title} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm">
                <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-500">{item.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
