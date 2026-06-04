import { motion } from "motion/react";
import { useState } from "react";
import { X, ZoomIn } from "lucide-react";

const categories = ["All", "Campus", "Labs", "Events", "Sports", "Community"];

const galleryItems = [
  { id: 1, src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop", alt: "Campus Building", category: "Campus" },
  { id: 2, src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop", alt: "Computer Lab", category: "Labs" },
  { id: 3, src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop", alt: "College Entrance", category: "Campus" },
  { id: 4, src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop", alt: "Annual Day Event", category: "Events" },
  { id: 5, src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop", alt: "Library", category: "Campus" },
  { id: 6, src: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop", alt: "Hostel", category: "Campus" },
  { id: 7, src: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop", alt: "Workshop", category: "Events" },
  { id: 8, src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop", alt: "Student Achievement", category: "Events" },
  { id: 9, src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop", alt: "Sports Day", category: "Sports" },
  { id: 10, src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=600&fit=crop", alt: "Placement Drive", category: "Events" },
  { id: 11, src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop", alt: "Community Service", category: "Community" },
  { id: 12, src: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=800&h=600&fit=crop", alt: "Exam Hall", category: "Campus" },
  { id: 13, src: "https://images.unsplash.com/photo-1609234656432-603bcc81a3f9?w=800&h=600&fit=crop", alt: "Mechanical Lab", category: "Labs" },
  { id: 14, src: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop", alt: "Electronics Lab", category: "Labs" },
  { id: 15, src: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?w=800&h=600&fit=crop", alt: "NSS Camp", category: "Community" },
  { id: 16, src: "https://images.unsplash.com/photo-1551836022-4d4a9f3f4d2e?w=800&h=600&fit=crop", alt: "Cricket Match", category: "Sports" },
  { id: 17, src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&h=600&fit=crop", alt: "Seminar", category: "Events" },
  { id: 18, src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop", alt: "Faculty", category: "Campus" },
];

export function Gallery() {
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState<null | typeof galleryItems[0]>(null);

  const filtered = galleryItems.filter(g => active === "All" || g.category === active);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=500&fit=crop" alt="Gallery" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Photo Gallery</h1>
              <p className="text-[#9CA3AF]">Capturing life at Annai J.K.K. Sampoorani Ammal Polytechnic College</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button key={cat} onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${active === cat ? "bg-[#D4AF37] text-[#0A0A0A]" : "bg-[#111111] border border-[#D4AF37]/10 text-[#9CA3AF] hover:border-[#D4AF37]/30"}`}>{cat}</button>
          ))}
        </div>

        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {filtered.map((item, i) => (
            <motion.div key={item.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: i * 0.04 }}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl border border-[#D4AF37]/8 hover:border-[#D4AF37]/30 transition-all duration-300"
              onClick={() => setLightbox(item)}>
              <img src={item.src} alt={item.alt} className="w-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
              <div className="absolute inset-0 bg-[#0A0A0A]/0 group-hover:bg-[#0A0A0A]/50 transition-all duration-300 flex items-center justify-center">
                <ZoomIn size={28} className="text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-[#FAFAFA] text-xs font-medium">{item.alt}</div>
                <div className="text-[#D4AF37] text-[10px]">{item.category}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-6 right-6 w-10 h-10 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full flex items-center justify-center text-[#FAFAFA] hover:bg-[#D4AF37]/20 transition-all duration-200">
            <X size={20} />
          </button>
          <motion.img initial={{ scale: 0.9 }} animate={{ scale: 1 }} src={lightbox.src} alt={lightbox.alt}
            className="max-w-4xl max-h-[85vh] w-full object-contain rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()} />
        </motion.div>
      )}
    </div>
  );
}
