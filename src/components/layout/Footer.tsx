import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-6">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 text-xs text-muted sm:flex-row sm:justify-between">
        <p>&copy; {new Date().getFullYear()} MonPassCivique</p>
        <nav className="flex items-center gap-4">
          <Link
            href="/legal#mentions"
            className="transition-colors hover:text-primary"
          >
            Mentions légales
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/legal#confidentialite"
            className="transition-colors hover:text-primary"
          >
            Confidentialité
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/legal#cgv"
            className="transition-colors hover:text-primary"
          >
            CGV
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/contact"
            className="transition-colors hover:text-primary"
          >
            Contact
          </Link>
          <span className="text-border">|</span>
          <Link
            href="/politique-cookies"
            className="transition-colors hover:text-primary"
          >
            Cookies
          </Link>
        </nav>
      </div>
    </footer>
  );
}
