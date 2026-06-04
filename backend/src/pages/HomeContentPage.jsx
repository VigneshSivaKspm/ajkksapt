import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getHomeContent,
  updateHomeContent,
} from "../services/frontendContentService";
import { Save } from "lucide-react";

const sections = [
  { name: "announcementTicker", label: "Announcement Ticker" },
  { name: "statsCounter", label: "Stats Counter" },
  { name: "principalMessage", label: "Principal's Message" },
  { name: "whyChooseUs", label: "Why Choose Us" },
  { name: "admissionCampaign", label: "Admission Campaign" },
  { name: "upcomingEvents", label: "Upcoming Events" },
  { name: "latestNews", label: "Latest News" },
];

export default function HomeContentPage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("announcementTicker");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);
      const allContent = {};

      for (const section of sections) {
        try {
          const data = await getHomeContent(section.name);
          allContent[section.name] = data || { data: [] };
        } catch (error) {
          allContent[section.name] = { data: [] };
        }
      }

      setContent(allContent);
    } catch (error) {
      toast.error("Failed to load content");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      await updateHomeContent(activeSection, content[activeSection] || {});
      toast.success("Content saved successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  function handleContentChange(field, value) {
    setContent({
      ...content,
      [activeSection]: {
        ...content[activeSection],
        [field]: value,
      },
    });
  }

  function handleArrayChange(index, field, value) {
    const items = (content[activeSection]?.data || []).slice();
    items[index] = { ...items[index], [field]: value };
    setContent({
      ...content,
      [activeSection]: {
        ...content[activeSection],
        data: items,
      },
    });
  }

  function handleAddItem() {
    const items = (content[activeSection]?.data || []).slice();
    items.push({ title: "", description: "", image: "", link: "" });
    setContent({
      ...content,
      [activeSection]: {
        ...content[activeSection],
        data: items,
      },
    });
  }

  function handleRemoveItem(index) {
    const items = (content[activeSection]?.data || []).slice();
    items.splice(index, 1);
    setContent({
      ...content,
      [activeSection]: {
        ...content[activeSection],
        data: items,
      },
    });
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const currentData = content[activeSection] || {};

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Home Page Content</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
        >
          <Save size={20} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Section Selector */}
        <div className="md:col-span-1">
          <div className="bg-surface-800 rounded-lg border border-surface-600 p-4">
            <h3 className="font-bold mb-3 text-sm uppercase text-gray-400">
              Sections
            </h3>
            <div className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.name}
                  onClick={() => setActiveSection(section.name)}
                  className={`w-full text-left px-3 py-2 rounded transition ${
                    activeSection === section.name
                      ? "bg-blue-600 text-white"
                      : "bg-surface-700 text-gray-300 hover:bg-surface-600"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="md:col-span-3">
          <div className="bg-surface-800 rounded-lg border border-surface-600 p-6">
            <h2 className="text-xl font-bold mb-4">
              {sections.find((s) => s.name === activeSection)?.label}
            </h2>

            <div className="space-y-6">
              {/* Title & Description Fields */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={currentData.title || ""}
                  onChange={(e) => handleContentChange("title", e.target.value)}
                  className="w-full bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
                  placeholder="Section title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Description
                </label>
                <textarea
                  value={currentData.description || ""}
                  onChange={(e) =>
                    handleContentChange("description", e.target.value)
                  }
                  className="w-full bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
                  placeholder="Section description"
                  rows="4"
                />
              </div>

              {/* Items List */}
              {currentData.data && currentData.data.length > 0 && (
                <div>
                  <h3 className="font-bold mb-3">Items</h3>
                  <div className="space-y-4">
                    {currentData.data.map((item, idx) => (
                      <div
                        key={idx}
                        className="bg-surface-700 p-4 rounded border border-surface-600"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                          <input
                            type="text"
                            placeholder="Title"
                            value={item.title || ""}
                            onChange={(e) =>
                              handleArrayChange(idx, "title", e.target.value)
                            }
                            className="bg-surface-600 border border-surface-500 rounded px-3 py-2 text-white text-sm"
                          />
                          <input
                            type="text"
                            placeholder="Image URL"
                            value={item.image || ""}
                            onChange={(e) =>
                              handleArrayChange(idx, "image", e.target.value)
                            }
                            className="bg-surface-600 border border-surface-500 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <textarea
                          placeholder="Description"
                          value={item.description || ""}
                          onChange={(e) =>
                            handleArrayChange(
                              idx,
                              "description",
                              e.target.value,
                            )
                          }
                          className="w-full bg-surface-600 border border-surface-500 rounded px-3 py-2 text-white text-sm mb-2"
                          rows="2"
                        />
                        <button
                          onClick={() => handleRemoveItem(idx)}
                          className="text-red-400 text-sm hover:text-red-300"
                        >
                          Remove Item
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddItem}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full"
              >
                + Add Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
