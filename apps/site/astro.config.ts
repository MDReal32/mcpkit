import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://mcpkit.mdreal.org",
  outDir: "build",
  output: "static",
  trailingSlash: "ignore",
  build: {
    format: "directory",
  },
});
