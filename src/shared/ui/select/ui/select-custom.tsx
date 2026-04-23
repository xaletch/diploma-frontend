import { cn } from '@/shared/utils';
import { createContext, useContext, useEffect, useRef, useState, type ComponentProps } from 'react';
import { buttonVariants } from '../../button';
import type { VariantProps } from 'class-variance-authority';
import { Avatar } from '@/entities/user';
import SvgChevron from '@/shared/icons/Chevron';

type SelectItemValue = {
  value: string;
  label: string;
  avatar?: {
    id: string;
    name: string;
    avatar_url: string | null;
  };
}

type SelectContextType = {
  value?: SelectItemValue;
  setValue: (v: SelectItemValue) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  ref: React.RefObject<HTMLDivElement | null>;
};

const SelectContext = createContext<SelectContextType | null>(null);

function useSelect() {
  const ctx = useContext(SelectContext);
  if (!ctx) throw new Error('Select components must be used inside <Select>');
  return ctx;
}

type SelectProps = {
  value?: SelectItemValue;
  defaultValue?: SelectItemValue;
  onValueChange?: (v: SelectItemValue) => void;
} & ComponentProps<"div">;

function Select({ className, children, value, defaultValue, onValueChange, ...props }: SelectProps) {
  const [internalValue, setInternalValue] = useState<SelectItemValue | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = (v: SelectItemValue) => {
    if (!isControlled) setInternalValue(v);
    onValueChange?.(v);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value: currentValue, setValue, open, setOpen, ref }}>
      <div
        ref={ref}
        data-ui={"select"}
        className={cn("relative", className)}
        {...props}
      >{children}</div>
    </SelectContext.Provider>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

function SelectTrigger({ className, variant="select", size="icon_44",  children, ...props }: ButtonProps) {
  const { open, setOpen } = useSelect();

  return (
    <button
      data-ui={"select-trigger"}
      onClick={(e) => {
        e.stopPropagation();
        setOpen(!open);
      }}
      className={cn(buttonVariants({ variant, size, className }))}
      type={"button"}
      {...props}
    >
      {children}
      <span className={cn('size-4', open ? "-rotate-90" : "rotate-90")}>
        <SvgChevron />
      </span>
    </button>
  );
}

type SelectValueProps = {
  placeholder?: string;
} & ComponentProps<"div">;

function SelectValue({ placeholder, className, ...props }: SelectValueProps) {
  const { value } = useSelect();

  return (
    <div
      data-ui={"select-value"}
      className={cn("flex items-center gap-2.5", !value ? "opacity-50" : "", className)}
      {...props}
    >
      {value?.avatar && <Avatar size={"small"} id={value.avatar.id} avatar_url={value.avatar.avatar_url} name={value.avatar.name} />}
      {value?.value ?? placeholder}
    </div>
  );
}

function SelectContent({ className, children, ...props }: ComponentProps<"div">) {
  const { open, setOpen, ref } = useSelect();
  const contentRef = useRef<HTMLDivElement>(null);
  const [side, setSide] = useState<'top' | 'bottom'>('bottom');
  const [maxHeight, setMaxHeight] = useState<number>(300);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    if (open) document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [open]);

  useEffect(() => {
    if (!open || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;

    const padding = 8;

    const shouldOpenTop = spaceBelow < 200 && spaceAbove > spaceBelow;

    setSide(shouldOpenTop ? 'top' : 'bottom');

    const availableHeight = shouldOpenTop
      ? spaceAbove - padding
      : spaceBelow - padding;

    setMaxHeight(availableHeight-8);
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      data-ui={"select-content"}
      style={{ maxHeight }}
      className={cn(
        "scrollbar-hidden bg-card backdrop-blur-xl p-3.5 text-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-32 origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl",
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        "absolute left-0 right-0 z-50 my-2",
        side === 'bottom' && "top-full",
        side === 'top' && "bottom-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

type SelectItemProps = {
  value: SelectItemValue;
  handleSelect?: () => void;
} & ComponentProps<"div">;

function SelectItem({ value, handleSelect, className, children, ...props }: SelectItemProps) {
  const { value: selected, setValue } = useSelect();

  const isSelected = selected?.value === value.value;

  return (
    <div
      data-ui={"select-item"}
      className={cn(
        "focus:backdrop-blur-3xl hover:backdrop-blur-3xl focus:text-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full items-center gap-2 rounded-[14px] py-3.5 px-4 text-md outline-hidden select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2 cursor-pointer", 
        isSelected ? "backdrop-blur-3xl" : "", 
        className
      )}
      onClick={() => {
        setValue(value);
        handleSelect?.();
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
}
