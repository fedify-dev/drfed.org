Contributing to drfed.org
=========================

Thanks for helping with the DrFed landing page! This document is written for
both human contributors and coding agents — please read it before making
changes. (*AGENTS.md* and *CLAUDE.md* are symlinks to this file.)

> [!IMPORTANT]
> If you use an AI coding agent to contribute, you must read and follow
> [*AI\_POLICY.md*](./AI_POLICY.md) first.


What this repository is
-----------------------

This is the *landing/marketing site* for [DrFed], a
web-based development and debugging platform for ActivityPub, built by the team
behind [Fedify] and funded by NLnet's NGI0 Commons Fund.

It is a *static website* built with [Astro]. It is *only*
the website — the DrFed application itself lives in a separate repository.
Everything here is released under *AGPL-3.0* (see [*LICENSE*](./LICENSE)).

[DrFed]: https://drfed.org
[Fedify]: https://fedify.dev
[Astro]: https://astro.build


Toolchain
---------

 -  [mise] manages the toolchain. Versions are pinned in
    [*mise.toml*](./mise.toml) (Node 26, pnpm 11). Run `mise install`
    once. Do *not* use nvm or add *.nvmrc*/*.node-version*.
 -  [pnpm] is the package manager. Do not use npm or yarn, and
    commit the resulting *pnpm-lock.yaml*.
 -  Keep dependencies on their *latest* versions.

[mise]: https://mise.jdx.dev
[pnpm]: https://pnpm.io


Commands
--------

~~~~ sh
mise install      # install dependencies
mise dev          # start the dev server (http://localhost:4321)
mise build        # build the static site to dist/
mise preview      # serve the production build locally
mise check        # check the project for errors
mise run fmt      # format Markdown with Hongdown
~~~~

*Before you finish a change, both `mise check` and `mise build` must pass with
zero errors.* If you touched anything visual, also eyeball it in light *and*
dark mode (see below).


Project structure
-----------------

~~~~
astro.config.mjs        # site config + sitemap (og-card excluded)
mise.toml               # toolchain pins (Node 26, pnpm 11)
src/
  assets/               # imported, optimized assets (logo, NLnet logos, avatars)
    drfed.svg           # the DrFed logo
    nlnet/              # NLnet + NGI0 Commons Fund logos
    team/               # team avatars (committed)
  components/           # one .astro component per page section
  layouts/Base.astro    # <head>, meta/OG tags, font + global.css imports
  pages/
    index.astro         # the page — composes the section components
    og-card.astro       # 1200×630 source for the social image (not linked)
  styles/global.css     # design tokens, reset, base type, dark mode, motion
public/                 # static files copied as-is (favicons, og-image.png, robots)
~~~~


Design system & conventions
---------------------------

The visual direction is *“clinical calm”*: editorial, spacious, restrained.
Follow these rules so the site stays coherent:

 -  *Palette is monochrome rose. There is no blue.* All colors are defined as
    CSS custom properties in *src/styles/global.css* (`--accent`, `--ink`,
    `--surface`, `--line`, …). *Use the tokens; never hardcode hex values* in
    a component (the funding chip in *Footer.astro* is the one deliberate
    exception — it must stay light in both schemes so the NLnet artwork is
    legible).
     -  ⚠️ The logo file *src/assets/drfed.svg* contains *blue* hex fills
        (`#bae6fd`, `#0284c7`, `#0c4a6e`) on the dino, but they are overridden
        by rose gradients at render time. The brand is rose-only — ignore those
        values.
 -  *Dark mode is system-driven only*, via
    `@media (prefers-color-scheme: dark)` in *global.css*. *Never add a manual
    theme toggle or any JS-based theming.* New colors must have both a light
    and a dark value.
 -  *Styling is vanilla CSS* — Astro component `<style>` blocks (scoped) plus
    the global stylesheet. No Tailwind or CSS-in-JS.
 -  *Typography:* Fraunces (serif display), Hanken Grotesk (body sans), IBM
    Plex Mono (labels/eyebrows), self-hosted via `@fontsource`. They're
    imported once in *Base.astro* (upright *and* italic CSS, because
    *global.css* sets `font-synthesis: none`). Reference them through
    `--font-serif`, `--font-sans`, `--font-mono`.
 -  *Content is in English.*
 -  *Motion is calm and optional.* Hero uses a load reveal; sections use
    scroll-driven reveals. Both keep content visible when animation is
    unsupported or when `prefers-reduced-motion: reduce` is set — preserve that
    (hidden initial states live under
    `@media (prefers-reduced-motion: no-preference)` and, for scroll reveals,
    `@supports (animation-timeline: view())`).


Editing content
---------------

Most copy lives directly in the section components:

 -  **Tools** → the `tools` array in *src/components/Features.astro*.
 -  **Roadmap phases** → the `phases` array in *src/components/Roadmap.astro*.
 -  **Team** → the `team` array in *src/components/Team.astro* (add the avatar
    to *src/assets/team/* and import it).
 -  **Newsletter** → the Buttondown embed form in
    *src/components/Subscribe.astro* (posts to
    `https://buttondown.com/api/emails/embed-subscribe/drfed`).
 -  **Funding/NLnet** → *src/components/Footer.astro*.

### Writing style

Keep copy *plain and informative* rather than promotional, and follow these
typographic conventions:

 -  Use em dashes *tight*, with no surrounding spaces (`like this—no spaces`),
    or a semicolon where a dash would feel heavy. (Spaced em dashes are fine in
    `<title>`/`alt`/`aria-label` separators, which aren't running prose.)
 -  Use *curly quotes and apostrophes* (`“ ” ’`), not straight ones.
 -  Write file names, paths, and extensions in italics, e.g., *mise.toml*,
    *src/components/Hero.astro*, *.svg*.
 -  Prefer italics over bold for emphasis.
 -  Prefer concrete description over superlatives, e.g., “identify which stage
    failed”, not “see exactly where it breaks.”


Assets
------

 -  Favicons and *og-image.png* are pre-generated and live in *public/*.
 -  *Regenerating the social image:* render the `/og-card` route at a 1200×630
    viewport and screenshot the `.card` element into *public/og-image.png*
    (any headless browser works; the route uses the real brand fonts, so wait
    for `document.fonts.ready`). Serve it from a production build
    (`mise preview`), *not* `mise dev`, or the Astro dev toolbar will be
    captured in the image. `og-card` is intentionally `noindex` and excluded
    from the sitemap.
 -  Team avatars are downloaded and committed so the site stays self-contained.


Accessibility & quality bar
---------------------------

 -  Exactly *one `<h1>`* per page; keep heading order logical (`h1` → `h2` →
    `h3`).
 -  Provide meaningful `alt` text; mark purely decorative images `alt=""` /
    `aria-hidden`.
 -  Maintain visible focus styles (the global `:focus-visible` rule) and *AA
    color contrast*; use `--accent-strong` (not `--accent`) for rose-colored
    text.


Commits & pull requests
-----------------------

 -  Branch off `main`; keep commits small and focused with clear, imperative
    messages.
 -  Make sure `mise check` and `mise build` pass before opening a PR.
 -  Describe user-facing/visual changes and, where helpful, attach light + dark
    screenshots.


Notes for coding agents
-----------------------

 -  *Do not commit or push unless explicitly asked.*
 -  Verify your work: run `mise check` and `mise build`; for UI changes, preview
    the site and confirm *both light and dark* modes look right (e.g., emulate
    `prefers-color-scheme`).
 -  Don't introduce a dark-mode toggle, don't add blue to the palette, and don't
    hardcode colors; use the tokens.
 -  Prefer editing the existing section components and *global.css* over adding
    new patterns or dependencies. If you must add a dependency, install the
    latest version with `pnpm add` and keep *pnpm-lock.yaml* in sync.
 -  Markdown is formatted with [Hongdown]. After editing any *.md* file, run
    `mise run fmt`; `mise check` enforces this via `hongdown --check`.

[Hongdown]: https://github.com/dahlia/hongdown


License
-------

By contributing, you agree that your contributions are licensed under the
[AGPL-3.0](./LICENSE).
