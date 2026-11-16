# SwiftSite Website Showcase

Build the SwiftSite marketing homepage (single page, English). SwiftSite is a Canadian service: AI rebuilds a small business's existing website into two new designs; they pick one for $99 CAD. Build ONLY the homepage now — first build, no testing/auditing passes.

DESIGN TOKENS (follow exactly)
- Font: Inter from Google Fonts, weights 300/400/500/600. Body weight 300, font-feature-settings "ss01". Numbers use "tnum".
- Headlines are THIN: H1 64px / weight 300 / line-height 1.02 / letter-spacing -2px (mobile 42px). H2 44px / 300 / 1.1 / -1.2px (mobile 32px). Card titles 24px weight 400.
- Colors: ink #0b1b33 (text, dark sections), ink-2 #334766, muted #4a5b75, primary blue #0a5cf5 (hover #0848c2), mint accent #5fe0c6, success green #12b886, soft bg #f6f9fc, hairline #e3e8ee, dark card #13284a with border #22406b, muted-on-dark #9fb4d4.
- Buttons: pill (radius 9999px), min-height 48px, padding 0 22px, primary filled blue, ghost = white with blue 1px border. Only one filled button per section.
- Cards: white, 1px #e3e8ee border, radius 14px, shadow 0 1px 3px rgba(11,27,51,.06), padding 32px.
- Container max-width 1200px, side padding 32px (20px mobile). Section padding 112px vertical.
- Hero background: soft blurred colour "mesh" — 4 absolutely positioned blurred circles (filter blur 70px, opacity .75) in mint #9fe8d8, sky #a9c8ff, lavender #c9b8ff, peach #ffd3b0 across the top of the hero. Subtle, not a loud gradient.

SECTIONS (in order)
1. NAV: logo (dark rounded square with a mint "S" stroke + wordmark "SwiftSite" 20px/600), links How it works / Work / Pricing / FAQ (anchor links), right button "Get my free preview". Links hide on mobile.
2. HERO (two columns, stack on mobile). Left: small pill badge with green dot "AI-built · Designer-checked · Made in Vancouver". H1 three lines: "Same business." / "Brand-new website." / "$99." (the $99 line weight 500). Lead 19px: "AI rebuilds your current website into two fresh designs, using the words and photos you already have. Up to 4× faster than your old site." Then a pill-shaped URL input bar (white, border #c9d6e6, big soft shadow, globe icon, placeholder "yourbusiness.ca", button "See my new site") max-width 560px; on mobile input and button stack full-width. Small text: "Free preview · No credit card · You only pay if you love it". Right column (decorative, aria-hidden): a tilted grey wireframe card labelled "Your current site", and two overlapping white browser cards "Version A — Clean & modern" (navy hero block, mint pill button, 3 tiles) and "Version B — Warm & friendly" (cream #fbf4ea, brown text bars, orange #e2703a pill, photo block), plus a small floating stat chip: green ring with "[96]", "PageSpeed score", "was [38] on the old site".
3. TRUST STRIP on #f6f9fc with top/bottom hairlines, 4 items with thin blue line icons: "Every site checked by a real designer", "Based in Vancouver, BC", "20+ years designing websites", "Your domain and content stay yours".
4. HOW IT WORKS (id how): eyebrow "HOW IT WORKS" (12px, uppercase, blue, 500), H2 "No meetings. No forms to fill. No designer back-and-forth." 3 cards: 01 "Paste your website" — "Our AI reads your current site and pulls your services, photos, hours and contact details. You don't prepare anything." / 02 "Get two new designs" — "Two real, clickable websites in two different styles, checked by a designer before they reach your inbox." / 03 "Pick one. Go live." — "Choose your favourite, ask for tweaks by email, and we put it live on your domain. Your email keeps working."
5. TWO DIRECTIONS (id work) — dark #0b1b33 section, white text. Eyebrow (mint) "TWO DIRECTIONS", H2 "Every customer sees two real versions. Then they choose." Right of heading: two toggle pill buttons "Version A" / "Version B" (active = filled dark/white style). Below, a browser-frame mockup (#13284a, three dots) that SWITCHES content with the toggle: A = clean navy hero with "[Their headline, rewritten from their site]", mint "Book now" pill and 3 light tiles; B = warm cream layout with "[Same content, a warmer feel]", "[Their photo]" block, orange "Call us" pill. Side column of dark cards: "Study 1 of 6" / "[Client name] · [Industry]" / "[City], BC"; PageSpeed (mobile) "[38] → [96]" (38 in #ff9b7a, 96 in mint) with note changing per version ("Version A · Clean & modern direction" / "Version B · Warm & friendly direction"); mint card with check icon "Client chose Version [B]". Then sub-heading "Their pick, now live" + link "See all work →" and a 3-column grid of dark cards with "[Site screenshot]" placeholder image area and "[Client name]" / "[Industry] · [City]". Keep the data for studies and launched sites in a typed array (src/data/work.ts) so 6 studies can be added later, each with versionA/versionB/beforeScore/afterScore/chosen.
6. SPEED: two columns. Left eyebrow "BUILT FOR SPEED", H2 "A faster site means more people stay, call and book.", lead "SwiftSite websites are lean, modern code with no plugins slowing them down. They load in a blink on any phone." Right card: two bars — "Typical older website [4.8s]" full-width peach #ffb199; "SwiftSite [1.2s]" 25% width green. Caption "Load time on mobile. Replace with measured results before launch."
7. PRICING (id pricing) on #f6f9fc, centred heading "PRICING" / "One simple price." Card 1 (white): "New website", "$99" 64px weight 300 + "CAD, one time", checklist with green checks: Two complete designs to choose from / Your words, photos and pages moved over / Mobile-ready and fast-loading / [2] rounds of changes by email / Connected to your domain, email untouched; full-width button "Get my free preview". Card 2 (dark #0b1b33): "Care plan", "from $15/month", "Hosting, security and small updates, so your site stays fast and current. [Plan details coming soon]". Under both: dashed-border white bar "Want more customers to find you?" / "Add SEO after your new site goes live." with ghost button "Ask about SEO".
8. FAQ (id faq), max-width 840px, accordion (first open): Is it really $99? → "Yes. AI does the heavy lifting, so we can rebuild a small business website for a fraction of the usual cost. You see both designs before you pay anything." / What if I don't like either version? → "Then you pay nothing. No credit card is needed for the preview." / Will my email or domain break? → "No. Your domain stays where it is and your email keeps working. We only point your website to the new design." / Who checks the AI's work? → "A real designer reviews every site before it is sent to you." / Can you add online booking or a store? → "SwiftSite rebuilds informational websites. If you already use a booking or ordering system, we link to it from your new site. Custom features are quoted separately."
9. FINAL CTA (id start) on #f6f9fc with two soft blurred blobs at the bottom: centred H2 "See your new website before you spend a dollar.", the same URL input bar, small text "Two designs in your inbox in [48 hours] · Free · No credit card".
10. FOOTER: "SwiftSite", "Brand-new websites for Canadian small businesses.", "Vancouver, BC · [hello@domain]", anchor links, "© 2026 SwiftSite".

BEHAVIOUR
- Both URL forms: client-side only for now — validate it looks like a domain, then show an inline success message "Thanks! We'll email your two designs." (no backend yet; leave a TODO for the submit handler). Add an optional email field only after a URL is entered.
- Keep every [bracketed] placeholder text exactly as written.
- Real <button>, <a>, <label> elements; text contrast ≥ 4.5:1; touch targets ≥ 44px; no emoji.
- Do NOT mention Sonykun, BluLuma or SwiftLift anywhere.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/a77d9cca-ddeb-402f-91dd-a1a3a7fe52d5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
