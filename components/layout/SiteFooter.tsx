import Link from "next/link";
import { SITE_NAME } from "@/lib/constants";
import { getCategories, getDisclaimers } from "@/lib/content";
import { Container } from "./Container";

const companyLinks = [
  { label: "About", href: "/about/" },
  { label: "Contact", href: "/contact/" },
  { label: "Corrections", href: "/corrections/" },
];

const policyLinks = [
  { label: "Editorial Policy", href: "/editorial-policy/" },
  { label: "Accessibility", href: "/accessibility/" },
  { label: "Advertising Disclosure", href: "/advertising-disclosure/" },
  { label: "Insurance Disclaimer", href: "/insurance-disclaimer/" },
  { label: "Privacy Policy", href: "/privacy-policy/" },
  { label: "Terms of Use", href: "/terms/" },
];

export function SiteFooter() {
  const disclaimers = getDisclaimers();
  const categories = getCategories(true);

  return (
    <footer className="mt-auto border-t border-slate-200 bg-slate-50">
      <Container className="py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-bold text-navy-900">{SITE_NAME}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Educational insurance guides for consumers and businesses.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Company</h2>
            <ul className="mt-3 space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 underline-offset-2 hover:text-navy-800 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Policies</h2>
            <ul className="mt-3 space-y-2">
              {policyLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-600 underline-offset-2 hover:text-navy-800 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Explore</h2>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/states/" className="text-sm text-slate-600 underline-offset-2 hover:text-navy-800 hover:underline">
                  State Guides
                </Link>
              </li>
              <li>
                <Link href="/blog/" className="text-sm text-slate-600 underline-offset-2 hover:text-navy-800 hover:underline">
                  Blog
                </Link>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/${cat.slug}/`}
                    className="text-sm text-slate-600 underline-offset-2 hover:text-navy-800 hover:underline"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-8">
          <p className="text-xs leading-relaxed text-slate-500">
            {disclaimers.siteFooterDisclaimer}{" "}
            <Link href="/insurance-disclaimer/" className="underline hover:text-slate-700">
              Read full disclaimer
            </Link>
          </p>
          <p className="mt-4 text-xs text-slate-500">
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
