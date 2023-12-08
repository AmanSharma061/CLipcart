import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig ({
  //proxy
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
  plugins: [react ()],
});
