// src/services/placementService.js
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

const COL = "placements";
const RECRUITER_COL = "recruiters";

/**
 * Fetch all placement records
 */
export async function fetchPlacements(user) {
  const q =
    user.role === "super_admin"
      ? collection(db, COL)
      : query(
          collection(db, COL),
          where("departmentId", "==", user.departmentId),
        );

  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Create placement record
 */
export async function createPlacement(data, user) {
  const docRef = doc(collection(db, COL));
  const placementData = {
    ...data,
    departmentId: user.departmentId || "all",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: user.uid,
  };
  await setDoc(docRef, placementData);
  await writeAuditLog(user.uid, "CREATE_PLACEMENT", { placementId: docRef.id });
  return { id: docRef.id, ...placementData };
}

/**
 * Fetch all recruiters
 */
export async function fetchRecruiters() {
  const snap = await getDocs(collection(db, RECRUITER_COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Add recruiter
 */
export async function addRecruiter(data, user) {
  const docRef = doc(collection(db, RECRUITER_COL));
  const recruiterData = {
    ...data,
    addedAt: serverTimestamp(),
    addedBy: user.uid,
  };
  await setDoc(docRef, recruiterData);
  await writeAuditLog(user.uid, "ADD_RECRUITER", {
    recruiterId: docRef.id,
    company: data.company,
  });
  return { id: docRef.id, ...recruiterData };
}

/**
 * Delete recruiter
 */
export async function deleteRecruiter(id, user) {
  await deleteDoc(doc(db, RECRUITER_COL, id));
  await writeAuditLog(user.uid, "DELETE_RECRUITER", { recruiterId: id });
}

/**
 * Upload recruiter logo
 */
export async function uploadRecruiterLogo(file, recruiterId) {
  const storageRef = ref(storage, `recruiters/${recruiterId}/logo`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on("state_changed", null, reject, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      resolve(url);
    });
  });
}

/**
 * Fetch placement statistics
 */
export async function getPlacementStats(deptId = null) {
  const q = deptId
    ? query(collection(db, COL), where("departmentId", "==", deptId))
    : collection(db, COL);

  const snap = await getDocs(q);
  const records = snap.docs.map((d) => d.data());

  const packages = records.map((r) => parseFloat(r.packageValue) || 0);

  return {
    totalPlacements: records.length,
    averagePackage:
      packages.length > 0
        ? (packages.reduce((a, b) => a + b) / packages.length).toFixed(2)
        : 0,
    highestPackage: packages.length > 0 ? Math.max(...packages) : 0,
    lowestPackage: packages.length > 0 ? Math.min(...packages) : 0,
  };
}
