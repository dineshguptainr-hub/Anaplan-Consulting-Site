import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/10 bg-paper/85 backdrop-blur-md">
      <div className="container-max flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 -rotate-3 items-center justify-center rounded-md border-[1.5px] border-trust-600 font-mono text-xs font-bold text-trust-600">
            DG
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink-900">
            Dinesh Gupta
            <span className="ml-2 hidden font-mono text-[11px] font-normal uppercase tracking-wide text-ink-500 sm:inline">
              Master Anaplanner
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-500 transition hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="btn-primary !px-5 !py-2.5 text-[13px]">
          Book a Model Audit
        </Link>
      </div>
    </header>
  );
}
