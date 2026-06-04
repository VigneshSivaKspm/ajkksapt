import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Users, GraduationCap, BookOpen, TreePine, Bus, Cpu } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 1400,
    suffix: "+",
    label: "Students Enrolled",
    description: "Across 10 Diploma programmes",
    color: "from-[#D4AF37]/20 to-[#C5A059]/20",
  },
  {
    icon: GraduationCap,
    value: 40,
    suffix: " Yrs",
    label: "Years of Excellence",
    description: "Established in 1984",
    color: "from-[#D4AF37]/20 to-[#C5A059]/20",
  },
  {
    icon: BookOpen,
    value: 31567,
    suffix: "",
    label: "Library Volumes",
    description: "Dr. JKK Munirajahh Library",
    color: "from-[#D4AF37]/20 to-[#C5A059]/20",
  },
  {
    icon: Cpu,
    value: 250,
    suffix: "+",
    label: "Computer Systems",
    description: "Across 5 computing centers",
    color: "from-[#D4AF37]/20 to-[#C5A059]/20",
  },
  {
    icon: TreePine,
    value: 15000,
    suffix: "+",
    label: "Rural Youth Trained",
    description: "Community Polytechnic Scheme",
    color: "from-[#D4AF37]/20 to-[#C5A059]/20",
  },
  {
    icon: Bus,
    value: 20,
    suffix: "",
    label: "Transport Routes",
    description: "Fleet of 20 buses",
    color: "from-[#D4AF37]/20 to-[#C5A059]/20",
  },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2200;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  const display = count >= 10000 ? count.toLocaleString("en-IN") : count;

  return (
    <div ref={ref} className="text-4xl md:text-5xl font-black text-[#D4AF37] mb-1 tabular-nums">
      {display}{suffix}
    </div>
  );
}

export function StatsCounter() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#0D0D0D] relative overflow-hidden">
      {/* Background decorative */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, #D4AF37 0, transparent 60%), radial-gradient(circle at 80% 50%, #D4AF37 0, transparent 60%)" }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">AJKKSAPT in Numbers</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#FAFAFA] mb-3">
            40 Years of Academic Excellence
          </h2>
          <p className="text-base text-[#6B7280] max-w-xl mx-auto">
            A legacy of quality technical education serving urban and rural students since 1984
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-5 text-center transition-all duration-500 hover:border-[#D4AF37]/40 hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] hover:-translate-y-1">
                <div className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon size={22} className="text-[#D4AF37]" />
                </div>
                <Counter target={stat.value} suffix={stat.suffix} />
                <div className="text-sm font-bold text-[#FAFAFA] mb-1">{stat.label}</div>
                <div className="text-[10px] text-[#6B7280] leading-tight">{stat.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider strip */}
        <div className="mt-12 pt-8 border-t border-[#D4AF37]/10 flex flex-wrap justify-center gap-8 text-center">
          {[
            { label: "AICTE Approved", sub: "New Delhi" },
            { label: "DOTE Affiliated", sub: "Chennai, Tamil Nadu" },
            { label: "21.34 Acres Campus", sub: "Gobichettipalayam" },
            { label: "Est. 1984", sub: "40+ Years Legacy" },
          ].map((item) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="text-[#D4AF37] font-bold text-sm">{item.label}</div>
              <div className="text-[#6B7280] text-xs">{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
