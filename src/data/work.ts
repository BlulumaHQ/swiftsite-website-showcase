export type Study = {
  id: string;
  client: string;
  industry: string;
  city: string;
  versionA: { headline: string; note: string };
  versionB: { headline: string; note: string };
  beforeScore: string;
  afterScore: string;
  chosen: "A" | "B";
};

export type LaunchedSite = { client: string; industry: string; city: string; image?: string };

export const studies: Study[] = [
  {
    id: "study-1",
    client: "[Client name]",
    industry: "[Industry]",
    city: "[City]",
    versionA: { headline: "[Their headline, rewritten from their site]", note: "Version A · Clean & modern direction" },
    versionB: { headline: "[Same content, a warmer feel]", note: "Version B · Warm & friendly direction" },
    beforeScore: "[38]",
    afterScore: "[96]",
    chosen: "B",
  },
];

export const TOTAL_STUDIES = 6;

export const launchedSites: LaunchedSite[] = [
  { client: "[Client name]", industry: "[Industry]", city: "[City]" },
  { client: "[Client name]", industry: "[Industry]", city: "[City]" },
  { client: "[Client name]", industry: "[Industry]", city: "[City]" },
];
