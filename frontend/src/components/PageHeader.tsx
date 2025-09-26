import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    icon?: ReactNode;
    onClick?: () => void;
  };
  children?: ReactNode;
  className?: string;
}

export function PageHeader ({ title, description, action, children, className }: PageHeaderProps): JSX.Element {
  return (
    <div
      className={cn(
        'relative isolate overflow-hidden rounded-3xl border border-white/60 bg-white/80 p-8 shadow-lg backdrop-blur-xl',
        'before:absolute before:inset-y-0 before:-left-20 before:w-40 before:rounded-full before:bg-primary-400/20 before:blur-3xl before:content-[""]',
        'after:absolute after:-top-16 after:-right-16 after:h-48 after:w-48 after:rounded-full after:bg-secondary-400/10 after:blur-3xl after:content-[""]',
        className
      )}
    >
      <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3 text-sm font-medium text-primary-700">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3 py-1 text-primary-700">
              <ArrowUpRight className="h-4 w-4" />
              Panel Semillero Digital
            </span>
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">{title}</h1>
            {description != null && (
              <p className="mt-3 max-w-2xl text-base text-slate-600">{description}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          {action != null && (
            <Button size="lg" className="shadow-soft-xl" onClick={action.onClick}>
              {action.icon}
              {action.label}
            </Button>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
