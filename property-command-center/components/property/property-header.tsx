import React from "react";
import { Badge } from "@/components/ui/badge";
import { PropertyRecord } from "@/lib/schemas/property";

interface PropertyHeaderProps {
  property: PropertyRecord;
}

export function PropertyHeader({ property }: PropertyHeaderProps) {
  const dataVariant =
    property.dataQuality === "real"
      ? "real"
      : property.dataQuality === "partial"
        ? "partial"
        : "fallback";

  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-ivory-100">{property.address}</h1>
          <p className="text-ivory-400 mt-1">
            {property.city}, {property.county && `${property.county} County, `}
            {property.state}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={dataVariant}>
            {property.dataQuality === "real"
              ? "Real Data"
              : property.dataQuality === "partial"
                ? "Partial Data"
                : "Fallback Data"}
          </Badge>
          <Badge variant="default">{property.sourceRecords.length} sources</Badge>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <InfoItem label="Parcel" value={property.parcelNumber || "Pending"} />
        <InfoItem
          label="Lot Size"
          value={property.lotSizeSqFt ? `${property.lotSizeSqFt.toLocaleString()} sf` : "TBD"}
        />
        <InfoItem
          label="Building"
          value={
            property.buildingSizeSqFt ? `${property.buildingSizeSqFt.toLocaleString()} sf` : "N/A"
          }
        />
        <InfoItem label="Current Use" value={property.currentUse || "Unknown"} />
        <InfoItem label="Zoning" value={property.zoning || "Pending"} />
        <InfoItem label="Year Built" value={property.yearBuilt?.toString() || "N/A"} />
      </div>
    </div>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-0.5">
      <p className="text-[10px] uppercase tracking-wider text-ivory-500">{label}</p>
      <p className="text-sm text-ivory-200 font-medium">{value}</p>
    </div>
  );
}
