import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save } from "lucide-react";
import {
  fetchHeroSliders,
  createHeroSlider,
  updateHeroSlider,
  deleteHeroSlider,
  uploadHeroImage,
} from "../services/heroService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function HeroManagementPage() {
  const { user } = useAuth();
  const [sliders, setSliders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    order: 0,
  });

  useEffect(() => {
    loadSliders();
  }, []);

  async function loadSliders() {
    try {
      const data = await fetchHeroSliders();
      setSliders(data);
    } catch (err) {
      toast.error("Failed to load hero sliders");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!formData.title) {
      toast.error("Please enter a title");
      return;
    }
    try {
      if (editingId) {
        await updateHeroSlider(editingId, formData, user);
        toast.success("Hero slider updated");
      } else {
        await createHeroSlider(formData, user);
        toast.success("Hero slider created");
      }
      setFormData({ title: "", subtitle: "", buttonText: "", order: 0 });
      setEditingId(null);
      await loadSliders();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this hero slider?")) return;
    try {
      await deleteHeroSlider(id, user);
      toast.success("Hero slider deleted");
      await loadSliders();
    } catch (err) {
      toast.error("Failed to delete");
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-4">
          Hero Slider Management
        </h2>

        {/* Form */}
        <div className="bg-surface-800 border border-surface-600 rounded-lg p-6 mb-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Subtitle"
              value={formData.subtitle}
              onChange={(e) =>
                setFormData({ ...formData, subtitle: e.target.value })
              }
              className="w-full bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
            />
            <input
              type="text"
              placeholder="Button Text"
              value={formData.buttonText}
              onChange={(e) =>
                setFormData({ ...formData, buttonText: e.target.value })
              }
              className="w-full bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 rounded text-white"
              >
                <Save size={16} />
                {editingId ? "Update" : "Create"}
              </button>
              {editingId && (
                <button
                  onClick={() => {
                    setEditingId(null);
                    setFormData({
                      title: "",
                      subtitle: "",
                      buttonText: "",
                      order: 0,
                    });
                  }}
                  className="px-4 py-2 bg-surface-700 hover:bg-surface-600 rounded text-white"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center text-surface-400">Loading...</div>
          ) : sliders.length === 0 ? (
            <div className="text-center text-surface-400">
              No hero sliders yet
            </div>
          ) : (
            sliders.map((slider) => (
              <div
                key={slider.id}
                className="bg-surface-700 border border-surface-600 rounded p-4 flex items-center justify-between"
              >
                <div>
                  <p className="text-white font-medium">{slider.title}</p>
                  <p className="text-xs text-surface-400">{slider.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingId(slider.id);
                      setFormData(slider);
                    }}
                    className="p-2 hover:bg-surface-600 rounded text-brand-400"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(slider.id)}
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
    </div>
  );
}
