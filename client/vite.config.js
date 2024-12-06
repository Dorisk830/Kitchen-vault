import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  watch: {
    usePolling: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(new URL('.', import.meta.url).pathname, 'src'),
    },
  },
});
