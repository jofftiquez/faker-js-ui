# Store assets

## Icons

`public/icon/{16,32,48,96,128}.png` are exact-sized, resampled from the 192px
brand logo, and ship in every build (`web-ext lint` clean — no `ICON_SIZE`).

## Screenshots

- `popup-person.png` — the popup with the grouped method browser (starting
  point for store listings).

## Release TODO

- **Chrome Web Store:** 1280×800 (or 640×400) marketing screenshots, store icon,
  promo tiles; upload `faker-js-ui-<version>-chrome.zip`.
- **AMO (Firefox):** screenshots; upload `faker-js-ui-<version>-firefox.zip` plus
  the reproducible `faker-js-ui-<version>-sources.zip`. Both are produced by
  `bun run zip:ext`. The `browser_specific_settings.gecko.id` is
  `faker-js-ui@fakerjsui.org` (declares `data_collection_permissions: none`).
