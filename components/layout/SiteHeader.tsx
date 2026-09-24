"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  SHOW_INSURANCE_DIRECTORY_NAV,
  LEAD_PATH,
  PUBLIC_CASE_STUDIES_PATH,
  BRAND_WORDMARK_PATH,
} from "@/lib/constants";
import { getStates } from "@/lib/content/data";
import { cn } from "@/lib/utils";

const headerLinks = [
  { label: "Auto", href: "/auto-insurance/" },
  { label: "Home", href: "/home-insurance/" },
  { label: "Renters", href: "/renters-insurance/" },
  { label: "Business", href: "/business-insurance/" },
];

const resourceLinks = [
  { label: "Guides", href: "/blog/" },
  { label: "Public Case Studies", href: PUBLIC_CASE_STUDIES_PATH },
  { label: "About", href: "/about/" },
  { label: "Editorial Policy", href: "/editorial-policy/" },
];

const navLinkClassName =
  "px-3 py-2 text-sm font-medium text-slate-700 underline-offset-4 transition-colors hover:text-navy-800 hover:underline";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<"states" | "resources" | null>(null);
  const states = getStates();
  const statesMenuId = useId();
  const resourcesMenuId = useId();
  const navRef = useRef<HTMLDivElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  const closeMenus = useCallback(() => {
    setOpenMenu(null);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      if (openMenu) {
        closeMenus();
        document.getElementById(`${openMenu === "states" ? statesMenuId : resourcesMenuId}-button`)?.focus();
      }
      if (mobileOpen) closeMobileMenu();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [openMenu, mobileOpen, closeMenus, closeMobileMenu, statesMenuId, resourcesMenuId]);

  useEffect(() => {
    if (!openMenu) return;
    function handlePointerDown(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeMenus();
      }
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [openMenu, closeMenus]);

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
    <header className="sticky top-0 z-50 border-b border-line/80 bg-white/85 backdrop-blur-md supports-[backdrop-filter]:bg-white/75">
      <div className="mx-auto flex h-[4.25rem] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mr-2 flex shrink-0 items-center rounded-sm focus-visible:outline-offset-4 sm:mr-3"
        >
          <Image
            src={BRAND_WORDMARK_PATH}
            alt="US Insurance Guide"
            width={2172}
            height={724}
            priority
            className="h-9 w-auto max-w-[9.75rem] sm:h-10 sm:max-w-[12rem]"
          />
        </Link>

        <div className="hidden items-center gap-1 lg:flex" ref={navRef}>
          <nav className="flex items-center" aria-label="Main navigation">
            {headerLinks.map((link) => (
              <Link key={link.href} href={link.href} className={navLinkClassName}>
                {link.label}
              </Link>
            ))}

            <div className="relative">
              <button
                type="button"
                id={`${statesMenuId}-button`}
                className={cn("flex items-center gap-1", navLinkClassName)}
                onClick={() => setOpenMenu((current) => (current === "states" ? null : "states"))}
                aria-expanded={openMenu === "states"}
                aria-controls={statesMenuId}
              >
                States
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              {openMenu === "states" && (
                <nav
                  id={statesMenuId}
                  aria-labelledby={`${statesMenuId}-button`}
                  className="surface-card absolute left-0 top-full z-20 mt-2 w-56 py-2"
                >
                  <ul className="list-none">
                    <li>
                      <Link
                        href="/states/"
                        className="block px-4 py-2 text-sm text-slate-700 hover:bg-navy-50"
                        onClick={closeMenus}
                      >
                        All DMV Guides
                      </Link>
                    </li>
                    {states.map((state) => (
                      <li key={state.slug}>
                        <Link
                          href={`/states/${state.slug}/`}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-navy-50"
                          onClick={closeMenus}
                        >
                          {state.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            <div className="relative">
              <button
                type="button"
                id={`${resourcesMenuId}-button`}
                className={cn("flex items-center gap-1", navLinkClassName)}
                onClick={() =>
                  setOpenMenu((current) => (current === "resources" ? null : "resources"))
                }
                aria-expanded={openMenu === "resources"}
                aria-controls={resourcesMenuId}
              >
                Resources
                <ChevronDown className="h-4 w-4" aria-hidden="true" />
              </button>
              {openMenu === "resources" && (
                <nav
                  id={resourcesMenuId}
                  aria-labelledby={`${resourcesMenuId}-button`}
                  className="surface-card absolute right-0 top-full z-20 mt-2 w-56 py-2"
                >
                  <ul className="list-none">
                    {resourceLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-navy-50"
                          onClick={closeMenus}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
          </nav>

          <Link
            href={LEAD_PATH}
            className="btn btn-primary ml-3 min-h-10 px-4 text-sm"
            data-lead-cta="header"
          >
            Get Matched With Insurance Help
          </Link>
          {SHOW_INSURANCE_DIRECTORY_NAV && (
            <Link
              href="/insurance-agencies/"
              className="ml-2 px-3 py-2 text-sm font-medium text-navy-800 underline-offset-4 hover:underline"
            >
              Directory
            </Link>
          )}
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="min-h-11 min-w-11 p-2 text-slate-700 lg:hidden"
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
          className="border-t border-line bg-white px-4 py-4 lg:hidden"
          aria-label="Mobile navigation"
        >
          <div className="flex flex-col gap-1">
            {headerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-11 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-paper-blue hover:underline"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              States
            </p>
            <Link
              href="/states/"
              className="min-h-11 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-paper-blue hover:underline"
              onClick={closeMobileMenu}
            >
              All DMV Guides
            </Link>
            {states.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}/`}
                className="min-h-11 px-3 py-2.5 text-sm text-slate-700 hover:bg-paper-blue hover:underline"
                onClick={closeMobileMenu}
              >
                {state.name}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Resources
            </p>
            {resourceLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-11 px-3 py-2.5 text-sm text-slate-700 hover:bg-paper-blue hover:underline"
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={LEAD_PATH}
              className="btn btn-primary mt-4"
              data-lead-cta="header-mobile"
              onClick={closeMobileMenu}
            >
              Get Matched With Insurance Help
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
