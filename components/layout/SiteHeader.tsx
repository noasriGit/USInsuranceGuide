"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { SITE_NAME, SHOW_INSURANCE_DIRECTORY_NAV } from "@/lib/constants";
import { getStates } from "@/lib/content/data";

const headerLinks = [
  { label: "Auto", href: "/auto-insurance/" },
  { label: "Home", href: "/home-insurance/" },
  { label: "Renters", href: "/renters-insurance/" },
  { label: "Business", href: "/business-insurance/" },
  { label: "Life", href: "/life-insurance/" },
  { label: "Blog", href: "/blog/" },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);
  const states = getStates();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold text-navy-900">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {headerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-navy-800 transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              type="button"
              className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-navy-800 transition-colors"
              onClick={() => setStatesOpen(!statesOpen)}
              aria-expanded={statesOpen}
            >
              State Guides
              <ChevronDown className="h-4 w-4" />
            </button>
            {statesOpen && (
              <div className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                <Link
                  href="/states/"
                  className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                  onClick={() => setStatesOpen(false)}
                >
                  All States
                </Link>
                {states.map((state) => (
                  <Link
                    key={state.slug}
                    href={`/states/${state.slug}/`}
                    className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    onClick={() => setStatesOpen(false)}
                  >
                    {state.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {SHOW_INSURANCE_DIRECTORY_NAV && (
            <Link
              href="/insurance-agencies/"
              className="ml-2 rounded-md bg-navy-800 px-4 py-2 text-sm font-medium text-white hover:bg-navy-900 transition-colors"
            >
              Find an Insurance Professional
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-slate-700 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden" aria-label="Mobile navigation">
          <div className="flex flex-col gap-1">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
              State Guides
            </p>
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}/`}
                className="rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => setMobileOpen(false)}
              >
                {state.name}
              </Link>
            ))}
            {SHOW_INSURANCE_DIRECTORY_NAV && (
              <Link
                href="/insurance-agencies/"
                className="mt-2 rounded-md bg-navy-800 px-3 py-2.5 text-center text-sm font-medium text-white"
                onClick={() => setMobileOpen(false)}
              >
                Find an Insurance Professional
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
