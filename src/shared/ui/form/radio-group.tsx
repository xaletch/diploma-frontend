import { Controller, type Control, type FieldValues, type Path, type PathValue } from "react-hook-form";
import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper"
import { RadioGroup } from "../radio";
import { cn } from "@/shared/utils";

export type RadioGroupFormProps<C extends FieldValues> = 
FieldWrapperPassThroughProps & {
  className?: string;
  isError?: boolean;
  labelInput?: string;
  children?: React.ReactNode;
  name: Path<C>;
  control: Control<C>;
  defaultValue?: PathValue<C, Path<C>>;
  radioClassName?: string;
}

export const RadioGroupForm = <C extends FieldValues>({ name, label, children, error, control, defaultValue, radioClassName="" }: RadioGroupFormProps<C>) => {
  return (
    <FieldWrapper error={error} label={label}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => (
          <RadioGroup 
            value={field.value ?? ""} 
            onValueChange={field.onChange} 
            className={cn(radioClassName)}
          >{children}</RadioGroup>
        )}
      />
    </FieldWrapper>
  )
}
