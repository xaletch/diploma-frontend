import { cn } from "@/shared/utils";
import { type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Spinner } from "../../spinner";
import { buttonVariants } from "./cva";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
    classNameChild?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      active,
      animation,
      children,
      isLoading,
      iconLeft,
      iconRight,
      classNameChild,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, active, animation, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner className="mr-2 text-current" />}
        {!isLoading && iconLeft && <span className="mr-2">{iconLeft}</span>}
        <span className={classNameChild}>{children}</span>
        {iconRight && <span className="ml-1">{iconRight}</span>}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };