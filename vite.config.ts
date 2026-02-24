import { defineConfig } from 'vite';

export default defineConfig({
  base: './', // GitHub Pages uses relative paths
  build: {
    outDir: 'dist',
  },
});
