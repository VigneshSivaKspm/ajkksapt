// src/services/resultsService.js
import {
  collection, addDoc, getDocs, doc, updateDoc, writeBatch,
  query, orderBy, where, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { writeAuditLog } from './authService';

const COL = 'results';

export async function fetchResults(user) {
  const col = collection(db, COL);
  const q = user.role === 'super_admin'
    ? query(col, orderBy('uploadedAt', 'desc'))
    : query(col, where('departmentId', '==', user.departmentId), orderBy('uploadedAt', 'desc'));

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Batch-write parsed CSV rows into Firestore.
 */
export async function batchUploadResults(rows, meta, user) {
  const batch = writeBatch(db);
  const col = collection(db, COL);

  rows.forEach(row => {
    const ref = doc(col);
    batch.set(ref, {
      registerNumber: row.registerNumber || row['Register Number'] || '',
      studentName: row.studentName || row['Student Name'] || '',
      semester: meta.semester,
      academicYear: meta.academicYear,
      departmentId: meta.departmentId || user.departmentId,
      marks: buildMarksMap(row),
      cgpa: parseFloat(row.cgpa || row['CGPA'] || 0),
      published: false,
      uploadedBy: user.uid,
      uploadedAt: serverTimestamp(),
    });
  });

  await batch.commit();
  await writeAuditLog(user.uid, 'BATCH_UPLOAD_RESULTS', { count: rows.length, ...meta });
}

export async function togglePublish(resultId, published, user) {
  await updateDoc(doc(db, COL, resultId), { published, updatedAt: serverTimestamp() });
  await writeAuditLog(user.uid, published ? 'PUBLISH_RESULT' : 'UNPUBLISH_RESULT', { resultId });
}

export async function batchPublishSemester(semester, academicYear, user) {
  const q = query(
    collection(db, COL),
    where('semester', '==', semester),
    where('academicYear', '==', academicYear)
  );
  const snap = await getDocs(q);
  const batch = writeBatch(db);
  snap.docs.forEach(d => batch.update(d.ref, { published: true, updatedAt: serverTimestamp() }));
  await batch.commit();
  await writeAuditLog(user.uid, 'BATCH_PUBLISH_RESULTS', { semester, academicYear, count: snap.size });
}

function buildMarksMap(row) {
  const excludeKeys = ['registerNumber', 'Register Number', 'studentName', 'Student Name', 'cgpa', 'CGPA'];
  const marks = {};
  Object.keys(row).forEach(key => {
    if (!excludeKeys.includes(key)) marks[key] = row[key];
  });
  return marks;
}

/**
 * Mock CSV parser — replace with papaparse in real usage.
 */
export function parseCSVText(text) {
  const lines = text.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  return lines.slice(1).map(line => {
    const vals = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => { obj[h] = vals[i] ?? ''; });
    return obj;
  });
}
