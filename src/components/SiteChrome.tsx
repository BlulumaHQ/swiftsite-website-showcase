import { CONTACT_EMAIL } from "@/lib/site";

export const navLinks = [
  ["How it works", "/#how"],
  ["Work", "/work"],
  ["Pricing", "/#pricing"],
  ["FAQ", "/#faq"],
] as const;

export function Logo() {
  return (
    <a href="/" className="flex items-center gap-2.5 min-h-11" aria-label="SwiftSite home">
      <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-ink">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--mint)" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
          <path d="M17 6.5C15.8 5.3 14.2 4.8 12.3 4.8 9.6 4.8 7.6 6.2 7.6 8.3c0 4.7 9.2 2.6 9.2 7.4 0 2.2-2.1 3.6-4.9 3.6-2.1 0-3.9-.7-5.1-2" />
        </svg>
      </span>
      <span className="text-[20px] font-semibold tracking-tight text-ink">SwiftSite</span>
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-20">
      <nav className="ss-container flex h-20 items-center justify-between" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([l, h]) => <a key={h} href={h} className="ss-nav-link">{l}</a>)}
        </div>
        <a href="/#start" className="ss-btn ss-btn-primary !px-4 text-[14px] sm:!px-[22px]">Get my free preview</a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline py-12">
      <div className="ss-container grid gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <p className="text-[20px] font-semibold">SwiftSite</p>
          <p className="mt-2 text-ink-2">Brand-new websites for Canadian small businesses.</p>
          <p className="ss-small mt-1">
            Vancouver, BC · <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink-2 hover:text-blue">{CONTACT_EMAIL}</a>
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 sm:flex sm:gap-6">
          {navLinks.map(([l, h]) => <li key={h}><a href={h} className="ss-nav-link inline-block">{l}</a></li>)}
        </ul>
      </div>
      <div className="ss-container mt-8 border-t border-hairline pt-6">
        <p className="ss-small">© 2026 SwiftSite</p>
      </div>
    </footer>
  );
}

/** A real website screenshot, cropped to the top of the page. */
export function Shot({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`block w-full object-cover object-top ${className}`}
    />
  );
}
