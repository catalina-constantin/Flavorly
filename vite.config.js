import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  assetsInclude: ["**/*.heic"],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("supabase")) {
              return "vendor-supabase";
            }
            if (id.includes("gsap")) {
              return "vendor-gsap";
            }
            return "vendor";
          }
        },
      },
    },
    chunkSizeWarningLimit: 800,
  },
});
