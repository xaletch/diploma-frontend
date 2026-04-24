import React from "react"
import { cn } from "@/shared/utils";
import { type VariantProps } from "class-variance-authority";
import { type FieldWrapperPassThroughProps } from "../form";
import { inputVariants } from "./variants";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & 
FieldWrapperPassThroughProps & VariantProps<typeof inputVariants> & {
  className?: string;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className="", type, variant, inputSize, error, label, isError=false, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          type={type}
          {...props}
          className={cn(inputVariants({ variant, inputSize, className }), (error || isError) ? "border-error-color-icon focus:border-error-color-icon" : "")}
        />
         {label && <div className="absolute bg-primary/90 h-full w-16 font-bold text-white right-0 bottom-0 flex items-center justify-center rounded-r-xl">{label}</div>}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input }
