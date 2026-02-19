import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// IMPORTANT: Change '/Dilucia/' to match your GitHub repository name
// If your repo is named 'my-love-app', change it to '/my-love-app/'
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/Dilucia/' : '/',
})
