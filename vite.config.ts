import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercelBuild = process.env.VERCEL === "1";

export default defineConfig({
  nitro: isVercelBuild
    ? {
        preset: "vercel",
        output: {
          dir: ".vercel/output",
          serverDir: ".vercel/output/functions/__server.func",
          publicDir: ".vercel/output/static",
        },
      }
    : undefined,
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});
