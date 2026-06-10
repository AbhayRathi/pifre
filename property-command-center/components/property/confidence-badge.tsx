"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { DataQuality } from "@/lib/schemas/property";
import { Confidence } from "@/lib/schemas/source";

interface ConfidenceBadgeProps {
  type: "data_quality" | "confidence" | "status";
  value: DataQuality | Confidence | string;
}

export function ConfidenceBadge({ type, value }: ConfidenceBadgeProps) {
  if (type === "data_quality") {
    switch (value) {
      case "real":
        return <Badge variant="real">Real</Badge>;
      case "partial":
        return <Badge variant="partial">Partial</Badge>;
      case "fallback":
        return <Badge variant="fallback">Fallback</Badge>;
    }
  }

  if (type === "confidence") {
    switch (value) {
      case "high":
        return <Badge variant="real">High Confidence</Badge>;
      case "medium":
        return <Badge variant="partial">Medium Confidence</Badge>;
      case "low":
        return <Badge variant="fallback">Low Confidence</Badge>;
    }
  }

  // Status badges
  switch (value) {
    case "verified":
      return <Badge variant="verified">Verified</Badge>;
    case "needs_review":
      return <Badge variant="needs_review">Needs Review</Badge>;
    case "assumption":
      return <Badge variant="assumption">Assumption</Badge>;
    default:
      return <Badge variant="default">{value}</Badge>;
  }
}
