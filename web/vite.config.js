import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// ✅ Resolve to your shared firebase file
const firebaseWebPath = path.resolve(__dirname, '../shared/firebase/firebase.web.js');

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@firebaseweb': firebaseWebPath,
    }
  },
  optimizeDeps: {
    include: [
      'firebase/app',
      'firebase/auth',
      'firebase/firestore'
    ]
  },
  server: {
    fs: {
      allow: [
        '..'
      ]
    }
  }
});
