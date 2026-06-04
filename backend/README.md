# AJKKSAPT — Campus Management System

A full-stack React + Firebase Admin Dashboard for campus management.

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS + Lucide React
- **Backend**: Firebase (Firestore, Auth, Storage)
- **Fonts**: Syne (display) + IBM Plex Sans + IBM Plex Mono

---

## Quick Start

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Firebase

Edit `src/firebase/config.js` and replace the placeholder values with your actual Firebase project config:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

You can find these values in the Firebase Console → Project Settings → Your apps.

### 3. Deploy Firestore Security Rules

```bash
firebase deploy --only firestore:rules
```

(Requires Firebase CLI: `npm install -g firebase-tools`)

### 4. Create your first Super Admin user

In the Firebase Console:

1. Go to **Authentication** → Add user (email/password)
2. Go to **Firestore** → Create `/users/{uid}` document:

```json
{
  "uid": "<firebase-auth-uid>",
  "email": "admin@yourschool.edu",
  "name": "Super Admin",
  "role": "super_admin",
  "departmentId": null,
  "createdAt": <timestamp>
}
```

### 5. Run locally

```bash
npm run dev
```

---

## Project Structure

```
src/
├── firebase/
│   └── config.js           # Firebase initialisation
├── services/
│   ├── authService.js       # Login, logout, audit logging
│   ├── leadsService.js      # CRUD for leads + CSV export
│   ├── resultsService.js    # Batch upload + publish control
│   └── contentService.js   # CMS + Firebase Storage uploads
├── hooks/
│   └── useAuth.jsx          # Auth context + role helpers
├── pages/
│   ├── LoginPage.jsx
│   ├── OverviewPage.jsx     # Super admin analytics
│   ├── LeadsPage.jsx        # Lead table + status management
│   ├── ResultsPage.jsx      # CSV upload + results control
│   ├── ContentPage.jsx      # CMS editor
│   └── AuditPage.jsx        # Audit log viewer
├── components/
│   └── shared/
│       ├── DashboardLayout.jsx
│       └── LoadingScreen.jsx
└── App.jsx                  # Routes + protected routes
```

---

## Roles

| Role          | Description                               |
| ------------- | ----------------------------------------- |
| `super_admin` | Full access — all pages, all data         |
| `dept_admin`  | Department-scoped read/write              |
| `staff`       | Limited write (draft only), no publishing |

---

## Firestore Collections

- `/users` — Admin profiles with roles
- `/leads` — Admission/contact enquiries
- `/results` — Student academic results
- `/content` — CMS content nodes
- `/audit_logs` — Immutable system event log

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to Firebase Hosting, Vercel, or any static host.
