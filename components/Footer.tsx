import Link from "next/link";
import Logo from "./Logo";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-900/[0.08] bg-surface py-10">
      <div className="container-max flex flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo size="sm" />

        <nav className="flex items-center gap-6 text-sm text-ink-500">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-ink-900"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <span className="text-[13px] text-ink-400">
          © {year} EPM Journey. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
