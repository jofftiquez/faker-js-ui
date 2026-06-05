// Background entrypoint.
//
// WXT generates the actual MV3 service worker (Chromium) / event page
// (Firefox) from this file. Do NOT hand-write a service worker, and use the
// unified `browser.*` namespace only (never `chrome.*`).
export default defineBackground(() => {
  // No background behaviour needed yet — the popup is the primary surface.
  // Auto-fill messaging is wired up in Phase 6.
});
