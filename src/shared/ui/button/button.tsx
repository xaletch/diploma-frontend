import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Spinner } from "../spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-md font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 active:bg-primary/70 disabled:hover:bg-primary/80 disabled:active:bg-primary/80",
        link: "text-primary underline-offset-4 hover:underline disabled:hover:no-underline",
        industry: "p-4.5! 480:p-6! rounded-18 bg-card flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-primary active:opacity-60 active:scale-96 duration-200!",
        prev: "px-6 py-3 bg-white! rounded-13 hover:opacity-90 active:opacity-75"
      },
      size: {
        none: "",
        default: "w-full h-12.5 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "size-9",
        iconSm: "size-8",
        icon_48: "size-12",
        size_42: "h-11 w-full font-medium",
        size_48: "h-12",
        size_60: "h-15 w-full text-base font-medium",
      },
      active: {
        none: "",
        scale_sm: "active:scale-99",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      active: "none",
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
    iconLeft?: React.ReactNode;
    iconRight?: React.ReactNode;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      isLoading,
      iconLeft,
      iconRight,
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
        {isLoading && <Spinner className="text-current" />}
        {!isLoading && iconLeft && <span>{iconLeft}</span>}
        <span className="mx-2">{children}</span>
        {iconRight && <span>{iconRight}</span>}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };