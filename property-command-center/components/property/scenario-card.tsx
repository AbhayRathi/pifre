"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Scenario } from "@/lib/schemas/scenario";
import { formatCurrency } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ScenarioCardProps {
  scenario: Scenario;
  isActive: boolean;
  onClick: () => void;
}

export function ScenarioCard({ scenario, isActive, onClick }: ScenarioCardProps) {
  const riskVariant =
    scenario.riskLevel === "low"
      ? "risk_low"
      : scenario.riskLevel === "medium"
        ? "risk_medium"
        : scenario.riskLevel === "high"
          ? "risk_high"
          : "risk_critical";
  const confidenceVariant =
    scenario.confidence === "high"
      ? "real"
      : scenario.confidence === "medium"
        ? "partial"
        : "fallback";

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-300",
        isActive
          ? "border-copper-600/60 shadow-lg shadow-copper-600/10 ring-1 ring-copper-600/20"
          : "hover:border-graphite-500"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-sm">{scenario.name}</CardTitle>
          <div className="flex gap-1">
            <Badge variant={riskVariant}>{scenario.riskLevel}</Badge>
            <Badge variant={confidenceVariant}>{scenario.confidence}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-xs text-ivory-400 leading-relaxed">{scenario.description}</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-ivory-500">Units:</span>{" "}
            <span className="text-ivory-200 font-medium">
              {scenario.estimatedUnits.min}–{scenario.estimatedUnits.max}
            </span>
          </div>
          <div>
            <span className="text-ivory-500">Timeline:</span>{" "}
            <span className="text-ivory-200 font-medium">{scenario.timeline}</span>
          </div>
          <div>
            <span className="text-ivory-500">Cost:</span>{" "}
            <span className="text-ivory-200 font-medium">
              {formatCurrency(scenario.estimatedCost.min)}–
              {formatCurrency(scenario.estimatedCost.max)}
            </span>
          </div>
          <div>
            <span className="text-ivory-500">Value:</span>{" "}
            <span className="text-ivory-200 font-medium">
              {formatCurrency(scenario.estimatedValue.min)}–
              {formatCurrency(scenario.estimatedValue.max)}
            </span>
          </div>
        </div>
        <div className="pt-2 border-t border-graphite-700">
          <p className="text-[11px] text-copper-300/80 italic">{scenario.recommendation}</p>
        </div>
      </CardContent>
    </Card>
  );
}
