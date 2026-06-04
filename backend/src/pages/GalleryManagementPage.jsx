import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} from "../services/frontendContentService";
import { Plus, Edit2, Trash2, Image as ImageIcon } from "lucide-react";

export default function GalleryManagementPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "general",
    imageUrl: "",
  });

  const categories = [
    "general",
    "campus",
    "events",
    "infrastructure",
    "students",
  ];

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    try {
      setLoading(true);
      const data = await getGalleryItems();
      setItems(data);
    } catch (error) {
      toast.error("Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editingId) {
        await updateGalleryItem(editingId, formData, imageFile);
        toast.success("Item updated successfully");
      } else {
        await addGalleryItem(formData, imageFile);
        toast.success("Item added successfully");
      }
      setFormData({
        title: "",
        description: "",
        category: "general",
        imageUrl: "",
      });
      setImageFile(null);
      setEditingId(null);
      setShowForm(false);
      loadGallery();
    } catch (error) {
      toast.error(error.message);
    }
  }

  function handleEdit(item) {
    setFormData(item);
    setEditingId(item.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (window.confirm("Are you sure?")) {
      try {
        const item = items.find((i) => i.id === id);
        await deleteGalleryItem(id, item.imageUrl);
        toast.success("Item deleted");
        loadGallery();
      } catch (error) {
        toast.error(error.message);
      }
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (showForm) {
              setEditingId(null);
              setFormData({
                title: "",
                description: "",
                category: "general",
                imageUrl: "",
              });
              setImageFile(null);
            }
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus size={20} /> Add Image
        </button>
      </div>

      {showForm && (
        <div className="bg-surface-800 p-6 rounded-lg mb-8 border border-surface-600">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? "Edit Gallery Item" : "New Gallery Item"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              />
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white md:col-span-2"
                rows="3"
              />
              <div className="md:col-span-2">
                <label className="block text-sm mb-2">Image Upload</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white w-full"
                />
                {formData.imageUrl && (
                  <p className="text-gray-400 text-sm mt-2">
                    Current: {formData.imageUrl.substring(0, 50)}...
                  </p>
                )}
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {editingId ? "Update Item" : "Add Item"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: "",
                    description: "",
                    category: "general",
                    imageUrl: "",
                  });
                  setImageFile(null);
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-surface-800 rounded-lg overflow-hidden border border-surface-600 hover:border-blue-600 transition"
            >
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-40 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-xs text-blue-400 mb-2">{item.category}</p>
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 flex-1 flex items-center justify-center gap-2 text-sm"
                  >
                    <Edit2 size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 text-sm"
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
