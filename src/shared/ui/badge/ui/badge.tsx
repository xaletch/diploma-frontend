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
        online: "px-2 py-0.5 text-xss! font-bold rounded-lg bg-primary border-primary text-white",
        offline: "px-2 py-0.5 text-xss! font-bold rounded-lg bg-error-background border-error-background text-white",
        
        active: "px-2 py-0.5 text-xss! font-bold rounded-lg bg-green border-green text-white",
        invited: "px-2 py-0.5 text-xss! font-bold rounded-lg bg-orange border-orange text-white",
        inactive: "px-2 py-0.5 text-xss! font-bold rounded-lg bg-error-background border-error-background text-white",
        disable: "px-2 py-0.5 text-xss! font-bold rounded-lg bg-error-background border-error-background text-white",

        count: "w-6 h-6 rounded-lg bg-border flex items-center justify-center border-transparent text-primary",

        open: "bg-primary text-white border-none px-4 py-1.5",
        pending: "bg-orange border-none px-4 py-1.5",
        closed: "bg-red border-none px-4 py-1.5",
        paid: "bg-green text-white border-none px-4 py-1.5",
        unpaid: "bg-blue text-white border-none px-4 py-1.5",

        new_b: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-primary text-white",
        pending_b: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-orange text-white",
        expired_b: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-red text-white",
        confirmed_b: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-blue text-white",
        cancelled_b: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-red text-white",
        completed_b: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-green text-white",

        online_p: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-primary text-white",
        cash_p: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-green text-white",
        credit_card_p: "px-2 py-0.5 text-xss! font-bold rounded-lg border-none bg-blue text-white",
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
