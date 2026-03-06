import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isDocker = process.env.DOCKER === "true";

const apiTarget = isDocker
  ? "http://scanupload.dotnet.example:8080"
  : "https://localhost:7021";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Needed for Docker container port mapping
    strictPort: true,
    port: 3002, // Or your desired port
    proxy: {
      "/api": {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/scanupload-api": {
        target: apiTarget,
        changeOrigin: true,
        secure: false,
        ws: true, // Enable WebSocket support for SignalR
      },
    },
  },
});
