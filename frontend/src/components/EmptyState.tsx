import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { Inbox } from 'lucide-react';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function EmptyState ({ title, description, actionLabel, onAction, icon, className }: EmptyStateProps): JSX.Element {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-200 bg-white/60 p-12 text-center text-slate-500',
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-50 text-primary-500">
        {icon ?? <Inbox className="h-8 w-8" />}
      </div>
      <div className="space-y-2">
        <p className="text-lg font-semibold text-slate-900">{title}</p>
        {description != null && <p className="text-sm text-slate-500">{description}</p>}
      </div>
      {actionLabel != null && (
        <Button variant="tonal" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
