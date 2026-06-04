import { motion } from "motion/react";
import { Library, Wifi, Trophy, Coffee, Music, Heart } from "lucide-react";

const facilities = [
  { icon: Library, title: "Modern Library", description: "Extensive collection of books, journals, and digital resources" },
  { icon: Wifi, title: "High-Speed WiFi", description: "Campus-wide internet connectivity for seamless learning" },
  { icon: Trophy, title: "Sports Complex", description: "State-of-the-art facilities for indoor and outdoor sports" },
  { icon: Coffee, title: "Cafeteria", description: "Hygienic dining facility with diverse cuisine options" },
  { icon: Music, title: "Auditorium", description: "Modern auditorium for events, seminars, and cultural programs" },
  { icon: Heart, title: "Health Center", description: "24/7 medical facility with qualified healthcare professionals" },
];

export function CampusLife() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=600&fit=crop"
            alt="Campus Life"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAFAFA] mb-4">
                Campus Life
              </h1>
              <p className="text-xl text-[#6B7280] max-w-2xl">
                Experience a Vibrant Community and World-Class Facilities
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4">
              World-Class Facilities
            </h2>
            <p className="text-lg text-[#6B7280]">
              Everything you need for a holistic educational experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-8 hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500"
              >
                <div className="w-16 h-16 mb-6 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-2xl flex items-center justify-center">
                  <facility.icon size={32} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-xl font-semibold text-[#FAFAFA] mb-3">{facility.title}</h3>
                <p className="text-[#6B7280]">{facility.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4">
              Campus Highlights
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1562774053-701939374585?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&h=600&fit=crop",
              "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
            ].map((img, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="h-72 rounded-2xl overflow-hidden border border-[#D4AF37]/10 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <img src={img} alt={`Campus ${index + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
