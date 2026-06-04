import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Shield, MapPin, Users, BookOpen, Cpu, Bus, Trophy, Heart } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "AICTE Approved",
    description: "All programmes approved by All India Council for Technical Education, New Delhi, ensuring national standards of quality.",
  },
  {
    icon: MapPin,
    title: "21.34-Acre Campus",
    description: "Sprawling green campus on the Anthiyur–Sathiyamangalam Road with hostels, sports, cafeteria and modern facilities.",
  },
  {
    icon: BookOpen,
    title: "Rich Library",
    description: "Dr. JKK Munirajahh Library with 31,567 volumes, 11,168 titles, 104 journals, and a large digital collection.",
  },
  {
    icon: Cpu,
    title: "5 Computer Centres",
    description: "250 high-speed internet-connected systems across 5 dedicated computer labs for hands-on technical training.",
  },
  {
    icon: Bus,
    title: "Extensive Transport",
    description: "Fleet of 20 buses covering 20 routes across Gobichettipalayam, Erode, Tiruppur and surrounding towns.",
  },
  {
    icon: Users,
    title: "Hostel Facilities",
    description: "Boys' hostel (Sri Ramakrishnar Illam, ~400 capacity) and Girls' hostel (Sri Sarathadevi Illam) with all amenities.",
  },
  {
    icon: Trophy,
    title: "Active Placement Cell",
    description: "Compulsory soft skills and vocational training year-round with active industry coordination for campus recruitment.",
  },
  {
    icon: Heart,
    title: "Community Service",
    description: "Over 15,000 rural youth trained through Community Polytechnic Scheme since 1998. NCC, NSS, YRC, RRC actively engaged.",
  },
];

export function WhyChooseUs() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section ref={ref} className="py-20 bg-[#0A0A0A] relative overflow-hidden">
      {/* Decorative line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#D4AF37]/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Why Choose AJKKSAPT</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#FAFAFA] mb-3">
            Excellence in Every Dimension
          </h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto">
            From infrastructure to community impact, we are committed to holistic development of every student
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08 }}
              className="group"
            >
              <div className="bg-[#111111] border border-[#D4AF37]/8 rounded-2xl p-6 h-full transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.08)] hover:-translate-y-1">
                <div className="w-12 h-12 mb-5 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  <feature.icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-[#FAFAFA] font-bold mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
