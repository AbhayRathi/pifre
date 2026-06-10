"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MockProperty } from "@/lib/data/mock-properties";
import { formatCurrency } from "@/lib/utils";

interface PropertyCardProps {
  property: MockProperty;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const { property: prop, scenarios } = property;
  const dataVariant =
    prop.dataQuality === "real" ? "real" : prop.dataQuality === "partial" ? "partial" : "fallback";

  return (
    <Link href={`/properties/${prop.id}`}>
      <Card
        data-testid="property-card"
        className="hover:border-copper-600/50 hover:shadow-copper-600/5 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base group-hover:text-copper-300 transition-colors">
                {prop.address}
              </CardTitle>
              <p className="text-sm text-ivory-400 mt-1">
                {prop.city}, {prop.state}
              </p>
            </div>
            <Badge variant={dataVariant}>
              {prop.dataQuality === "real"
                ? "Real Data"
                : prop.dataQuality === "partial"
                  ? "Partial"
                  : "Demo"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-ivory-500">Use:</span>{" "}
                <span className="text-ivory-200">{prop.currentUse || "Unknown"}</span>
              </div>
              <div>
                <span className="text-ivory-500">Zoning:</span>{" "}
                <span className="text-ivory-200">{prop.zoning || "TBD"}</span>
              </div>
              <div>
                <span className="text-ivory-500">Lot:</span>{" "}
                <span className="text-ivory-200">
                  {prop.lotSizeSqFt?.toLocaleString() || "—"} sf
                </span>
              </div>
              <div>
                <span className="text-ivory-500">Built:</span>{" "}
                <span className="text-ivory-200">{prop.yearBuilt || "N/A"}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-graphite-700">
              <p className="text-xs text-ivory-500 mb-1">{scenarios.length} scenarios analyzed</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-ivory-400">Top scenario:</span>
                <span className="text-xs text-copper-300 font-medium">{scenarios[0]?.name}</span>
              </div>
              {scenarios[0] && (
                <p className="text-xs text-ivory-500 mt-1">
                  Value range: {formatCurrency(scenarios[0].estimatedValue.min)} –{" "}
                  {formatCurrency(scenarios[0].estimatedValue.max)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
