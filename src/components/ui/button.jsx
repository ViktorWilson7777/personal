import * as React from "react"
import { cva } from "class-variance-authority";
import { cn } from "cn"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "group/button relative inline-flex shrink-0 items-center justify-center rounded-xl font-semibold tracking-wider uppercase transition-all duration-150 ease-[cubic-bezier(0,0,0.58,1)] outline-none select-none cursor-pointer disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none hover:-translate-y-0.5 active:translate-y-1 active:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white border-2 border-blue-800 shadow-[0_5px_0_0_#1e40af] hover:bg-blue-500 hover:shadow-[0_7px_0_0_#1e40af]",
        outline:
          "bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-700 shadow-[0_5px_0_0_#94a3b8] dark:shadow-[0_5px_0_0_#334155] hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-[0_7px_0_0_#94a3b8] dark:hover:shadow-[0_7px_0_0_#334155]",
        secondary:
          "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 shadow-[0_5px_0_0_#94a3b8] dark:shadow-[0_5px_0_0_#1e293b] hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-[0_7px_0_0_#94a3b8]",
        ghost:
          "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 border-0 shadow-none",
        destructive:
          "bg-red-600 text-white border-2 border-red-800 shadow-[0_5px_0_0_#991b1b] hover:bg-red-500 hover:shadow-[0_7px_0_0_#991b1b]",
        link: "text-primary underline underline-offset-4 hover:underline shadow-none border-0",
        pop:
          "text-[#382b22] dark:text-[#382b22] bg-[#fff0f0] border-2 border-[#b18597] shadow-[0_8px_0_-2px_#f9c4d2,0_8px_0_0_#b18597,0_14px_0_0_#ffe3e2] hover:bg-[#ffe9e9] hover:shadow-[0_5px_0_-2px_#f9c4d2,0_5px_0_0_#b18597,0_10px_0_0_#ffe3e2] active:shadow-[0_0px_0_-2px_#f9c4d2,0_0px_0_0_#b18597,0_0px_0_0_#ffe3e2]",
      },
      size: {
        default: "h-11 gap-2 px-6 text-sm",
        sm: "h-9 gap-1.5 px-4 text-xs",
        lg: "h-12 gap-2 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
