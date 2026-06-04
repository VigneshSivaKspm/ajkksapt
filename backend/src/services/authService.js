// src/services/authService.js
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase/config";

/**
 * Sign in and return enriched user object with role data.
 */
export async function loginUser(email, password) {
  // TEMPORARY TEST CREDENTIALS - Remove before production
  const testUsers = {
    "admin@test.com": {
      password: "admin123",
      uid: "test-admin-uid-12345",
      email: "admin@test.com",
      role: "super_admin",
      name: "Test Admin",
      departmentId: "admin",
    },
    "user@test.com": {
      password: "user123",
      uid: "test-user-uid-67890",
      email: "user@test.com",
      role: "content_manager",
      name: "Test User",
      departmentId: "dept-001",
    },
  };

  if (testUsers[email] && testUsers[email].password === password) {
    console.warn("⚠️ Using test credentials - REMOVE BEFORE PRODUCTION");
    const testUser = testUsers[email];
    // Store test user in localStorage for persistence across auth subscription
    localStorage.setItem("__test_user", JSON.stringify(testUser));
    return testUser;
  }

  // Clear test user if logging in with real credentials
  localStorage.removeItem("__test_user");

  const credential = await signInWithEmailAndPassword(auth, email, password);
  const userDoc = await getDoc(doc(db, "users", credential.user.uid));

  if (!userDoc.exists()) {
    await signOut(auth);
    throw new Error("User profile not found. Contact your administrator.");
  }

  const profile = userDoc.data();

  // Write audit log
  await writeAuditLog(credential.user.uid, "LOGIN", { email });

  return { uid: credential.user.uid, ...profile };
}

/**
 * Sign out and write audit log.
 */
export async function logoutUser(uid) {
  if (uid) await writeAuditLog(uid, "LOGOUT", {});
  localStorage.removeItem("__test_user");
  await signOut(auth);
}

/**
 * Subscribe to auth state changes and resolve full profile.
 */
export function subscribeToAuthState(callback) {
  // Check for test user first
  const testUserData = localStorage.getItem("__test_user");
  if (testUserData) {
    try {
      const testUser = JSON.parse(testUserData);
      callback(testUser);
    } catch {
      callback(null);
    }
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    // If test user exists in localStorage, ignore Firebase changes and use test user
    const testUserData = localStorage.getItem("__test_user");
    if (testUserData) {
      try {
        callback(JSON.parse(testUserData));
      } catch {
        callback(null);
      }
      return;
    }

    if (!firebaseUser) {
      callback(null);
      return;
    }
    try {
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      if (userDoc.exists()) {
        callback({ uid: firebaseUser.uid, ...userDoc.data() });
      } else {
        callback(null);
      }
    } catch {
      callback(null);
    }
  });
}

/**
 * Append an entry to /audit_logs.
 */
export async function writeAuditLog(uid, action, meta = {}) {
  try {
    const ref = doc(db, "audit_logs", `${uid}_${Date.now()}`);
    await setDoc(ref, {
      uid,
      action,
      meta,
      timestamp: serverTimestamp(),
    });
  } catch {
    // Silently fail — audit logging should never break main flow
  }
}
