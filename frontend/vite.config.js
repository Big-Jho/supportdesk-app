import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      // This proxies any request starting with "/api" to your Express server
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        // Optional: If your backend routes DON'T start with /api,
        // this line removes it before sending it to the server
        // rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
