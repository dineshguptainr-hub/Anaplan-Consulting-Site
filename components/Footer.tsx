import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ink-900/10 bg-surface py-10">
      <div className="container-max flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 -rotate-3 items-center justify-center rounded-md border-[1.5px] border-trust-600 font-mono text-[11px] font-bold text-trust-600">
            DG
          </span>
          <span className="text-sm text-ink-500">
            © {year} Dinesh Gupta Consulting. All rights reserved.
          </span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-ink-500">
          <Link href="/" className="transition hover:text-ink-900">
            Home
          </Link>
          <Link href="/services" className="transition hover:text-ink-900">
            Services
          </Link>
          <Link href="/contact" className="transition hover:text-ink-900">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}
