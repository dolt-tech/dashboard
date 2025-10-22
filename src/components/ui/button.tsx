import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary Orange button
        default: "bg-accent text-white hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 font-semibold shadow-md hover:shadow-orange-glow",
        // Orange with subtle glow on hover
        primary: "bg-accent text-white hover:bg-orange-600 active:bg-orange-700 transition-all duration-200 font-semibold shadow-md hover:shadow-orange-glow hover:animate-pulse",
        // Secondary - Orange border with transparent background
        secondary: "border-2 border-accent text-accent bg-transparent hover:bg-accent/10 active:bg-accent/20 transition-all duration-200 font-semibold",
        // Destructive - Red
        destructive: "bg-destructive text-destructive-foreground hover:bg-red-700 active:bg-red-800 transition-all duration-200 font-semibold shadow-md",
        // Outline - Subtle border
        outline: "border border-border bg-transparent text-white hover:bg-muted hover:text-accent transition-all duration-200",
        // Ghost - Transparent with hover
        ghost: "bg-transparent text-white hover:bg-muted hover:text-accent transition-all duration-200",
        // Link style
        link: "text-accent underline-offset-4 hover:underline transition-colors",
        // Glass morphism effect
        glass: "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/20 hover:border-accent/50 transition-all duration-200 shadow-md",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3 text-xs",
        lg: "h-12 rounded-lg px-8 text-base",
        icon: "h-10 w-10 rounded-lg",
        xl: "h-14 px-10 text-lg rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }