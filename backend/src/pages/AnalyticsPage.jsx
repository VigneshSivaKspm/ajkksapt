import { useState, useEffect } from "react";
import { BarChart3, Users, TrendingUp } from "lucide-react";
import {
  getDashboardSummary,
  getLeadAnalytics,
  getResultsAnalytics,
} from "../services/analyticsService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AnalyticsDashboardPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [leadAnalytics, setLeadAnalytics] = useState(null);
  const [resultsAnalytics, setResultsAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [user]);

  async function loadAnalytics() {
    try {
      setLoading(true);
      const [summaryData, leadsData, resultsData] = await Promise.all([
        getDashboardSummary(user),
        getLeadAnalytics(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          new Date(),
        ),
        getResultsAnalytics("4"),
      ]);
      setSummary(summaryData);
      setLeadAnalytics(leadsData);
      setResultsAnalytics(resultsData);
    } catch (err) {
      toast.error("Failed to load analytics");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-center text-surface-400 py-12">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Analytics Dashboard</h2>

      {/* Key Metrics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-surface-400 text-sm">Total Leads</p>
            <Users className="text-brand-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">
            {summary?.totalLeads || 0}
          </p>
          <p className="text-xs text-green-400 mt-2">
            {summary?.activeLeads || 0} Active
          </p>
        </div>

        <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-surface-400 text-sm">Lead Conversion</p>
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">
            {leadAnalytics?.conversionRate || 0}%
          </p>
          <p className="text-xs text-surface-400 mt-2">Last 30 days</p>
        </div>

        <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-surface-400 text-sm">Avg Results CGPA</p>
            <BarChart3 className="text-blue-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-white">
            {resultsAnalytics?.averageGPA || 0}
          </p>
          <p className="text-xs text-surface-400 mt-2">Semester 4</p>
        </div>
      </div>

      {/* Lead Analytics */}
      {leadAnalytics && (
        <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Lead Analytics (30 Days)
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-surface-400 mb-2">Total Leads</p>
              <p className="text-2xl font-bold text-white">
                {leadAnalytics.totalLeads}
              </p>
            </div>
            <div>
              <p className="text-xs text-surface-400 mb-2">By Source</p>
              <div className="space-y-1">
                {Object.entries(leadAnalytics.bySource || {}).map(
                  ([source, count]) => (
                    <p key={source} className="text-xs text-surface-300">
                      {source}: <span className="text-brand-400">{count}</span>
                    </p>
                  ),
                )}
              </div>
            </div>
            <div>
              <p className="text-xs text-surface-400 mb-2">By Status</p>
              <div className="space-y-1">
                {Object.entries(leadAnalytics.byStatus || {}).map(
                  ([status, count]) => (
                    <p key={status} className="text-xs text-surface-300">
                      {status}: <span className="text-brand-400">{count}</span>
                    </p>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results Analytics */}
      {resultsAnalytics && (
        <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Results Analytics (Sem 4)
          </h3>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-surface-400 mb-1">Total Students</p>
              <p className="text-2xl font-bold text-white">
                {resultsAnalytics.totalStudents}
              </p>
            </div>
            <div>
              <p className="text-xs text-surface-400 mb-1">Avg CGPA</p>
              <p className="text-2xl font-bold text-white">
                {resultsAnalytics.averageGPA}
              </p>
            </div>
            <div>
              <p className="text-xs text-surface-400 mb-1">Passed</p>
              <p className="text-2xl font-bold text-green-400">
                {resultsAnalytics.passed}
              </p>
            </div>
            <div>
              <p className="text-xs text-surface-400 mb-1">Failed</p>
              <p className="text-2xl font-bold text-red-400">
                {resultsAnalytics.failed}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Recent Leads */}
      {summary?.recentLeads && (
        <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            Recent Leads
          </h3>
          <div className="space-y-2">
            {summary.recentLeads.map((lead) => (
              <div
                key={lead.id}
                className="bg-surface-700 rounded p-3 flex items-center justify-between"
              >
                <div>
                  <p className="text-white text-sm">{lead.name || "N/A"}</p>
                  <p className="text-xs text-surface-400">{lead.email}</p>
                </div>
                <span className="text-xs px-2 py-1 bg-brand-500/20 text-brand-400 rounded">
                  {lead.status || "pending"}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
