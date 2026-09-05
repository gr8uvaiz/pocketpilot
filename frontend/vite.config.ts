import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from "path";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    port: 4001,
    strictPort: true,
  },
  plugins: [react(), tailwindcss(),],
  resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
},
})
