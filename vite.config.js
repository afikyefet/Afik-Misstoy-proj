import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Afik-Misstoy-proj/', // Set your repository name here
  plugins: [react()],
});