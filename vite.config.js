import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({

  plugins: [react()],

  server: {

    port: 80,

    allowedHosts: true,

    proxy: {

      '/data': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/history': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/input': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },

      '/export': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }

    }

  },

  base: '/monitoring/',

  build: {
    outDir: 'dist'
  }

})