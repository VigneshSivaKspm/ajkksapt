import { motion } from "motion/react";
import { TrendingUp, Building2, Users, Award } from "lucide-react";

const recruiters = [
  "TCS", "Infosys", "Wipro", "Cognizant", "Accenture", "HCL Technologies",
  "Tech Mahindra", "L&T", "Ashok Leyland", "TVS Motor", "Bosch", "Mahindra"
];

const placementStats = [
  { icon: Users, value: "250+", label: "Students Placed", sublabel: "2025-26 Academic Year" },
  { icon: Building2, value: "50+", label: "Recruiting Companies", sublabel: "MNCs & Startups" },
  { icon: TrendingUp, value: "12 LPA", label: "Highest Package", sublabel: "Tech Industry" },
  { icon: Award, value: "6.5 LPA", label: "Average Package", sublabel: "Across All Branches" },
];

const successStories = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer at TCS",
    package: "8 LPA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    quote: "The placement cell's guidance and training helped me secure my dream job.",
  },
  {
    name: "Priya Krishnan",
    role: "Design Engineer at Ashok Leyland",
    package: "7.5 LPA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    quote: "Excellent industry exposure and practical training made all the difference.",
  },
  {
    name: "Arjun Patel",
    role: "Network Engineer at Infosys",
    package: "7 LPA",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    quote: "The mock interviews and soft skills training boosted my confidence tremendously.",
  },
];

export function Placement() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=600&fit=crop"
            alt="Placement"
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
                Placement Cell
              </h1>
              <p className="text-xl text-[#6B7280] max-w-2xl">
                Building Bridges Between Talent and Opportunity
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {placementStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-6 text-center hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-2xl flex items-center justify-center">
                  <stat.icon size={32} className="text-[#D4AF37]" />
                </div>
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-[#FAFAFA] mb-1">{stat.label}</div>
                <div className="text-sm text-[#6B7280]">{stat.sublabel}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruiters Section */}
      <section className="py-16 bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4">
              Our Recruiting Partners
            </h2>
            <p className="text-lg text-[#6B7280]">
              Top companies trust LEGENDARY ONE for quality talent
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recruiters.map((company, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.05 }}
                className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-8 flex items-center justify-center hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] transition-all duration-500"
              >
                <span className="text-[#FAFAFA] font-semibold text-lg">{company}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4">
              Alumni Success Stories
            </h2>
            <p className="text-lg text-[#6B7280]">
              Hear from our successful graduates making their mark
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-500"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/30">
                  <img src={story.image} alt={story.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <h3 className="text-lg font-semibold text-[#FAFAFA] text-center mb-1">{story.name}</h3>
                <p className="text-[#D4AF37] text-sm text-center mb-1">{story.role}</p>
                <p className="text-[#6B7280] text-sm text-center mb-4">Package: {story.package}</p>
                <p className="text-[#6B7280] text-sm italic text-center">"{story.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
