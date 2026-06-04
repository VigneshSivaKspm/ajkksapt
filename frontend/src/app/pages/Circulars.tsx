import { motion } from "motion/react";
import { FileText, Download, Calendar, Tag } from "lucide-react";
import { useState } from "react";

const circulars = [
  { id: 1, no: "AJKK/2026/CIR/015", date: "June 4, 2026", title: "Regarding Semester End Examination Preparation", dept: "Academic", pages: 2, size: "145 KB" },
  { id: 2, no: "AJKK/2026/CIR/014", date: "May 30, 2026", title: "Guidelines for Final Year Project Submission", dept: "Academic", pages: 3, size: "220 KB" },
  { id: 3, no: "AJKK/2026/CIR/013", date: "May 25, 2026", title: "Hostel Rules and Regulations — Updated 2026", dept: "Hostel", pages: 5, size: "380 KB" },
  { id: 4, no: "AJKK/2026/CIR/012", date: "May 20, 2026", title: "Transport Fee Payment for Term II — Notification", dept: "Transport", pages: 1, size: "98 KB" },
  { id: 5, no: "AJKK/2026/CIR/011", date: "May 15, 2026", title: "Anti-Ragging Policy Compliance Reminder", dept: "Administration", pages: 2, size: "165 KB" },
  { id: 6, no: "AJKK/2026/CIR/010", date: "May 10, 2026", title: "Scholarship Application Form Submission — SC/ST/OBC", dept: "Finance", pages: 3, size: "290 KB" },
  { id: 7, no: "AJKK/2026/CIR/009", date: "May 5, 2026", title: "Industrial Visit Guidelines for 2025-26", dept: "Academic", pages: 2, size: "175 KB" },
  { id: 8, no: "AJKK/2026/CIR/008", date: "April 28, 2026", title: "Library Rules and New Books Additions", dept: "Library", pages: 2, size: "142 KB" },
  { id: 9, no: "AJKK/2026/CIR/007", date: "April 20, 2026", title: "NCC Annual Camp Registration Procedure", dept: "NCC/NSS", pages: 1, size: "88 KB" },
  { id: 10, no: "AJKK/2026/CIR/006", date: "April 15, 2026", title: "Computer Lab Usage Schedule — Even Semester 2026", dept: "Labs", pages: 2, size: "132 KB" },
];

const depts = ["All", "Academic", "Hostel", "Transport", "Administration", "Finance", "Library", "NCC/NSS", "Labs"];

export function Circulars() {
  const [filter, setFilter] = useState("All");
  const filtered = circulars.filter(c => filter === "All" || c.dept === filter);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-64 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111111]">
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">Official College Documents</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">College Circulars</h1>
              <p className="text-[#9CA3AF]">Download official circulars, guidelines, and administrative documents.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {depts.map(d => (
            <button key={d} onClick={() => setFilter(d)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${filter === d ? "bg-[#D4AF37] text-[#0A0A0A]" : "bg-[#111111] border border-[#D4AF37]/10 text-[#9CA3AF] hover:border-[#D4AF37]/30"}`}>{d}</button>
          ))}
        </div>

        <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-b border-[#D4AF37]/10">
                  <th className="px-5 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Circular No.</th>
                  <th className="px-5 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Date</th>
                  <th className="px-5 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Title</th>
                  <th className="px-5 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Department</th>
                  <th className="px-5 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Size</th>
                  <th className="px-5 py-4 text-center text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Download</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => (
                  <motion.tr key={c.id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/5 transition-colors duration-200 group">
                    <td className="px-5 py-4 text-[#D4AF37] text-xs font-mono">{c.no}</td>
                    <td className="px-5 py-4 text-[#9CA3AF] text-sm">
                      <div className="flex items-center gap-1.5"><Calendar size={12} className="text-[#D4AF37]" />{c.date}</div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <FileText size={14} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="text-[#FAFAFA] text-sm font-medium">{c.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-xs rounded-full border border-[#D4AF37]/20">{c.dept}</span>
                    </td>
                    <td className="px-5 py-4 text-[#9CA3AF] text-xs">{c.pages}p · {c.size}</td>
                    <td className="px-5 py-4 text-center">
                      <button className="w-8 h-8 mx-auto rounded-lg bg-[#D4AF37]/10 border border-[#D4AF37]/20 flex items-center justify-center hover:bg-[#D4AF37]/20 transition-all duration-200 group-hover:border-[#D4AF37]/40">
                        <Download size={14} className="text-[#D4AF37]" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 text-[#6B7280] text-xs text-center">
          Showing {filtered.length} circular{filtered.length !== 1 ? "s" : ""}. Contact the administration office for older circulars.
        </div>
      </div>
    </div>
  );
}
