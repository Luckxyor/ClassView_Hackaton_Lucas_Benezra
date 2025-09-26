import type { HTMLAttributes, PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const cardStyles = cva(
  'rounded-2xl border bg-white shadow-sm backdrop-blur-[2px] transition-shadow duration-200 hover:shadow-md',
  {
    variants: {
      variant: {
        elevated: 'border-slate-200 shadow-md',
        surface: 'border-transparent shadow-none',
        tinted: 'border-transparent bg-primary-50/60 text-primary-900 shadow-none',
        glass:
          'border-white/40 bg-white/60 shadow-lg ring-1 ring-white/30 backdrop-blur-xl hover:shadow-xl hover:bg-white/70'
      }
    },
    defaultVariants: {
      variant: 'elevated'
    }
  }
);

type CardProps = PropsWithChildren<{ className?: string } & VariantProps<typeof cardStyles>>;

export function Card ({ className, children, variant }: CardProps): JSX.Element {
  return <div className={cn(cardStyles({ variant }), className)}>{children}</div>;
}

export function CardHeader ({ className, children }: PropsWithChildren<{ className?: string }>): JSX.Element {
  return <div className={cn('px-6 pb-2 pt-6', className)}>{children}</div>;
}

export function CardContent ({ className, children }: PropsWithChildren<{ className?: string }>): JSX.Element {
  return <div className={cn('px-6 pb-6', className)}>{children}</div>;
}

export function CardFooter ({ className, children }: PropsWithChildren<{ className?: string }>): JSX.Element {
  return <div className={cn('px-6 pb-6 pt-0', className)}>{children}</div>;
}

export function CardTitle ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>): JSX.Element {
  return <h3 className={cn('text-lg font-semibold tracking-tight text-slate-900', className)} {...props} />;
}

export function CardDescription ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>): JSX.Element {
  return <p className={cn('text-sm text-slate-500', className)} {...props} />;
}
