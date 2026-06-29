# Deployment

## Frontend: Vercel

Recommended Vercel project settings:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variable: `VITE_API_URL=https://your-render-backend-url.onrender.com`

The repository root also includes `vercel.json` so the frontend can deploy correctly if the Vercel Root Directory is left at the repository root. In that case Vercel runs `npm run build --prefix frontend` and serves `frontend/dist`.

Do not set the Vite base path to the GitHub repository name for Vercel. Vercel serves this app from `/`, so `frontend/vite.config.js` must keep `base: '/'`.

## Backend: Render

Use the root `render.yaml` blueprint, or create a Render Web Service manually with:

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/api/health`

Required Render environment variables:

- `NODE_ENV=production`
- `MONGODB_URI`
- `JWT_SECRET`
- `CLIENT_ORIGIN=https://your-vercel-frontend-url.vercel.app`
