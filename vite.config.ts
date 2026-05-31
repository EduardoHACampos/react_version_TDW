import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const redditProxy = {
  "/api/reddit": {
    target: "https://www.reddit.com",
    changeOrigin: true,
    rewrite: () => "/r/TheDarkWest/new.json",
    headers: {
      "User-Agent": "TheDarkWestFrontend/1.0",
    },
  },
};

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: redditProxy,
  },
  preview: {
    proxy: redditProxy,
  },
});
