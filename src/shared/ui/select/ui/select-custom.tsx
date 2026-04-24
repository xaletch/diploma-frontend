import { cn } from '@/shared/utils';
import { createContext, useContext, useEffect, useRef, useState, useCallback, type ComponentProps, useMemo } from 'react';
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

type GlobalSelectContextType = {
  activeSelectId: string | null;
  setActiveSelectId: (id: string | null) => void;
};

const GlobalSelectContext = createContext<GlobalSelectContextType>({
  activeSelectId: null,
  setActiveSelectId: () => {},
});

export function GlobalSelectProvider({ children }: { children: React.ReactNode }) {
  const [activeSelectId, setActiveSelectId] = useState<string | null>(null);
  
  return (
    <GlobalSelectContext.Provider value={{ activeSelectId, setActiveSelectId }}>
      {children}
    </GlobalSelectContext.Provider>
  );
}

function useGlobalSelect() {
  return useContext(GlobalSelectContext);
}

type SelectContextType = {
  value?: SelectItemValue;
  setValue: (v: SelectItemValue) => void;
  open: boolean;
  setOpen: (v: boolean) => void;
  ref: React.RefObject<HTMLDivElement | null>;
  selectId: string;
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
  const selectId = useRef(Math.random().toString(36).substring(7)).current;
  const { activeSelectId, setActiveSelectId } = useGlobalSelect();

  const onValueChangeRef = useRef(onValueChange);
  onValueChangeRef.current = onValueChange;

  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback((v: SelectItemValue) => {
    if (!isControlled) setInternalValue(v);
    onValueChangeRef.current?.(v);
    setOpen(false);
    setActiveSelectId(null);
  }, [isControlled, setActiveSelectId]);

  const handleOpenChange = useCallback((newOpen: boolean) => {
    if (newOpen) {
      setActiveSelectId(selectId);
    }
    setOpen(newOpen);
  }, [selectId, setActiveSelectId]);

  useEffect(() => {
    if (activeSelectId && activeSelectId !== selectId && open) {
      setOpen(false);
    }
  }, [activeSelectId, selectId, open]);

  const contextValue = useMemo(() => ({
    value: currentValue,
    setValue,
    open,
    setOpen: handleOpenChange,
    ref,
    selectId,
  }), [currentValue, setValue, open, handleOpenChange, selectId]);

  return (
    <SelectContext.Provider value={contextValue}>
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

function SelectTrigger({ className, variant="select", size="icon_44", children, ...props }: ButtonProps) {
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
      className={cn("flex items-center gap-2.5", !value?.value.length ? "opacity-50" : "", className)}
      {...props}
    >
      {value?.avatar && <Avatar size={"small"} id={value.avatar.id} avatar_url={value.avatar.avatar_url} name={value.avatar.name} />}
      {value?.value.length ? value.value : placeholder}
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

    if (open) {
      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
    }
  }, [open, ref, setOpen]);

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
  }, [open, ref]);

  useEffect(() => {
    if (open && contentRef.current) {
      const container = contentRef.current;
      requestAnimationFrame(() => {
        const selectedItem = container.querySelector('[data-selected="true"]');
        if (selectedItem) {
          const itemRect = selectedItem.getBoundingClientRect();
          const containerRect = container.getBoundingClientRect();
          const scrollTop = container.scrollTop + itemRect.top - containerRect.top - containerRect.height / 2 + itemRect.height / 2;
          container.scrollTop = scrollTop;
        }
      });
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={contentRef}
      data-ui={"select-content"}
      style={{ maxHeight }}
      className={cn(
        "scrollbar-hidden bg-card backdrop-blur-xl p-3.5 text-foreground relative z-50 min-w-32 overflow-x-hidden overflow-y-auto rounded-2xl",
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
  onChange?: (v?: string) => void;
} & ComponentProps<"div">;

const SelectItem = ({ value, onChange, className, children, ...props }: SelectItemProps) => {
  const { value: selected, setValue } = useSelect();
  const isSelected = selected?.value === value.value;

  const handleClick = useCallback(() => {
    setValue(value);
    onChange?.(value.value);
  }, [value, onChange, setValue]);

  return (
    <div
      data-ui={"select-item"}
      data-selected={isSelected}
      className={cn(
        "hover:backdrop-blur-3xl relative flex w-full items-center gap-2 rounded-[14px] py-3.5 px-4 text-md outline-hidden select-none cursor-pointer", 
        isSelected ? "backdrop-blur-3xl" : "", 
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};

export {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
}
