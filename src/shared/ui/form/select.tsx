/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
// import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper"
// import { Select, type SelectOptions } from "../select"

// interface SelectFormProps<F extends FieldValues> extends FieldWrapperPassThroughProps {
//   name: Path<F>;
//   options: SelectOptions[];
//   control: Control<F>;
//   isError?: boolean;
//   placeholder?: string;
// }

// export const SelectForm = <F extends FieldValues>({ name, placeholder, options, control, label, error, required }: SelectFormProps<F>) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field }) => (
//         <FieldWrapper label={label} error={error} required={required}>
//           <Select
//             options={options}
//             value={field.value}
//             onChange={(v) => field.onChange(v)}
//             isError={!!error}
//             placeholder={placeholder}
//           />
//         </FieldWrapper>
//       )}
//     />
//   )
// }

import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { FieldWrapper, type FieldWrapperPassThroughProps } from "./field-wrapper"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select/ui/select-custom";
import type { SelectOption } from "../select";
import { useCallback } from "react";

interface SelectFormProps<F extends FieldValues> extends FieldWrapperPassThroughProps {
  name: Path<F>;
  options: SelectOption[];
  control: Control<F>;
  isError?: boolean;
  placeholder?: string;
}

export const SelectForm = <F extends FieldValues>({ name, placeholder, options, control, label, error, required }: SelectFormProps<F>) => {
  const renderSelect = useCallback(({ field }: any) => {
    const selectedOption = options.find(o => o.value === field.value);
    
    return (
      <FieldWrapper label={label} error={error} required={required}>
        <Select
          value={selectedOption ? { value: selectedOption.value, label: selectedOption.label } : undefined}
          onValueChange={(v) => {
            field.onChange(v.value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent className="p-2">
            {options.map((opt, idx) => (
              <SelectItem
                key={`${name}-${idx}`}
                value={{
                  value: opt.value,
                  label: opt.label,
                }}
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldWrapper>
    );
  }, [options, label, error, required, placeholder, name]);

  return (
    <Controller
      name={name}
      control={control}
      render={renderSelect}
    />
  );
}
