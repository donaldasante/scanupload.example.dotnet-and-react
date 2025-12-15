import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Needed for Docker container port mapping
    strictPort: true,
    port: 3002, // Or your desired port
    proxy: {
      "/api": {
        target: "https://localhost:7021",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/scanupload-api": {
        target: "https://localhost:7021",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
