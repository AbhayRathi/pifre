"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface AssumptionsPanelProps {
  assumptions: Record<string, number | string>;
  onUpdate?: (key: string, value: number | string) => void;
}

const assumptionLabels: Record<
  string,
  { label: string; type: "currency" | "number" | "percentage" | "text" }
> = {
  acquisitionPrice: { label: "Acquisition Price", type: "currency" },
  lotSize: { label: "Lot Size (sf)", type: "number" },
  buildingSize: { label: "Building Size (sf)", type: "number" },
  targetUnits: { label: "Target Unit Count", type: "number" },
  hardCostPerSqFt: { label: "Hard Cost / SF", type: "currency" },
  softCostPercentage: { label: "Soft Cost %", type: "percentage" },
  contingencyPercentage: { label: "Contingency %", type: "percentage" },
  targetRent: { label: "Target Monthly Rent", type: "currency" },
  targetSaleValue: { label: "Target Sale Value / Unit", type: "currency" },
  financingNotes: { label: "Financing Notes", type: "text" },
};

export function AssumptionsPanel({ assumptions, onUpdate }: AssumptionsPanelProps) {
  const [editMode, setEditMode] = useState(false);

  // Use assumptions prop directly as source of truth - parent controls state
  const localValues = assumptions;

  const handleChange = (key: string, value: string) => {
    const numericFields = [
      "acquisitionPrice",
      "lotSize",
      "buildingSize",
      "targetUnits",
      "hardCostPerSqFt",
      "softCostPercentage",
      "contingencyPercentage",
      "targetRent",
      "targetSaleValue",
    ];
    const newValue = numericFields.includes(key) ? Number(value) || 0 : value;
    onUpdate?.(key, newValue);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Key Assumptions</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setEditMode(!editMode)}
            className="text-xs"
          >
            {editMode ? "Done" : "Edit"}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {Object.entries(localValues).map(([key, value]) => {
          const config = assumptionLabels[key] || { label: key, type: "text" };
          return (
            <div key={key} className="flex items-center justify-between gap-2">
              <label className="text-[11px] text-ivory-400 shrink-0">{config.label}</label>
              {editMode ? (
                <Input
                  className="h-7 text-xs w-32 text-right"
                  value={String(value)}
                  onChange={(e) => handleChange(key, e.target.value)}
                />
              ) : (
                <span className="text-xs text-ivory-200 font-medium">
                  {config.type === "currency"
                    ? formatCurrency(Number(value))
                    : config.type === "percentage"
                      ? `${value}%`
                      : typeof value === "number"
                        ? value.toLocaleString()
                        : value}
                </span>
              )}
            </div>
          );
        })}
        <p className="text-[9px] text-ivory-600 pt-2 border-t border-graphite-700 italic">
          All assumptions require independent verification. Edit values to explore sensitivity.
        </p>
      </CardContent>
    </Card>
  );
}
