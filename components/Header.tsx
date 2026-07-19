import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-ink-900/80 backdrop-blur-md">
      <div className="container-max flex h-18 items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-to-br from-gold-400 to-gold-600 font-display text-sm font-bold text-ink-950">
            DG
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">
            Dinesh Gupta
            <span className="ml-2 hidden text-mist-400 font-normal sm:inline">
              / Master Anaplanner
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-mist-300 transition hover:text-white"
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
