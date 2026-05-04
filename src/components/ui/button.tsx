import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-crimson-deep/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-crimson-deep text-vellum font-display font-bold uppercase tracking-[0.05em] hover:bg-crimson hover:outline hover:outline-1 hover:outline-gold",
        destructive:
          "bg-crimson text-vellum font-display uppercase tracking-[0.05em] hover:bg-crimson-deep",
        outline:
          "border border-gold-shadow bg-transparent text-ink-soft font-display uppercase tracking-[0.05em] hover:bg-vellum hover:text-ink",
        secondary:
          "bg-vellum text-crimson-deep border border-gold font-display font-bold uppercase tracking-[0.05em] hover:bg-parchment hover:border-gold-shadow",
        ghost:
          "text-ink-soft font-display uppercase tracking-[0.05em] hover:text-crimson-deep",
        link: "text-crimson-deep font-serif italic underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-7 py-3.5 max-md:px-6 max-md:py-3",
        sm: "h-9 px-5 py-2",
        lg: "h-12 px-8 py-4",
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
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
