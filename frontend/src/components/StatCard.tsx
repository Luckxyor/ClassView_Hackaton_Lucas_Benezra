import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/utils/cn';
import { TrendingDown, TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  helper?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    label?: string;
  };
  tone?: 'default' | 'success' | 'warning';
  className?: string;
}

type Tone = NonNullable<StatCardProps['tone']>;

export function StatCard ({ label, value, helper, icon, trend, tone = 'default', className }: StatCardProps): JSX.Element {
  const trendIsPositive = (trend?.value ?? 0) >= 0;
  const toneClasses: Record<Tone, string> = {
    default: 'bg-white',
    success: 'bg-success-50/80 text-success-900',
    warning: 'bg-warning-50/80 text-warning-900'
  } as const;

  return (
    <Card className={cn('h-full border-transparent shadow-md hover:shadow-lg', toneClasses[tone], className)}>
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-0">
        <div className="space-y-1">
          <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
          <CardTitle className="text-3xl font-semibold text-slate-900">{value}</CardTitle>
        </div>
        {icon != null && <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100 text-primary-700">{icon}</div>}
      </CardHeader>
      <CardContent className="flex flex-col gap-3 pt-0 text-sm text-slate-600">
        {helper != null && <p>{helper}</p>}
        {trend != null && (
          <div className={cn('inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium', trendIsPositive ? 'bg-success-100 text-success-700' : 'bg-warning-100 text-warning-700')}>
            {trendIsPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            <span>{trend.value > 0 ? '+' : ''}{trend.value.toFixed(1)}%</span>
            {trend.label != null && <span className="text-slate-500">{trend.label}</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
