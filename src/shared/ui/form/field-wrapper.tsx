import type { FieldError } from "react-hook-form";
import { Label, Error } from "./";

type FieldWrapperProps = {
  label?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
}

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, required=false, children, error } = props;

  return (
    <div>
      <Label className="text-xs">
        {label} {required ? <span className="text-red">*</span> : undefined}
        <div className="mt-0.5">{children}</div>
      </Label>
      <Error msg={error?.message}/>
    </div>
  )
};
