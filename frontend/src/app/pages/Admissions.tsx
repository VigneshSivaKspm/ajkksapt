import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, FileText, Download, ChevronRight, GraduationCap, Award } from "lucide-react";

const courses = [
  { name: "Civil Engineering", intake: 120, type: "Full Time" },
  { name: "Mechanical Engineering", intake: 120, type: "Full Time" },
  { name: "Automobile Engineering", intake: 120, type: "Full Time" },
  { name: "Electrical & Electronics Engineering", intake: 120, type: "Full Time" },
  { name: "Electronics & Communication Engineering", intake: 60, type: "Full Time" },
  { name: "Computer Engineering", intake: 40, type: "Full Time" },
  { name: "Chemical Engineering", intake: 20, type: "Full Time" },
  { name: "Petrochemical Engineering", intake: 20, type: "Full Time" },
  { name: "Textile Technology", intake: 40, type: "Full Time" },
  { name: "Textile Processing", intake: 40, type: "Full Time" },
  { name: "Mechanical Engineering", intake: 30, type: "Part Time" },
  { name: "Electrical & Electronics Engineering", intake: 30, type: "Part Time" },
];

const scholarships = [
  { condition: "90% and above in SSLC", amount: "₹10,000", note: "For entire course" },
  { condition: "80 – 89% in SSLC", amount: "₹5,000", note: "For entire course" },
  { condition: "70 – 79% in SSLC", amount: "₹3,000", note: "For entire course" },
  { condition: "Sports — District/State participant", amount: "₹5,000", note: "Off total fees for entire course" },
  { condition: "NSS/NCC active participation", amount: "₹5,000", note: "Per year from Trust" },
  { condition: "SC/ST students", amount: "Govt. norms", note: "Government scholarship applicable" },
];

export function Admissions() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", course: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    setForm({ name: "", email: "", phone: "", course: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-80 overflow-hidden hero-preserve">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=600&fit=crop" alt="Admissions" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-5">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Admissions Open — 2026-27</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FAFAFA] mb-3">Join AJKKSAPT</h1>
              <p className="text-lg text-[#9CA3AF] max-w-2xl">Begin Your Journey Towards a Rewarding Technical Career in Engineering & Technology</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">

        {/* Eligibility */}
        <motion.section id="eligibility" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Eligibility Criteria</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Who Can Apply?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "First Year Entry", icon: GraduationCap, points: ["SSLC (10 years schooling) or equivalent recognized by Board of Higher Secondary Education, TN and DOTE Chennai","No minimum percentage requirement specified","No age limit applicable","Students from all streams eligible"] },
              { title: "Lateral Entry (Second Year)", icon: Award, points: ["Higher Secondary (10+2) with Mathematics, Physics & Chemistry as subjects","OR ITI 2-year course graduates can enter directly into 2nd year","No age limit","Direct admission to 2nd year of the Diploma programme"] },
            ].map((item, i) => (
              <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-7 hover:border-[#D4AF37]/30 transition-all duration-500">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center mb-5">
                  <item.icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-[#FAFAFA] font-black text-lg mb-4">{item.title}</h3>
                <ul className="space-y-2.5">
                  {item.points.map((p, pi) => (
                    <li key={pi} className="flex items-start gap-2 text-[#9CA3AF] text-sm"><ChevronRight size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />{p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Courses Table */}
        <motion.section initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Available Courses</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">12 Diploma Programmes</h2>
          <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-b border-[#D4AF37]/10">
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Course Name</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Intake</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, i) => (
                    <tr key={i} className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/5 transition-colors duration-200">
                      <td className="px-6 py-4 text-[#6B7280] text-sm">{i + 1}</td>
                      <td className="px-6 py-4 text-[#FAFAFA] text-sm font-medium">Diploma in {course.name}</td>
                      <td className="px-6 py-4 text-[#9CA3AF] text-sm">{course.intake} Seats</td>
                      <td className="px-6 py-4 text-[#9CA3AF] text-sm">3 Years</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${course.type === "Full Time" ? "bg-[#D4AF37]/15 text-[#D4AF37]" : "bg-blue-500/15 text-blue-400"}`}>{course.type}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Admission Process + Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">How to Apply</span>
            </div>
            <h2 className="text-2xl font-black text-[#FAFAFA] mb-8">Admission Process</h2>
            <div className="space-y-4">
              {[
                { step: "01", title: "Fill Application Form", desc: "Complete the online or offline application form with accurate personal and academic information." },
                { step: "02", title: "Document Submission", desc: "Submit SSLC/HSC mark sheet, Transfer Certificate, Community Certificate, Aadhaar card, and passport photos." },
                { step: "03", title: "Counseling Session", desc: "Attend a counseling session to discuss course selection, career guidance, and fee details." },
                { step: "04", title: "Fee Payment & Enrollment", desc: "Complete the fee payment process and receive your admission confirmation and college ID." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 bg-[#111111] border border-[#D4AF37]/10 rounded-xl hover:border-[#D4AF37]/30 transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-[#D4AF37] font-black text-sm">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="text-[#FAFAFA] font-bold mb-1">{item.title}</h3>
                    <p className="text-[#6B7280] text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Downloads */}
            <div className="mt-6 space-y-3">
              {[
                { label: "Full-Time Brochure (Front)", href: "https://ajkksapt.com/Files/Admission/Image/Poly Brochure FT F1.jpg" },
                { label: "Fees Structure", href: "https://ajkksapt.com/Files/Admission/Fees Structure.pdf" },
                { label: "Fees Regulation", href: "https://ajkksapt.com/Files/Admission/Fees Regulation.pdf" },
                { label: "Rules & Regulations", href: "https://ajkksapt.com/Files/Admission/Rules and Regulation.pdf" },
                { label: "Anti-Ragging Declaration", href: "https://ajkksapt.com/Files/Admission/Antiragging.pdf" },
              ].map((doc, i) => (
                <a key={i} href={doc.href} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-between p-4 bg-[#111111] border border-[#D4AF37]/10 rounded-xl hover:border-[#D4AF37]/30 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <FileText size={16} className="text-[#D4AF37]" />
                    <span className="text-[#9CA3AF] text-sm">{doc.label}</span>
                  </div>
                  <Download size={15} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-8 sticky top-24">
              <h2 className="text-xl font-black text-[#FAFAFA] mb-6">Online Enquiry Form</h2>
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-black text-[#FAFAFA] mb-2">Thank You!</h3>
                  <p className="text-[#6B7280] text-sm">Your enquiry has been submitted. Our admission team will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {[
                    { label: "Full Name *", key: "name", type: "text", placeholder: "Your full name" },
                    { label: "Email Address *", key: "email", type: "email", placeholder: "your@email.com" },
                    { label: "Phone Number *", key: "phone", type: "tel", placeholder: "+91 XXXXX XXXXX" },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">{label}</label>
                      <input required type={type} value={form[key as keyof typeof form]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} placeholder={placeholder}
                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 placeholder-[#4B5563]" />
                    </div>
                  ))}
                  <div>
                    <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Interested Course *</label>
                    <select required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200">
                      <option value="">Select a course</option>
                      {courses.filter(c => c.type === "Full Time").map(c => <option key={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Message (Optional)</label>
                    <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 resize-none placeholder-[#4B5563]" placeholder="Any specific questions?" />
                  </div>
                  <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-black rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    Submit Enquiry
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Scholarships */}
        <motion.section id="scholarship" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="scroll-mt-24">
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Financial Aid</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Scholarships Available</h2>
          <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-b border-[#D4AF37]/10">
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Eligibility Condition</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Scholarship Amount</th>
                    <th className="px-6 py-4 text-left text-[#D4AF37] text-xs font-bold uppercase tracking-wider">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships.map((s, i) => (
                    <tr key={i} className="border-b border-[#D4AF37]/5 hover:bg-[#D4AF37]/5 transition-colors duration-200">
                      <td className="px-6 py-4 text-[#FAFAFA] text-sm">{s.condition}</td>
                      <td className="px-6 py-4 text-[#D4AF37] font-bold text-sm">{s.amount}</td>
                      <td className="px-6 py-4 text-[#9CA3AF] text-xs">{s.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        {/* Rules */}
        <motion.section id="rules" initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="scroll-mt-24">
          <div className="bg-gradient-to-r from-[#D4AF37]/10 via-[#C5A059]/5 to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-8">
            <h3 className="text-[#FAFAFA] font-black text-xl mb-2">Anti-Ragging Policy</h3>
            <p className="text-[#6B7280] text-sm mb-4">Annai J.K.K. Sampoorani Ammal Polytechnic College strictly follows zero-tolerance anti-ragging policies as per UGC/AICTE regulations. All students must submit an Anti-Ragging Declaration at the time of admission.</p>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold rounded-xl text-sm hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300">
              <Download size={16} />
              Download Anti-Ragging Declaration
            </button>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
