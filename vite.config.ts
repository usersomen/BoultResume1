import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['pdfjs-dist/build/pdf.worker.min.js']
  },
  build: {
    rollupOptions: {
      external: ['pdfjs-dist/build/pdf.worker.min.js']
    }
  }
});
