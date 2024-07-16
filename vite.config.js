import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      assets: '/src/assets',
      components: '/src/components',
      pages: '/src/pages',
      configs: '/src/configs',
      services: '/src/services',
      utils: '/src/utils',
      styles: '/src/styles',
      hooks: '/src/hooks',
      context: '/src/context',
      enums: '/src/enums'
    },
  },
});
