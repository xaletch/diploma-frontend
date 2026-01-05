import { cn } from "@/shared/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        action: "w-10 h-10 rounded-10! bg-stone-500/35 border-none [&>svg]:size-4.5!",
        profit_up: "px-2.5 py-0.5 text-11 text-green border-success-background/45 bg-success-background/10 [&>svg]:size-4",
        profit_down: "px-2.5 py-0.5 text-11 text-red border-red/15 bg-red/8 [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type BadgeProps = React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & {
  asChild?: boolean
}

function Badge ({ className, variant, asChild, ...props }: BadgeProps) {
  const Span = asChild ? Slot : "span"
  return (
    <Span
      data-ui="badge"
      className={cn(badgeVariants({ variant, className }), className)}
      {...props}
    />
  )
}

export { Badge };
