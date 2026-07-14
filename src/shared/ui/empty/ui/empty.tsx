import { cn } from "@/shared/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { motion, type HTMLMotionProps, type Variants } from "motion/react"

const emptyMediaVariants = cva(
  "flex shrink-0 items-center justify-center mb-2 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-accent text-background flex size-12 shrink-0 items-center justify-center rounded-13 [&_svg:not([class*='size-'])]:size-7",
        network_error: "rounded-13 text-error-background",
        network_success: "rounded-13 text-green-700",
        empty: "size-18 flex"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
}

const iconItem: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
}

function Empty({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-slot="empty"
      variants={container}
      initial="hidden"
      animate="show"
      className={cn(
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border-dashed p-6 text-center text-balance md:p-12",
        className
      )}
      {...props}
    />
  )
}

function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className={cn(
        "flex max-w-sm flex-col items-center text-center",
        className
      )}
      {...props}
    />
  )
}

function EmptyMedia({
  className,
  variant = "default",
  ...props
}: HTMLMotionProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <motion.div
      data-slot="empty-icon"
      data-variant={variant}
      variants={iconItem}
      className={cn(emptyMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function EmptyTitle({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-slot="empty-title"
      variants={item}
      className={cn("text-base font-medium tracking-tight", className)}
      {...props}
    />
  )
}

function EmptyDescription({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-slot="empty-description"
      variants={item}
      className={cn(
        "[&>a:hover]:text-primary text-xs/relaxed [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  )
}

function EmptyContent({ className, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      data-slot="empty-content"
      variants={item}
      className={cn(
        "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
        className
      )}
      {...props}
    />
  )
}

export {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
}
