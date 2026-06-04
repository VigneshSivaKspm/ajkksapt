import { useState, useEffect, useMemo } from 'react';
import { Search, Download, Plus, ChevronDown, RefreshCw, Tag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { fetchLeads, updateLeadStatus, exportLeadsToCSV, createLead } from '../services/leadsService';
import toast from 'react-hot-toast';

const STATUS_STYLES = {
  New:       'bg-blue-500/15 text-blue-400 border-blue-500/25',
  Contacted: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/25',
  Enrolled:  'bg-green-500/15 text-green-400 border-green-500/25',
};

const NEXT_STATUS = { New: 'Contacted', Contacted: 'Enrolled', Enrolled: 'New' };

const MOCK_LEADS = [
  { id: '1', name: 'Arjun Mehta',    email: 'arjun@email.com',  phone: '9876543210', type: 'admission', departmentId: 'CSE', status: 'New',       timestamp: { toDate: () => new Date('2024-03-01') } },
  { id: '2', name: 'Priya Sharma',   email: 'priya@email.com',  phone: '9876543211', type: 'contact',   departmentId: 'ECE', status: 'Contacted', timestamp: { toDate: () => new Date('2024-03-02') } },
  { id: '3', name: 'Rahul Kumar',    email: 'rahul@email.com',  phone: '9876543212', type: 'callback',  departmentId: 'MBA', status: 'Enrolled',  timestamp: { toDate: () => new Date('2024-03-03') } },
  { id: '4', name: 'Sneha Iyer',     email: 'sneha@email.com',  phone: '9876543213', type: 'admission', departmentId: 'CSE', status: 'New',       timestamp: { toDate: () => new Date('2024-03-04') } },
  { id: '5', name: 'Vikram Nair',    email: 'vikram@email.com', phone: '9876543214', type: 'admission', departmentId: 'MECH', status: 'Contacted', timestamp: { toDate: () => new Date('2024-03-05') } },
];

export default function LeadsPage() {
  const { user } = useAuth();
  const [leads, setLeads]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [typeFilter, setType]   = useState('all');
  const [statusFilter, setStat] = useState('all');
  const [showForm, setShowForm] = useState(false);

  async function load() {
    setLoading(true);
    try {
      // Use mock data; replace with: const data = await fetchLeads(user);
      setLeads(MOCK_LEADS);
    } catch (err) {
      toast.error('Failed to load leads.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) ||
                        l.email.toLowerCase().includes(search.toLowerCase());
    const matchType   = typeFilter === 'all' || l.type === typeFilter;
    const matchStatus = statusFilter === 'all' || l.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  }), [leads, search, typeFilter, statusFilter]);

  async function handleStatusToggle(lead) {
    const next = NEXT_STATUS[lead.status];
    try {
      // await updateLeadStatus(lead.id, next, user);
      setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: next } : l));
      toast.success(`Lead moved to ${next}`);
    } catch {
      toast.error('Status update failed.');
    }
  }

  function handleExport() {
    exportLeadsToCSV(filtered);
    toast.success(`Exported ${filtered.length} leads.`);
  }

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Lead Management</h1>
          <p className="text-surface-400 text-sm mt-0.5">{filtered.length} leads found</p>
        </div>
        <div className="flex gap-2">
          <button onClick={load} className="p-2 rounded-lg bg-surface-700 border border-surface-500 text-surface-400 hover:text-white transition-colors">
            <RefreshCw size={16} />
          </button>
          <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-700 border border-surface-500 text-surface-300 hover:text-white text-sm transition-colors">
            <Download size={15} /> Export CSV
          </button>
          {user?.role !== 'staff' && (
            <button onClick={() => setShowForm(v => !v)} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm transition-colors">
              <Plus size={15} /> New Lead
            </button>
          )}
        </div>
      </div>

      {/* New lead form */}
      {showForm && <NewLeadForm user={user} onSave={(l) => { setLeads(prev => [l, ...prev]); setShowForm(false); }} onCancel={() => setShowForm(false)} />}

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search name or email…"
            className="w-full bg-surface-800 border border-surface-600 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>

        <select value={typeFilter} onChange={e => setType(e.target.value)}
          className="bg-surface-800 border border-surface-600 rounded-lg px-3 py-2 text-sm text-surface-300 focus:outline-none focus:border-brand-500 transition-colors">
          <option value="all">All Types</option>
          <option value="admission">Admission</option>
          <option value="contact">Contact</option>
          <option value="callback">Callback</option>
        </select>

        <select value={statusFilter} onChange={e => setStat(e.target.value)}
          className="bg-surface-800 border border-surface-600 rounded-lg px-3 py-2 text-sm text-surface-300 focus:outline-none focus:border-brand-500 transition-colors">
          <option value="all">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Enrolled">Enrolled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-surface-600">
                {['Name', 'Contact', 'Type', 'Dept', 'Status', 'Date', 'Action'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-700">
              {loading
                ? [...Array(4)].map((_, i) => (
                  <tr key={i}>
                    {[...Array(7)].map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 bg-surface-700 rounded animate-pulse w-20" /></td>
                    ))}
                  </tr>
                ))
                : filtered.length === 0
                  ? <tr><td colSpan={7} className="text-center text-surface-500 py-10">No leads found.</td></tr>
                  : filtered.map(lead => (
                    <tr key={lead.id} className="hover:bg-surface-700/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-white">{lead.name}</td>
                      <td className="px-4 py-3 text-surface-400">
                        <div>{lead.email}</div>
                        <div className="font-mono text-xs text-surface-500">{lead.phone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-surface-700 border border-surface-500 text-surface-300 capitalize">
                          <Tag size={10} /> {lead.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-surface-400">{lead.departmentId}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLES[lead.status]}`}>{lead.status}</span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-surface-500">
                        {lead.timestamp?.toDate?.()?.toLocaleDateString() ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleStatusToggle(lead)}
                          className="text-xs px-3 py-1 rounded-lg bg-surface-700 hover:bg-surface-600 border border-surface-500 text-surface-300 hover:text-white transition-colors flex items-center gap-1"
                        >
                          <ChevronDown size={12} /> Advance
                        </button>
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

function NewLeadForm({ user, onSave, onCancel }) {
  const [form, setForm]   = useState({ name: '', email: '', phone: '', type: 'admission', departmentId: '' });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email) { toast.error('Name and email are required.'); return; }
    setSaving(true);
    try {
      // const id = await createLead(form, user);
      const newLead = { ...form, id: Date.now().toString(), status: 'New', timestamp: { toDate: () => new Date() } };
      toast.success('Lead created.');
      onSave(newLead);
    } catch {
      toast.error('Failed to create lead.');
    } finally {
      setSaving(false);
    }
  }

  const input = 'w-full bg-surface-700 border border-surface-500 rounded-lg px-3 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors';

  return (
    <div className="bg-surface-800 border border-brand-500/30 rounded-xl p-5 animate-slide-up">
      <h3 className="text-sm font-medium text-white mb-4">New Lead Entry</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-3">
        <input className={input} placeholder="Full Name *" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        <input type="email" className={input} placeholder="Email *" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        <input className={input} placeholder="Phone" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
        <input className={input} placeholder="Department ID" value={form.departmentId} onChange={e => setForm(p => ({ ...p, departmentId: e.target.value }))} />
        <select className={input} value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
          <option value="admission">Admission</option>
          <option value="contact">Contact</option>
          <option value="callback">Callback</option>
        </select>
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="flex-1 bg-brand-500 hover:bg-brand-600 disabled:opacity-50 text-white text-sm rounded-lg py-2 transition-colors">
            {saving ? 'Saving…' : 'Save Lead'}
          </button>
          <button type="button" onClick={onCancel} className="flex-1 bg-surface-700 hover:bg-surface-600 text-surface-300 text-sm rounded-lg py-2 transition-colors">Cancel</button>
        </div>
      </form>
    </div>
  );
}
