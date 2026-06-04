// src/services/galleryService.js
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
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../firebase/config";
import { writeAuditLog } from "./authService";

const COL = "galleries";

/**
 * Fetch all galleries
 */
export async function fetchGalleries() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch gallery by category
 */
export async function fetchGalleryByCategory(category) {
  const snap = await getDocs(
    query(collection(db, COL), where("category", "==", category)),
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Create gallery
 */
export async function createGallery(data, user) {
  const docRef = doc(collection(db, COL));
  const galleryData = {
    ...data,
    category: data.category || "general",
    items: data.items || [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: user.uid,
  };
  await setDoc(docRef, galleryData);
  await writeAuditLog(user.uid, "CREATE_GALLERY", {
    galleryId: docRef.id,
    title: data.title,
  });
  return { id: docRef.id, ...galleryData };
}

/**
 * Add item to gallery
 */
export async function addGalleryItem(galleryId, itemData, user) {
  const docRef = doc(db, COL, galleryId);
  const galleryDoc = await getDocs(
    query(collection(db, COL), where("__name__", "==", galleryId)),
  );
  const current = galleryDoc.docs[0]?.data();
  const items = current?.items || [];

  await updateDoc(docRef, {
    items: [...items, { ...itemData, addedAt: serverTimestamp() }],
    updatedAt: serverTimestamp(),
  });
  await writeAuditLog(user.uid, "ADD_GALLERY_ITEM", { galleryId });
}

/**
 * Upload gallery image
 */
export async function uploadGalleryImage(file, galleryId) {
  const storageRef = ref(
    storage,
    `galleries/${galleryId}/${Date.now()}_${file.name}`,
  );
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on("state_changed", null, reject, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      resolve(url);
    });
  });
}

/**
 * Delete gallery
 */
export async function deleteGallery(id, user) {
  await deleteDoc(doc(db, COL, id));
  await writeAuditLog(user.uid, "DELETE_GALLERY", { galleryId: id });
}
