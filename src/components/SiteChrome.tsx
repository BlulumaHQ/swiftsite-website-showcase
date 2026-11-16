import { CONTACT_EMAIL } from "@/lib/site";

export const navLinks = [
  ["How it works", "/#how"],
  ["Work", "/work"],
  ["Pricing", "/#pricing"],
  ["FAQ", "/#faq"],
] as const;

/** variant "dark" = navy wordmark for light backgrounds; "light" = white wordmark for dark backgrounds. */
export function Logo({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const src = variant === "light" ? "/images/swiftsite-logo-white.svg" : "/images/swiftsite-logo-dark.svg";
  return (
    <a href="/" className="inline-flex min-h-11 items-center" aria-label="SwiftSite home">
      <img src={src} alt="SwiftSite" width={152} height={38} className="h-[38px] w-auto" />
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
    <footer className="bg-ink py-14 text-white">
      <div className="ss-container grid gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-[#c3d3ea]">Brand-new websites for Canadian small businesses.</p>
          <p className="mt-1 text-[14px] text-muted-dark">
            Vancouver, BC · <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#c3d3ea] hover:text-mint">{CONTACT_EMAIL}</a>
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-x-8 sm:flex sm:gap-6">
          {navLinks.map(([l, h]) => (
            <li key={h}><a href={h} className="inline-block py-3 text-[15px] text-[#c3d3ea] hover:text-mint">{l}</a></li>
          ))}
        </ul>
      </div>
      <div className="ss-container">
        <div className="mt-10 border-t border-dark-border pt-6">
          <p className="text-[14px] text-muted-dark">© 2026 SwiftSite</p>
        </div>
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
