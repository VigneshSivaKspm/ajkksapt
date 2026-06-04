import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, TrendingUp } from "lucide-react";
import {
  fetchPlacements,
  createPlacement,
  fetchRecruiters,
  addRecruiter,
  deleteRecruiter,
  getPlacementStats,
} from "../services/placementService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function PlacementManagementPage() {
  const { user } = useAuth();
  const [placements, setPlacements] = useState([]);
  const [recruiters, setRecruiters] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    company: "",
    studentName: "",
    packageValue: "",
    year: "",
    role: "",
  });
  const [recruiterForm, setRecruiterForm] = useState({
    company: "",
    website: "",
    logo: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      const [placements, recruiters, stats] = await Promise.all([
        fetchPlacements(user),
        fetchRecruiters(),
        getPlacementStats(
          user.role === "super_admin" ? null : user.departmentId,
        ),
      ]);
      setPlacements(placements);
      setRecruiters(recruiters);
      setStats(stats);
    } catch (err) {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!formData.company || !formData.studentName || !formData.packageValue) {
      toast.error("Company, student name, and package are required");
      return;
    }
    try {
      await createPlacement(formData, user);
      toast.success("Placement record created");
      setFormData({
        company: "",
        studentName: "",
        packageValue: "",
        year: "",
        role: "",
      });
      await loadData();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleAddRecruiter() {
    if (!recruiterForm.company) {
      toast.error("Company name is required");
      return;
    }
    try {
      await addRecruiter(recruiterForm, user);
      toast.success("Recruiter added");
      setRecruiterForm({ company: "", website: "", logo: "" });
      await loadData();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDeleteRecruiter(id) {
    if (!window.confirm("Delete this recruiter?")) return;
    try {
      await deleteRecruiter(id, user);
      toast.success("Recruiter deleted");
      await loadData();
    } catch (err) {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Placement Management</h2>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-surface-700 border border-surface-600 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-surface-400">Total Placements</p>
              <p className="text-2xl font-bold text-white">
                {stats.totalPlacements || 0}
              </p>
            </div>
            <TrendingUp className="text-brand-400" size={24} />
          </div>
        </div>
        <div className="bg-surface-700 border border-surface-600 rounded-lg p-4">
          <p className="text-xs text-surface-400">Average Package</p>
          <p className="text-2xl font-bold text-white">
            ₹{stats.averagePackage}L
          </p>
        </div>
        <div className="bg-surface-700 border border-surface-600 rounded-lg p-4">
          <p className="text-xs text-surface-400">Highest Package</p>
          <p className="text-2xl font-bold text-white">
            ₹{stats.highestPackage}L
          </p>
        </div>
        <div className="bg-surface-700 border border-surface-600 rounded-lg p-4">
          <p className="text-xs text-surface-400">Active Recruiters</p>
          <p className="text-2xl font-bold text-white">{recruiters.length}</p>
        </div>
      </div>

      {/* Placement Form */}
      <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Add Placement Record
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Company"
            value={formData.company}
            onChange={(e) =>
              setFormData({ ...formData, company: e.target.value })
            }
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="text"
            placeholder="Student Name"
            value={formData.studentName}
            onChange={(e) =>
              setFormData({ ...formData, studentName: e.target.value })
            }
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="number"
            placeholder="Package (LPA)"
            value={formData.packageValue}
            onChange={(e) =>
              setFormData({ ...formData, packageValue: e.target.value })
            }
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="text"
            placeholder="Job Role"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <button
            onClick={handleSave}
            className="col-span-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded text-white"
          >
            <Save className="inline mr-2" size={16} />
            Add Placement
          </button>
        </div>
      </div>

      {/* Recruiters */}
      <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recruiters</h3>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            type="text"
            placeholder="Company Name"
            value={recruiterForm.company}
            onChange={(e) =>
              setRecruiterForm({ ...recruiterForm, company: e.target.value })
            }
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="url"
            placeholder="Website URL"
            value={recruiterForm.website}
            onChange={(e) =>
              setRecruiterForm({ ...recruiterForm, website: e.target.value })
            }
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <button
            onClick={handleAddRecruiter}
            className="col-span-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded text-white"
          >
            <Plus className="inline mr-2" size={16} />
            Add Recruiter
          </button>
        </div>
        <div className="space-y-2">
          {recruiters.map((recruiter) => (
            <div
              key={recruiter.id}
              className="bg-surface-700 rounded p-3 flex items-center justify-between"
            >
              <p className="text-white">{recruiter.company}</p>
              <button
                onClick={() => handleDeleteRecruiter(recruiter.id)}
                className="p-2 hover:bg-red-500/10 rounded text-red-400"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Placement Records */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white">Placement Records</h3>
        {placements.length === 0 ? (
          <div className="text-center text-surface-400">
            No placements recorded yet
          </div>
        ) : (
          placements.map((placement) => (
            <div
              key={placement.id}
              className="bg-surface-700 border border-surface-600 rounded p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-white font-medium">
                    {placement.studentName}
                  </p>
                  <p className="text-sm text-surface-400">
                    {placement.company} - {placement.role}
                  </p>
                  <p className="text-xs text-brand-400 font-semibold mt-1">
                    ₹{placement.packageValue}L
                  </p>
                </div>
                <button
                  onClick={() => {}}
                  className="p-2 hover:bg-red-500/10 rounded text-red-400"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
