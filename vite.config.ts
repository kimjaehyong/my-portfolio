import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const htmlInputs = Object.fromEntries(
  readdirSync(__dirname)
    .filter((f) => f.endsWith('.html'))
    .map((f) => [f.replace(/\.html$/i, ''), resolve(__dirname, f)]),
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: htmlInputs,
    },
  },
})
