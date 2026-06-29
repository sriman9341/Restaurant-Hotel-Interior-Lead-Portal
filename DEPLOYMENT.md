# Deployment

## Frontend: Vercel with Firebase

This repository is now a frontend-only Vite application using Firebase Authentication and Firestore.

Recommended Vercel project settings:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

If deploying from the repository root, `vercel.json` is configured to run `npm run build --prefix frontend` and serve `frontend/dist`.

### Required Firebase Environment Variables

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### Local development

Create `frontend/.env` with the same Firebase values for local testing.

If you use Vercel or production, also add these values to your project environment variables.

### Removed backend

- Express backend removed
- MongoDB / Mongoose removed
- JWT auth removed
- API routes removed
- Render backend deployment removed
- Backend folder deleted
