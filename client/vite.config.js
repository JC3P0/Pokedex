import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Keep the output directory matching netlify.toml's publish path
    // (client/build), which was set up for the old react-scripts build.
    outDir: 'build',
  },
});
