// src/services/departmentService.js
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/config";
import { writeAuditLog } from "./authService";

const COL = "departments";

/**
 * Fetch all departments
 */
export async function fetchAllDepartments() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch department by ID
 */
export async function fetchDepartmentById(id) {
  const snap = await getDocs(
    query(collection(db, COL), where("__name__", "==", id)),
  );
  return snap.docs[0]?.data() || null;
}

/**
 * Create department
 */
export async function createDepartment(data, user) {
  const docRef = doc(collection(db, COL));
  const deptData = {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: user.uid,
  };
  await setDoc(docRef, deptData);
  await writeAuditLog(user.uid, "CREATE_DEPARTMENT", {
    deptId: docRef.id,
    name: data.name,
  });
  return { id: docRef.id, ...deptData };
}

/**
 * Update department
 */
export async function updateDepartment(id, data, user) {
  const docRef = doc(db, COL, id);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
  await writeAuditLog(user.uid, "UPDATE_DEPARTMENT", { deptId: id });
}

/**
 * Delete department
 */
export async function deleteDepartment(id, user) {
  await deleteDoc(doc(db, COL, id));
  await writeAuditLog(user.uid, "DELETE_DEPARTMENT", { deptId: id });
}

/**
 * Add faculty member to department
 */
export async function addFacultyToDept(deptId, faculty, user) {
  const docRef = doc(db, COL, deptId);
  const deptDoc = await getDocs(
    query(collection(db, COL), where("__name__", "==", deptId)),
  );
  const current = deptDoc.docs[0]?.data();
  const faculty_list = current?.faculty || [];

  await updateDoc(docRef, {
    faculty: [...faculty_list, { ...faculty, addedAt: serverTimestamp() }],
    updatedAt: serverTimestamp(),
  });
  await writeAuditLog(user.uid, "ADD_FACULTY", {
    deptId,
    facultyName: faculty.name,
  });
}

/**
 * Upload department image
 */
export async function uploadDeptImage(file, deptId) {
  const storageRef = ref(storage, `departments/${deptId}/image`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on("state_changed", null, reject, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      resolve(url);
    });
  });
}
