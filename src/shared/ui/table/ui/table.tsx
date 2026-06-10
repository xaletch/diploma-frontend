import { cn } from "@/shared/utils";
import type { ComponentProps } from "react";

function Table({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table"
      className={cn("relative w-full", className)}
      {...props}
    />
  )
}

function TableHeader({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-header"
      className={cn("rounded-t-2xl overflow-hidden peer", className)}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-head"
      className={cn("font-medium px-5 pt-2.5 pb-1.5 text-sm flex items-center opacity-50", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-body"
      className={cn("bg-card/60 rounded-3xl overflow-hidden peer-hover:rounded-t-none relative", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-footer"
      className={cn("", className)}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-row"
      className={cn("grid grid-flow-col auto-cols-fr hover:bg-card/60", className)}
      {...props}
    />
  )
}

function TableCell({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-cell"
      className={cn("py-3.5 px-5 flex items-center text-sm gap-2.5 font-medium leading-5", className)}
      {...props}
    />
  )
}

function TableCellActions({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-cell"
      className={cn("py-3.5 px-5 flex items-center justify-end gap-2", className)}
      {...props}
    />
  )
}

function TableSeparator({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-cell-separator"
      className={cn("border-b border-card", className)}
      {...props}
    />
  )
}

function TableFetching({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-fetching"
      className={cn("absolute top-0 left-0 w-full h-full bg-card backdrop-blur-2 z-10", className)}
      {...props}
    />
  )
}

function TableNotFound({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-ui="table-not-found"
      className={cn("py-3.5 px-5 h-64 flex items-center justify-center text-sm text-primary/60 gap-2.5 font-medium leading-5", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableHeader,
  TableHead,
  TableBody,
  TableFooter,
  TableRow,
  TableCell,
  TableCellActions,
  TableSeparator,
  TableFetching,
  TableNotFound,
}
