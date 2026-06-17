// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://drfed.org",
  integrations: [
    sitemap({
      // Exclude the internal social-card route from the sitemap.
      filter: (page) => !page.includes("/og-card"),
    }),
  ],
});
