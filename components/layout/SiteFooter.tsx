import Link from "next/link";
import { SITE_NAME, PUBLIC_CASE_STUDIES_PATH } from "@/lib/constants";
import { getDisclaimers, getPrimaryCategories, getStates } from "@/lib/content";
import { Container } from "./Container";

const aboutLinks = [
  { label: "About", href: "/about/" },
  { label: "Editorial Policy", href: "/editorial-policy/" },
  { label: "Corrections", href: "/corrections/" },
  { label: "Public Case Studies", href: PUBLIC_CASE_STUDIES_PATH },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy-policy/" },
  { label: "Terms", href: "/terms/" },
  { label: "Insurance Disclaimer", href: "/insurance-disclaimer/" },
  { label: "Advertising Disclosure", href: "/advertising-disclosure/" },
  { label: "Accessibility", href: "/accessibility/" },
];

export function SiteFooter() {
  const disclaimers = getDisclaimers();
  const categories = getPrimaryCategories();
  const states = getStates();

  return (
    <footer className="mt-auto border-t border-line bg-navy-900 text-slate-300">
      <Container className="py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <p className="text-base font-semibold text-white">{SITE_NAME}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Independent insurance information for Maryland, Virginia, and Washington, D.C.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Insurance</h2>
            <ul className="mt-3 space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}/`}
                    className="text-sm text-slate-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Locations</h2>
            <ul className="mt-3 space-y-2">
              {states.map((state) => (
                <li key={state.slug}>
                  <Link
                    href={`/states/${state.slug}/`}
                    className="text-sm text-slate-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {state.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">About</h2>
            <ul className="mt-3 space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Legal</h2>
            <ul className="mt-3 space-y-2">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-slate-300 underline-offset-2 hover:text-white hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8">
          <p className="max-w-3xl text-xs leading-relaxed text-slate-400">
            {disclaimers.siteFooterDisclaimer}{" "}
            <Link href="/insurance-disclaimer/" className="underline hover:text-slate-200">
              Read full disclaimer
            </Link>
          </p>
          <p className="mt-4 text-xs text-slate-400">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
