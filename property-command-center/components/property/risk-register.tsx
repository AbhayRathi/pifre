"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
const likelihoodOrder = { very_likely: 0, likely: 1, possible: 2, unlikely: 3 };

function RiskMatrix({ risks }: { risks: Risk[] }) {
  const severities = ["low", "medium", "high", "critical"] as const;
  const likelihoods = ["unlikely", "possible", "likely", "very_likely"] as const;

  return (
    <svg viewBox="0 0 120 120" className="w-24 h-24" aria-label="Risk matrix">
      {/* Grid */}
      {severities.map((_, si) =>
        likelihoods.map((_, li) => (
          <rect
            key={`${si}-${li}`}
            x={si * 30}
            y={(3 - li) * 30}
            width="30"
            height="30"
            fill={si + li >= 4 ? "#ef444420" : si + li >= 2 ? "#eab30820" : "#22c55e20"}
            stroke="#333"
            strokeWidth="0.5"
          />
        ))
      )}
      {/* Risk dots */}
      {risks.map((risk, i) => {
        const sx = severityOrder[risk.severity];
        const ly = likelihoodOrder[risk.likelihood];
        return (
          <circle
            key={risk.id}
            cx={(3 - sx) * 30 + 15 + ((i % 3) - 1) * 5}
            cy={ly * 30 + 15}
            r="4"
            fill={
              risk.severity === "critical"
                ? "#ef4444"
                : risk.severity === "high"
                  ? "#f97316"
                  : risk.severity === "medium"
                    ? "#eab308"
                    : "#22c55e"
            }
            opacity="0.9"
          />
        );
      })}
      {/* Labels */}
      <text x="60" y="118" textAnchor="middle" fontSize="6" fill="#888">
        Severity →
      </text>
      <text
        x="2"
        y="60"
        textAnchor="middle"
        fontSize="6"
        fill="#888"
        transform="rotate(-90, 6, 60)"
      >
        Likelihood →
      </text>
    </svg>
  );
}

export function RiskRegister({ risks }: RiskRegisterProps) {
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterSeverity, setFilterSeverity] = useState<string>("all");
  const [filterLikelihood, setFilterLikelihood] = useState<string>("all");

  const categories = Array.from(new Set(risks.map((r) => r.category)));

  const filtered = risks.filter((r) => {
    if (filterCategory !== "all" && r.category !== filterCategory) return false;
    if (filterSeverity !== "all" && r.severity !== filterSeverity) return false;
    if (filterLikelihood !== "all" && r.likelihood !== filterLikelihood) return false;
    return true;
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ivory-300">Risk Register</h3>
        <RiskMatrix risks={risks} />
      </div>

      {/* Filter bar */}
      <div className="flex gap-2 flex-wrap">
        <select
          className="text-[10px] bg-graphite-800 border border-graphite-700 rounded px-2 py-1 text-ivory-300"
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          aria-label="Filter by category"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {categoryLabels[c] || c}
            </option>
          ))}
        </select>
        <select
          className="text-[10px] bg-graphite-800 border border-graphite-700 rounded px-2 py-1 text-ivory-300"
          value={filterSeverity}
          onChange={(e) => setFilterSeverity(e.target.value)}
          aria-label="Filter by severity"
        >
          <option value="all">All Severity</option>
          <option value="critical">Critical</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <select
          className="text-[10px] bg-graphite-800 border border-graphite-700 rounded px-2 py-1 text-ivory-300"
          value={filterLikelihood}
          onChange={(e) => setFilterLikelihood(e.target.value)}
          aria-label="Filter by likelihood"
        >
          <option value="all">All Likelihood</option>
          <option value="very_likely">Very Likely</option>
          <option value="likely">Likely</option>
          <option value="possible">Possible</option>
          <option value="unlikely">Unlikely</option>
        </select>
      </div>

      <div className="grid gap-2">
        {filtered.map((risk) => (
          <Card
            key={risk.id}
            data-testid="risk-item"
            className="border-l-2"
            style={{
              borderLeftColor:
                risk.severity === "critical"
                  ? "#ef4444"
                  : risk.severity === "high"
                    ? "#f97316"
                    : risk.severity === "medium"
                      ? "#eab308"
                      : "#22c55e",
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-ivory-300">
                      {categoryLabels[risk.category] || risk.category}
                    </span>
                    <Badge
                      variant={
                        risk.severity === "critical"
                          ? "risk_critical"
                          : risk.severity === "high"
                            ? "risk_high"
                            : risk.severity === "medium"
                              ? "risk_medium"
                              : "risk_low"
                      }
                    >
                      {risk.severity}
                    </Badge>
                    <Badge variant="default">{risk.likelihood}</Badge>
                  </div>
                  <p className="text-xs text-ivory-300 leading-relaxed">{risk.summary}</p>
                  <div className="pt-1.5 space-y-1">
                    <p className="text-[10px] text-ivory-500">
                      <span className="text-ivory-400 font-medium">Mitigation:</span>{" "}
                      {risk.mitigation}
                    </p>
                    <p className="text-[10px] text-ivory-500">
                      <span className="text-ivory-400 font-medium">Verify with:</span>{" "}
                      {risk.verifiedBy}
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
