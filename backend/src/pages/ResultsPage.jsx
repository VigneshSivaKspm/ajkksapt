import { useState, useEffect, useRef } from 'react';
import {
  Upload, FileText, CheckCircle, XCircle, Eye,
  EyeOff, Trash2, RefreshCw, ChevronRight,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { parseCSVText, togglePublish, batchPublishSemester } from '../services/resultsService';
import toast from 'react-hot-toast';

const MOCK_RESULTS = [
  { id: '1', registerNumber: '21CS001', studentName: 'Arun Prakash',  semester: 4, academicYear: '2023-24', cgpa: 8.5,  published: true,  departmentId: 'CSE' },
  { id: '2', registerNumber: '21CS002', studentName: 'Bharathi R.',   semester: 4, academicYear: '2023-24', cgpa: 7.2,  published: true,  departmentId: 'CSE' },
  { id: '3', registerNumber: '21CS003', studentName: 'Chandan K.',    semester: 4, academicYear: '2023-24', cgpa: 9.1,  published: false, departmentId: 'CSE' },
  { id: '4', registerNumber: '21EC001', studentName: 'Divya Menon',   semester: 4, academicYear: '2023-24', cgpa: 8.0,  published: false, departmentId: 'ECE' },
];

export default function ResultsPage() {
  const { user }       = useAuth();
  const [results, setResults]       = useState([]);
  const [loading, setLoading]       = useState(true);
  const [isDragging, setDragging]   = useState(false);
  const [parsedRows, setParsed]     = useState([]);
  const [uploading, setUploading]   = useState(false);
  const [meta, setMeta]             = useState({ semester: '', academicYear: '', departmentId: '' });
  const fileRef = useRef();

  useEffect(() => {
    setTimeout(() => { setResults(MOCK_RESULTS); setLoading(false); }, 500);
  }, []);

  function handleDrop(e) {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) readFile(file);
  }

  function readFile(file) {
    if (!file.name.endsWith('.csv')) { toast.error('Please upload a .csv file.'); return; }
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const rows = parseCSVText(ev.target.result);
        if (rows.length === 0) { toast.error('CSV appears empty.'); return; }
        setParsed(rows);
        toast.success(`Parsed ${rows.length} rows. Review and upload.`);
      } catch {
        toast.error('Failed to parse CSV.');
      }
    };
    reader.readAsText(file);
  }

  async function handleUpload() {
    if (!meta.semester || !meta.academicYear) { toast.error('Fill semester and academic year.'); return; }
    setUploading(true);
    try {
      // await batchUploadResults(parsedRows, meta, user);
      const newRows = parsedRows.map((r, i) => ({
        id: `new_${i}`,
        registerNumber: r['Register Number'] || r.registerNumber || `REG${i}`,
        studentName:    r['Student Name'] || r.studentName || `Student ${i}`,
        semester:       parseInt(meta.semester),
        academicYear:   meta.academicYear,
        cgpa:           parseFloat(r['CGPA'] || r.cgpa || 0),
        published:      false,
        departmentId:   meta.departmentId || user?.departmentId || 'N/A',
      }));
      setResults(prev => [...newRows, ...prev]);
      setParsed([]);
      toast.success(`Uploaded ${newRows.length} results as draft.`);
    } catch {
      toast.error('Upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function handleToggle(result) {
    try {
      // await togglePublish(result.id, !result.published, user);
      setResults(prev => prev.map(r => r.id === result.id ? { ...r, published: !r.published } : r));
      toast.success(result.published ? 'Result unpublished.' : 'Result published.');
    } catch {
      toast.error('Failed to update publish state.');
    }
  }

  async function handleBatchPublish() {
    if (!meta.semester || !meta.academicYear) { toast.error('Set semester & year first.'); return; }
    try {
      setResults(prev => prev.map(r =>
        r.semester === parseInt(meta.semester) && r.academicYear === meta.academicYear
          ? { ...r, published: true } : r
      ));
      toast.success('Batch published successfully.');
    } catch {
      toast.error('Batch publish failed.');
    }
  }

  const inputCls = 'bg-surface-700 border border-surface-500 rounded-lg px-3 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors';

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Results Management</h1>
          <p className="text-surface-400 text-sm mt-0.5">Upload, review, and publish student results</p>
        </div>
        <button onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 500); }}
          className="p-2 rounded-lg bg-surface-700 border border-surface-500 text-surface-400 hover:text-white transition-colors">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Upload zone */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl p-5 space-y-4">
        <p className="text-sm font-medium text-white">Upload Results CSV</p>

        {/* Meta inputs */}
        <div className="grid grid-cols-3 gap-3">
          <input className={inputCls} placeholder="Semester (e.g. 4)" value={meta.semester}
            onChange={e => setMeta(p => ({ ...p, semester: e.target.value }))} />
          <input className={inputCls} placeholder="Academic Year (e.g. 2023-24)" value={meta.academicYear}
            onChange={e => setMeta(p => ({ ...p, academicYear: e.target.value }))} />
          <input className={inputCls} placeholder="Department ID" value={meta.departmentId}
            onChange={e => setMeta(p => ({ ...p, departmentId: e.target.value }))} />
        </div>

        {/* Drop zone */}
        <div
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileRef.current?.click()}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200
            ${isDragging
              ? 'border-brand-500 bg-brand-500/10'
              : 'border-surface-500 hover:border-brand-500/50 hover:bg-surface-700/50'}
          `}
        >
          <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={e => readFile(e.target.files[0])} />
          <Upload size={32} className={`mx-auto mb-3 ${isDragging ? 'text-brand-400' : 'text-surface-500'}`} />
          <p className="text-sm text-surface-300">Drag & drop a <span className="text-brand-400 font-medium">.csv</span> file here</p>
          <p className="text-xs text-surface-500 mt-1">or click to browse · Expected columns: Register Number, Student Name, CGPA, subjects…</p>
        </div>

        {/* Parsed preview */}
        {parsedRows.length > 0 && (
          <div className="space-y-3 animate-slide-up">
            <div className="flex items-center justify-between">
              <p className="text-sm text-green-400 flex items-center gap-2">
                <CheckCircle size={14} /> {parsedRows.length} rows parsed
              </p>
              <div className="flex gap-2">
                <button onClick={() => setParsed([])} className="text-xs px-3 py-1.5 rounded-lg bg-surface-700 border border-surface-500 text-surface-300 hover:text-red-400 transition-colors flex items-center gap-1">
                  <Trash2 size={12} /> Clear
                </button>
                <button onClick={handleUpload} disabled={uploading}
                  className="text-xs px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white transition-colors flex items-center gap-1">
                  {uploading ? 'Uploading…' : <><Upload size={12} /> Upload as Draft</>}
                </button>
              </div>
            </div>
            {/* Preview table */}
            <div className="overflow-x-auto rounded-lg border border-surface-600 max-h-48">
              <table className="w-full text-xs">
                <thead className="bg-surface-700 sticky top-0">
                  <tr>
                    {Object.keys(parsedRows[0]).map(k => (
                      <th key={k} className="px-3 py-2 text-left text-surface-400 font-medium">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-700">
                  {parsedRows.slice(0, 5).map((row, i) => (
                    <tr key={i} className="hover:bg-surface-700/40">
                      {Object.values(row).map((v, j) => (
                        <td key={j} className="px-3 py-2 text-surface-300 font-mono">{v}</td>
                      ))}
                    </tr>
                  ))}
                  {parsedRows.length > 5 && (
                    <tr><td colSpan={100} className="px-3 py-2 text-center text-surface-500">…and {parsedRows.length - 5} more rows</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Batch controls */}
      {user?.role !== 'staff' && (
        <div className="flex items-center gap-3 p-4 bg-surface-800 border border-surface-600 rounded-xl">
          <p className="text-sm text-surface-400 flex-1">Batch-publish all results for Sem <strong className="text-white">{meta.semester || '?'}</strong> / <strong className="text-white">{meta.academicYear || '?'}</strong></p>
          <button onClick={handleBatchPublish}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm transition-colors">
            <CheckCircle size={15} /> Batch Publish
          </button>
        </div>
      )}

      {/* Results list */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-surface-600 flex items-center justify-between">
          <p className="text-sm font-medium text-white">Result Records</p>
          <span className="font-mono text-xs text-surface-500">{results.length} total</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600">
                {['Reg No.', 'Student Name', 'Sem', 'Year', 'Dept', 'CGPA', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {loading
                ? [...Array(4)].map((_, i) => (
                  <tr key={i}>{[...Array(8)].map((_, j) => (
                    <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700 rounded animate-pulse w-16" /></td>
                  ))}</tr>
                ))
                : results.map(r => (
                  <tr key={r.id} className="hover:bg-surface-700/40 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-brand-400">{r.registerNumber}</td>
                    <td className="px-4 py-3 text-white font-medium">{r.studentName}</td>
                    <td className="px-4 py-3 text-surface-400">{r.semester}</td>
                    <td className="px-4 py-3 font-mono text-xs text-surface-400">{r.academicYear}</td>
                    <td className="px-4 py-3 font-mono text-xs text-surface-400">{r.departmentId}</td>
                    <td className="px-4 py-3">
                      <span className={`font-mono text-sm font-medium ${r.cgpa >= 8 ? 'text-green-400' : r.cgpa >= 6 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {r.cgpa.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${r.published ? 'bg-green-500/15 text-green-400 border-green-500/25' : 'bg-surface-700 text-surface-400 border-surface-500'}`}>
                        {r.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {user?.role !== 'staff' && (
                        <button onClick={() => handleToggle(r)}
                          className="p-1.5 rounded-lg hover:bg-surface-600 text-surface-400 hover:text-white transition-colors">
                          {r.published ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
