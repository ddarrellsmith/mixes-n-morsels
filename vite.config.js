import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/mixes-n-morsels/",
  plugins: [react()],
});
