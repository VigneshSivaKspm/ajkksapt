import { useState, useEffect, useRef } from 'react';
import {
  Image, Bell, MessageSquare, BarChart2, BookOpen,
  FileDown, Plus, Trash2, Save, Upload, Check,
  ChevronRight, Layers,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { uploadFile } from '../services/contentService';
import toast from 'react-hot-toast';

const SECTIONS = [
  { id: 'banners',       label: 'Hero Banners',     icon: Image          },
  { id: 'notices',       label: 'Scrolling Notices', icon: Bell           },
  { id: 'messages',      label: 'Admin Messages',    icon: MessageSquare  },
  { id: 'stats',         label: 'Stats Counters',    icon: BarChart2      },
  { id: 'gallery',       label: 'Gallery',           icon: Layers         },
  { id: 'downloads',     label: 'Downloads (PDF)',   icon: FileDown       },
];

const MOCK_DATA = {
  banners:   [{ id: 1, title: 'Admissions Open 2024', subtitle: 'Apply now for excellence', imageUrl: '' }],
  notices:   [{ id: 1, text: 'Last date for fee payment: 30 March 2024' }, { id: 2, text: 'Sports Day on 15 April' }],
  messages:  [{ id: 1, author: 'Principal', message: 'Welcome to a new academic year!' }],
  stats:     [{ id: 1, label: 'Students', value: '4200+' }, { id: 2, label: 'Faculty', value: '180+' }, { id: 3, label: 'Placed', value: '92%' }],
  gallery:   [{ id: 1, title: 'Campus View', imageUrl: '' }],
  downloads: [{ id: 1, title: 'B.E CSE Syllabus 2024', fileUrl: '', size: '1.2 MB' }],
};

export default function ContentPage() {
  const { user } = useAuth();
  const [active, setActive]       = useState('banners');
  const [data, setData]           = useState(MOCK_DATA);
  const [saving, setSaving]       = useState(false);
  const [uploadPct, setUploadPct] = useState(null);
  const fileRef = useRef();

  function addItem() {
    const templates = {
      banners:   { id: Date.now(), title: '', subtitle: '', imageUrl: '' },
      notices:   { id: Date.now(), text: '' },
      messages:  { id: Date.now(), author: '', message: '' },
      stats:     { id: Date.now(), label: '', value: '' },
      gallery:   { id: Date.now(), title: '', imageUrl: '' },
      downloads: { id: Date.now(), title: '', fileUrl: '', size: '' },
    };
    setData(prev => ({ ...prev, [active]: [...prev[active], templates[active]] }));
  }

  function updateItem(id, field, value) {
    setData(prev => ({
      ...prev,
      [active]: prev[active].map(item => item.id === id ? { ...item, [field]: value } : item),
    }));
  }

  function removeItem(id) {
    setData(prev => ({ ...prev, [active]: prev[active].filter(item => item.id !== id) }));
    toast.success('Item removed.');
  }

  async function handleSave() {
    setSaving(true);
    try {
      // await upsertContent(active, { items: data[active] }, user);
      await new Promise(r => setTimeout(r, 800)); // Simulated async
      toast.success(`${SECTIONS.find(s => s.id === active)?.label} saved successfully.`);
    } catch {
      toast.error('Save failed. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function handleFileUpload(e, itemId, field) {
    const file = e.target.files[0];
    if (!file) return;
    setUploadPct(0);
    try {
      // const url = await uploadFile(file, `content/${active}/${Date.now()}_${file.name}`, setUploadPct);
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 20) {
        await new Promise(r => setTimeout(r, 80));
        setUploadPct(i);
      }
      const url = URL.createObjectURL(file); // Mock URL
      if (itemId !== null) updateItem(itemId, field, url);
      toast.success('File uploaded.');
    } catch {
      toast.error('Upload failed.');
    } finally {
      setUploadPct(null);
    }
  }

  const ActiveSection = SECTIONS.find(s => s.id === active);

  const inputCls = 'w-full bg-surface-700 border border-surface-500 rounded-lg px-3 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors';

  return (
    <div className="flex gap-5 h-full animate-fade-in">
      {/* Section nav */}
      <aside className="w-48 shrink-0 space-y-1">
        <p className="font-mono text-[10px] text-surface-500 uppercase tracking-widest px-2 mb-3">Sections</p>
        {SECTIONS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all ${
              active === id
                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/25 font-medium'
                : 'text-surface-400 hover:text-white hover:bg-surface-700'
            }`}
          >
            <Icon size={15} />
            <span className="flex-1 text-left">{label}</span>
            {active === id && <ChevronRight size={12} />}
          </button>
        ))}
      </aside>

      {/* Content editor */}
      <div className="flex-1 min-w-0 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {ActiveSection && <ActiveSection.icon size={18} className="text-brand-400" />}
            <h1 className="font-display text-xl font-bold text-white">{ActiveSection?.label}</h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={addItem}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-700 border border-surface-500 text-surface-300 hover:text-white text-sm transition-colors">
              <Plus size={14} /> Add Item
            </button>
            <button onClick={handleSave} disabled={saving}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-sm transition-colors">
              {saving
                ? <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <Save size={14} />}
              {saving ? 'Saving…' : 'Save All'}
            </button>
          </div>
        </div>

        {/* Upload progress */}
        {uploadPct !== null && (
          <div className="bg-surface-800 border border-surface-600 rounded-lg p-3 animate-slide-up">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-surface-400">Uploading…</span>
              <span className="font-mono text-xs text-brand-400">{uploadPct}%</span>
            </div>
            <div className="h-1.5 bg-surface-600 rounded-full overflow-hidden">
              <div className="h-full bg-brand-500 rounded-full transition-all duration-150" style={{ width: `${uploadPct}%` }} />
            </div>
          </div>
        )}

        {/* Item cards */}
        <div className="space-y-3">
          {data[active]?.length === 0 && (
            <div className="text-center py-10 text-surface-500 text-sm">No items yet. Click "Add Item" to start.</div>
          )}

          {data[active]?.map((item, idx) => (
            <div key={item.id} className="bg-surface-800 border border-surface-600 rounded-xl p-4 space-y-3 animate-slide-up">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-surface-500">#{idx + 1}</span>
                <button onClick={() => removeItem(item.id)}
                  className="p-1.5 rounded-lg hover:bg-red-500/15 text-surface-500 hover:text-red-400 transition-colors">
                  <Trash2 size={13} />
                </button>
              </div>

              {/* Field renderers per section */}
              {active === 'banners' && (
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="Banner Title" value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)} />
                  <input className={inputCls} placeholder="Subtitle" value={item.subtitle} onChange={e => updateItem(item.id, 'subtitle', e.target.value)} />
                  <div className="col-span-2">
                    <label className="block text-xs text-surface-500 mb-1.5">Banner Image</label>
                    <FileUploadButton onFile={e => handleFileUpload(e, item.id, 'imageUrl')} label="Upload Image" accept="image/*" />
                    {item.imageUrl && <p className="text-xs text-green-400 mt-1 flex items-center gap-1"><Check size={11} /> Image set</p>}
                  </div>
                </div>
              )}

              {active === 'notices' && (
                <input className={inputCls} placeholder="Notice text…" value={item.text} onChange={e => updateItem(item.id, 'text', e.target.value)} />
              )}

              {active === 'messages' && (
                <div className="space-y-2">
                  <input className={inputCls} placeholder="Author (e.g. Principal)" value={item.author} onChange={e => updateItem(item.id, 'author', e.target.value)} />
                  <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Message content…" value={item.message} onChange={e => updateItem(item.id, 'message', e.target.value)} />
                </div>
              )}

              {active === 'stats' && (
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="Label (e.g. Students)" value={item.label} onChange={e => updateItem(item.id, 'label', e.target.value)} />
                  <input className={inputCls} placeholder="Value (e.g. 4200+)" value={item.value} onChange={e => updateItem(item.id, 'value', e.target.value)} />
                </div>
              )}

              {active === 'gallery' && (
                <div className="space-y-2">
                  <input className={inputCls} placeholder="Image title" value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)} />
                  <FileUploadButton onFile={e => handleFileUpload(e, item.id, 'imageUrl')} label="Upload Gallery Image" accept="image/*" />
                  {item.imageUrl && <p className="text-xs text-green-400 flex items-center gap-1"><Check size={11} /> Image set</p>}
                </div>
              )}

              {active === 'downloads' && (
                <div className="grid grid-cols-2 gap-3">
                  <input className={inputCls} placeholder="Document title" value={item.title} onChange={e => updateItem(item.id, 'title', e.target.value)} />
                  <input className={inputCls} placeholder="File size (e.g. 1.2 MB)" value={item.size} onChange={e => updateItem(item.id, 'size', e.target.value)} />
                  <div className="col-span-2">
                    <FileUploadButton onFile={e => handleFileUpload(e, item.id, 'fileUrl')} label="Upload PDF / File" accept=".pdf,.doc,.docx" />
                    {item.fileUrl && <p className="text-xs text-green-400 mt-1 flex items-center gap-1"><Check size={11} /> File attached</p>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FileUploadButton({ onFile, label, accept }) {
  const ref = useRef();
  return (
    <div>
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={onFile} />
      <button type="button" onClick={() => ref.current?.click()}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-700 border border-dashed border-surface-500 hover:border-brand-500/50 text-surface-400 hover:text-white text-sm transition-all">
        <Upload size={13} /> {label}
      </button>
    </div>
  );
}
