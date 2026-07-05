import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Scenario } from "@/lib/schemas/scenario";
import { formatCurrency } from "@/lib/utils";

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  activeScenarioId: string;
}

function getFeasibility(scenario: Scenario): "high" | "medium" | "low" {
  if (scenario.riskLevel === "low") return "high";
  if (scenario.riskLevel === "medium") return "medium";
  return "low";
}

export function ScenarioComparison({ scenarios, activeScenarioId }: ScenarioComparisonProps) {
  const maxCost = Math.max(...scenarios.map((s) => s.estimatedCost.max));

  const sorted = [...scenarios].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[getFeasibility(a)] - order[getFeasibility(b)];
  });

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-ivory-300">Scenario Comparison</h3>
      <div className="rounded-lg border border-graphite-700/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[140px]">Scenario</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Cost Range</TableHead>
              <TableHead>Value Range</TableHead>
              <TableHead>ROI</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Feasibility</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((s) => {
              const isActive = s.id === activeScenarioId;
              const roi = (
                ((s.estimatedValue.max - s.estimatedCost.min) / s.estimatedCost.min) *
                100
              ).toFixed(1);
              const feasibility = getFeasibility(s);
              const costBarWidth = maxCost > 0 ? (s.estimatedCost.max / maxCost) * 100 : 0;

              return (
                <TableRow
                  key={s.id}
                  className={isActive ? "bg-copper-600/5 border-l-2 border-l-copper-500" : ""}
                >
                  <TableCell className="font-medium text-ivory-200">
                    {s.name}
                    {isActive && <span className="ml-2 text-copper-400 text-[10px]">▶</span>}
                  </TableCell>
                  <TableCell>
                    {s.estimatedUnits.min}–{s.estimatedUnits.max}
                  </TableCell>
                  <TableCell className="text-xs">
                    <div>
                      {formatCurrency(s.estimatedCost.min)} – {formatCurrency(s.estimatedCost.max)}
                    </div>
                    <div
                      className="mt-1 h-1.5 rounded-full bg-copper-600/30"
                      style={{ width: `${costBarWidth}%` }}
                    />
                  </TableCell>
                  <TableCell className="text-xs">
                    {formatCurrency(s.estimatedValue.min)} – {formatCurrency(s.estimatedValue.max)}
                  </TableCell>
                  <TableCell className="text-xs font-medium text-copper-300">{roi}%</TableCell>
                  <TableCell className="text-xs">{s.timeline}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        feasibility === "high"
                          ? "risk_low"
                          : feasibility === "medium"
                            ? "risk_medium"
                            : "risk_high"
                      }
                    >
                      {feasibility}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        s.confidence === "high"
                          ? "real"
                          : s.confidence === "medium"
                            ? "partial"
                            : "fallback"
                      }
                    >
                      {s.confidence}
                    </Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
