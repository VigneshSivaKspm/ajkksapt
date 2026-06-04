// src/services/leadsService.js
import {
  collection, addDoc, getDocs, doc, updateDoc,
  query, orderBy, where, serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase/config';
import { writeAuditLog } from './authService';

const COL = 'leads';

export async function fetchLeads(user) {
  const col = collection(db, COL);
  const q = user.role === 'super_admin'
    ? query(col, orderBy('timestamp', 'desc'))
    : query(col, where('departmentId', '==', user.departmentId), orderBy('timestamp', 'desc'));

  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function createLead(data, user) {
  const ref = await addDoc(collection(db, COL), {
    ...data,
    status: 'New',
    timestamp: serverTimestamp(),
    createdBy: user.uid,
  });
  await writeAuditLog(user.uid, 'CREATE_LEAD', { leadId: ref.id });
  return ref.id;
}

export async function updateLeadStatus(leadId, status, user) {
  await updateDoc(doc(db, COL, leadId), { status, updatedAt: serverTimestamp() });
  await writeAuditLog(user.uid, 'UPDATE_LEAD_STATUS', { leadId, status });
}

export function exportLeadsToCSV(leads) {
  const headers = ['Name', 'Email', 'Phone', 'Type', 'Department', 'Status', 'Date'];
  const rows = leads.map(l => [
    l.name, l.email, l.phone, l.type,
    l.departmentId, l.status,
    l.timestamp?.toDate?.()?.toLocaleDateString() ?? '',
  ]);
  const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `leads_export_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
