"use client";

import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PropertyRecord } from "@/lib/schemas/property";

interface PropertyCardProps {
  property: PropertyRecord;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const dataVariant =
    property.dataQuality === "high"
      ? "real"
      : property.dataQuality === "medium"
        ? "partial"
        : "fallback";

  return (
    <Link href={`/properties/${property.id}`}>
      <Card
        data-testid="property-card"
        className="hover:border-copper-600/50 hover:shadow-copper-600/5 hover:shadow-xl transition-all duration-300 cursor-pointer group"
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-base group-hover:text-copper-300 transition-colors">
                {property.address}
              </CardTitle>
              <p className="text-sm text-ivory-400 mt-1">
                {property.city}, {property.state}
              </p>
            </div>
            <Badge variant={dataVariant}>
              {property.dataQuality === "high"
                ? "Real Data"
                : property.dataQuality === "medium"
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
                <span className="text-ivory-200">{property.currentUse || "Unknown"}</span>
              </div>
              <div>
                <span className="text-ivory-500">Zoning:</span>{" "}
                <span className="text-ivory-200">{property.zoning || "TBD"}</span>
              </div>
              <div>
                <span className="text-ivory-500">Lot:</span>{" "}
                <span className="text-ivory-200">
                  {property.lotSizeSqFt?.toLocaleString() || "—"} sf
                </span>
              </div>
              <div>
                <span className="text-ivory-500">Built:</span>{" "}
                <span className="text-ivory-200">{property.yearBuilt || "N/A"}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-graphite-700">
              <p className="text-xs text-ivory-500">
                {property.sourceRecords.length} data source
                {property.sourceRecords.length !== 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
