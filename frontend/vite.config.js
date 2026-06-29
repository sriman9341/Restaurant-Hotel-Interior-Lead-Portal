import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env variables from the frontend folder
  const env = loadEnv(mode, process.cwd(), '')

  const firebaseConfig = {
    apiKey: env.VITE_FIREBASE_API_KEY,
    authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIREBASE_APP_ID
  }

  const missingFirebaseEnvVars = Object.entries(firebaseConfig)
    .filter(([, value]) => !value || value.includes('placeholder') || value.includes('your_'))
    .map(([key]) => key)

  const useMock = missingFirebaseEnvVars.length > 0

  return {
    base: './',
    plugins: [react()],
    resolve: {
      alias: useMock ? {
        'firebase/app': path.resolve(__dirname, 'src/mocks/firebase-app.js'),
        'firebase/auth': path.resolve(__dirname, 'src/mocks/firebase-auth.js'),
        'firebase/firestore': path.resolve(__dirname, 'src/mocks/firebase-firestore.js'),
        'firebase/storage': path.resolve(__dirname, 'src/mocks/firebase-storage.js'),
      } : {}
    },
    server: {
      port: 3000,
      host: true
    }
  }
})
