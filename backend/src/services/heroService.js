// src/services/heroService.js
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
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

const COL = "hero_sliders";

/**
 * Fetch all hero sliders
 */
export async function fetchHeroSliders() {
  const snap = await getDocs(
    query(collection(db, COL), orderBy("order", "asc")),
  );
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Create new hero slider
 */
export async function createHeroSlider(data, user) {
  const docRef = doc(collection(db, COL));
  const sliderData = {
    ...data,
    order: data.order || 0,
    isActive: data.isActive !== false,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    createdBy: user.uid,
    updatedBy: user.uid,
  };
  await setDoc(docRef, sliderData);
  await writeAuditLog(user.uid, "CREATE_HERO_SLIDER", {
    sliderId: docRef.id,
    title: data.title,
  });
  return { id: docRef.id, ...sliderData };
}

/**
 * Update hero slider
 */
export async function updateHeroSlider(id, data, user) {
  const docRef = doc(db, COL, id);
  const updateData = {
    ...data,
    updatedAt: serverTimestamp(),
    updatedBy: user.uid,
  };
  await updateDoc(docRef, updateData);
  await writeAuditLog(user.uid, "UPDATE_HERO_SLIDER", { sliderId: id });
  return { id, ...updateData };
}

/**
 * Delete hero slider
 */
export async function deleteHeroSlider(id, user) {
  const docRef = doc(db, COL, id);
  if (docRef.imageUrl) {
    try {
      const imgRef = ref(storage, docRef.imageUrl);
      await deleteObject(imgRef);
    } catch {
      // Image already deleted
    }
  }
  await deleteDoc(docRef);
  await writeAuditLog(user.uid, "DELETE_HERO_SLIDER", { sliderId: id });
}

/**
 * Upload hero slider image
 */
export async function uploadHeroImage(file, sliderId) {
  const storageRef = ref(storage, `hero_sliders/${sliderId}/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on("state_changed", null, reject, async () => {
      const url = await getDownloadURL(uploadTask.snapshot.ref);
      resolve(url);
    });
  });
}
