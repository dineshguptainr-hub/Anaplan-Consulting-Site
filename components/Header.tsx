"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/[0.08] bg-paper/[0.88] backdrop-blur-md">
      <div className="container-max flex h-[72px] items-center justify-between">
        <Link href="/" aria-label="EPM Journey — home">
          <Logo withQualifier />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              className={`text-sm font-semibold transition hover:text-ink-900 ${
                pathname === link.href ? "text-ink-900" : "text-ink-500"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Below sm the CTA would squeeze the wordmark and hamburger, so it
              moves into the mobile menu instead. The `!` prefixes are required:
              .btn-primary is declared after @tailwind utilities in globals.css,
              so its `inline-flex` otherwise beats a plain `hidden`. */}
          <Link
            href="/contact"
            className="btn-primary !hidden !px-5 !py-2.5 text-[13px] sm:!inline-flex"
          >
            Book a Consultation
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink-900/15 text-ink-900 transition hover:bg-trust-100 md:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              {open ? (
                <path
                  d="m5 5 10 10M15 5 5 15"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              ) : (
                <path
                  d="M3 6h14M3 10h14M3 14h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-ink-900/[0.08] bg-paper md:hidden"
        >
          <div className="container-max flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`border-b border-ink-900/[0.06] py-3.5 text-sm font-semibold last:border-b-0 ${
                  pathname === link.href ? "text-trust-700" : "text-ink-700"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/contact" className="btn-primary my-3 sm:!hidden">
              Book a Consultation
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
