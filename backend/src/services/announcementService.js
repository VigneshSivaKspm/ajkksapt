// src/services/announcementService.js
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { writeAuditLog } from "./authService";

const COL = "announcements";

/**
 * Fetch recent announcements
 */
export async function fetchAnnouncements(limitCount = 50) {
  const snap = await getDocs(
    query(collection(db, COL), orderBy("createdAt", "desc"), limit(limitCount)),
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Create announcement
 */
export async function createAnnouncement(data, user) {
  const docRef = doc(collection(db, COL));
  const announcementData = {
    ...data,
    type: data.type || "notice", // notice, news, event, urgent
    isPinned: data.isPinned || false,
    isPublished: data.isPublished !== false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: user.uid,
    updatedBy: user.uid,
  };
  await setDoc(docRef, announcementData);
  await writeAuditLog(user.uid, "CREATE_ANNOUNCEMENT", {
    announcementId: docRef.id,
    type: data.type,
  });
  return { id: docRef.id, ...announcementData };
}

/**
 * Update announcement
 */
export async function updateAnnouncement(id, data, user) {
  const docRef = doc(db, COL, id);
  const updateData = {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: user.uid,
  };
  await updateDoc(docRef, updateData);
  await writeAuditLog(user.uid, "UPDATE_ANNOUNCEMENT", { announcementId: id });
}

/**
 * Delete announcement
 */
export async function deleteAnnouncement(id, user) {
  await deleteDoc(doc(db, COL, id));
  await writeAuditLog(user.uid, "DELETE_ANNOUNCEMENT", { announcementId: id });
}

/**
 * Pin/unpin announcement
 */
export async function togglePinAnnouncement(id, isPinned, user) {
  await updateDoc(doc(db, COL, id), { isPinned });
  await writeAuditLog(user.uid, "TOGGLE_PIN_ANNOUNCEMENT", {
    announcementId: id,
    isPinned,
  });
}
