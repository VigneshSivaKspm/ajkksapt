# Vercel Quick Start

## 5-Minute Deployment Setup

### 1. Get Firebase Credentials

- Go to Firebase Console → Project Settings
- Copy all Firebase SDK values (API Key, Project ID, etc.)

### 2. Deploy Frontend

```bash
cd frontend
vercel --prod
```

- When prompted, select your GitHub account
- Set project name (e.g., `ajkksapt-frontend`)
- Root directory: `./frontend` (if deploying from root)

Add environment variables in Vercel Dashboard:

```
VITE_FIREBASE_API_KEY=xxx
VITE_FIREBASE_AUTH_DOMAIN=xxx
VITE_FIREBASE_PROJECT_ID=xxx
VITE_FIREBASE_STORAGE_BUCKET=xxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxx
VITE_FIREBASE_APP_ID=xxx
```

### 3. Deploy Backend

```bash
cd backend
vercel --prod
```

- Project name: `ajkksapt-admin` (or similar)
- Root directory: `./backend` (if deploying from root)
- Add same Firebase environment variables

### 4. Test

- [ ] Frontend loads at Vercel URL
- [ ] Backend admin panel accessible
- [ ] Login with Firebase works
- [ ] Database operations work

## URLs After Deployment

- **Frontend**: `https://ajkksapt-frontend.vercel.app` (your URL)
- **Admin Panel**: `https://ajkksapt-admin.vercel.app` (your URL)

## Redeploy After Code Changes

```bash
# Just push to GitHub - Vercel redeploys automatically
git push origin main
```

## Common Issues & Fixes

| Issue          | Solution                                         |
| -------------- | ------------------------------------------------ |
| Build fails    | Check `npm run build` works locally              |
| Blank page     | Clear cache, hard refresh (Ctrl+Shift+R)         |
| Firebase error | Verify environment variables in Vercel Dashboard |
| 404 on routes  | Check SPA routing in `vercel.json`               |

## Environment Variables Template

```bash
# Copy from Firebase Console
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=ajkksapt.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=ajkksapt
VITE_FIREBASE_STORAGE_BUCKET=ajkksapt.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=12345...
VITE_FIREBASE_APP_ID=1:12345:web:abcdef...
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
