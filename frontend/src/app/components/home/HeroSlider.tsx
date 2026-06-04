import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, GraduationCap, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const slides = [
  {
    tag: "Established 1984 · AICTE Approved · DOTE Affiliated",
    title: "Enter to Learn,\nFlyout to Serve",
    description: "Annai J.K.K. Sampoorani Ammal Polytechnic College — 40 years of excellence in technical education, shaping over 1,400 students annually across 10 Diploma Programmes.",
    cta: "Explore Programmes",
    ctaLink: "/departments",
    cta2: "Admission 2026–27",
    cta2Link: "/admission",
    image: "https://ajkksapt.com/images/Slider_Photos/image-slider-1.jpg",
    fallback: "https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=1080&fit=crop",
  },
  {
    tag: "21.34-Acre Campus · Gobichettipalayam",
    title: "World-Class\nInfrastructure",
    description: "State-of-the-art laboratories, 250 computers across 5 centers, a library with 31,567 volumes, modern hostels, and a 20-route transport network.",
    cta: "Explore Campus",
    ctaLink: "/infrastructure",
    cta2: "Contact Us",
    cta2Link: "/contact",
    image: "https://ajkksapt.com/images/Slider_Photos/image-slider-2.jpg",
    fallback: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=1080&fit=crop",
  },
  {
    tag: "National Award 1987 & 2004 · 40+ Years Legacy",
    title: "Nationally\nAwarded",
    description: "Dr. J.K.K. Munirajahh's charitable trust has won National Awards from two Presidents of India for outstanding service to persons with disabilities and education.",
    cta: "Our Legacy",
    ctaLink: "/impact",
    cta2: "About Us",
    cta2Link: "/about",
    image: "https://ajkksapt.com/images/Slider_Photos/image-slider-3.jpg",
    fallback: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop",
  },
  {
    tag: "Community Polytechnic Since 1998",
    title: "15,000+ Rural\nYouth Empowered",
    description: "Free skill training through the Community Polytechnic Scheme of Govt. of India since 1998, transforming rural livelihoods across the Erode region.",
    cta: "Our Activities",
    ctaLink: "/college-activities",
    cta2: "Our Impact",
    cta2Link: "/impact",
    image: "https://ajkksapt.com/images/Slider_Photos/image-slider-4.jpg",
    fallback: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=1080&fit=crop",
  },
  {
    tag: "10 Diploma Programmes · 3-Year Duration",
    title: "Your Career\nBegins Here",
    description: "Choose from 10 industry-aligned Diploma programmes in Engineering, Technology, and Applied Sciences. Full-time and part-time options available.",
    cta: "View All Departments",
    ctaLink: "/departments",
    cta2: "Apply Now",
    cta2Link: "/admission",
    image: "https://ajkksapt.com/images/Slider_Photos/image-slider-5.jpg",
    fallback: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&h=1080&fit=crop",
  },
];

export function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 700);
    }
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % slides.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="w-full h-full object-cover scale-105"
              style={{ animation: "slowZoom 7s ease-out forwards" }}
              loading="eager"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (el.src !== slides[currentSlide].fallback) {
                  el.src = slides[currentSlide].fallback;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/96 via-[#0A0A0A]/75 to-[#0A0A0A]/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
          </div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

          {/* Content */}
          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
              <div className="max-w-3xl">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.8 }}
                  className="mb-5"
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full">
                    <GraduationCap size={14} className="text-[#D4AF37]" />
                    <span className="text-[#D4AF37] text-xs font-semibold tracking-widest uppercase">
                      {slides[currentSlide].tag}
                    </span>
                  </div>
                </motion.div>

                <motion.h1
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25, duration: 0.9 }}
                  className="text-5xl md:text-6xl lg:text-7xl font-black text-[#FAFAFA] mb-6 leading-[1.05]"
                  style={{ whiteSpace: "pre-line" }}
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.38, duration: 0.8 }}
                  className="text-base md:text-lg text-[#9CA3AF] mb-10 leading-relaxed max-w-2xl"
                >
                  {slides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="flex flex-wrap gap-4"
                >
                  <Link
                    to={slides[currentSlide].ctaLink}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:scale-105 group"
                  >
                    {slides[currentSlide].cta}
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  <Link
                    to={slides[currentSlide].cta2Link}
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-[#D4AF37]/50 text-[#FAFAFA] font-bold hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all duration-300 backdrop-blur-sm"
                  >
                    {slides[currentSlide].cta2}
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/10 z-10">
        <motion.div
          key={`progress-${currentSlide}`}
          className="h-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059]"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 6.5, ease: "linear" }}
        />
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-8 right-8 flex items-center space-x-3 z-10">
        <button
          onClick={prevSlide}
          className="w-11 h-11 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="w-11 h-11 rounded-full bg-[#1a1a1a]/80 backdrop-blur-sm border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] transition-all duration-300"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? "w-10 h-2.5 bg-[#D4AF37]"
                : "w-2.5 h-2.5 bg-[#6B7280] hover:bg-[#D4AF37]/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide counter */}
      <div className="absolute top-24 right-8 z-10 hidden md:flex items-center gap-1 text-[#6B7280] text-sm">
        <span className="text-[#D4AF37] font-bold text-lg">{String(currentSlide + 1).padStart(2, "0")}</span>
        <span>/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>

      <style>{`@keyframes slowZoom { from { transform: scale(1.05); } to { transform: scale(1); } }`}</style>
    </section>
  );
}
