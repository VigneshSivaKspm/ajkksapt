import { motion } from "motion/react";
import { Home, Bus, Coffee, Trophy, BookOpen, Users, Wifi, Heart } from "lucide-react";
import { Link } from "react-router";

const aspects = [
  { icon: Home, title: "Hostel Life", desc: "Sri Ramakrishnar Illam (Boys) and Sri Sarathadevi Illam (Girls) provide comfortable, secure residential facilities with all amenities — from vegetarian & non-veg meals to DTH TV and daily newspapers.", link: "/infrastructure#hostel" },
  { icon: Bus, title: "Transport Network", desc: "20 buses covering 20 routes across Gobichettipalayam, Erode, Tiruppur, and surrounding areas ensure safe, punctual commuting for students from all corners of the region.", link: "/infrastructure#transport" },
  { icon: Coffee, title: "Cafeteria", desc: "A large, spacious cafeteria serves nutritious meals via college coupons in a vibrant social setting surrounded by green campus views. Students gather here to relax and connect.", link: "/infrastructure#cafeteria" },
  { icon: Trophy, title: "Sports & Athletics", desc: "Comprehensive sports facilities for Cricket, Volleyball, Football, Badminton, Kabaddi, Chess, Carrom, and Athletics. The college actively participates in inter-collegiate and district-level competitions.", link: "/infrastructure#sports" },
  { icon: BookOpen, title: "Library Resources", desc: "Dr. JKK Munirajahh Library with 31,567 book volumes, 104 national and international journals, and a vast digital collection supports academic excellence and research.", link: "/infrastructure#library" },
  { icon: Wifi, title: "Computer Access", desc: "5 computer centres with 250+ high-speed internet-connected systems ensure every student has access to digital resources for study, research, and skill development.", link: "/infrastructure#computer" },
  { icon: Users, title: "Clubs & Activities", desc: "NCC, NSS, Youth Red Cross, Red Ribbon Club, ED Cell, Eco Green Club, and Trekking Club provide platforms for leadership, community service, and personal development.", link: "/college-activities" },
  { icon: Heart, title: "Health & Safety", desc: "24-hour secure campus with first aid facilities, ambulance service, and access to the KVB ATM on campus. Hostel wardens are available round-the-clock for resident students.", link: "/infrastructure" },
];

const snapshots = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=600&h=400&fit=crop",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop",
];

export function StudentLife() {
  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-72 overflow-hidden hero-preserve">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=600&fit=crop" alt="Student Life" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">21.34-Acre Green Campus · Gobichettipalayam</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Student Life</h1>
              <p className="text-[#9CA3AF]">A vibrant, supportive campus experience that goes far beyond academics.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">

        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center">
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
            <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Life at AJKKSAPT</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-3">More Than Just Education</h2>
          <p className="text-[#6B7280] max-w-2xl mx-auto text-sm">
            Three years at AJKKSAPT is a transformative journey — rigorous academics, vibrant campus activities, strong community bonds, and facilities designed for your all-round growth.
          </p>
        </motion.div>

        {/* Campus Life Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {aspects.map((item, i) => (
            <motion.div key={i} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.07 }}>
              <Link to={item.link} className="group block bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6 h-full hover:border-[#D4AF37]/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)] transition-all duration-500 hover:-translate-y-1">
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                  <item.icon size={22} className="text-[#D4AF37]" />
                </div>
                <h3 className="text-[#FAFAFA] font-bold mb-2 group-hover:text-[#D4AF37] transition-colors duration-300">{item.title}</h3>
                <p className="text-[#6B7280] text-xs leading-relaxed">{item.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Photo snapshots */}
        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-2xl font-black text-[#FAFAFA] mb-6">Campus Snapshots</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {snapshots.map((src, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}
                className="h-52 rounded-2xl overflow-hidden border border-[#D4AF37]/8 hover:border-[#D4AF37]/30 transition-all duration-300 group">
                <img src={src} alt={`Campus snapshot ${i + 1}`} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" loading="lazy" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-[#D4AF37]/10 via-[#C5A059]/5 to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-3xl p-10">
          <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-4">Our Promise</div>
          <blockquote className="text-2xl md:text-3xl font-black text-[#FAFAFA] italic mb-4">
            "You are going to be with us for three years. We are here to make sure that you have all the opportunities to improve your skill."
          </blockquote>
          <div className="text-[#6B7280] text-sm">— Principal, Annai J.K.K. Sampoorani Ammal Polytechnic College</div>
          <Link to="/admission" className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 text-sm">
            Apply for Admission 2026-27
          </Link>
        </motion.div>

      </div>
    </div>
  );
}
