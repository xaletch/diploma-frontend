import * as SwitchPrimitive from "@radix-ui/react-switch"
import { cn } from "@/shared/utils"
import { cva, type VariantProps } from "class-variance-authority"

const switchVariants = cva(
  "peer data-[state=checked]:bg-primary data-[state=unchecked]:bg-black/8! focus-visible:border-ring focus-visible:ring-ring/50 dark:data-[state=unchecked]:bg-white/80 inline-flex h-[1.15rem] w-8 shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", 
{
  variants: {
    size: {
      default: "h-6 w-11",
      xl: "h-8 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  }
});

const switchThumbVariants = cva(
  "pointer-events-none block rounded-full bg-primary transition-transform ring-0 dark:bg-white cursor-pointer",
  {
    variants: {
      size: {
        default: "size-5 data-[state=checked]:translate-x-1/1 data-[state=unchecked]:translate-x-1/12",
        xl: "size-6 data-[state=checked]:translate-x-[115%] data-[state=unchecked]:translate-x-1/10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & VariantProps<typeof switchVariants>;

function Switch({ className, size, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(switchThumbVariants({ size }))}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
