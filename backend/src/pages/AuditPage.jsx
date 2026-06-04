import { useState, useEffect } from "react";
import { ScrollText, Search, RefreshCw } from "lucide-react";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import toast from "react-hot-toast";

const MOCK_LOGS = [
  {
    id: "1",
    uid: "admin001",
    action: "LOGIN",
    meta: { email: "admin@ajkksapt.edu" },
    timestamp: new Date("2024-03-10T09:00:00"),
  },
  {
    id: "2",
    uid: "admin001",
    action: "CREATE_LEAD",
    meta: { leadId: "lead_248" },
    timestamp: new Date("2024-03-10T09:05:00"),
  },
  {
    id: "3",
    uid: "dept001",
    action: "BATCH_UPLOAD_RESULTS",
    meta: { count: 42, semester: "4" },
    timestamp: new Date("2024-03-10T10:12:00"),
  },
  {
    id: "4",
    uid: "admin001",
    action: "UPSERT_CONTENT",
    meta: { contentId: "banners" },
    timestamp: new Date("2024-03-10T11:30:00"),
  },
  {
    id: "5",
    uid: "staff001",
    action: "CREATE_LEAD",
    meta: { leadId: "lead_249" },
    timestamp: new Date("2024-03-10T13:00:00"),
  },
  {
    id: "6",
    uid: "admin001",
    action: "PUBLISH_RESULT",
    meta: { resultId: "res_021" },
    timestamp: new Date("2024-03-10T14:15:00"),
  },
  {
    id: "7",
    uid: "admin001",
    action: "LOGOUT",
    meta: {},
    timestamp: new Date("2024-03-10T17:00:00"),
  },
];

const ACTION_COLORS = {
  LOGIN: "text-green-400 bg-green-500/10 border-green-500/20",
  LOGOUT: "text-surface-400 bg-surface-700 border-surface-500",
  CREATE_LEAD: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  UPDATE_LEAD_STATUS: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  BATCH_UPLOAD_RESULTS: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  PUBLISH_RESULT: "text-brand-400 bg-brand-500/10 border-brand-500/20",
  UNPUBLISH_RESULT: "text-red-400 bg-red-500/10 border-red-500/20",
  UPSERT_CONTENT: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  DELETE_CONTENT: "text-red-400 bg-red-500/10 border-red-500/20",
};

export default function AuditPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setLogs(MOCK_LOGS);
      setLoading(false);
    }, 400);
  }, []);

  const filtered = logs.filter(
    (l) =>
      l.uid.toLowerCase().includes(search.toLowerCase()) ||
      l.action.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <ScrollText size={22} className="text-brand-400" />
          <div>
            <h1 className="font-display text-2xl font-bold text-white">
              Audit Logs
            </h1>
            <p className="text-surface-400 text-sm mt-0.5">
              System access and change tracking
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 400);
          }}
          className="p-2 rounded-lg bg-surface-700 border border-surface-500 text-surface-400 hover:text-white transition-colors"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-500"
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by UID or action…"
          className="w-full max-w-sm bg-surface-800 border border-surface-600 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder:text-surface-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      {/* Table */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-surface-600">
              {["Timestamp", "User UID", "Action", "Metadata"].map((h) => (
                <th
                  key={h}
                  className="text-left px-4 py-3 text-xs font-medium text-surface-400 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-700">
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  {[...Array(4)].map((_, j) => (
                    <td key={j} className="px-4 py-3">
                      <div className="h-4 bg-surface-700 rounded animate-pulse w-24" />
                    </td>
                  ))}
                </tr>
              ))
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center text-surface-500 py-10">
                  No logs found.
                </td>
              </tr>
            ) : (
              filtered.map((log) => (
                <tr
                  key={log.id}
                  className="hover:bg-surface-700/40 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-xs text-surface-400">
                    {log.timestamp?.toLocaleString?.() ?? "—"}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-white">
                    {log.uid}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border font-mono ${ACTION_COLORS[log.action] ?? "text-surface-400 bg-surface-700 border-surface-500"}`}
                    >
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-surface-500 max-w-xs truncate">
                    {JSON.stringify(log.meta)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
