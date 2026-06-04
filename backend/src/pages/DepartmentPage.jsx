import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import {
  fetchAllDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../services/departmentService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function DepartmentManagementPage() {
  const { user } = useAuth();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    description: "",
    hod: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  async function loadDepartments() {
    try {
      const data = await fetchAllDepartments();
      setDepartments(data);
    } catch (err) {
      toast.error("Failed to load departments");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!formData.name || !formData.code) {
      toast.error("Name and code are required");
      return;
    }
    try {
      if (editingId) {
        await updateDepartment(editingId, formData, user);
        toast.success("Department updated");
      } else {
        await createDepartment(formData, user);
        toast.success("Department created");
      }
      resetForm();
      await loadDepartments();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this department?")) return;
    try {
      await deleteDepartment(id, user);
      toast.success("Department deleted");
      await loadDepartments();
    } catch (err) {
      toast.error("Failed to delete");
    }
  }

  function resetForm() {
    setFormData({
      name: "",
      code: "",
      description: "",
      hod: "",
      email: "",
      phone: "",
    });
    setEditingId(null);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Department Management</h2>

      {/* Form */}
      <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Department Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-2 bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="text"
            placeholder="Department Code"
            value={formData.code}
            onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="text"
            placeholder="Head of Department"
            value={formData.hod}
            onChange={(e) => setFormData({ ...formData, hod: e.target.value })}
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <input
            type="tel"
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <textarea
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="3"
            className="col-span-2 bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <div className="col-span-2 flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded text-white"
            >
              <Save size={16} />
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                onClick={resetForm}
                className="px-4 py-2 bg-surface-700 hover:bg-surface-600 rounded text-white"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3">
        {loading ? (
          <div className="text-center text-surface-400">Loading...</div>
        ) : departments.length === 0 ? (
          <div className="text-center text-surface-400">No departments yet</div>
        ) : (
          departments.map((dept) => (
            <div
              key={dept.id}
              className="bg-surface-700 border border-surface-600 rounded p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-white font-medium">{dept.name}</p>
                  <p className="text-xs text-surface-400">Code: {dept.code}</p>
                  <p className="text-xs text-surface-400 mt-1">
                    HOD: {dept.hod || "N/A"}
                  </p>
                  <p className="text-xs text-surface-400">{dept.email}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(dept.id);
                      setFormData(dept);
                    }}
                    className="p-2 hover:bg-surface-600 rounded text-brand-400"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(dept.id)}
                    className="p-2 hover:bg-red-500/10 rounded text-red-400"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
