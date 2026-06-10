"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Risk } from "@/lib/schemas/risk";

interface RiskRegisterProps {
  risks: Risk[];
}

const categoryLabels: Record<string, string> = {
  zoning: "Zoning",
  permitting: "Permitting",
  construction: "Construction",
  financing: "Financing",
  market: "Market",
  environmental: "Environmental / Site",
  data_confidence: "Data Confidence",
  community_political: "Community / Political",
  legal_professional: "Legal / Professional",
};

export function RiskRegister({ risks }: RiskRegisterProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-ivory-300">Risk Register</h3>
      <div className="grid gap-2">
        {risks.map((risk) => (
          <Card key={risk.id} className="border-l-2" style={{
            borderLeftColor: risk.severity === "critical" ? "#ef4444" : risk.severity === "high" ? "#f97316" : risk.severity === "medium" ? "#eab308" : "#22c55e"
          }}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-ivory-300">
                      {categoryLabels[risk.category] || risk.category}
                    </span>
                    <Badge variant={risk.severity === "critical" ? "risk_critical" : risk.severity === "high" ? "risk_high" : risk.severity === "medium" ? "risk_medium" : "risk_low"}>
                      {risk.severity}
                    </Badge>
                    <Badge variant="default">{risk.likelihood}</Badge>
                  </div>
                  <p className="text-xs text-ivory-300 leading-relaxed">{risk.summary}</p>
                  <div className="pt-1.5 space-y-1">
                    <p className="text-[10px] text-ivory-500">
                      <span className="text-ivory-400 font-medium">Mitigation:</span> {risk.mitigation}
                    </p>
                    <p className="text-[10px] text-ivory-500">
                      <span className="text-ivory-400 font-medium">Verify with:</span> {risk.verifiedBy}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
