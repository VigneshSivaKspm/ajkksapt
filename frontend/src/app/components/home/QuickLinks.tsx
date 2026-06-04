import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { BookOpen, FileText, Users, Bell, Briefcase, MapPin, ArrowRight, Phone } from "lucide-react";

const links = [
  { icon: BookOpen, title: "Departments", desc: "Explore all 10 Diploma programmes", path: "/departments", color: "from-amber-600/15 to-yellow-600/5" },
  { icon: FileText, title: "Examination", desc: "Schedules, marks & results portal", path: "/examination", color: "from-blue-600/15 to-indigo-600/5" },
  { icon: Users, title: "Admission 2026-27", desc: "Apply now — seats filling fast", path: "/admission", color: "from-[#D4AF37]/15 to-[#C5A059]/5", highlight: true },
  { icon: Bell, title: "Notice Board", desc: "Latest announcements & circulars", path: "/notice-board", color: "from-red-600/15 to-rose-600/5" },
  { icon: MapPin, title: "Infrastructure", desc: "Library, hostels, transport, labs", path: "/infrastructure", color: "from-green-600/15 to-emerald-600/5" },
  { icon: Briefcase, title: "Placement Cell", desc: "Campus recruitment & training", path: "/placement", color: "from-purple-600/15 to-violet-600/5" },
];

export function QuickLinks() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }} className="text-center mb-10">
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Quick Access</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#FAFAFA] mb-2">Quick Navigation</h2>
          <p className="text-[#6B7280] text-sm">Find what you need in one click</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {links.map((link, i) => (
            <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}>
              <Link to={link.path}
                className={`group block bg-gradient-to-br ${link.color} border ${link.highlight ? "border-[#D4AF37]/30" : "border-[#D4AF37]/8"} rounded-2xl p-5 text-center hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.4)]`}>
                <div className={`w-10 h-10 mx-auto mb-3 ${link.highlight ? "bg-[#D4AF37]" : "bg-[#D4AF37]/15 border border-[#D4AF37]/20"} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <link.icon size={18} className={link.highlight ? "text-[#0A0A0A]" : "text-[#D4AF37]"} />
                </div>
                <div className={`font-bold text-sm mb-1 group-hover:text-[#D4AF37] transition-colors duration-300 ${link.highlight ? "text-[#D4AF37]" : "text-[#FAFAFA]"}`}>{link.title}</div>
                <div className="text-[#6B7280] text-[10px] leading-tight">{link.desc}</div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Contact strip */}
        <motion.div initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gradient-to-r from-[#D4AF37]/10 via-[#C5A059]/5 to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#D4AF37]/15 border border-[#D4AF37]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Phone size={18} className="text-[#D4AF37]" />
            </div>
            <div>
              <div className="text-[#FAFAFA] font-bold text-sm">Need Help? Call Us</div>
              <div className="text-[#6B7280] text-xs">Mon–Sat 9:00 AM – 5:00 PM</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="tel:+919894265545" className="px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 text-sm flex items-center gap-2">
              +91 98942 65545 <ArrowRight size={14} />
            </a>
            <Link to="/contact" className="px-5 py-2.5 bg-[#111111] border border-[#D4AF37]/20 text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm">
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
