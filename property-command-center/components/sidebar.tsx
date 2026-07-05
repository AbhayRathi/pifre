"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: "overview", label: "Overview", icon: "◈" },
  { id: "site", label: "Site / Map", icon: "◻" },
  { id: "scenarios", label: "Scenarios", icon: "◆" },
  { id: "assumptions", label: "Assumptions", icon: "◇" },
  { id: "risks", label: "Risks", icon: "⚠" },
  { id: "report", label: "Report", icon: "◎" },
  { id: "sources", label: "Sources", icon: "◉" },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  return (
    <aside className="w-56 border-r border-graphite-700/50 bg-graphite-800/30 p-4 flex flex-col gap-1">
      <p className="text-[10px] uppercase tracking-wider text-ivory-500 font-medium px-3 mb-2">
        Workspace
      </p>
      <nav role="tablist" aria-label="Workspace sections">
        {sections.map((section) => (
          <button
            key={section.id}
            role="tab"
            aria-selected={activeSection === section.id}
            aria-current={activeSection === section.id ? "page" : undefined}
            aria-label={section.label}
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 w-full text-left",
              activeSection === section.id
                ? "bg-copper-600/15 text-copper-300 border border-copper-600/30"
                : "text-ivory-400 hover:text-ivory-200 hover:bg-graphite-700/50"
            )}
          >
            <span className="text-base">{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
