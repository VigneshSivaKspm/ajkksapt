import { motion } from "motion/react";
import { FileText, Download, Calendar, Clock, AlertCircle, BookOpen, ChevronRight, ExternalLink } from "lucide-react";

const scheduleData = [
  { sem: "Semester I", period: "Nov – Dec 2026", reg: "Sep 30, 2026", status: "Upcoming" },
  { sem: "Semester II", period: "Apr – May 2026", reg: "Feb 28, 2026", status: "Completed" },
  { sem: "Semester III", period: "Nov – Dec 2025", reg: "Sep 30, 2025", status: "Completed" },
  { sem: "Semester IV", period: "Apr – May 2025", reg: "Feb 28, 2025", status: "Completed" },
  { sem: "Semester V", period: "Nov – Dec 2024", reg: "Sep 30, 2024", status: "Completed" },
  { sem: "Semester VI", period: "Apr – May 2024", reg: "Feb 28, 2024", status: "Completed" },
];

const internalMarksDepts = ["Civil Engineering", "Mechanical Engineering", "Automobile Engineering", "Electrical & Electronics", "Electronics & Communication", "Computer Engineering", "Chemical Engineering", "Petrochemical Engineering", "Textile Technology", "Textile Processing"];

const partTimeDepts = ["Mechanical Engineering", "Electrical & Electronics Engineering"];

const downloads = [
  { title: "Academic Schedule", icon: Calendar, size: "PDF", href: "https://ajkksapt.com/Files/Examination/Academic Schedule.pdf" },
  { title: "Examination Schedule", icon: Clock, size: "PDF", href: "https://ajkksapt.com/Files/Examination/Examination Schedule.pdf" },
  { title: "Exam Fees Details", icon: FileText, size: "PDF", href: "https://ajkksapt.com/Files/Examination/Exam Fees Details.pdf" },
  { title: "Internal Marks Portal", icon: BookOpen, size: "Online", href: "https://ajkksapt.com/Examination/Frm_Internal_Marks.aspx" },
  { title: "Anti-Ragging Declaration", icon: FileText, size: "PDF", href: "https://ajkksapt.com/Files/Admission/Antiragging.pdf" },
  { title: "Rules & Regulations", icon: FileText, size: "PDF", href: "https://ajkksapt.com/Files/Admission/Rules and Regulation.pdf" },
];

const faqItems = [
  { q: "How are examinations conducted?", a: "Examinations are conducted by the State Board of Technical Education (SBTE), Tamil Nadu. We follow prescribed curriculum, marking scheme, and evaluation criteria. All results are published on the TNDTE portal." },
  { q: "Can I appear for improvement exams?", a: "Yes, students who score below the passing criteria can appear for improvement exams in the next examination cycle. Contact the Academic Office for re-registration details." },
  { q: "What is the passing criteria?", a: "Students must secure minimum 40% marks in theory subjects, 40% in practical exams, and must pass in all subjects of each semester to be eligible for the next semester." },
  { q: "How do I access my results?", a: "Results are available on the TNDTE official portal (tndte.gov.in). You can check using your roll number. Results are also displayed on our College Results Portal." },
  { q: "When will I receive my Diploma certificate?", a: "Certificates are issued by SBTE Tamil Nadu within 4-6 months after successful completion of all 6 semesters, project work, and industrial training." },
  { q: "How to report discrepancy in internal marks?", a: "Students must verify their internal marks as displayed in the college notice board. In case of any discrepancy, contact the concerned Head of Department within 5 working days." },
];

export function Examination() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-72 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1920&h=600&fit=crop" alt="Examination" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">State Board of Technical Education · DOTE Chennai</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Examination</h1>
              <p className="text-[#9CA3AF]">Academic schedules, exam timetables, fee details, and internal marks for all semesters.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Notice */}
      <div className="bg-[#D4AF37]/10 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3 flex items-center gap-3">
          <AlertCircle size={16} className="text-[#D4AF37] flex-shrink-0" />
          <p className="text-[#FAFAFA] text-sm"><strong>Notice:</strong> Students are advised to verify their internal marks and, in case of any discrepancy, contact the concerned Head of Department immediately.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">

        {/* Downloads */}
        <motion.section initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Downloads</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Schedules & Documents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {downloads.map((doc, i) => (
              <motion.a key={i} href={doc.href} target="_blank" rel="noopener noreferrer"
                initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-5 flex items-center gap-4 hover:border-[#D4AF37]/40 transition-all duration-300 hover:-translate-y-0.5 text-left">
                <div className="w-11 h-11 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <doc.icon size={20} className="text-[#D4AF37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#FAFAFA] text-sm font-semibold truncate">{doc.title}</div>
                  <div className="text-[#6B7280] text-xs mt-0.5">{doc.size} · Official Document</div>
                </div>
                <Download size={15} className="text-[#D4AF37] flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>
            ))}
          </div>
        </motion.section>

        {/* Schedule Table */}
        <motion.section initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Academic Calendar</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Examination Schedule 2025–26</h2>
          <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-b border-[#D4AF37]/10">
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Semester</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Exam Period</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Registration Deadline</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row, i) => (
                    <tr key={i} className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/5 transition-colors duration-200">
                      <td className="px-6 py-4 text-[#FAFAFA] text-sm font-semibold">{row.sem}</td>
                      <td className="px-6 py-4 text-[#9CA3AF] text-sm">{row.period}</td>
                      <td className="px-6 py-4 text-[#9CA3AF] text-sm">{row.reg}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${row.status === "Upcoming" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "bg-green-500/10 text-green-400"}`}>{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Internal Marks */}
        <motion.section initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Internal Assessment</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Internal Marks — All Semesters</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {["Semester I", "Semester II", "Semester III", "Semester IV", "Semester V", "Semester VI"].map((sem, si) => (
              <motion.div key={si} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: si * 0.07 }}>
                <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-5 hover:border-[#D4AF37]/30 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[#FAFAFA] font-bold">{sem}</h3>
                    <span className="text-[#D4AF37] text-xs font-bold">{si < 4 ? 10 : 8} Depts</span>
                  </div>
                  <div className="space-y-1">
                    {(si < 4 ? internalMarksDepts : internalMarksDepts.slice(0, 8)).map((dept, di) => (
                      <button key={di} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#D4AF37]/5 transition-colors duration-200 group">
                        <span className="text-[#9CA3AF] text-xs">{dept}</span>
                        <Download size={13} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      </button>
                    ))}
                    {si < 4 && (
                      <div className="pt-2 border-t border-[#D4AF37]/10 mt-2">
                        <div className="text-[#6B7280] text-[10px] font-bold uppercase tracking-wider mb-1">Part-Time</div>
                        {partTimeDepts.map((dept, di) => (
                          <button key={di} className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-[#D4AF37]/5 transition-colors duration-200 group">
                            <span className="text-[#9CA3AF] text-xs">{dept}</span>
                            <Download size={13} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Exam Fees + Instructions */}
        <motion.section initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Fees & Instructions</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Examination Fees & Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6">
              <h3 className="text-[#FAFAFA] font-bold mb-4">Fee Structure</h3>
              <div className="space-y-3">
                {[
                  { label: "Theory Paper (per subject)", fee: "₹ 90" },
                  { label: "Practical Paper (per subject)", fee: "₹ 50" },
                  { label: "Drawing Paper (per subject)", fee: "₹ 50" },
                  { label: "Hall Ticket Fee", fee: "₹ 50" },
                  { label: "Late Fee (within 7 days)", fee: "₹ 250" },
                  { label: "Re-registration Fee", fee: "₹ 150" },
                ].map(({ label, fee }) => (
                  <div key={label} className="flex items-center justify-between py-2 border-b border-[#D4AF37]/5 last:border-0">
                    <span className="text-[#9CA3AF] text-sm">{label}</span>
                    <span className="text-[#D4AF37] font-bold text-sm">{fee}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6">
              <h3 className="text-[#FAFAFA] font-bold mb-4">Important Instructions</h3>
              <ul className="space-y-2.5">
                {["Fee must be paid before the deadline announced by DOTE Chennai.","Students must carry Hall Ticket and College ID to all examination venues.","Mobile phones and electronic devices are strictly prohibited in exam halls.","Report to the examination hall 15 minutes before scheduled time.","Results are published on the TNDTE portal — verify on the official website.","For internal mark discrepancies, contact the concerned HOD within 5 days."].map((p, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <ChevronRight size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span className="text-[#9CA3AF] text-sm">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.section>

        {/* FAQ */}
        <motion.section initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">FAQ</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqItems.map((item, i) => (
              <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-5 hover:border-[#D4AF37]/30 transition-all duration-300">
                <h4 className="text-[#FAFAFA] font-bold text-sm mb-2">{item.q}</h4>
                <p className="text-[#6B7280] text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Results CTA */}
        <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#C5A059]/5 to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[#FAFAFA] font-black text-xl mb-2">Check Your Results</h3>
            <p className="text-[#6B7280] text-sm">Board exam results are published on the TNDTE portal and our College Results Portal.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="https://tndte.gov.in" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 text-sm">
              TNDTE Portal <ExternalLink size={14} />
            </a>
            <a href="/results" className="px-6 py-3 bg-[#111111] border border-[#D4AF37]/30 text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm">College Results</a>
          </div>
        </div>
      </div>
    </div>
  );
}
