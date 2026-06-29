import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const missingFirebaseEnvVars = Object.entries(firebaseConfig)
  .filter(([, value]) => !value || value.includes('placeholder') || value.includes('your_'))
  .map(([key]) => key);

export const isFirebaseConfigured = missingFirebaseEnvVars.length === 0;
export const isMockFirebase = !isFirebaseConfigured;

if (isMockFirebase) {
  console.warn(
    '%c[Mock Firebase] Firebase credentials not fully configured. Using mock providers or limited functionality.',
    'color: #bfa15f; font-weight: bold; font-size: 11px;'
  );
  console.warn('Missing Firebase env vars:', missingFirebaseEnvVars.join(', '));
} else {
  console.info('%c[Firebase] Using project:', 'color: #10B981; font-weight: bold; font-size: 11px;', firebaseConfig.projectId);
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
