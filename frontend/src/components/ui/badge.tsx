import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

const badgeStyles = cva(
  'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
  {
    variants: {
      variant: {
        neutral: 'bg-slate-100 text-slate-600',
        primary: 'bg-primary-100 text-primary-700',
        success: 'bg-success-100 text-success-700',
        warning: 'bg-warning-100 text-warning-700',
        danger: 'bg-rose-100 text-rose-700'
      }
    },
    defaultVariants: {
      variant: 'neutral'
    }
  }
);

interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeStyles> {}

export function Badge ({ className, variant, ...props }: BadgeProps): JSX.Element {
  return <span className={cn(badgeStyles({ variant }), className)} {...props} />;
}
