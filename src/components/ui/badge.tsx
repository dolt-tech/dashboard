import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-accent bg-accent text-black",
        secondary: "border-border bg-secondary text-white hover:bg-secondary/80",
        destructive: "border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20",
        success: "border-green-500/50 bg-green-500/10 text-green-500 hover:bg-green-500/20",
        warning: "border-accent/50 bg-accent/10 text-accent hover:bg-accent/20",
        pending: "border-accent bg-accent text-black",
        outline: "text-foreground border-border hover:bg-muted",
        muted: "border-border/50 bg-muted text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }