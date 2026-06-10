import { Input } from "./input"
import { SearchIcon } from "lucide-react";

type SearchProps = React.InputHTMLAttributes<HTMLInputElement> & {
  onValueChange?: (v: string) => void;
};

export const Search = ({ onValueChange, ...props }: SearchProps) => {
  return (
    <div className="max-w-95! w-full">
      <Input
        {...props}
        onChange={(e) => onValueChange?.(e.target.value)}
        label={<SearchIcon width={20} height={20} />}
        lcls={"w-11 left-0 bg-transparent! text-accent/20"}
        className={"pl-10 placeholder:font-normal"}
      />
    </div>
  )
}
