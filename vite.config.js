import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],

  server: {

    port: 80,

    allowedHosts: true,

    proxy: {

      '/data': {
        target: 'https://health-monitor-6ls3.onrender.com',
        changeOrigin: true
      },

      '/history': {
        target: 'https://health-monitor-6ls3.onrender.com',
        changeOrigin: true
      },

      '/input': {
        target: 'https://health-monitor-6ls3.onrender.com',
        changeOrigin: true
      },

      '/export': {
        target: 'https://health-monitor-6ls3.onrender.com',
        changeOrigin: true
      }

    }

  },

  build: {
    outDir: 'dist'
  }

})