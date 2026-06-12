import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: process.env.SITE_URL ?? "http://localhost:4321",
  base: process.env.BASE_PATH ?? "/",
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()]
  }
});
