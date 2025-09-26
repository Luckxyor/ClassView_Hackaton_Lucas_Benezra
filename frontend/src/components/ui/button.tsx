import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import type { ButtonHTMLAttributes } from 'react';

const buttonStyles = cva(
  'inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-200 focus-visible:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none gap-2 shadow-sm',
  {
    variants: {
      variant: {
        primary:
          'bg-gradient-to-r from-primary-600 via-primary-500 to-secondary-600 text-white hover:from-primary-500 hover:via-primary-500 hover:to-secondary-500 hover:shadow-soft-xl focus-visible:ring-primary-200',
        secondary:
          'bg-white text-primary-700 border border-primary-100 hover:border-primary-200 hover:shadow-md focus-visible:ring-primary-100',
        tonal:
          'bg-primary-50 text-primary-700 hover:bg-primary-100 focus-visible:ring-primary-100',
        ghost:
          'bg-transparent text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-50 shadow-none',
        outline:
          'border border-primary-200 text-primary-700 hover:bg-primary-50 focus-visible:ring-primary-200 bg-white',
        link:
          'bg-transparent text-primary-600 underline-offset-4 hover:underline shadow-none'
      },
      size: {
        sm: 'h-9 px-4',
        md: 'h-10 px-6',
        lg: 'h-11 px-8 text-base',
        xl: 'h-12 px-10 text-base'
      }
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md'
    }
  }
);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {}

export function Button ({ className, variant, size, ...props }: ButtonProps): JSX.Element {
  return <button className={cn(buttonStyles({ variant, size }), className)} {...props} />;
}
