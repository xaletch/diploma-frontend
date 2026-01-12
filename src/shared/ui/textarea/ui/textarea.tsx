import { cn } from "@/shared/utils";
import React from "react";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn("flex min-h-24 w-full bg-card/60 border font-medium border-transparent text-md rounded-xl px-4 py-4 placeholder:opacity-50 focus:border-border focus:bg-card/40 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 read-only:focus:border-transparent read-only:resize-none transition-colors duration-200", className)}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };