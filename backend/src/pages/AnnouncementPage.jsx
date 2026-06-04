import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, Pin } from "lucide-react";
import {
  fetchAnnouncements,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  togglePinAnnouncement,
} from "../services/announcementService";
import { useAuth } from "../hooks/useAuth";
import toast from "react-hot-toast";

export default function AnnouncementManagementPage() {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    type: "notice",
    isPinned: false,
    isPublished: true,
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  async function loadAnnouncements() {
    try {
      const data = await fetchAnnouncements();
      setAnnouncements(data);
    } catch (err) {
      toast.error("Failed to load announcements");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    if (!formData.title || !formData.content) {
      toast.error("Title and content are required");
      return;
    }
    try {
      if (editingId) {
        await updateAnnouncement(editingId, formData, user);
        toast.success("Announcement updated");
      } else {
        await createAnnouncement(formData, user);
        toast.success("Announcement created");
      }
      resetForm();
      await loadAnnouncements();
    } catch (err) {
      toast.error(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this announcement?")) return;
    try {
      await deleteAnnouncement(id, user);
      toast.success("Announcement deleted");
      await loadAnnouncements();
    } catch (err) {
      toast.error("Failed to delete");
    }
  }

  async function handleTogglePin(id, currentPin) {
    try {
      await togglePinAnnouncement(id, !currentPin, user);
      toast.success(
        !currentPin ? "Announcement pinned" : "Announcement unpinned",
      );
      await loadAnnouncements();
    } catch (err) {
      toast.error("Failed to toggle pin");
    }
  }

  function resetForm() {
    setFormData({
      title: "",
      content: "",
      type: "notice",
      isPinned: false,
      isPublished: true,
    });
    setEditingId(null);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white">Announcement Management</h2>

      {/* Form */}
      <div className="bg-surface-800 border border-surface-600 rounded-lg p-6">
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
          <textarea
            placeholder="Content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            rows="5"
            className="w-full bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          />
          <select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            className="w-full bg-surface-700 border border-surface-500 rounded px-3 py-2 text-white"
          >
            <option value="notice">Notice</option>
            <option value="news">News</option>
            <option value="event">Event</option>
            <option value="urgent">Urgent</option>
          </select>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.isPublished}
                onChange={(e) =>
                  setFormData({ ...formData, isPublished: e.target.checked })
                }
              />
              Published
            </label>
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={formData.isPinned}
                onChange={(e) =>
                  setFormData({ ...formData, isPinned: e.target.checked })
                }
              />
              Pin to Top
            </label>
          </div>
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
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-surface-400">Loading...</div>
        ) : announcements.length === 0 ? (
          <div className="text-center text-surface-400">
            No announcements yet
          </div>
        ) : (
          announcements.map((announcement) => (
            <div
              key={announcement.id}
              className="bg-surface-700 border border-surface-600 rounded p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium">
                      {announcement.title}
                    </p>
                    <span className="text-xs px-2 py-1 bg-brand-500/20 text-brand-400 rounded">
                      {announcement.type}
                    </span>
                    {announcement.isPinned && (
                      <Pin size={14} className="text-yellow-400" />
                    )}
                  </div>
                  <p className="text-sm text-surface-400 mt-1">
                    {announcement.content.substring(0, 100)}...
                  </p>
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() =>
                    handleTogglePin(announcement.id, announcement.isPinned)
                  }
                  className="p-2 hover:bg-surface-600 rounded text-yellow-400"
                >
                  <Pin size={16} />
                </button>
                <button
                  onClick={() => {
                    setEditingId(announcement.id);
                    setFormData(announcement);
                  }}
                  className="p-2 hover:bg-surface-600 rounded text-brand-400"
                >
                  <Edit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(announcement.id)}
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
