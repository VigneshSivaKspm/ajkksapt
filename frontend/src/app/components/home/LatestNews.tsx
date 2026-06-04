import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const newsItems = [
  { date: "June 4, 2026", category: "Achievement", title: "Students Win State-Level Technical Competition", excerpt: "AJKKSAPT Mechanical Engineering students secured 1st place at the Tamil Nadu State Polytechnic Technical Fest 2026.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop" },
  { date: "May 28, 2026", category: "Campus", title: "New Computer Lab Inaugurated with 50 Systems", excerpt: "A new computer lab was inaugurated adding 50 internet-connected systems to support Computer Engineering students.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop" },
  { date: "May 20, 2026", category: "Placement", title: "Infosys BPO Recruitment Drive — 45 Placed", excerpt: "Infosys BPO conducted a successful campus drive selecting 45 AJKKSAPT students from multiple departments.", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop" },
  { date: "May 15, 2026", category: "Community", title: "Community Polytechnic Completes 200th Training Batch", excerpt: "The Community Polytechnic Scheme has cumulatively trained over 15,000 rural youth since starting operations in 1998.", image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop" },
];

const categoryColors: Record<string, string> = {
  Achievement: "bg-amber-500/20 text-amber-400",
  Campus: "bg-blue-500/20 text-blue-400",
  Placement: "bg-green-500/20 text-green-400",
  Community: "bg-purple-500/20 text-purple-400",
};

export function LatestNews() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-20 bg-[#0D0D0D]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Latest Updates</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#FAFAFA] mb-2">News & Events</h2>
            <p className="text-[#6B7280] text-sm">Stay informed about campus happenings and achievements</p>
          </div>
          <Link to="/news-events" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm font-semibold flex-shrink-0 group">
            All News <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {newsItems.map((news, index) => (
            <motion.article key={index} initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: index * 0.1 }} className="group cursor-pointer">
              <div className="bg-[#111111] border border-[#D4AF37]/8 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)] transition-all duration-500 hover:-translate-y-1 h-full">
                <div className="relative h-44 overflow-hidden">
                  <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${categoryColors[news.category] || "bg-[#D4AF37]/20 text-[#D4AF37]"}`}>{news.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#6B7280] text-xs mb-2"><Calendar size={12} /><span>{news.date}</span></div>
                  <h3 className="text-[#FAFAFA] font-bold text-sm mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">{news.title}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed line-clamp-3 mb-3">{news.excerpt}</p>
                  <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-semibold group/btn">
                    Read More <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
