import { cva } from "class-variance-authority";

export const inputVariants = cva(
  "w-full flex text-md rounded-xl shadow-input px-4 py-4 disabled:cursor-not-allowed disabled:opacity-50 placeholder:opacity-50 duration-200",
  {
    variants: {
      variant: {
        default: "bg-card/60 border font-medium border-transparent focus:border-border leading-4.5 focus:bg-card/40",
      },
      inputSize: {
        default: "",
        size_56: "h-14 text-sm",
        size_60: "h-15 text-base"
      }
    },
    defaultVariants: {
      variant: "default",
      inputSize: "default"
    },
  },
);
