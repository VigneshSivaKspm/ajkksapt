import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

const programs = [
  { title: "Civil Engineering", icon: "🏗️", desc: "Roads, bridges, structures & construction management", intake: 120, since: 1984, path: "/departments#civil" },
  { title: "Mechanical Engineering", icon: "⚙️", desc: "Machine design, manufacturing & thermal systems", intake: 120, since: 1984, path: "/departments#mechanical" },
  { title: "Automobile Engineering", icon: "🚗", desc: "Vehicle technology, chassis, engines & body", intake: 120, since: 2004, path: "/departments#automobile" },
  { title: "Computer Engineering", icon: "💻", desc: "Software, networks, AI & web technologies", intake: 40, since: 1999, path: "/departments#computer" },
  { title: "Electrical & Electronics", icon: "⚡", desc: "Power systems, circuits & industrial electronics", intake: 120, since: 1992, path: "/departments#eee" },
  { title: "Electronics & Communication", icon: "📡", desc: "Wireless tech, embedded systems & PCB design", intake: 60, since: 2006, path: "/departments#ece" },
];

export function FeaturedPrograms() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-16 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-3">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Popular Programmes</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#FAFAFA]">Featured Diploma Programmes</h2>
          </div>
          <Link to="/departments" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#C5A059] transition-colors duration-300 font-semibold text-sm flex-shrink-0 group">
            View All 10 <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((prog, i) => (
            <motion.div key={i} initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }}>
              <Link to={prog.path} className="group block bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6 h-full hover:border-[#D4AF37]/40 hover:shadow-[0_0_25px_rgba(212,175,55,0.1)] transition-all duration-500 hover:-translate-y-1">
                <div className="text-3xl mb-4 group-hover:scale-110 inline-block transition-transform duration-500">{prog.icon}</div>
                <h3 className="text-[#FAFAFA] font-black text-base mb-1 group-hover:text-[#D4AF37] transition-colors duration-300">Diploma in {prog.title}</h3>
                <div className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-wider mb-3">Est. {prog.since}</div>
                <p className="text-[#6B7280] text-xs leading-relaxed mb-4">{prog.desc}</p>
                <div className="flex items-center justify-between pt-3 border-t border-[#D4AF37]/8">
                  <div className="text-xs text-[#9CA3AF]">Intake: <span className="text-[#D4AF37] font-bold">{prog.intake}</span></div>
                  <div className="text-[#9CA3AF] text-xs">3 Years</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
