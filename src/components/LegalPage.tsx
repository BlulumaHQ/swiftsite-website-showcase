import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="ss-container pb-24 pt-12 md:pt-16">
        <article className="mx-auto max-w-[760px]">
          <h1 className="ss-h1">{title}</h1>
          <p className="ss-small mt-4">Last updated: {updated}</p>
          <div className="mt-10 space-y-8 text-[17px] leading-relaxed text-ink-2 [&_h2]:text-[22px] [&_h2]:font-normal [&_h2]:text-ink [&_li]:mt-2 [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6">
            {children}
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
