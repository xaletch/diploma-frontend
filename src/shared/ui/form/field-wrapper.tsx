import type { FieldError } from "react-hook-form";
import { Label, Error, FormMessage } from "./";

type FieldWrapperProps = {
  label?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  message?: string;
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, required=false, children, error, message } = props;

  return (
    <div>
      <Label className="text-xs relative">
        {label} {required ? <span className="text-red">*</span> : undefined}
        <div className="mt-0.5">{children}</div>
      </Label>
      <FormMessage className="m-2 opacity-70">{message}</FormMessage>
      <Error msg={error?.message}/>
    </div>
  )
};
