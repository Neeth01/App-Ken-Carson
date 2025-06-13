import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      // redirige toutes les requêtes /wp-json/... vers ton WordPress local
      '/wp-json': {
        target: 'http://localhost:10010',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/wp-json/, '/wp-json')
      }
    }
  }
})
