import React from "react"
import { cn } from "@/shared/utils";
import { type VariantProps } from "class-variance-authority";
import { FieldWrapper, type FieldWrapperPassThroughProps } from "../form";
import { inputVariants } from "./variants";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & 
FieldWrapperPassThroughProps & VariantProps<typeof inputVariants> & {
  className?: string;
  isError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className="", type, required, variant, inputSize, label, error, isError=false, ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error} required={required}>
        <input
          ref={ref}
          type={type}
          {...props}
          className={cn(inputVariants({ variant, inputSize, className }), (error || isError) ? "border-error-color-icon focus:border-error-color-icon" : "")}
        />
      </FieldWrapper>
    );
  },
);
Input.displayName = "Input";

export { Input }