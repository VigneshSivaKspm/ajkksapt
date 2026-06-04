// src/services/contentService.js
import {
  collection, getDocs, doc, setDoc, updateDoc,
  deleteDoc, serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../firebase/config';
import { writeAuditLog } from './authService';

const COL = 'content';

export async function fetchAllContent() {
  const snap = await getDocs(collection(db, COL));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function upsertContent(id, data, user) {
  const ref2 = doc(db, COL, id);
  await setDoc(ref2, { ...data, updatedAt: serverTimestamp(), updatedBy: user.uid }, { merge: true });
  await writeAuditLog(user.uid, 'UPSERT_CONTENT', { contentId: id });
}

export async function deleteContent(id, user) {
  await deleteDoc(doc(db, COL, id));
  await writeAuditLog(user.uid, 'DELETE_CONTENT', { contentId: id });
}

/**
 * Upload a file to Firebase Storage with progress callback.
 * @param {File} file
 * @param {string} path  e.g. 'banners/hero.jpg'
 * @param {(pct: number) => void} onProgress
 * @returns {Promise<string>} download URL
 */
export function uploadFile(file, path, onProgress) {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, path);
    const task = uploadBytesResumable(storageRef, file);

    task.on(
      'state_changed',
      snapshot => {
        const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        onProgress?.(pct);
      },
      reject,
      async () => {
        const url = await getDownloadURL(task.snapshot.ref);
        resolve(url);
      }
    );
  });
}

export async function removeStorageFile(path) {
  await deleteObject(ref(storage, path));
}
