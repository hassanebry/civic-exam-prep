export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID ?? "";

export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("cookie_consent") === "accepted";
}

export function pageView(): void {
  if (!hasConsent()) return;
  window.fbq?.("track", "PageView");
}

export function event(
  name: string,
  params?: Record<string, unknown>,
  eventID?: string,
): void {
  if (!hasConsent()) return;
  if (eventID) {
    window.fbq?.("track", name, params ?? {}, { eventID });
  } else {
    window.fbq?.("track", name, params ?? {});
  }
}
