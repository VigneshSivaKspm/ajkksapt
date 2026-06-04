import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

const galleryImages = [
  {
    url: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
    title: "Campus Life",
    category: "Campus",
  },
  {
    url: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
    title: "Modern Classrooms",
    category: "Infrastructure",
  },
  {
    url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    title: "Technology Labs",
    category: "Facilities",
  },
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
    title: "Student Activities",
    category: "Events",
  },
  {
    url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
    title: "Sports Complex",
    category: "Sports",
  },
  {
    url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop",
    title: "Team Collaboration",
    category: "Academic",
  },
];

export function GalleryPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#121212] to-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
        >
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-4">
              Campus Gallery
            </h2>
            <p className="text-lg text-[#6B7280]">
              Explore our world-class infrastructure and vibrant campus life
            </p>
          </div>
          <Button
            variant="outline"
            className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10 mt-6 md:mt-0 group"
          >
            View Full Gallery
            <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative h-72 rounded-2xl overflow-hidden border border-[#D4AF37]/10 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold rounded-full">
                      {image.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-[#FAFAFA]">
                    {image.title}
                  </h3>
                </div>

                {/* Hover Icon */}
                <div className="absolute top-4 right-4 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-0 group-hover:scale-100 transition-all duration-500">
                  <ImageIcon size={20} className="text-[#0A0A0A]" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
