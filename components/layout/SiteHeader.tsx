"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
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

const navLinkClassName =
  "rounded-md px-3 py-2 text-sm font-medium text-slate-700 underline-offset-2 hover:bg-slate-100 hover:text-navy-800 hover:underline transition-colors";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [statesOpen, setStatesOpen] = useState(false);
  const states = getStates();
  const statesMenuId = useId();
  const statesDropdownRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const closeStatesMenu = useCallback(() => {
    setStatesOpen(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (statesOpen) {
          closeStatesMenu();
          document.getElementById(`${statesMenuId}-button`)?.focus();
        }
        if (mobileOpen) {
          closeMobileMenu();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [statesOpen, mobileOpen, closeMobileMenu, closeStatesMenu, statesMenuId]);

  useEffect(() => {
    if (!statesOpen) return;

    function handlePointerDown(event: MouseEvent) {
      if (
        statesDropdownRef.current &&
        !statesDropdownRef.current.contains(event.target as Node)
      ) {
        closeStatesMenu();
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [statesOpen, closeStatesMenu]);

  useEffect(() => {
    if (!mobileOpen) return;

    const firstLink = mobileNavRef.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 rounded-md">
          <span className="text-lg font-bold text-navy-900">{SITE_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {headerLinks.map((link) => (
            <Link key={link.href} href={link.href} className={navLinkClassName}>
              {link.label}
            </Link>
          ))}

          <div className="relative" ref={statesDropdownRef}>
            <button
              type="button"
              id={`${statesMenuId}-button`}
              className={`flex items-center gap-1 ${navLinkClassName}`}
              onClick={() => setStatesOpen((open) => !open)}
              aria-expanded={statesOpen}
              aria-controls={statesMenuId}
            >
              State Guides
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </button>
            {statesOpen && (
              <nav
                id={statesMenuId}
                aria-labelledby={`${statesMenuId}-button`}
                className="absolute right-0 top-full mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
              >
                <ul className="list-none">
                  <li>
                    <Link
                      href="/states/"
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:underline"
                      onClick={closeStatesMenu}
                    >
                      All States
                    </Link>
                  </li>
                  {states.map((state) => (
                    <li key={state.slug}>
                      <Link
                        href={`/states/${state.slug}/`}
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:underline"
                        onClick={closeStatesMenu}
                      >
                        {state.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
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
          ref={menuButtonRef}
          type="button"
          className="rounded-md p-2 text-slate-700 lg:hidden"
          onClick={() => (mobileOpen ? closeMobileMenu() : setMobileOpen(true))}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <nav
          ref={mobileNavRef}
          id="mobile-navigation"
          className="border-t border-slate-200 bg-white px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:underline"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
              State Guides
            </p>
            <Link
              href="/states/"
              className="rounded-md px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:underline"
              onClick={closeMobileMenu}
            >
              All States
            </Link>
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}/`}
                className="rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-100 hover:underline"
                onClick={closeMobileMenu}
              >
                {state.name}
              </Link>
            ))}
            {SHOW_INSURANCE_DIRECTORY_NAV && (
              <Link
                href="/insurance-agencies/"
                className="mt-2 rounded-md bg-navy-800 px-3 py-2.5 text-center text-sm font-medium text-white"
                onClick={closeMobileMenu}
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
