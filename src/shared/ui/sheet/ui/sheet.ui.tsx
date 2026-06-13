import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/shared/utils";
import { Button, buttonVariants } from "../../button";
import { useCallback, useContext, useEffect, useState } from "react";
import type { VariantProps } from "class-variance-authority";
import { CloseIcon } from "@/shared/icons";

type Side = "top" | "right" | "bottom" | "left";

interface SheetContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SheetContext = React.createContext<SheetContextValue>({
  open: false,
  onOpenChange: () => {},
})

function useSheet() {
  return useContext(SheetContext);
}

interface SheetProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Sheet({ open: controlledOpen, defaultOpen = false, onOpenChange, children }: SheetProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);

  const open = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = useCallback((v: boolean) => {
    setUncontrolledOpen(v);
    onOpenChange?.(v);
  }, [onOpenChange]);

  return (
    <SheetContext.Provider value={{ open, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  )
}

type SheetTriggerProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
  asChild?: boolean;
}

function SheetTrigger({ children, asChild, size, variant, ...props }: SheetTriggerProps) {
  const { onOpenChange } = useSheet();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onClick?.(e as React.MouseEvent<HTMLElement>);
        onOpenChange(true);
      },
    });
  }

  return (
    <Button data-slot="sheet-trigger" variant={variant} size={size} onClick={() => onOpenChange(true)} {...props}>
      {children}
    </Button>
  )
}

function SheetClose({ children, asChild, ...props }: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const { onOpenChange } = useSheet();

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<React.HTMLAttributes<HTMLElement>>, {
      onClick: (e: React.MouseEvent) => {
        (children as React.ReactElement<React.HTMLAttributes<HTMLElement>>).props.onClick?.(e as React.MouseEvent<HTMLElement>);
        onOpenChange(false);
      },
    })
  }

  return (
    <button data-slot="sheet-close" onClick={() => onOpenChange(false)} {...props}>
      {children}
    </button>
  )
}

function SheetPortal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
}

function SheetOverlay({ className, ...props }: React.ComponentProps<"div">) {
  const { onOpenChange } = useSheet();

  return (
    <div
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-card backdrop-blur-xs",
        "animate-in fade-in-0 duration-100",
        className
      )}
      onClick={() => onOpenChange(false)}
      aria-hidden="true"
      {...props}
    />
  )
}

const sideStyles: Record<Side, string> = {
  right: "inset-y-0 right-0 h-full w-3/4 sm:max-w-sm data-[state=open]:slide-in-from-right-10 data-[state=closed]:slide-out-to-right-10",
  left: "inset-y-0 left-0 h-full w-3/4 sm:max-w-sm data-[state=open]:slide-in-from-left-10 data-[state=closed]:slide-out-to-left-10",
  top: "inset-x-0 top-0 h-auto data-[state=open]:slide-in-from-top-10 data-[state=closed]:slide-out-to-top-10",
  bottom: "inset-x-0 bottom-0 h-auto data-[state=open]:slide-in-from-bottom-10 data-[state=closed]:slide-out-to-bottom-10",
}

interface SheetContentProps extends React.ComponentProps<"div"> {
  side?: Side;
  showCloseButton?: boolean;
}

function SheetContent({ className, children, side = "right", showCloseButton = true, ...props }: SheetContentProps) {
  const { open, onOpenChange } = useSheet();

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <SheetPortal>
      <SheetOverlay />
      <div
        role="dialog"
        aria-modal="true"
        data-slot="sheet-content"
        data-side={side}
        data-state={open ? "open" : "closed"}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-white bg-clip-padding text-sm text-accent",
          "transition duration-200 ease-in-out",
          "animate-in fade-in-0",
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <Button
            variant="ghost"
            className="absolute top-6 right-6"
            size="icon_20"
            onClick={() => onOpenChange(false)}
          >
            <CloseIcon width={24} height={24} />
            <span className="sr-only">Close</span>
          </Button>
        )}
      </div>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-6", className)}
      {...props}
    />
  )
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-6", className)}
      {...props}
    />
  )
}

function SheetTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="sheet-title"
      className={cn("text-xl font-bold text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="sheet-description"
      className={cn("text-sm text-primary", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
