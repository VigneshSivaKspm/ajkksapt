# Pre-Deployment Checklist

## Before You Deploy

### Local Testing

- [ ] Run `npm run build` in both `frontend/` and `backend/` without errors
- [ ] Run `npm run dev` locally and test all functionality
- [ ] Firebase authentication works locally
- [ ] All CRUD operations work correctly
- [ ] File uploads (if any) work properly
- [ ] No console errors or warnings
- [ ] Mobile responsive design verified

### Code Quality

- [ ] No commented-out code
- [ ] No `console.log()` debugging statements left
- [ ] Environment variables properly configured locally via `.env.local`
- [ ] `.env` files are in `.gitignore` (already done)
- [ ] No hardcoded API keys or secrets
- [ ] All dependencies are listed in `package.json`

### Firebase Setup

- [ ] Firebase project created
- [ ] Firebase Firestore database configured
- [ ] Firebase Authentication enabled
- [ ] Firebase Storage configured (if needed)
- [ ] Firestore security rules reviewed and set correctly
- [ ] Firebase credentials copied and ready

### Git Repository

- [ ] Code committed to GitHub
- [ ] Latest changes pushed to main branch
- [ ] `.gitignore` includes `node_modules/`, `dist/`, `.env`, etc.
- [ ] `.env.example` file exists (already done)
- [ ] No large files or build artifacts in repo

### Vercel Account & Project

- [ ] Vercel account created and linked to GitHub
- [ ] Vercel CLI installed globally: `npm install -g vercel`
- [ ] Project root directory identified
- [ ] Build command verified: `npm run build`
- [ ] Output directory verified: `dist`

### Environment Variables

- [ ] `VITE_FIREBASE_API_KEY` - copied from Firebase
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` - copied from Firebase
- [ ] `VITE_FIREBASE_PROJECT_ID` - copied from Firebase
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` - copied from Firebase
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` - copied from Firebase
- [ ] `VITE_FIREBASE_APP_ID` - copied from Firebase

### Vercel Configuration Files

- [ ] `vercel.json` exists in project root
- [ ] `vercel.json` has correct `buildCommand`
- [ ] `vercel.json` has correct `outputDirectory`
- [ ] `vercel.json` has SPA routing rules
- [ ] Environment variables section in `vercel.json` is correct

### Performance & Security

- [ ] Build output is minified (configured in `vite.config`)
- [ ] Source maps disabled in production (configured)
- [ ] No sensitive data in client-side code
- [ ] CORS properly configured if needed
- [ ] Firebase Firestore rules restrict unauthorized access

---

## Deployment Steps

### Frontend Deployment

1. [ ] `cd frontend && npm install`
2. [ ] `npm run build` - verify it succeeds
3. [ ] `vercel --prod` or use Vercel Dashboard
4. [ ] Add Firebase environment variables in Vercel Dashboard
5. [ ] Wait for deployment to complete
6. [ ] Test deployed frontend thoroughly

### Backend Deployment

1. [ ] `cd backend && npm install`
2. [ ] `npm run build` - verify it succeeds
3. [ ] `vercel --prod` or use Vercel Dashboard
4. [ ] Add Firebase environment variables in Vercel Dashboard
5. [ ] Set root directory to `./backend` (if monorepo)
6. [ ] Wait for deployment to complete
7. [ ] Test deployed backend admin panel

### Post-Deployment Testing

- [ ] Frontend loads without errors
- [ ] Backend admin panel accessible
- [ ] Firebase authentication works on deployed site
- [ ] Data fetch/display works correctly
- [ ] Form submissions work
- [ ] File uploads work (if applicable)
- [ ] All pages/routes accessible
- [ ] No CORS errors in console
- [ ] Performance is acceptable

---

## Monitoring After Deployment

- [ ] Check Vercel Analytics dashboard
- [ ] Monitor Firebase Firestore usage
- [ ] Monitor Firebase Storage usage
- [ ] Set up error tracking (optional: Sentry)
- [ ] Set up uptime monitoring (optional: Uptime Robot)

---

## Rollback Plan

If something goes wrong:

1. Check Vercel deployment logs
2. Review Firebase Firestore rules and security
3. Verify environment variables are correct
4. Redeploy previous version: `vercel rollback` (if needed)
5. For critical issues: Disable deployment and investigate

---

## Next Steps After Deployment

- [ ] Share deployed URLs with team
- [ ] Set up custom domain (optional)
- [ ] Enable automatic deployments on git push (default on Vercel)
- [ ] Set up staging environment (optional second Vercel project)
- [ ] Document deployment URLs and credentials
- [ ] Create monitoring alerts
- [ ] Schedule regular backups of Firebase data

---

**Last Updated**: June 4, 2026
**Project**: AJKKSAPT CMS
