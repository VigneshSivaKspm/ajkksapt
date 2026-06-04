import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Link } from "react-router";
import { ArrowRight, Settings, Zap, Cpu, Wrench, FlaskConical, Layers, Shirt } from "lucide-react";

const departments = [
  {
    id: "civil",
    name: "Civil Engineering",
    short: "Civil",
    year: 1984,
    intake: 120,
    icon: Layers,
    color: "from-amber-600/20 to-yellow-600/10",
    border: "hover:border-amber-600/30",
    description: "Roads, bridges, structures & construction",
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    short: "Mechanical",
    year: 1984,
    intake: 120,
    icon: Settings,
    color: "from-[#D4AF37]/20 to-[#C5A059]/10",
    border: "hover:border-[#D4AF37]/30",
    description: "Design, manufacturing & thermal systems",
  },
  {
    id: "automobile",
    name: "Automobile Engineering",
    short: "Automobile",
    year: 2004,
    intake: 120,
    icon: Wrench,
    color: "from-orange-600/20 to-amber-600/10",
    border: "hover:border-orange-600/30",
    description: "Vehicle technology, engines & chassis",
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engg",
    short: "EEE",
    year: 1992,
    intake: 120,
    icon: Zap,
    color: "from-yellow-500/20 to-amber-500/10",
    border: "hover:border-yellow-500/30",
    description: "Power systems, circuits & electronics",
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    short: "ECE",
    year: 2006,
    intake: 60,
    icon: Cpu,
    color: "from-[#D4AF37]/20 to-[#C5A059]/10",
    border: "hover:border-[#D4AF37]/30",
    description: "Communication systems & embedded tech",
  },
  {
    id: "computer",
    name: "Computer Engineering",
    short: "CSE",
    year: 1999,
    intake: 40,
    icon: Cpu,
    color: "from-blue-600/20 to-indigo-600/10",
    border: "hover:border-blue-600/30",
    description: "Software, networks & web technology",
  },
  {
    id: "chemical",
    name: "Chemical Engineering",
    short: "Chemical",
    year: 1997,
    intake: 20,
    icon: FlaskConical,
    color: "from-green-600/20 to-emerald-600/10",
    border: "hover:border-green-600/30",
    description: "Chemical processes & industrial chemistry",
  },
  {
    id: "petrochem",
    name: "Petrochemical Engineering",
    short: "Petrochem",
    year: 1999,
    intake: 20,
    icon: FlaskConical,
    color: "from-purple-600/20 to-violet-600/10",
    border: "hover:border-purple-600/30",
    description: "Petroleum refining & petrochemical processes",
  },
  {
    id: "textile-tech",
    name: "Textile Technology",
    short: "Textile Tech",
    year: 1984,
    intake: 40,
    icon: Shirt,
    color: "from-pink-600/20 to-rose-600/10",
    border: "hover:border-pink-600/30",
    description: "Weaving, spinning & textile manufacturing",
  },
  {
    id: "textile-proc",
    name: "Textile Processing",
    short: "Textile Proc",
    year: 1984,
    intake: 40,
    icon: Shirt,
    color: "from-red-600/20 to-pink-600/10",
    border: "hover:border-red-600/30",
    description: "Dyeing, printing & finishing processes",
  },
];

export function DepartmentsShowcase() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4"
        >
          <div>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Academic Programmes</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#FAFAFA] mb-3">
              10 Diploma Programmes
            </h2>
            <p className="text-[#6B7280] max-w-xl">
              Three-year industry-aligned Diploma courses approved by AICTE and affiliated to DOTE, Tamil Nadu
            </p>
          </div>
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 font-semibold text-sm flex-shrink-0 group"
          >
            All Departments
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {departments.map((dept, index) => (
            <motion.div
              key={dept.id}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: index * 0.06 }}
            >
              <Link
                to={`/departments#${dept.id}`}
                className={`group block bg-[#111111] border border-[#D4AF37]/8 rounded-2xl p-5 transition-all duration-500 ${dept.border} hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1`}
              >
                <div className={`w-10 h-10 mb-4 bg-gradient-to-br ${dept.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <dept.icon size={20} className="text-[#D4AF37]" />
                </div>
                <div className="text-[10px] text-[#D4AF37] font-bold tracking-widest uppercase mb-1">Est. {dept.year}</div>
                <h3 className="text-[#FAFAFA] font-bold text-sm leading-tight mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {dept.name}
                </h3>
                <p className="text-[#6B7280] text-[11px] leading-relaxed mb-3">{dept.description}</p>
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#9CA3AF]">Intake: <span className="text-[#D4AF37] font-bold">{dept.intake}</span></span>
                  <span className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Part-time courses note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 p-4 bg-[#111111] border border-[#D4AF37]/10 rounded-xl flex items-center gap-4"
        >
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] flex-shrink-0" />
          <p className="text-[#6B7280] text-sm">
            <span className="text-[#FAFAFA] font-semibold">Part-Time Courses also available</span> — Diploma in Mechanical Engineering & Diploma in Electrical and Electronics Engineering
          </p>
        </motion.div>
      </div>
    </section>
  );
}
