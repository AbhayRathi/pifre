"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Scenario } from "@/lib/schemas/scenario";
import { formatCurrency } from "@/lib/utils";

interface ScenarioComparisonProps {
  scenarios: Scenario[];
  activeScenarioId: string;
}

export function ScenarioComparison({ scenarios, activeScenarioId }: ScenarioComparisonProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-ivory-300">Scenario Comparison</h3>
      <div className="rounded-lg border border-graphite-700/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[160px]">Scenario</TableHead>
              <TableHead>Units</TableHead>
              <TableHead>Cost Range</TableHead>
              <TableHead>Value Range</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Risk</TableHead>
              <TableHead>Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scenarios.map((s) => {
              const isActive = s.id === activeScenarioId;
              return (
                <TableRow
                  key={s.id}
                  className={isActive ? "bg-copper-600/5 border-l-2 border-l-copper-500" : ""}
                >
                  <TableCell className="font-medium text-ivory-200">
                    {s.name}
                    {isActive && <span className="ml-2 text-copper-400 text-[10px]">▶</span>}
                  </TableCell>
                  <TableCell>{s.estimatedUnits.min}–{s.estimatedUnits.max}</TableCell>
                  <TableCell className="text-xs">
                    {formatCurrency(s.estimatedCost.min)} – {formatCurrency(s.estimatedCost.max)}
                  </TableCell>
                  <TableCell className="text-xs">
                    {formatCurrency(s.estimatedValue.min)} – {formatCurrency(s.estimatedValue.max)}
                  </TableCell>
                  <TableCell>{s.timeline}</TableCell>
                  <TableCell>
                    <Badge variant={s.riskLevel === "low" ? "risk_low" : s.riskLevel === "medium" ? "risk_medium" : "risk_high"}>
                      {s.riskLevel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={s.confidence === "high" ? "real" : s.confidence === "medium" ? "partial" : "fallback"}>
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
