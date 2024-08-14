import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'SiTunting',
        short_name: 'SiTunting',
        description: 'A Website to Automate Toodlers Data Recording',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'situnting.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'situnting.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
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
      enums: '/src/enums',
    },
  },
});
