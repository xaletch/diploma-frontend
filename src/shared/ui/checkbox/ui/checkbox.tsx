import { CheckIcon } from '@/shared/icons';
import { cn } from '@/shared/utils';
import React, { useState, type InputHTMLAttributes } from 'react'

type CheckboxProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (v: boolean) => void;
} & InputHTMLAttributes<HTMLInputElement>

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, checked, defaultChecked, onCheckedChange, disabled, ...props }, ref) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked || false);

  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = () => {
    if (disabled) return;

    const newValue = !isChecked;

    if (!isControlled) {
      setInternalChecked(newValue);
    }

    onCheckedChange?.(newValue);
  }
  return (
    <button
      type={"button"}
      role={"checkbox"}
      data-ui={"checkbox"}
      aria-checked={isChecked}
      disabled={disabled}
      onClick={handleChange}
      className={cn(
        "peer w-6 h-6 shrink-0 rounded-lg bg-white text-white flex items-center justify-center transition-colors focus:outline-none cursor-pointer",
        isChecked && "bg-accent",
        disabled && "opacity-60 cursor-not-allowed",
        className,
      )}
    >
      <span className={cn("transition-colors duration-150", isChecked ? "scale-100" : "saturate-0")}>
        <CheckIcon width={18} height={18}/>
      </span>

      <input
        ref={ref}
        type={"checkbox"}
        checked={isChecked}
        className={"sr-only"}
        onChange={() => {}}
        {...props}
      />
    </button>
  )
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
