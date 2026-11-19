import { useEffect, useState } from "react";
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
  const [open, setOpen] = useState(false);
  return (
    <header className="relative z-30">
      <nav className="ss-container flex h-20 items-center justify-between gap-3" aria-label="Main">
        <Logo />
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map(([l, h]) => <a key={h} href={h} className="ss-nav-link">{l}</a>)}
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden sm:block"><a href="/#start" className="ss-btn ss-btn-primary">Get my free preview</a></span>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-hairline bg-white text-ink md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="ss-container md:hidden">
          <ul className="rounded-[14px] border border-hairline bg-white p-2 shadow-lg">
            {navLinks.map(([l, h]) => (
              <li key={h}><a href={h} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-3 text-[17px] text-ink hover:bg-soft">{l}</a></li>
            ))}
            <li className="p-2"><a href="/#start" onClick={() => setOpen(false)} className="ss-btn ss-btn-primary w-full">Get my free preview</a></li>
          </ul>
        </div>
      )}
    </header>
  );
}

/** Mobile-only bottom bar with the main CTA; appears after the hero, hides near the form. */
export function StickyCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const start = document.getElementById("start");
      const nearForm = start ? start.getBoundingClientRect().top < window.innerHeight : false;
      setShow(window.scrollY > 600 && !nearForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-white/95 px-5 py-3 backdrop-blur transition-transform md:hidden ${show ? "translate-y-0" : "translate-y-full"}`} aria-hidden={!show}>
      <a href="/#start" tabIndex={show ? 0 : -1} className="ss-btn ss-btn-primary w-full">Get my free preview · $99</a>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink pb-24 pt-14 text-white md:pb-14">
      <div className="ss-container grid gap-8 md:grid-cols-[1fr_auto]">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-[#c3d3ea]">Brand-new websites for Canadian small businesses.</p>
          <p className="mt-1 text-[14px] text-muted-dark">
            Vancouver, BC · <a href={`mailto:${CONTACT_EMAIL}`} className="inline-block py-3 text-[#c3d3ea] hover:text-mint">{CONTACT_EMAIL}</a>
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
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14px] text-muted-dark">© 2026 SwiftSite</p>
            <p className="flex gap-6 text-[14px]">
              <a href="/privacy" className="inline-block py-3 text-muted-dark hover:text-mint">Privacy Policy</a>
              <a href="/terms" className="inline-block py-3 text-muted-dark hover:text-mint">Terms of Service</a>
            </p>
          </div>
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
