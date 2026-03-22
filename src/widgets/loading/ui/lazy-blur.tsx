import { cn } from "@/shared/utils"
import type { ComponentProps } from "react"

export const LazyBlur = ({ className, ...props }: ComponentProps<"div">) => {
  return <div className={cn("absolute top-0 left-0 w-full h-full rounded-2xl backdrop-blur-xs z-10", className)} {...props} data-ui="lazy-blur"  />
}
