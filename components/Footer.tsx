import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 bg-ink-950 py-10">
      <div className="container-max flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-gold-400 to-gold-600 font-display text-xs font-bold text-ink-950">
            DG
          </span>
          <span className="text-sm text-mist-400">
            © {year} Dinesh Gupta Consulting. All rights reserved.
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-mist-400">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>
          <Link href="/services" className="transition hover:text-white">
            Services
          </Link>
          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
