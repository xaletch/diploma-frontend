import { cn } from "@/shared/utils";
import { Loader2Icon } from "lucide-react"

export const Spinner = ({ className, ...props }: React.ComponentProps<"svg">) => {
  return (
    <>
      <Loader2Icon
        role="status"
        aria-label="Loading"
        className={cn("size-4 animate-spin", className)}
        {...props}
      />
      <span className="sr-only">Loading</span>
    </>
  );
};