import { motion } from "motion/react";
import { Bell, Download, Calendar, AlertCircle, FileText, Info, Pin } from "lucide-react";
import { useState } from "react";

const notices = [
  { id: 1, date: "June 4, 2026", type: "Urgent", title: "Last Date for Semester Exam Fee Payment — July 5, 2026", body: "All students are informed that the last date for payment of Semester Examination fees is July 5, 2026. Students who fail to pay by the deadline will not be eligible to appear for the examination.", pinned: true, hasFile: true },
  { id: 2, date: "June 2, 2026", type: "Academic", title: "Internal Mark Verification — June 10–12, 2026", body: "Students are advised to verify their Semester V and VI internal marks on the notice board. In case of any discrepancy, report to the concerned HOD between June 10–12, 2026.", pinned: true, hasFile: false },
  { id: 3, date: "May 30, 2026", type: "Admission", title: "Admissions Open for 2026–27 — Apply Before July 31", body: "Applications are invited for Diploma Programmes for the academic year 2026–27. Eligible candidates may apply online or collect application forms from the college office.", pinned: false, hasFile: true },
  { id: 4, date: "May 25, 2026", type: "General", title: "Transport Route Changes — Effective June 1, 2026", body: "Due to road construction on the Anthiyur–Sathiyamangalam Road, certain bus routes will be modified effective June 1, 2026. Students are advised to check the updated schedule with Mr. Laksmiganthan.", pinned: false, hasFile: false },
  { id: 5, date: "May 20, 2026", type: "Event", title: "Annual Sports Day 2026 — June 20", body: "Annual Sports Day will be held on June 20, 2026. Students interested in participating must register with Physical Director Mr. R. Saminathan by June 10.", pinned: false, hasFile: false },
  { id: 6, date: "May 18, 2026", type: "Academic", title: "Model Examination Schedule — June 2026", body: "Model examinations for Semester V & VI will be held from June 5–15, 2026. Timetables will be published by respective departments. Attendance is compulsory.", pinned: false, hasFile: true },
  { id: 7, date: "May 15, 2026", type: "General", title: "NCC Camp Registration — Deadline May 30", body: "Students enrolled in NCC who wish to attend the Annual Training Camp must register with Caretaker Ms. D. Gayathri by May 30, 2026. Bring Aadhaar card and College ID.", pinned: false, hasFile: false },
  { id: 8, date: "May 10, 2026", type: "Scholarship", title: "SC/ST Scholarship Renewal — Submit Documents by June 15", body: "SC/ST students receiving government scholarship must submit renewal documents including income certificate, community certificate, and mark sheets to the Admin office by June 15.", pinned: false, hasFile: true },
];

const typeConfig: Record<string, { color: string; icon: typeof Bell }> = {
  Urgent: { color: "border-red-500/30 text-red-400", icon: AlertCircle },
  Academic: { color: "border-blue-500/30 text-blue-400", icon: FileText },
  Admission: { color: "border-[#D4AF37]/30 text-[#D4AF37]", icon: Bell },
  General: { color: "border-gray-500/30 text-gray-400", icon: Info },
  Event: { color: "border-purple-500/30 text-purple-400", icon: Calendar },
  Scholarship: { color: "border-green-500/30 text-green-400", icon: FileText },
};

export function NoticeBoard() {
  const [filter, setFilter] = useState("All");
  const types = ["All", "Urgent", "Academic", "Admission", "General", "Event", "Scholarship"];
  const pinned = notices.filter(n => n.pinned);
  const rest = notices.filter(n => !n.pinned && (filter === "All" || n.type === filter));

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-64 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111111]">
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">Official Communications</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Notice Board</h1>
              <p className="text-[#9CA3AF]">Official notices, circulars, and announcements from AJKKSAPT administration</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {pinned.length > 0 && (
          <div className="mb-10">
            <div className="flex items-center gap-2 mb-4"><Pin size={16} className="text-[#D4AF37]" /><span className="text-[#D4AF37] font-bold text-sm uppercase tracking-wider">Pinned Notices</span></div>
            <div className="space-y-3">
              {pinned.map((n) => {
                const cfg = typeConfig[n.type]; const Icon = cfg.icon;
                return (
                  <motion.div key={n.id} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}
                    className={`bg-[#111111] border rounded-xl p-5 flex items-start gap-4 ${cfg.color}`}>
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-current/10 ${cfg.color}`}><Icon size={17} /></div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${cfg.color}`}>{n.type}</span>
                        <span className="text-[#6B7280] text-xs">{n.date}</span>
                        <Pin size={11} className="text-[#D4AF37]" />
                      </div>
                      <h3 className="text-[#FAFAFA] font-bold text-sm mb-1">{n.title}</h3>
                      <p className="text-[#9CA3AF] text-xs leading-relaxed">{n.body}</p>
                    </div>
                    {n.hasFile && <button className="flex-shrink-0 p-2 rounded-lg border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-200"><Download size={15} className="text-[#D4AF37]" /></button>}
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-6">
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 ${filter === t ? "bg-[#D4AF37] text-[#0A0A0A]" : "bg-[#111111] border border-[#D4AF37]/10 text-[#9CA3AF] hover:border-[#D4AF37]/30"}`}>{t}</button>
          ))}
        </div>

        <div className="space-y-3">
          {rest.map((n, i) => {
            const cfg = typeConfig[n.type]; const Icon = cfg.icon;
            return (
              <motion.div key={n.id} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-[#111111] border border-[#D4AF37]/8 rounded-xl p-5 flex items-start gap-4 hover:border-[#D4AF37]/25 transition-all duration-300">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 bg-current/5 ${cfg.color}`}><Icon size={16} /></div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${cfg.color}`}>{n.type}</span>
                    <span className="text-[#6B7280] text-xs">{n.date}</span>
                  </div>
                  <h3 className="text-[#FAFAFA] font-bold text-sm mb-1">{n.title}</h3>
                  <p className="text-[#9CA3AF] text-xs leading-relaxed">{n.body}</p>
                </div>
                {n.hasFile && <button className="flex-shrink-0 p-2 rounded-lg border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-200"><Download size={14} className="text-[#D4AF37]" /></button>}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
