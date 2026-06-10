"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-graphite-900">
      <header className="sticky top-0 z-50 border-b border-graphite-700/50 bg-graphite-900/95 backdrop-blur-md">
        <div className="max-w-[1800px] mx-auto flex items-center justify-between h-16 px-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-copper-500 to-copper-700 flex items-center justify-center shadow-lg shadow-copper-600/20">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-white">
                <path d="M2 14V6L8 2L14 6V14H10V10H6V14H2Z" fill="currentColor" />
              </svg>
            </div>
            <div>
              <h1 className="text-sm font-semibold text-ivory-100 group-hover:text-copper-300 transition-colors">
                Property Command Center
              </h1>
              <p className="text-[10px] text-ivory-500 -mt-0.5">Development Intelligence</p>
            </div>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-ivory-400 hover:text-ivory-100 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-sm text-ivory-600">|</span>
            <span className="text-sm text-ivory-500">v1.0-alpha</span>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
