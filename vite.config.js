import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // O app é publicado em andsouzadev.com/previsao-tempo/
  base: '/previsao-tempo/',
})
