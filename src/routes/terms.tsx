import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { LegalPage } from "@/components/LegalPage";

const TITLE = "Terms of Service — SwiftSite";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: "The terms for SwiftSite website setup and hosting & care." },
      { property: "og:title", content: TITLE },
      { property: "og:url", content: `${SITE_URL}/terms` },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/terms` }],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPage title="Terms of Service" updated="November 23, 2026">
      <section>
        <p>These terms apply when you use SwiftSite, a website design and hosting service based in Vancouver, British Columbia. All prices are in Canadian dollars.</p>
      </section>
      <section>
        <h2>1. Free preview</h2>
        <p>We build one free website preview from the public content of the website you submit. There is no charge and no credit card is needed. If you decide not to go ahead, you owe nothing.</p>
      </section>
      <section>
        <h2>2. Website setup ($199)</h2>
        <p>If you love your preview, you pay a one-time $199 setup fee. This covers your new website, moving your existing content over, two rounds of changes before launch, and connecting the website to your domain. The setup fee is final once your website goes live.</p>
      </section>
      <section>
        <h2>3. Hosting &amp; care ($25/month or $250/year)</h2>
        <ul>
          <li>A hosting &amp; care plan is required for every SwiftSite website.</li>
          <li>It includes secure hosting with SSL, backups, security updates and up to 2 small edits a month (such as swapping text or photos). Unused edits don't roll over.</li>
          <li>New pages, new features and larger changes are quoted separately.</li>
          <li>Plans renew automatically until cancelled. You can cancel anytime; your plan runs to the end of the period you've paid for, with no partial refunds.</li>
        </ul>
      </section>
      <section>
        <h2>4. Ownership</h2>
        <p>Your domain, your email and your content always belong to you. If you cancel your hosting &amp; care plan, we send you your website files.</p>
      </section>
      <section>
        <h2>5. Your content</h2>
        <p>You confirm that you have the right to use the text, photos and logos on the website you submit, and on anything you send us to add to your new website.</p>
      </section>
      <section>
        <h2>6. Changes to these terms</h2>
        <p>We may update these terms from time to time. Changes that affect your plan or price will be emailed to you before they take effect.</p>
      </section>
      <section>
        <h2>7. Governing law</h2>
        <p>These terms are governed by the laws of British Columbia and the federal laws of Canada that apply there.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>Questions? Email <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue hover:underline">{CONTACT_EMAIL}</a>.</p>
      </section>
    </LegalPage>
  );
}
