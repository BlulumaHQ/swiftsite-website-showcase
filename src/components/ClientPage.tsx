import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";

/** Layout for the private client pages (review, go-live). */
export function ClientPage({ title, intro, children }: { title: string; intro?: ReactNode; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="pb-24">
        <section className="border-b border-hairline bg-soft">
          <div className="ss-container py-12 md:py-16">
            <div className="mx-auto max-w-[760px]">
              <h1 className="ss-h2">{title}</h1>
              {intro && <div className="ss-lead mt-4">{intro}</div>}
            </div>
          </div>
        </section>
        <div className="ss-container pt-10 md:pt-12">
          <div className="mx-auto max-w-[760px] space-y-6">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

export function Note({ tone = "info", children }: { tone?: "info" | "warn" | "ok"; children: ReactNode }) {
  const cls =
    tone === "warn" ? "border-[#f5d9a8] bg-[#fff8ec] text-[#7a4b00]" : tone === "ok" ? "border-[#bfe8d6] bg-[#e7f8f1] text-[#0b6b4c]" : "border-[#cfe0fb] bg-[#eef4ff] text-ink-2";
  return <div className={`rounded-xl border px-4 py-3 text-[15px] leading-relaxed ${cls}`}>{children}</div>;
}

export const fieldCls =
  "w-full rounded-xl border border-[#c9d6e6] bg-white px-4 py-3 text-[16px] text-ink outline-none focus:border-blue focus:ring-2 focus:ring-blue/20";
