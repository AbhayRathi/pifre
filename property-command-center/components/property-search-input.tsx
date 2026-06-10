"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PropertySearchInputProps {
  propertyIds: { id: string; address: string; city: string }[];
}

export function PropertySearchInput({ propertyIds }: PropertySearchInputProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    const match = propertyIds.find(
      (p) =>
        p.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (match) {
      router.push(`/properties/${match.id}`);
    } else {
      router.push(`/properties/${propertyIds[0]?.id}`);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div className="flex gap-2">
        <Input
          className="h-12 text-base"
          placeholder="Enter an address or parcel (e.g., 4217 MLK Jr Way, Oakland)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <Button size="lg" onClick={handleSearch}>
          Analyze Property
        </Button>
      </div>
      <p className="text-[11px] text-ivory-600 mt-2">
        Try: Oakland, San Jose, or San Francisco addresses
      </p>
    </div>
  );
}
