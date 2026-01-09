import { cn } from "@/shared/utils"
import { forwardRef, type ButtonHTMLAttributes, type ComponentProps } from "react"
import { Button } from "../../button"
import { useRouter } from "@tanstack/react-router"
import { ArrowBackUpIcon } from "@/shared/icons"

function PageHeader ({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div 
      data-ui="page-header"
      className={cn("flex items-center justify-between gap-7.5", className)}
      {...props}
    >{children}</div>
  )
}

function PageHeaderTitle ({ className, children, ...props }: ComponentProps<"h1">) {
  return (
    <h1 
      data-ui="page-header-title" 
      className={cn("text-2xl font-extrabold leading-7.5", className)}
      {...props}
    >{children}</h1>
  )
}

function PageHeaderActions ({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div 
      data-ui="page-header-actions" 
      className={cn("flex gap-2.5", className)} 
      {...props}
    >{children}</div>
  )
}

const PageHeaderBackAction = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ children, ...props }, ref) => {
    const { history } = useRouter();
    return (
      <Button
        data-ui="page-header-back-action"
        data-action="back"
        ref={ref}
        variant={"white"}
        animation={"toggle"}
        className={"px-5 items-end py-3"}
        size={"size_48"}
        onClick={() => history.back()}
        iconLeft={<ArrowBackUpIcon width={25} height={25} />}
        {...props}
      >
        Назад
      </Button>
    )
  }
);
PageHeaderBackAction.displayName = "PageHeaderBackAction";

export {
  PageHeader,
  PageHeaderTitle,
  PageHeaderActions,
  PageHeaderBackAction,
}
