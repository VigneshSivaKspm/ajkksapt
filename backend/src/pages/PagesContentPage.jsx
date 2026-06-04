import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  getPageContent,
  updatePageContent,
} from "../services/frontendContentService";
import { Save } from "lucide-react";

const pages = [
  { name: "about", label: "About Us" },
  { name: "academics", label: "Academics" },
  { name: "admissions", label: "Admissions" },
  { name: "campusLife", label: "Campus Life" },
  { name: "departments", label: "Departments" },
  { name: "infrastructure", label: "Infrastructure" },
  { name: "placement", label: "Placement" },
  { name: "studentLife", label: "Student Life" },
];

export default function PagesContentPage() {
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState("about");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadContent();
  }, []);

  async function loadContent() {
    try {
      setLoading(true);
      const allContent = {};

      for (const page of pages) {
        try {
          const data = await getPageContent(page.name);
          allContent[page.name] = data || { sections: [] };
        } catch (error) {
          allContent[page.name] = { sections: [] };
        }
      }

      setContent(allContent);
    } catch (error) {
      toast.error("Failed to load pages content");
    } finally {
      setLoading(false);
    }
  }

  async function handleSave() {
    try {
      setSaving(true);
      await updatePageContent(activePage, content[activePage] || {});
      toast.success("Page content saved successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  }

  function handleContentChange(field, value) {
    setContent({
      ...content,
      [activePage]: {
        ...content[activePage],
        [field]: value,
      },
    });
  }

  function handleSectionChange(index, field, value) {
    const sections = (content[activePage]?.sections || []).slice();
    sections[index] = { ...sections[index], [field]: value };
    setContent({
      ...content,
      [activePage]: {
        ...content[activePage],
        sections: sections,
      },
    });
  }

  function handleAddSection() {
    const sections = (content[activePage]?.sections || []).slice();
    sections.push({
      title: "",
      content: "",
      imageUrl: "",
      order: sections.length,
    });
    setContent({
      ...content,
      [activePage]: {
        ...content[activePage],
        sections: sections,
      },
    });
  }

  function handleRemoveSection(index) {
    const sections = (content[activePage]?.sections || []).slice();
    sections.splice(index, 1);
    setContent({
      ...content,
      [activePage]: {
        ...content[activePage],
        sections: sections,
      },
    });
  }

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const currentData = content[activePage] || {};

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Pages Content Management</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 disabled:opacity-50"
        >
          <Save size={20} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Page Selector */}
        <div className="md:col-span-1">
          <div className="bg-surface-800 rounded-lg border border-surface-600 p-4 sticky top-8">
            <h3 className="font-bold mb-3 text-sm uppercase text-gray-400">
              Pages
            </h3>
            <div className="space-y-2">
              {pages.map((page) => (
                <button
                  key={page.name}
                  onClick={() => setActivePage(page.name)}
                  className={`w-full text-left px-3 py-2 rounded transition text-sm ${
                    activePage === page.name
                      ? "bg-blue-600 text-white"
                      : "bg-surface-700 text-gray-300 hover:bg-surface-600"
                  }`}
                >
                  {page.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div className="md:col-span-3">
          <div className="bg-surface-800 rounded-lg border border-surface-600 p-6">
            <h2 className="text-xl font-bold mb-4">
              {pages.find((p) => p.name === activePage)?.label}
            </h2>

            <div className="space-y-6">
              {/* Meta Information */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Hero Subtitle
                </label>
                <input
                  type="text"
                  value={currentData.heroSubtitle || ""}
                  onChange={(e) =>
                    handleContentChange("heroSubtitle", e.target.value)
                  }
                  className="w-full bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
                  placeholder="Display under page title"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Meta Description
                </label>
                <textarea
                  value={currentData.metaDescription || ""}
                  onChange={(e) =>
                    handleContentChange("metaDescription", e.target.value)
                  }
                  className="w-full bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white"
                  placeholder="SEO meta description"
                  rows="2"
                />
              </div>

              {/* Sections */}
              <div>
                <h3 className="font-bold mb-3">Page Sections</h3>
                <div className="space-y-4">
                  {(currentData.sections || []).map((section, idx) => (
                    <div
                      key={idx}
                      className="bg-surface-700 p-4 rounded border border-surface-600"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">
                            Title
                          </label>
                          <input
                            type="text"
                            placeholder="Section title"
                            value={section.title || ""}
                            onChange={(e) =>
                              handleSectionChange(idx, "title", e.target.value)
                            }
                            className="w-full bg-surface-600 border border-surface-500 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-gray-400 mb-1 block">
                            Order
                          </label>
                          <input
                            type="number"
                            value={section.order || idx}
                            onChange={(e) =>
                              handleSectionChange(
                                idx,
                                "order",
                                parseInt(e.target.value),
                              )
                            }
                            className="w-full bg-surface-600 border border-surface-500 rounded px-3 py-2 text-white text-sm"
                          />
                        </div>
                      </div>
                      <div className="mb-3">
                        <label className="text-xs text-gray-400 mb-1 block">
                          Image URL
                        </label>
                        <input
                          type="url"
                          placeholder="https://..."
                          value={section.imageUrl || ""}
                          onChange={(e) =>
                            handleSectionChange(idx, "imageUrl", e.target.value)
                          }
                          className="w-full bg-surface-600 border border-surface-500 rounded px-3 py-2 text-white text-sm"
                        />
                      </div>
                      <textarea
                        placeholder="Section content (supports HTML)"
                        value={section.content || ""}
                        onChange={(e) =>
                          handleSectionChange(idx, "content", e.target.value)
                        }
                        className="w-full bg-surface-600 border border-surface-500 rounded px-3 py-2 text-white text-sm mb-2"
                        rows="4"
                      />
                      <button
                        onClick={() => handleRemoveSection(idx)}
                        className="text-red-400 text-sm hover:text-red-300"
                      >
                        Remove Section
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleAddSection}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 w-full mt-4"
                >
                  + Add Section
                </button>
              </div>

              {/* Additional Fields */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Additional Info (JSON)
                </label>
                <textarea
                  value={JSON.stringify(
                    currentData.additionalInfo || {},
                    null,
                    2,
                  )}
                  onChange={(e) => {
                    try {
                      handleContentChange(
                        "additionalInfo",
                        JSON.parse(e.target.value),
                      );
                    } catch {}
                  }}
                  className="w-full bg-surface-700 border border-surface-600 rounded px-3 py-2 text-white font-mono text-sm"
                  rows="4"
                  placeholder="{}"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
