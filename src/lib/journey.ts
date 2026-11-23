// Client journey backend (shared with SwiftLift): one Supabase Edge Function, several actions.
const FN_URL = "https://czdbnlewbbwbtgjjwute.supabase.co/functions/v1/client-journey";
const ANON_KEY = "sb_publishable_kcpYpK49_gQxhocNbK-dmw_Ixc1dsyb"; // public (publishable) key

export async function journey<T = Record<string, unknown>>(body: Record<string, unknown>): Promise<T> {
  const res = await fetch(FN_URL, {
    method: "POST",
    headers: { "content-type": "application/json", apikey: ANON_KEY },
    body: JSON.stringify(body),
  });
  let data: Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    /* empty body */
  }
  if (!res.ok || data["error"]) throw new Error(String(data["error"] || `Request failed (${res.status})`));
  return data as T;
}

/** Upload a screenshot to the signed URL the backend hands out. */
export async function uploadToSignedUrl(signedUrl: string, file: File): Promise<void> {
  const res = await fetch(signedUrl, {
    method: "PUT",
    headers: { "content-type": file.type || "application/octet-stream", "x-upsert": "false" },
    body: file,
  });
  if (!res.ok) throw new Error(`Upload failed (${res.status})`);
}

export const projectIdFromUrl = () => {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("p") || "";
};
