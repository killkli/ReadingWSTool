import { defineConfig } from 'vitest/node'
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [
    wasm(),
    topLevelAwait()
  ],
  test: {
    setupFiles: ['@vitest/web-worker'],
  },
})
