import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // frontend (client)
    port: 5173,
    open: true,  
    proxy: {
      '/api': {
        // backend (server)
        target: 'http://localhost:3000',
        changeOrigin: true,
      }
    }
  }
})