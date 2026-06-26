import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Restaurant-Hotel-Interior-Lead-Portal/',
  plugins: [react()],
  server: {
    port: 3000,
    host: true, // Exposes on local network (0.0.0.0) for mobile access
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
