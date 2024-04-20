import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from "tailwindcss";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components', 
      '@routes': '/src/routes',
      '@utils': '/src/utils'
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
