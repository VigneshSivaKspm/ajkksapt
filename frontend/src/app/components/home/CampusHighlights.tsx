import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Building2, FlaskConical, Users, Award, TreePine, BookOpen } from "lucide-react";

const highlights = [
  { icon: Building2, title: "21.34-Acre Campus", desc: "Spacious, green campus in Gobichettipalayam with modern classrooms, workshops, hostels, and sports facilities.", img: "https://images.unsplash.com/photo-1562774053-701939374585?w=600&h=400&fit=crop" },
  { icon: FlaskConical, title: "Fully-Equipped Laboratories", desc: "Department-wise labs with latest machinery and testing equipment for hands-on practical training.", img: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop" },
  { icon: Users, title: "Experienced Faculty", desc: "Dedicated educators with strong industry credentials and a passion for developing technically skilled students.", img: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop" },
  { icon: BookOpen, title: "Rich Library", desc: "Dr. JKK Munirajahh Library with 31,567 volumes, 11,168 titles, and 104 national & international journals.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=400&fit=crop" },
  { icon: Award, title: "Industry Connections", desc: "Active Placement Cell with strong industry partnerships ensuring practical exposure and campus recruitment.", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop" },
  { icon: TreePine, title: "Community Impact", desc: "15,000+ rural youth trained through Community Polytechnic Scheme since 1998. NCC, NSS, and 5 active clubs.", img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop" },
];

export function CampusHighlights() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section ref={ref} className="py-16 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Campus Highlights</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#FAFAFA] mb-2">Why Our Campus Stands Out</h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-sm">World-class infrastructure supporting holistic academic and personal development</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {highlights.map((item, i) => (
            <motion.div key={i} initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group bg-[#111111] border border-[#D4AF37]/8 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-500 hover:-translate-y-1">
              <div className="h-36 overflow-hidden relative">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37]/30 to-[#C5A059]/20 backdrop-blur-sm border border-[#D4AF37]/30 rounded-xl flex items-center justify-center">
                    <item.icon size={17} className="text-[#D4AF37]" />
                  </div>
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-[#FAFAFA] font-bold mb-1.5 group-hover:text-[#D4AF37] transition-colors duration-300">{item.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
