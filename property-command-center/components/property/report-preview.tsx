"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Report } from "@/lib/schemas/report";

interface ReportPreviewProps {
  report: Report;
}

export function ReportPreview({ report }: ReportPreviewProps) {
  const handleExport = () => {
    // Mock export - in production would generate PDF
    const content = report.sections.map((s) => `## ${s.title}\n\n${s.content}`).join("\n\n---\n\n");

    const blob = new Blob(
      [
        `# ${report.title}\n\nGenerated: ${new Date(report.generatedAt).toLocaleDateString()}\n\n---\n\n${content}`,
      ],
      { type: "text/markdown" }
    );
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `property-brief-${report.propertyId}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-ivory-300">Full Property Opportunity Brief</h3>
        <Button variant="default" size="sm" onClick={handleExport}>
          Export Report
        </Button>
      </div>

      <Card className="bg-ivory-50/[0.02] border-ivory-200/10">
        <CardContent className="p-8 space-y-6">
          {/* Report header */}
          <div className="text-center border-b border-graphite-700/50 pb-6">
            <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-gradient-to-br from-copper-500 to-copper-700 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M2 14V6L8 2L14 6V14H10V10H6V14H2Z" fill="currentColor" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-ivory-100">{report.title}</h2>
            <p className="text-xs text-ivory-500 mt-1">
              Generated {new Date(report.generatedAt).toLocaleDateString()} • Property Command
              Center
            </p>
          </div>

          {/* Report sections */}
          {report.sections.map((section) => (
            <div key={section.id} className="space-y-2">
              <h4 className="text-sm font-semibold text-copper-300 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-copper-600/20 text-copper-400 flex items-center justify-center text-[10px]">
                  {section.order}
                </span>
                {section.title}
              </h4>
              <div className="text-xs text-ivory-300 leading-relaxed whitespace-pre-line pl-7">
                {section.content}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
