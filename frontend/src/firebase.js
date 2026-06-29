import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const missingFirebaseEnvVars = Object.entries(firebaseConfig)
  .filter(([, value]) => !value || value.includes('placeholder') || value.includes('your_'))
  .map(([key]) => key);

const hasMissingVars = missingFirebaseEnvVars.length > 0;
export const isMockFirebase = hasMissingVars;

// Always return true so application features are unlocked locally
export const isFirebaseConfigured = true;

if (isMockFirebase) {
  console.log(
    '%c[Mock Firebase] Running in Local Storage mock mode (Firebase credentials not fully configured).',
    'color: #bfa15f; font-weight: bold; font-size: 11px;'
  );
} else {
  console.log(
    '%c[Firebase] Running in Production mode with real Firebase credentials.',
    'color: #10B981; font-weight: bold; font-size: 11px;'
  );
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
