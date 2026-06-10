"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SourceRecord } from "@/lib/schemas/source";

interface SourceListProps {
  sources: SourceRecord[];
}

export function SourceList({ sources }: SourceListProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-ivory-300">Data Sources ({sources.length})</h3>
      <div className="grid gap-2">
        {sources.map((source) => (
          <Card key={source.id} className="border-graphite-700/30">
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-ivory-200">{source.sourceName}</span>
                    <Badge
                      variant={
                        source.confidence === "high" ? "real" : source.confidence === "medium" ? "partial" : "fallback"
                      }
                    >
                      {source.confidence}
                    </Badge>
                    <Badge variant="default">{source.sourceType}</Badge>
                  </div>
                  <p className="text-[11px] text-ivory-400">{source.title}</p>
                  {source.notes && (
                    <p className="text-[10px] text-ivory-500 italic">{source.notes}</p>
                  )}
                </div>
                {source.url && (
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-copper-400 hover:text-copper-300 shrink-0"
                  >
                    View →
                  </a>
                )}
              </div>
              <p className="text-[9px] text-ivory-600 mt-1">
                Retrieved: {new Date(source.retrievedAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
