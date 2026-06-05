#!/usr/bin/env bash
#
# bootstrap-tracker.sh — seed the v2 migration tracker on GitHub.
#
# Creates one milestone per phase (prefixed "v2 — Phase N") and the task +
# per-phase e2e issues, with acceptance criteria pasted in as the definition of
# done. Idempotent: existing milestones/issues (matched by exact title) are
# skipped, so it is safe to re-run.
#
# Requires: gh (authenticated), jq.
# Usage:    scripts/bootstrap-tracker.sh
#
set -euo pipefail

REPO="${REPO:-jofftiquez/faker-js-ui}"

echo "==> Seeding v2 tracker on ${REPO}"

# ---------------------------------------------------------------------------
# Labels
# ---------------------------------------------------------------------------
ensure_label () {
  local name="$1" color="$2" desc="$3"
  if gh label list --repo "$REPO" --limit 200 --json name --jq '.[].name' | grep -qx "$name"; then
    echo "    label exists: $name"
  else
    gh label create "$name" --repo "$REPO" --color "$color" --description "$desc" >/dev/null
    echo "    label created: $name"
  fi
}

echo "--> Labels"
ensure_label "v2"  "843bd7" "v2 migration (WXT + faker@10 + cross-browser)"
ensure_label "e2e" "5de6d8" "Playwright end-to-end gate"

# ---------------------------------------------------------------------------
# Milestones
# ---------------------------------------------------------------------------
declare -A MS_DESC=(
  ["v2 — Phase 0: Scan, plan, tracker"]="Findings Report, confirmed decisions, v2 branch, milestones/issues seeded, CLAUDE.md updated."
  ["v2 — Phase 1: WXT scaffold"]="WXT + Vue 3 + TS + Tailwind + shadcn-vue, MV3, browser.*, Chrome + Firefox loadable hello-world popup."
  ["v2 — Phase 2: UI shell + branding parity"]="Port app shell, theme tokens, fonts, logo. v2 visually indistinguishable from v1."
  ["v2 — Phase 3: Core generate + preview + copy (faker@10)"]="One-click generate, preview, clipboard copy; faker registry migrated to faker@10 API."
  ["v2 — Phase 4: Bulk generation + JSON/CSV export"]="Bulk count produces correct rows; JSON and CSV exports match v1 shape."
  ["v2 — Phase 5: Per-method argument prompts"]="Methods with parameters expose the same argument UI and respect inputs."
  ["v2 — Phase 6: Auto-fill (cross-browser)"]="Content script + typed field→faker mapping; fills a fixture form on Chrome and Firefox."
  ["v2 — Phase 7: Cross-browser package & parity"]="wxt zip -b chrome/-b firefox + Firefox sources zip + gecko.id; full suite green on both; store assets."
  ["v2 — Phase 8: Website upgrade (optional)"]="Nuxt latest still building; shared tokens reconciled."
)
# Order matters for readable milestone numbers.
MS_ORDER=(
  "v2 — Phase 0: Scan, plan, tracker"
  "v2 — Phase 1: WXT scaffold"
  "v2 — Phase 2: UI shell + branding parity"
  "v2 — Phase 3: Core generate + preview + copy (faker@10)"
  "v2 — Phase 4: Bulk generation + JSON/CSV export"
  "v2 — Phase 5: Per-method argument prompts"
  "v2 — Phase 6: Auto-fill (cross-browser)"
  "v2 — Phase 7: Cross-browser package & parity"
  "v2 — Phase 8: Website upgrade (optional)"
)

echo "--> Milestones"
EXISTING_MS="$(gh api "repos/${REPO}/milestones?state=all&per_page=100" --jq '.[].title')"
for title in "${MS_ORDER[@]}"; do
  if grep -qxF "$title" <<<"$EXISTING_MS"; then
    echo "    milestone exists: $title"
  else
    gh api "repos/${REPO}/milestones" -f title="$title" -f description="${MS_DESC[$title]}" -f state="open" >/dev/null
    echo "    milestone created: $title"
  fi
done

# ---------------------------------------------------------------------------
# Issues
# ---------------------------------------------------------------------------
EXISTING_ISSUES="$(gh issue list --repo "$REPO" --state all --limit 500 --json title --jq '.[].title')"

mk_issue () {
  local milestone="$1" title="$2" labels="$3" body="$4"
  if grep -qxF "$title" <<<"$EXISTING_ISSUES"; then
    echo "    issue exists: $title"
    return
  fi
  gh issue create --repo "$REPO" \
    --title "$title" \
    --milestone "$milestone" \
    --label "$labels" \
    --body "$body" >/dev/null
  echo "    issue created: $title"
}

echo "--> Issues"

# ---- Phase 0 -------------------------------------------------------------
P0="v2 — Phase 0: Scan, plan, tracker"
mk_issue "$P0" "[v2][P0] Findings Report & confirmed decisions" "v2,documentation" \
$'Acceptance:\n- [x] Repository scanned end-to-end; written Findings Report delivered.\n- [x] Decisions confirmed: drop Quasar → Tailwind + shadcn-vue; new packages/extension package; website deferred; faker locale = en.\n- [x] v2 branch → 2.0.0 confirmed.'
mk_issue "$P0" "[v2][P0] Create v2 branch and seed tracker" "v2" \
$'Acceptance:\n- [x] v2 branch created off main.\n- [x] Milestones (one per phase) + task/e2e issues seeded on GitHub.\n- [x] scripts/bootstrap-tracker.sh committed and idempotent.'
mk_issue "$P0" "[v2][P0] Rewrite root CLAUDE.md with v2 standing constraints" "v2,documentation" \
$'Acceptance:\n- [x] CLAUDE.md captures: browser.* only, no hand-written background, faker@10 correctness, brand tokens, visual-parity gate, ≤3-agent working method, GitHub-as-source-of-truth.\n- [x] Instruction to read it at the start of every phase.'

# ---- Phase 1 -------------------------------------------------------------
P1="v2 — Phase 1: WXT scaffold"
mk_issue "$P1" "[v2][P1] Scaffold packages/extension with WXT + Vue 3 + TS (strict)" "v2" \
$'Acceptance:\n- [ ] packages/extension created in the pnpm workspace with WXT + @wxt-dev/module-vue.\n- [ ] TypeScript strict mode enabled.\n- [ ] Popup entrypoint renders a Vue 3 <script setup> component.'
mk_issue "$P1" "[v2][P1] Integrate Tailwind CSS + shadcn-vue with brand tokens" "v2" \
$'Acceptance:\n- [ ] Tailwind configured; brand palette wired as theme tokens (primary #843bd7 etc.).\n- [ ] shadcn-vue (Reka UI) initialized; at least one component renders.'
mk_issue "$P1" "[v2][P1] MV3 config: browser.* namespace, gecko.id, Chrome + Firefox targets" "v2" \
$'Acceptance:\n- [ ] wxt.config produces MV3 for Chromium and Gecko.\n- [ ] browser.* used everywhere; no chrome.* anywhere.\n- [ ] browser_specific_settings.gecko.id set for Firefox.\n- [ ] No hand-written background service worker (WXT-generated).'
mk_issue "$P1" "[v2][P1] dev/build/zip scripts wired into the pnpm workspace" "v2" \
$'Acceptance:\n- [ ] dev (chrome), dev:firefox, build, zip scripts exist and run.\n- [ ] Root scripts/README updated to reference the v2 package.'
mk_issue "$P1" "[v2][P1][e2e] Hello-world popup loads on Chrome & Firefox, no console errors" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 1):\n- [ ] Playwright persistent context loads the unpacked build.\n- [ ] Popup renders on Chromium AND Firefox with zero console errors.\n- [ ] Spec is green in CI-able form.'

# ---- Phase 2 -------------------------------------------------------------
P2="v2 — Phase 2: UI shell + branding parity"
mk_issue "$P2" "[v2][P2] Port app shell: header, logo, version badge, GitHub-stars, layout" "v2" \
$'Acceptance:\n- [ ] Header (bg-primary, 70px, white text), logo, v-badge, GitHub-stars link, open-in-new ported.\n- [ ] Pale-cyan app background reproduced.'
mk_issue "$P2" "[v2][P2] Theme tokens + fonts (Roboto / Material Icons) as Tailwind config" "v2" \
$'Acceptance:\n- [ ] All brand color tokens present and used.\n- [ ] Roboto + Material Icons available; no missing-glyph fallbacks.'
mk_issue "$P2" "[v2][P2] BEX vs SPA conditional affordances (sizing, open-in-new)" "v2" \
$'Acceptance:\n- [ ] Popup (BEX) vs SPA differences reproduced (logo size, open-in-new button, min widths).'
mk_issue "$P2" "[v2][P2][e2e] Screenshot parity vs v1 oracle (popup & SPA)" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 2):\n- [ ] Playwright screenshot diff of v2 vs the v1 build is within tolerance.\n- [ ] Colors and logo verified identical.'

# ---- Phase 3 -------------------------------------------------------------
P3="v2 — Phase 3: Core generate + preview + copy (faker@10)"
mk_issue "$P3" "[v2][P3] Typed faker registry (TS) ported from v1 constants" "v2" \
$'Acceptance:\n- [ ] src/constants/faker.js → typed TS registry; faker imported from @faker-js/faker/locale/en.\n- [ ] searchNeedle/regex/tags/params/fakerFn preserved with types.'
mk_issue "$P3" "[v2][P3] Programmatic faker@10 audit + remap (random/datatype/image/company/internet)" "v2" \
$'Acceptance:\n- [ ] Audit asserts typeof faker[api][method] === function for every entry.\n- [ ] random module, datatype.*, legacy image.*, company.bs*/suffixes remapped; internet.userName→username.\n- [ ] Audit runs in CI (fails build on missing method).'
mk_issue "$P3" "[v2][P3] Search (debounced, regex variants) + grouped method browser" "v2" \
$'Acceptance:\n- [ ] Search filters by searchNeedle; grouped-by-API expansion lists reproduced.'
mk_issue "$P3" "[v2][P3] One-click generate + toast preview + clipboard copy" "v2" \
$'Acceptance:\n- [ ] Clicking a method generates, copies to clipboard, and shows the preview toast.\n- [ ] First-generate review prompt behavior preserved.'
mk_issue "$P3" "[v2][P3][e2e] Every v1 method generates; copy works; no deprecation warnings" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 3):\n- [ ] e2e iterates the registry: each method returns a non-error value.\n- [ ] Clipboard contains the generated value.\n- [ ] No faker deprecation warnings in console.'

# ---- Phase 4 -------------------------------------------------------------
P4="v2 — Phase 4: Bulk generation + JSON/CSV export"
mk_issue "$P4" "[v2][P4] Bulk generation (count multiplier) UI + logic" "v2" \
$'Acceptance:\n- [ ] Bulk count produces exactly N rows for a chosen method (with params).'
mk_issue "$P4" "[v2][P4] JSON export (fakerui.json) matching v1 shape" "v2" \
$'Acceptance:\n- [ ] Download produces fakerui.json with the same structure as v1.'
mk_issue "$P4" "[v2][P4] CSV export (fakerui.csv) matching v1 shape" "v2" \
$'Acceptance:\n- [ ] Download produces fakerui.csv; string quoting matches v1 behavior.'
mk_issue "$P4" "[v2][P4][e2e] Bulk rows correct; JSON & CSV downloads validated" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 4):\n- [ ] e2e triggers bulk + both downloads and validates row count and file shape.'

# ---- Phase 5 -------------------------------------------------------------
P5="v2 — Phase 5: Per-method argument prompts"
mk_issue "$P5" "[v2][P5] ParameterField equivalents (number/text/select/boolean/date) in shadcn-vue" "v2" \
$'Acceptance:\n- [ ] Each param type renders the correct control with hint and default.'
mk_issue "$P5" "[v2][P5] Parameter dialog wiring (single + bulk) with defaults" "v2" \
$'Acceptance:\n- [ ] Dialog builds options object; Use-Defaults path works; values flow to fakerFn.'
mk_issue "$P5" "[v2][P5][e2e] Parameterized methods expose arg UI and respect inputs" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 5):\n- [ ] e2e sets params (e.g. internet.password length) and asserts the output honors them.'

# ---- Phase 6 -------------------------------------------------------------
P6="v2 — Phase 6: Auto-fill (cross-browser)"
mk_issue "$P6" "[v2][P6] Content script: DOM field scan + typed field→method mapping (userName→username)" "v2" \
$'Acceptance:\n- [ ] fieldTypeMappings + fieldNamePatterns ported to typed registry; internet.userName→username.\n- [ ] Label/aria resolution, visibility/disabled checks preserved.'
mk_issue "$P6" "[v2][P6] WXT messaging replacing the \$q.bex bridge (popup ↔ content)" "v2" \
$'Acceptance:\n- [ ] Popup triggers fill via WXT messaging; content script responds with filled count.\n- [ ] No Quasar bridge / chrome.* remnants.'
mk_issue "$P6" "[v2][P6] Date/select/checkbox/radio handling + highlight parity" "v2" \
$'Acceptance:\n- [ ] Date formatting, select/checkbox/radio fill, and the green highlight reproduce v1.'
mk_issue "$P6" "[v2][P6][e2e] Auto-fill fills inputs.html with type-appropriate values on Chrome & Firefox" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 6):\n- [ ] Against packages/fakerjsui/inputs.html, all visible fields get type-appropriate values.\n- [ ] Green on Chromium AND Firefox.'

# ---- Phase 7 -------------------------------------------------------------
P7="v2 — Phase 7: Cross-browser package & parity"
mk_issue "$P7" "[v2][P7] wxt zip -b chrome / -b firefox + Firefox sources zip" "v2" \
$'Acceptance:\n- [ ] Both browser zips build; AMO source-code zip produced.'
mk_issue "$P7" "[v2][P7] Finalize browser_specific_settings.gecko.id" "v2" \
$'Acceptance:\n- [ ] gecko.id finalized and documented.'
mk_issue "$P7" "[v2][P7] Store assets: icons + screenshots prepared" "v2,documentation" \
$'Acceptance:\n- [ ] Chrome Web Store + AMO icon sizes and screenshots prepared from v2 build.'
mk_issue "$P7" "[v2][P7] Deprecate v1 packages/fakerjsui (cutover)" "v2" \
$'Acceptance:\n- [ ] v1 retired/archived once v2 parity is confirmed by the full suite.'
mk_issue "$P7" "[v2][P7][e2e] Full suite green on Chrome & Firefox; both packages install" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 7):\n- [ ] Entire Playwright suite passes on both engines.\n- [ ] Both packaged builds install and run.'

# ---- Phase 8 (optional) --------------------------------------------------
P8="v2 — Phase 8: Website upgrade (optional)"
mk_issue "$P8" "[v2][P8] Upgrade Nuxt to latest; keep building" "v2" \
$'Acceptance:\n- [ ] Nuxt upgraded; website builds and renders.'
mk_issue "$P8" "[v2][P8] Reconcile shared brand tokens with the app" "v2" \
$'Acceptance:\n- [ ] #843bd7 + logo reconciled between website and app.'
mk_issue "$P8" "[v2][P8][e2e] Website builds and renders; tokens match" "v2,e2e" \
$'Acceptance (DEFINITION OF DONE for Phase 8):\n- [ ] Build succeeds; smoke e2e renders the landing page; tokens verified.'

echo "==> Done."
