import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5210, strictPort: true },
  preview: { port: 5211, strictPort: true },
})
