import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "real" | "partial" | "fallback" | "assumption" | "needs_review" | "verified" | "risk_low" | "risk_medium" | "risk_high" | "risk_critical";
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
          {
            "bg-graphite-700 text-ivory-300 border border-graphite-600": variant === "default",
            "bg-green-900/50 text-green-300 border border-green-700/50": variant === "real",
            "bg-amber-900/50 text-amber-300 border border-amber-700/50": variant === "partial",
            "bg-graphite-700/50 text-ivory-400 border border-graphite-600/50": variant === "fallback",
            "bg-blue-900/50 text-blue-300 border border-blue-700/50": variant === "assumption",
            "bg-orange-900/50 text-orange-300 border border-orange-700/50": variant === "needs_review",
            "bg-emerald-900/50 text-emerald-300 border border-emerald-700/50": variant === "verified",
            "bg-green-900/30 text-green-400 border border-green-800/50": variant === "risk_low",
            "bg-yellow-900/30 text-yellow-400 border border-yellow-800/50": variant === "risk_medium",
            "bg-orange-900/30 text-orange-400 border border-orange-800/50": variant === "risk_high",
            "bg-red-900/30 text-red-400 border border-red-800/50": variant === "risk_critical",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

export { Badge };
