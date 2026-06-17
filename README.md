drfed.org
=========

The landing page for *DrFed*, a web-based development and debugging platform
for ActivityPub, built by the team behind [Fedify].

This repository contains the marketing/landing site only. It's a static site
built with [Astro].

[Fedify]: https://fedify.dev
[Astro]: https://astro.build


Tech stack
----------

 -  [Astro] (static output)
 -  Vanilla CSS with design tokens; dark mode is system-driven
    (`prefers-color-scheme`) with no manual toggle
 -  Self-hosted fonts via [Fontsource]: Fraunces,
    Hanken Grotesk, and IBM Plex Mono
 -  [pnpm] for package management, [mise]
    for the toolchain (Node 26)

[Fontsource]: https://fontsource.org
[pnpm]: https://pnpm.io
[mise]: https://mise.jdx.dev


Develop
-------

~~~~ sh
pnpm install
pnpm dev          # start the dev server
pnpm build        # build the static site to dist/
pnpm preview      # preview the production build
pnpm check        # type-check + Astro diagnostics
~~~~


Social card
-----------

*src/pages/og-card.astro* is a standalone 1200×630 composition used to generate
*public/og-image.png*. To regenerate it, render that route at 1200×630 and
screenshot it (e.g., with a headless browser).


Funding
-------

DrFed is funded through the [NGI0 Commons Fund],
established by [NLnet] with financial support from the
European Commission's Next Generation Internet programme.

[NGI0 Commons Fund]: https://nlnet.nl/project/DrFed/
[NLnet]: https://nlnet.nl/


License
-------

[AGPL-3.0](./LICENSE).
