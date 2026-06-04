import { motion } from "motion/react";
import { Calendar, Tag, ArrowRight, Search } from "lucide-react";
import { useState } from "react";

const newsItems = [
  { id: 1, date: "June 4, 2026", category: "Achievement", title: "AJKKSAPT Students Win State-Level Technical Competition", excerpt: "Our Mechanical Engineering students secured 1st place at the Tamil Nadu State Polytechnic Technical Competition 2026, competing against 120 colleges.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop", featured: true },
  { id: 2, date: "May 28, 2026", category: "Campus", title: "New Computer Laboratory Inaugurated with 50 High-Speed Systems", excerpt: "The new Computer Lab was inaugurated by the Principal, adding 50 new systems with high-speed internet connectivity to serve the Computer Engineering department.", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=500&fit=crop", featured: false },
  { id: 3, date: "May 20, 2026", category: "Placement", title: "Infosys BPO Recruitment Drive — 45 Students Placed", excerpt: "Infosys BPO conducted a successful campus placement drive at AJKKSAPT, selecting 45 students from Civil, Mechanical, EEE, and Computer Engineering departments.", image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop", featured: false },
  { id: 4, date: "May 15, 2026", category: "Community", title: "Community Polytechnic Free Training Camp Completes 200th Batch", excerpt: "The Community Polytechnic Scheme completed its 200th training batch, cumulatively training over 15,000 rural youth in the Gobichettipalayam region since 1998.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop", featured: false },
  { id: 5, date: "May 10, 2026", category: "Event", title: "Annual Sports Day 2026 — Kabaddi Team Champions", excerpt: "AJKKSAPT Annual Sports Day celebrated with 600+ students participating. The college Kabaddi team won the inter-collegiate district championship for the third consecutive year.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop", featured: false },
  { id: 6, date: "May 5, 2026", category: "Event", title: "National Conference on Emerging Technologies Hosted", excerpt: "AJKKSAPT hosted a two-day National Conference on Emerging Technologies featuring 12 industry experts and 300+ delegates from polytechnic colleges across Tamil Nadu.", image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=500&fit=crop", featured: false },
  { id: 7, date: "April 28, 2026", category: "Community", title: "NSS Blood Donation Camp — 180 Units Collected", excerpt: "The NSS unit organized a blood donation camp in association with GVN Hospital, Gobichettipalayam. 180 students and staff donated blood voluntarily.", image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop", featured: false },
  { id: 8, date: "April 20, 2026", category: "Achievement", title: "Principal Receives Excellence in Technical Education Award", excerpt: "Prof. P. Ramesh, Principal of AJKKSAPT, received the 'Excellence in Technical Education Leadership' award from the Tamil Nadu Technical Education Board.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=500&fit=crop", featured: false },
];

const categories = ["All", "Achievement", "Campus", "Placement", "Community", "Event"];

const categoryColors: Record<string, string> = {
  Achievement: "bg-amber-500/20 text-amber-400",
  Campus: "bg-blue-500/20 text-blue-400",
  Placement: "bg-green-500/20 text-green-400",
  Community: "bg-purple-500/20 text-purple-400",
  Event: "bg-[#D4AF37]/20 text-[#D4AF37]",
};

export function NewsEvents() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = newsItems.filter(n =>
    (activeCategory === "All" || n.category === activeCategory) &&
    n.title.toLowerCase().includes(search.toLowerCase())
  );

  const featured = filtered.find(n => n.featured) || filtered[0];
  const rest = filtered.filter(n => n !== featured);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-64 overflow-hidden hero-preserve">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1920&h=500&fit=crop" alt="News" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">News & Events</h1>
              <p className="text-[#9CA3AF]">Latest happenings, achievements, and events at AJKKSAPT</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news..."
              className="w-full bg-[#111111] border border-[#D4AF37]/10 text-[#FAFAFA] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200" />
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? "bg-[#D4AF37] text-[#0A0A0A]" : "bg-[#111111] border border-[#D4AF37]/10 text-[#9CA3AF] hover:border-[#D4AF37]/30"}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {featured && (
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="mb-10">
            <div className="group bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500 grid grid-cols-1 lg:grid-cols-2">
              <div className="h-64 lg:h-auto overflow-hidden">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[featured.category] || "bg-[#D4AF37]/20 text-[#D4AF37]"}`}>{featured.category}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#D4AF37] text-[#0A0A0A]">Featured</span>
                </div>
                <div className="flex items-center gap-2 text-[#6B7280] text-sm mb-3"><Calendar size={14} /><span>{featured.date}</span></div>
                <h2 className="text-2xl font-black text-[#FAFAFA] mb-3 group-hover:text-[#D4AF37] transition-colors duration-300">{featured.title}</h2>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-1 text-[#D4AF37] text-sm font-semibold group/btn cursor-pointer">Read Full Story <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform duration-300" /></div>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((item, i) => (
            <motion.article key={item.id} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07 }} className="group cursor-pointer">
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)] transition-all duration-500 hover:-translate-y-1 h-full">
                <div className="h-44 overflow-hidden relative">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${categoryColors[item.category] || "bg-[#D4AF37]/20 text-[#D4AF37]"}`}>{item.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[#6B7280] text-xs mb-2"><Calendar size={12} /><span>{item.date}</span></div>
                  <h3 className="text-[#FAFAFA] font-bold text-base mb-2 group-hover:text-[#D4AF37] transition-colors duration-300 line-clamp-2">{item.title}</h3>
                  <p className="text-[#6B7280] text-xs leading-relaxed line-clamp-3 mb-4">{item.excerpt}</p>
                  <div className="flex items-center gap-1 text-[#D4AF37] text-xs font-semibold group/btn">
                    Read More <ArrowRight size={13} className="group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
