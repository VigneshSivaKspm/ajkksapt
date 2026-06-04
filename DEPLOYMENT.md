# Vercel Deployment Guide

This guide provides step-by-step instructions to deploy both the frontend and backend admin panels to Vercel.

## Prerequisites

- Vercel account (free or paid): https://vercel.com
- GitHub repository (already set up)
- Firebase project with credentials
- Node.js 16+ installed locally

## Environment Variables Setup

### Firebase Configuration Values

You'll need the following from your Firebase project:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

To find these values:

1. Go to Firebase Console (https://console.firebase.google.com)
2. Select your project
3. Click on Settings ⚙️ > Project Settings
4. Under "General" tab, scroll down to find your Firebase SDK configuration

---

## Frontend Deployment

### Step 1: Prepare Local Environment

```bash
cd frontend
npm install
```

### Step 2: Verify Build Works Locally

```bash
npm run build
```

This should create a `dist` folder without errors.

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy from the frontend directory
cd frontend
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 4: Add Environment Variables

1. In Vercel Dashboard, go to your project
2. Navigate to **Settings** → **Environment Variables**
3. Add all Firebase environment variables:
   ```
   VITE_FIREBASE_API_KEY=your_value
   VITE_FIREBASE_AUTH_DOMAIN=your_value
   VITE_FIREBASE_PROJECT_ID=your_value
   VITE_FIREBASE_STORAGE_BUCKET=your_value
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_value
   VITE_FIREBASE_APP_ID=your_value
   ```
4. Ensure they are set for all environments (Production, Preview, Development)

### Step 5: Deploy

1. Click "Deploy" or redeploy from git push
2. Wait for the deployment to complete
3. Your frontend will be available at the provided Vercel URL

---

## Backend Admin Panel Deployment

### Step 1: Prepare Local Environment

```bash
cd backend
npm install
```

### Step 2: Verify Build Works Locally

```bash
npm run build
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
cd backend
vercel
```

#### Option B: Using Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Configure project settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Root Directory**: `./backend` (important!)
   - **Install Command**: `npm install`

### Step 4: Add Environment Variables

Same as frontend - add all Firebase environment variables.

### Step 5: Deploy

Click "Deploy" and wait for completion.

---

## Post-Deployment Checklist

- [ ] Frontend is accessible and loads correctly
- [ ] Backend admin panel is accessible
- [ ] Firebase authentication works
- [ ] Database operations (read/write) work correctly
- [ ] File uploads to Firebase Storage work
- [ ] No console errors in browser DevTools
- [ ] Mobile responsiveness is maintained
- [ ] All routes are working correctly

## Testing After Deployment

### Frontend

```bash
# Test by navigating to your Vercel URL
# Check that all pages load correctly
# Test Firebase authentication
# Verify data fetching works
```

### Backend

```bash
# Test admin panel functionality
# Test CRUD operations
# Verify Firebase Firestore rules allow operations
# Test file uploads if applicable
```

## Troubleshooting

### Build Fails

**Solution**:

- Check that all environment variables are set correctly
- Verify `package.json` scripts are correct
- Run `npm install` and `npm run build` locally to identify the issue
- Check Vercel deployment logs for specific errors

### Blank Page After Deployment

**Solution**:

- Verify the `dist` folder is created correctly
- Check `vercel.json` routing configuration
- Ensure output directory in `vite.config` is `dist`
- Clear browser cache and do a hard refresh

### Firebase Operations Not Working

**Solution**:

- Verify all `VITE_FIREBASE_*` environment variables are correctly set
- Check Firebase Firestore rules allow your operations
- Ensure Firebase Storage rules are properly configured
- Check browser console for CORS or authentication errors

### API/Firestore Operations Fail

**Solution**:

- Verify Firebase project credentials in environment variables
- Check Firestore security rules in `firestore.rules`
- Ensure Firebase database is in the correct region
- Test with Firebase emulator locally first

## Environment Variable Validation

To validate your environment variables are being read correctly, add this temporary check in your app:

```javascript
console.log("Firebase Config loaded:", {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // Don't log sensitive data like API keys
});
```

## Redeployment

### Automatic (Recommended)

- Simply push to your main branch
- Vercel will automatically rebuild and deploy

### Manual

```bash
cd frontend  # or backend
vercel --prod
```

## Performance Optimization

The build configuration includes:

- ✅ Minification with Terser
- ✅ Console.log removal in production
- ✅ No source maps in production (smaller bundle)
- ✅ Proper asset compression

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions from Vercel

---

## Support & Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Vite Docs](https://vitejs.dev)
- [Firebase Docs](https://firebase.google.com/docs)
- [React Docs](https://react.dev)

## Notes

- Keep your `.env` files locally and never commit them
- Always use `.env.example` as a template for team members
- Verify deployments work before sharing URLs with users
- Monitor Vercel Analytics and Firebase metrics regularly
