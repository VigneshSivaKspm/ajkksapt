// src/services/staffService.js
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { writeAuditLog } from "./authService";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

const COL = "staff";
const PERMISSIONS_COL = "staff_permissions";

/**
 * Fetch all staff
 */
export async function fetchAllStaff() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch staff by department
 */
export async function fetchStaffByDept(deptId) {
  const snap = await getDocs(
    query(collection(db, COL), where("departmentId", "==", deptId)),
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Create staff account
 */
export async function createStaffAccount(data, user) {
  // Create Firebase auth user
  const authUser = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password,
  );

  const staffData = {
    uid: authUser.user.uid,
    name: data.name,
    email: data.email,
    phone: data.phone || "",
    role: data.role || "staff_user", // super_admin, dept_admin, staff_user
    departmentId: data.departmentId || null,
    designation: data.designation || "",
    isActive: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: user.uid,
  };

  const docRef = doc(collection(db, COL));
  await setDoc(docRef, staffData);

  // Set default permissions
  if (data.permissions) {
    await setStaffPermissions(authUser.user.uid, data.permissions, user);
  }

  await writeAuditLog(user.uid, "CREATE_STAFF_ACCOUNT", {
    staffId: docRef.id,
    email: data.email,
  });
  return { id: docRef.id, ...staffData };
}

/**
 * Update staff
 */
export async function updateStaff(id, data, user) {
  const docRef = doc(db, COL, id);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  await writeAuditLog(user.uid, "UPDATE_STAFF", { staffId: id });
}

/**
 * Delete staff
 */
export async function deleteStaff(id, user) {
  await deleteDoc(doc(db, COL, id));
  await writeAuditLog(user.uid, "DELETE_STAFF", { staffId: id });
}

/**
 * Set staff permissions
 */
export async function setStaffPermissions(uid, permissions, user) {
  const docRef = doc(db, PERMISSIONS_COL, uid);
  await setDoc(
    docRef,
    {
      ...permissions,
      updatedAt: serverTimestamp(),
      updatedBy: user.uid,
    },
    { merge: true },
  );
  await writeAuditLog(user.uid, "SET_STAFF_PERMISSIONS", { uid });
}

/**
 * Get staff permissions
 */
export async function getStaffPermissions(uid) {
  const snap = await getDocs(
    query(collection(db, PERMISSIONS_COL), where("__name__", "==", uid)),
  );
  return snap.docs[0]?.data() || getDefaultPermissions();
}

/**
 * Default permissions template
 */
function getDefaultPermissions() {
  return {
    canManageContent: false,
    canManageStaff: false,
    canManageResults: false,
    canManageLeads: false,
    canViewAnalytics: false,
    canManagePlacement: false,
    canManageDepartment: false,
  };
}
