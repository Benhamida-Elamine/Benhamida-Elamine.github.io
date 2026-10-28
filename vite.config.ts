import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// User site (https://<user>.github.io/) is served from the domain root.
// For a project site, build with BASE_PATH=/<repository>/.
export default defineConfig({
  base: process.env.BASE_PATH ?? "/",
  plugins: [react()],
});
