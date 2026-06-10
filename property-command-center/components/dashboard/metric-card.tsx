"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
}

export function MetricCard({ title, value, subtitle, icon, trend, className }: MetricCardProps) {
  return (
    <Card className={cn("hover:border-copper-600/30 transition-all duration-300", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm text-ivory-400 font-medium">{title}</p>
            <p className="text-2xl font-bold text-ivory-100">{value}</p>
            {subtitle && (
              <p
                className={cn(
                  "text-xs",
                  trend === "up" && "text-green-400",
                  trend === "down" && "text-red-400",
                  (!trend || trend === "neutral") && "text-ivory-500"
                )}
              >
                {subtitle}
              </p>
            )}
          </div>
          {icon && <div className="p-2 rounded-lg bg-copper-600/10 text-copper-400">{icon}</div>}
        </div>
      </CardContent>
    </Card>
  );
}
