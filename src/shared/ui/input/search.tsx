import { cn } from "@/shared/utils";
import { Input } from "./input"
import { SearchIcon } from "lucide-react";

type SearchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onValueChange?: (v: string) => void;
  inputCls?: string;
};

export const Search = ({ onValueChange, className, inputCls="", ...props }: SearchProps) => {
  return (
    <div className={cn("max-w-95! w-full", className)}>
      <Input
        {...props}
        onChange={(e) => onValueChange?.(e.target.value)}
        label={<SearchIcon width={20} height={20} />}
        lcls={"w-11 left-0 bg-transparent! text-accent/20"}
        className={cn("pl-10 placeholder:font-normal bg-card", inputCls)}
      />
    </div>
  )
}
