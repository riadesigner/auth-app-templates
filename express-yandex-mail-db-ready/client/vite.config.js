import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({  
  plugins: [react()],
  server: {
    host: mode === 'development' ? '0.0.0.0' : false,
    port: 5173,
    strictPort: true,
    watch: {
      usePolling: mode === 'development',
      interval: 2000, 
    },
    proxy: {
      '/api': {
        target: 'http://server:3000',
        changeOrigin: true
      }
    }
  }
}))