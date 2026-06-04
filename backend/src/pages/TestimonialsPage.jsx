import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../services/frontendContentService";
import { Plus, Edit2, Trash2, Star } from "lucide-react";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
    testimonial: "",
    rating: 5,
    photoUrl: "",
    isActive: true,
  });

  useEffect(() => {
    loadTestimonials();
  }, []);

  async function loadTestimonials() {
    try {
      setLoading(true);
      const data = await getTestimonials();
      setTestimonials(data);
    } catch (error) {
      toast.error("Failed to load testimonials");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateTestimonial(editingId, formData, photoFile);
        toast.success("Testimonial updated");
      } else {
        await addTestimonial(formData, photoFile);
        toast.success("Testimonial added");
      }
      setFormData({
        name: "",
        role: "",
        department: "",
        testimonial: "",
        rating: 5,
        photoUrl: "",
        isActive: true,
      });
      setPhotoFile(null);
      setEditingId(null);
      setShowForm(false);
      loadTestimonials();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleEdit(testimonial) {
    setFormData(testimonial);
    setEditingId(testimonial.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure?")) {
      try {
        const item = testimonials.find((i) => i.id === id);
        await deleteTestimonial(id, item.photoUrl);
        toast.success("Testimonial deleted");
        loadTestimonials();
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Testimonials Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({
                name: "",
                role: "",
                department: "",
                testimonial: "",
                rating: 5,
                photoUrl: "",
                isActive: true,
              });
              setPhotoFile(null);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Add Testimonial
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-800 p-6 rounded-lg mb-8 border border-surface-600">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Testimonial" : "New Testimonial"}
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
                placeholder="Role/Designation"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <select
                value={formData.rating}
                onChange={(e) =>
                  setFormData({ ...formData, rating: parseInt(e.target.value) })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              >
                {[1, 2, 3, 4, 5].map((r) => (
                  <option key={r} value={r}>
                    {r} Stars
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Testimonial Text"
                value={formData.testimonial}
                onChange={(e) =>
                  setFormData({ ...formData, testimonial: e.target.value })
                }
                required
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white md:col-span-2"
                rows="4"
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
                    role: "",
                    department: "",
                    testimonial: "",
                    rating: 5,
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

      {loading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid gap-4">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-surface-800 p-6 rounded-lg border border-surface-600 hover:border-blue-600 transition"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4 flex-1">
                  {item.photoUrl && (
                    <img
                      src={item.photoUrl}
                      alt={item.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {item.role} • {item.department}
                    </p>
                    <div className="flex gap-1 mt-1">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <p className="text-gray-300 italic">"{item.testimonial}"</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
