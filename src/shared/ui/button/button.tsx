import { cn } from '@/shared/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Spinner } from '../spinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer duration-300',
  {
    variants: {
      variant: {
        default: 'bg-black text-white hover:bg-black/90 active:bg-black/80 disabled:hover:bg-black/80 disabled:active:bg-black/80',
        lime: 'bg-lime-400 text-teal-900 hover:bg-lime-300 active:bg-lime-400 disabled:hover:bg-lime-400 disabled:active:bg-lime-400',
        indigo: 'bg-indigo-500 text-white shadow hover:bg-indigo-400 active:bg-indigo-500 disabled:hover:bg-indigo-500 disabled:active:bg-indigo-500',
        link: 'text-primary underline-offset-4 hover:underline disabled:hover:no-underline',
        amber: 'bg-amber-100 text-white hover:bg-amber-200 active:bg-amber-300 disabled:hover:bg-amber-100 disabled:active:bg-amber-100',
      },
      size: {
        default: 'w-full h-12.5 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'size-9',
        iconSm: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    icon?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      icon,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner size="sm" className="text-current" />}
        {!isLoading && icon && <span className="mr-2">{icon}</span>}
        <span className="mx-2">{children}</span>
      </button>
    );
  },
);
Button.displayName = 'Button';

export { Button };