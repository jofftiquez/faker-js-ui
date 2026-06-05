/**
 * The app version. Inside the extension this is the live manifest version;
 * when the popup is loaded outside an extension context (tests/preview) it
 * falls back to the build-time package version (no magic strings).
 */
export function getAppVersion (): string {
  try {
    return browser?.runtime?.getManifest?.().version ?? __APP_VERSION__;
  } catch {
    return __APP_VERSION__;
  }
}
