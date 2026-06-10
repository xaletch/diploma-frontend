import { cn } from "@/shared/utils";
import { Link } from "@tanstack/react-router"

interface AsideItemProps {
  name: string;
  to: string;
  icon: React.ReactNode;
  selected?: boolean;
  className?: string;
  search?: Record<string, unknown>;
}

export const AsideItem = ({ to, icon, name, selected=false, className="", search={} }: AsideItemProps) => {
  return (
    <Link to={to} search={search} className={cn(`flex items-center gap-2.5 px-3 py-2.5 rounded-13 text-white/70 hover:bg-primary/40 hover:text-white active:opacity-70 duration-200 ${selected ? "bg-primary/40" : ""}`, className)}>
      {icon}
      <span className="font-medium text-sm">{name}</span>
    </Link>
  )
}
