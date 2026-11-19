import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

const TITLE = "Privacy Policy — SwiftSite";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "How SwiftSite collects, uses and protects your information." },
      { property: "og:title", content: TITLE },
      { property: "og:url", content: `${SITE_URL}/privacy` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/privacy` }],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="November 19, 2026">
      <section>
        <p>SwiftSite is a website design service based in Vancouver, British Columbia. This policy explains what information we collect, why we collect it and how we look after it.</p>
      </section>
      <section>
        <h2>What we collect</h2>
        <ul>
          <li><strong className="font-medium text-ink">What you give us:</strong> your current website address, email address, and anything you send us by email, such as tweak requests, photos or text.</li>
          <li><strong className="font-medium text-ink">Your public website content:</strong> to build your preview, we read the publicly available pages of the website you submit, including text, photos, hours and contact details.</li>
          <li><strong className="font-medium text-ink">Payment details:</strong> payments are processed by Stripe. We never see or store your full card number.</li>
          <li><strong className="font-medium text-ink">Basic usage data:</strong> standard technical information such as pages visited and browser type, used to keep this website working well.</li>
        </ul>
      </section>
      <section>
        <h2>How we use it</h2>
        <ul>
          <li>To build, send and follow up on your website preview.</li>
          <li>To launch, host and maintain your website if you become a client.</li>
          <li>To bill you for your setup fee and hosting &amp; care plan.</li>
          <li>To reply to your questions and edit requests.</li>
        </ul>
        <p>We do not sell or rent your information to anyone.</p>
      </section>
      <section>
        <h2>Who we share it with</h2>
        <p>Only the service providers we need to run SwiftSite, such as our payment processor (Stripe), our hosting and network provider (Cloudflare), and our email provider. They may only use your information to provide their service to us.</p>
      </section>
      <section>
        <h2>How long we keep it</h2>
        <p>We keep your information for as long as you are a client, and afterwards only as long as needed for our records and legal obligations. If you don't go ahead after your free preview, you can ask us to delete your preview and details at any time.</p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>You can ask to see, correct or delete the personal information we hold about you, and you can unsubscribe from any follow-up emails at any time.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions about this policy? Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue hover:underline">{CONTACT_EMAIL}</a>.</p>
      </section>
    </LegalPage>
  );
}
