import React from "react";

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-graphite-700/50 bg-graphite-800/30 p-5 animate-pulse">
      <div className="space-y-3">
        <div className="h-4 w-3/4 bg-graphite-700/50 rounded" />
        <div className="h-3 w-1/2 bg-graphite-700/30 rounded" />
        <div className="h-3 w-2/3 bg-graphite-700/30 rounded" />
        <div className="flex gap-2 mt-4">
          <div className="h-5 w-16 bg-graphite-700/40 rounded-full" />
          <div className="h-5 w-16 bg-graphite-700/40 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonTable() {
  return (
    <div className="rounded-lg border border-graphite-700/50 overflow-hidden animate-pulse">
      <div className="h-10 bg-graphite-700/30" />
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="h-12 border-t border-graphite-700/30 flex items-center gap-4 px-4">
          <div className="h-3 w-24 bg-graphite-700/40 rounded" />
          <div className="h-3 w-16 bg-graphite-700/30 rounded" />
          <div className="h-3 w-20 bg-graphite-700/30 rounded" />
        </div>
      ))}
    </div>
  );
}

export function SkeletonRiskItem() {
  return (
    <div className="rounded-xl border border-graphite-700/50 border-l-2 border-l-graphite-600 bg-graphite-800/30 p-4 animate-pulse">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-3 w-16 bg-graphite-700/40 rounded" />
        <div className="h-4 w-12 bg-graphite-700/50 rounded-full" />
      </div>
      <div className="h-3 w-full bg-graphite-700/30 rounded mb-1" />
      <div className="h-3 w-3/4 bg-graphite-700/30 rounded" />
    </div>
  );
}
