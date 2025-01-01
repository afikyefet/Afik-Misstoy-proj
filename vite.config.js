import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/afik-miss-toy-proj/', // Set your repository name here
  plugins: [react()],
});