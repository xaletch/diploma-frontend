import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router";
import { createContext, useCallback, useContext, useState, type PropsWithChildren } from "react"
import { Button } from "../../button";

type IHoverDropdownContext = {
  open: boolean;
  setOpen: (v: boolean) => void;
  close: () => void;
} | null;

type Side = "top" | "bottom" | "left" | "right" | "top_right" | "bottom_right" | "center_right";
type Align = "start" | "center" | "end";

type HoverDropdownContentProps = {
  children: React.ReactNode;
  side?: Side,
  align?: Align,
  className?: string;
}

const alignVariant: Record<Align, Record<Side, string>> = {
  start: {
    top: "left-0",
    bottom: "left-0",
    left: "top-0",
    right: "top-0",
    center_right: "left-57 top-1/2 -translate-y-1/2",
    top_right: "top-0",
    bottom_right: "",
  },
  center: {
    top: "left-1/2 -translate-x-1/2",
    bottom: "left-1/2 -translate-x-1/2",
    left: "top-1/2 -translate-y-1/2",
    right: "top-1/2 -translate-y-1/2",
    center_right: "left-57 top-1/2 -translate-y-1/2",
    top_right: "top-0",
    bottom_right: "",
  },
  end: {
    top: "right-0",
    bottom: "right-0",
    left: "bottom-0",
    right: "bottom-0",
    center_right: "left-57 top-1/2 -translate-y-1/2",
    top_right: "left-57 top-0",
    bottom_right: "bottom-3 left-56.5",
  },
};

type HoverDropdownProps = {
  children?: React.ReactNode;
  className?: string;
};

type HoverDropdownItemLinkProps = React.ComponentProps<typeof Link> & {
  className?: string;
};

type HoverDropdownComponent = React.FC<HoverDropdownProps> & {
  Trigger: React.FC<PropsWithChildren>;
};

const HoverDropdownCtx = createContext<IHoverDropdownContext>(null);

const HoverDropdown: HoverDropdownComponent = ({ children, className="" }: HoverDropdownProps) => {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const openDropdown = useCallback(() => setOpen(true), []);

  return (
    <HoverDropdownCtx.Provider value={{ open, setOpen, close }}>
      <div 
        className={cn("relative", className)}
        onMouseEnter={openDropdown}
        onMouseLeave={close}
      >
        {children}
      </div>
    </HoverDropdownCtx.Provider>
  )
}

HoverDropdown.Trigger = function Trigger({ children }) {
  return <>{children}</>;
};

function HoverDropdownTrigger ({ children }: PropsWithChildren) {
  return (
    <HoverDropdown.Trigger>
      {children}
    </HoverDropdown.Trigger>
  )
}

function HoverDropdownContent ({ align="center", side="bottom", children, className }: HoverDropdownContentProps) {
  const ctx = useContext(HoverDropdownCtx);
  if (!ctx || !ctx.open) return null;

  return (
    <div data-ui="dropdown-content" className={cn("absolute z-10", alignVariant[align], alignVariant[align][side])}>
      <div className={cn("bg-accent-foreground rounded-12 w-60 overflow-hidden p-2", className)}>{children}</div>
    </div>
  )
}

function HoverDropdownItem ({ children, className }: React.ComponentProps<"div">) {
  const ctx = useContext(HoverDropdownCtx);
  if (!ctx) return null;

  return (
    <div data-ui="dropdown-item" data-action="dropdown-item" onClick={ctx.close} className={cn("flex items-center gap-3 px-2.5 py-2 hover:bg-primary/90 active:opacity-55 hover:text-white/90 duration-200 text-white/70 cursor-pointer rounded-12", className)}>{children}</div>
  )
}

function HoverDropdownItemTrigger ({ children, onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const ctx = useContext(HoverDropdownCtx);
  if (!ctx) return null;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    ctx.close();
    onClick?.(e);
  };

  return (
    <Button 
      data-ui="dropdown-button"
      data-action="dropdown-button"
      onClick={handleClick}
      size={"none"}
      type={"button"}
      variant={"location_dropdown"}
      classNameChild={"flex-1 flex items-center gap-3"}
      {...props}
    >
      {children}
    </Button>
  )
}

function HoverDropdownItemLink ({ children, className, href, ...props }: HoverDropdownItemLinkProps) {
  return (
    <Link 
      to={href}
      data-ui="dropdown-link"
      data-action="dropdown-link"
      className={cn("flex items-center gap-2 px-2.5 py-2 hover:bg-primary/90 active:opacity-55 hover:text-white/90 duration-200 text-white/70 font-medium text-sm leading-4 rounded-12", className)}
      {...props}
    >
      {children}
    </Link>
  )
}

function HoverDropdownSeparator ({ className="" }: { className?: string }) {
  return <div data-ui="dropdown-separator" className={cn("h-px bg-primary my-1", className)} />;
}

function HoverDropdownLabel ({ children, className }: React.ComponentProps<"div">) {
  return (
    <div data-ui="dropdown-label" className={cn("text-white/70 px-3 py-2.5 font-semibold text-sm", className)}>
      {children}
    </div>
  )
}

export {
  HoverDropdown,
  HoverDropdownTrigger,
  HoverDropdownContent,
  HoverDropdownItem,
  HoverDropdownItemTrigger,
  HoverDropdownItemLink,
  HoverDropdownSeparator,
  HoverDropdownLabel,
}