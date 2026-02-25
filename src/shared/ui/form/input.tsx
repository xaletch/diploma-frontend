import React from "react"
import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper"
import type { UseFormRegisterReturn } from "react-hook-form";
import { cn } from "@/shared/utils";
import { type VariantProps } from "class-variance-authority";
import { inputVariants } from "../input/variants";

export type InputFormProps = React.InputHTMLAttributes<HTMLInputElement> & 
FieldWrapperPassThroughProps & VariantProps<typeof inputVariants> & {
  className?: string;
  register: Partial<UseFormRegisterReturn>;
  isError?: boolean;
  labelInput?: string;
}

const InputForm = React.forwardRef<HTMLInputElement, InputFormProps>(
  ({ className="", type, required, variant, inputSize, label, error, isError=false, register, message, labelInput="", ...props }, ref) => {
    return (
      <FieldWrapper label={label} error={error} required={required} message={message}>
        <input
          ref={ref}
          type={type}
          {...register}
          {...props}
          className={cn(inputVariants({ variant, inputSize, className }), (error || isError) ? "border-error-color-icon focus:border-error-color-icon" : "", labelInput ? "pr-20" : "")}
        />
        {labelInput && <div className="absolute bg-primary/90 h-14 w-16 font-bold text-white right-0 bottom-0 flex items-center justify-center rounded-r-xl">{labelInput}</div>}
      </FieldWrapper>
    );
  },
);
InputForm.displayName = "Input";

export { InputForm }