import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getStaffMembers,
  addStaffMember,
  updateStaffMember,
  deleteStaffMember,
} from "../services/frontendContentService";
import { Plus, Edit2, Trash2, Mail, Phone, MapPin } from "lucide-react";

export default function StaffDirectoryPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [filterDept, setFilterDept] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    qualifications: "",
    experience: "",
    photoUrl: "",
    isActive: true,
  });

  const departments = [
    "Administration",
    "Civil Engineering",
    "Mechanical Engineering",
    "Electrical Engineering",
    "Electronics",
    "Computer Science",
    "Information Technology",
  ];

  useEffect(() => {
    loadStaff();
  }, []);

  async function loadStaff() {
    try {
      setLoading(true);
      const data = filterDept
        ? await getStaffMembers(filterDept)
        : await getStaffMembers();
      setStaff(data);
    } catch (error) {
      toast.error("Failed to load staff");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadStaff();
  }, [filterDept]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateStaffMember(editingId, formData, photoFile);
        toast.success("Staff updated");
      } else {
        await addStaffMember(formData, photoFile);
        toast.success("Staff added");
      }
      setFormData({
        name: "",
        designation: "",
        department: "",
        email: "",
        phone: "",
        qualifications: "",
        experience: "",
        photoUrl: "",
        isActive: true,
      });
      setPhotoFile(null);
      setEditingId(null);
      setShowForm(false);
      loadStaff();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleEdit(member) {
    setFormData(member);
    setEditingId(member.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure?")) {
      try {
        const item = staff.find((i) => i.id === id);
        await deleteStaffMember(id, item.photoUrl);
        toast.success("Staff deleted");
        loadStaff();
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Staff Directory</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({
                name: "",
                designation: "",
                department: "",
                email: "",
                phone: "",
                qualifications: "",
                experience: "",
                photoUrl: "",
                isActive: true,
              });
              setPhotoFile(null);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Add Staff
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-800 p-6 rounded-lg mb-8 border border-surface-600">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Staff" : "New Staff Member"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Designation"
                value={formData.designation}
                onChange={(e) =>
                  setFormData({ ...formData, designation: e.target.value })
                }
                required
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <select
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                required
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Qualifications"
                value={formData.qualifications}
                onChange={(e) =>
                  setFormData({ ...formData, qualifications: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <textarea
                placeholder="Experience"
                value={formData.experience}
                onChange={(e) =>
                  setFormData({ ...formData, experience: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white md:col-span-2"
                rows="3"
              />
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Photo Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setPhotoFile(e.target.files?.[0] || null)}
                  className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.checked })
                    }
                    className="rounded"
                  />
                  <span>Active</span>
                </label>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {editingId ? "Update" : "Add"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    name: "",
                    designation: "",
                    department: "",
                    email: "",
                    phone: "",
                    qualifications: "",
                    experience: "",
                    photoUrl: "",
                    isActive: true,
                  });
                  setPhotoFile(null);
                }}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="mb-6">
        <select
          value={filterDept}
          onChange={(e) => setFilterDept(e.target.value)}
          className="bg-surface-700 border border-surface-600 rounded px-4 py-2 text-white"
        >
          <option value="">All Departments</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {staff.map((member) => (
            <div
              key={member.id}
              className="bg-surface-800 rounded-lg overflow-hidden border border-surface-600 hover:border-blue-600 transition"
            >
              {member.photoUrl && (
                <img
                  src={member.photoUrl}
                  alt={member.name}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg">{member.name}</h3>
                <p className="text-blue-400 text-sm font-semibold">
                  {member.designation}
                </p>
                <p className="text-gray-400 text-xs mb-2">
                  {member.department}
                </p>
                <div className="space-y-1 text-sm text-gray-400">
                  {member.email && (
                    <div className="flex items-center gap-2">
                      <Mail size={14} /> {member.email}
                    </div>
                  )}
                  {member.phone && (
                    <div className="flex items-center gap-2">
                      <Phone size={14} /> {member.phone}
                    </div>
                  )}
                  {member.qualifications && (
                    <div className="text-xs">{member.qualifications}</div>
                  )}
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleEdit(member)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex-1 flex items-center justify-center gap-1 text-sm"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
