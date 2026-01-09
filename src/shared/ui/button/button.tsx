import { cn } from "@/shared/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Spinner } from "../spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center  whitespace-nowrap rounded-xl text-md font-extrabold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-80 cursor-pointer duration-200",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 active:bg-primary/70 disabled:hover:bg-primary/80 disabled:active:bg-primary/80",
        link: "text-primary underline-offset-4 hover:underline disabled:hover:no-underline",
        industry: "p-4.5! 480:p-6! rounded-18 bg-card flex items-center justify-center cursor-pointer border-2 border-transparent hover:border-primary active:opacity-60 active:scale-96 duration-200!",
        prev: "px-6 py-3 bg-white! rounded-13 hover:opacity-90 active:opacity-75",
        dropdown: "bg-white/4 w-full rounded-12 pl-1 py-1 pr-2 flex items-center justify-between gap-1.5 cursor-pointer",
        location_dropdown: "w-full flex items-center gap-3 px-2.5 py-2 hover:bg-primary/90 active:opacity-55 hover:text-white/90 duration-200 text-white/70 cursor-pointer rounded-12",
        accent: "font-medium px-5 bg-accent-foreground text-white hover:bg-accent-foreground/95 active:opacity-85",
        secondary: "font-medium bg-card border border-border px-5 hover:bg-border-foreground active:opacity-70",
        white: "bg-white text-foreground",
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
        size_36: "h-9",
        size_38: "h-9.5 rounded-12! text-sm",
        size_40: "h-10",
        size_48: "h-12",
        size_60: "h-15 w-full text-base font-medium",
      },
      active: {
        none: "",
        scale_sm: "active:scale-99",
        scale_98: "active:scale-98",
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
    classNameChild?: string;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      active,
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
        className={cn(buttonVariants({ variant, size, active, className }))}
        ref={ref}
        {...props}
      >
        {isLoading && <Spinner className="mr-2 text-current" />}
        {!isLoading && iconLeft && <span className="mr-2">{iconLeft}</span>}
        <span className={classNameChild}>{children}</span>
        {iconRight && <span className="ml-2">{iconRight}</span>}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };