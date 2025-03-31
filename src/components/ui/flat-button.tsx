'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const flatButtonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: [
          // Default state
          'bg-pop-black-500 text-pop-white-500',
          'border-t border-l border-r border-b',
          'border-t-pop-black-200 border-l-pop-black-100',
          'border-r-pop-black-500 border-b-pop-black-700',
          // Hover state
          'hover:bg-pop-black-400',
          // Disabled state
          'disabled:bg-pop-black-500/50 disabled:text-pop-white-500/50',
          'disabled:border-t-transparent disabled:border-l-transparent',
          'disabled:border-r-pop-white-700 disabled:border-b-pop-white-500',
        ],
        secondary: [
          // Default state
          'bg-pop-white-500 text-pop-black-500',
          'border-t border-l border-r border-b',
          'border-t-[#C7C7C7] border-l-pop-white-500',
          'border-r-pop-white-500 border-b-pop-black-500',
          'border border-pop-black-500',
          // Hover state
          'hover:bg-pop-white-400',
          // Disabled state
          'disabled:bg-pop-white-500 disabled:text-pop-black-500/30',
          'disabled:border-pop-black-500/30',
          'disabled:border-t-transparent disabled:border-l-transparent',
          'disabled:border-r-transparent disabled:border-b-transparent',
        ],
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-12 px-8',
        icon: 'h-9 w-9',
      },
      fullWidth: {
        true: 'w-full',
        false: 'w-auto',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      fullWidth: false,
    },
  }
);

export interface FlatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof flatButtonVariants> {
  asChild?: boolean;
}

const FlatButton = React.forwardRef<HTMLButtonElement, FlatButtonProps>(
  ({ className, variant, size, fullWidth, ...props }, ref) => {
    return (
      <button
        className={cn(
          flatButtonVariants({ variant, size, fullWidth, className })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
FlatButton.displayName = 'FlatButton';

export { FlatButton, flatButtonVariants };
