import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import {
  Users, TrendingUp, BookOpen, Activity,
  ArrowUpRight, ArrowDownRight, Circle,
} from 'lucide-react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase/config';

// ── Mock metric data (replace with real Firestore queries) ────────────────────
function useDashboardMetrics() {
  const [metrics, setMetrics]   = useState(null);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    // Simulated data — wire to real Firestore aggregations in production
    setMetrics({
      leads:       { value: 248, delta: 12,  positive: true  },
      enquiries:   { value: 91,  delta: -4,  positive: false },
      activeStaff: { value: 34,  delta: 2,   positive: true  },
      results:     { value: 512, delta: 0,   positive: true  },
    });

    setActivity([
      { id: 1, type: 'lead',    msg: 'New admission enquiry from Priya S.',  time: '2 min ago' },
      { id: 2, type: 'upload',  msg: 'Results batch uploaded — Sem 4 CSE',   time: '14 min ago' },
      { id: 3, type: 'content', msg: 'Homepage banner updated',               time: '1 hr ago' },
      { id: 4, type: 'user',    msg: 'New staff account created',             time: '3 hr ago' },
      { id: 5, type: 'lead',    msg: 'Lead #247 marked as Enrolled',         time: '5 hr ago' },
      { id: 6, type: 'audit',   msg: 'Admin login from 203.91.x.x',          time: '6 hr ago' },
    ]);
  }, []);

  return { metrics, activity };
}

const TYPE_DOT = {
  lead:    'bg-blue-500',
  upload:  'bg-green-500',
  content: 'bg-brand-500',
  user:    'bg-purple-500',
  audit:   'bg-red-500',
};

export default function OverviewPage() {
  const { user } = useAuth();
  const { metrics, activity } = useDashboardMetrics();

  const STATS = metrics ? [
    { label: 'Admission Leads',  value: metrics.leads.value,       delta: metrics.leads.delta,       positive: metrics.leads.positive,       icon: Users,      color: 'text-blue-400'   },
    { label: 'Form Enquiries',   value: metrics.enquiries.value,   delta: metrics.enquiries.delta,   positive: metrics.enquiries.positive,   icon: TrendingUp, color: 'text-brand-400'  },
    { label: 'Active Staff',     value: metrics.activeStaff.value, delta: metrics.activeStaff.delta, positive: metrics.activeStaff.positive, icon: Activity,   color: 'text-green-400'  },
    { label: 'Results Published',value: metrics.results.value,     delta: metrics.results.delta,     positive: metrics.results.positive,     icon: BookOpen,   color: 'text-purple-400' },
  ] : [];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">
            Overview
          </h1>
          <p className="text-surface-400 text-sm mt-0.5">
            Welcome back, <span className="text-brand-400">{user?.name ?? 'Admin'}</span>
          </p>
        </div>
        <div className="flex items-center gap-2 bg-surface-800 border border-surface-600 rounded-lg px-3 py-1.5">
          <Circle size={8} className="text-green-400 fill-green-400 animate-pulse" />
          <span className="font-mono text-xs text-surface-400">Live</span>
        </div>
      </div>

      {/* Stat cards */}
      {!metrics ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="stat-card h-28 animate-pulse">
              <div className="h-4 w-24 bg-surface-600 rounded mb-3" />
              <div className="h-8 w-16 bg-surface-600 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map(({ label, value, delta, positive, icon: Icon, color }) => (
            <div key={label} className="stat-card">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-surface-400 font-medium">{label}</span>
                <Icon size={16} className={color} />
              </div>
              <p className="font-display text-3xl font-bold text-white">{value.toLocaleString()}</p>
              <div className={`flex items-center gap-1 mt-1.5 text-xs ${positive ? 'text-green-400' : 'text-red-400'}`}>
                {positive
                  ? <ArrowUpRight size={12} />
                  : <ArrowDownRight size={12} />}
                <span>{Math.abs(delta)} this week</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Activity feed */}
      <div className="bg-surface-800 border border-surface-600 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-surface-600">
          <p className="text-sm font-medium text-white">System Activity</p>
          <span className="font-mono text-xs text-surface-400">Real-time feed</span>
        </div>
        <div className="divide-y divide-surface-700">
          {activity.length === 0
            ? <p className="text-center text-surface-500 text-sm py-8">No recent activity.</p>
            : activity.map(item => (
              <div key={item.id} className="flex items-center gap-3 px-5 py-3.5 hover:bg-surface-700/50 transition-colors">
                <span className={`w-2 h-2 rounded-full shrink-0 ${TYPE_DOT[item.type] ?? 'bg-surface-400'}`} />
                <p className="text-sm text-surface-300 flex-1">{item.msg}</p>
                <span className="font-mono text-xs text-surface-500 shrink-0">{item.time}</span>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}
