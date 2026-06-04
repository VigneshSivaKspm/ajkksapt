import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";

const announcements = [
  "🎓 Admissions Open for 2026–27 Academic Year — Apply Now for all 10 Diploma Programmes!",
  "📋 Internal Mark Results for Semester VI published — Students are advised to verify their marks with the concerned HOD.",
  "🚌 Transport routes updated for Tiruppur, Erode, and Gobichettipalayam routes — Contact Mr. Laksmiganthan: 9789456753",
  "📚 Dr. JKK Munirajahh Library extended hours: 9:00 AM – 5:00 PM on weekdays during exam season.",
  "🏆 NCC Annual Camp scheduled — Eligible cadets report to the NCC office by June 20, 2026.",
  "🌿 Eco Green Club's Tree Plantation Drive on June 14, 2026 — All students are welcome to participate.",
  "📝 Examination Fee payment deadline: Last date for Semester Exam fee submission is July 5, 2026.",
  "🎯 Community Polytechnic Scheme enrollments open — Free skill training for rural youth. Contact the office for details.",
];

export function AnnouncementTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [paused]);

  const prev = () => setCurrentIndex((p) => (p - 1 + announcements.length) % announcements.length);
  const next = () => setCurrentIndex((p) => (p + 1) % announcements.length);

  return (
    <div
      className="bg-gradient-to-r from-[#D4AF37] via-[#C9A84C] to-[#C5A059] border-y border-[#D4AF37]/20"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center h-12 gap-4">
          {/* Label */}
          <div className="flex items-center gap-2 flex-shrink-0 bg-[#0A0A0A]/15 rounded-lg px-3 py-1">
            <Bell size={13} className="text-[#0A0A0A] animate-pulse" />
            <span className="text-[#0A0A0A] font-black text-[10px] uppercase tracking-widest hidden sm:block">
              Notice Board
            </span>
          </div>

          {/* Text */}
          <div className="flex-1 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[#0A0A0A] font-semibold text-sm truncate"
              >
                {announcements[currentIndex]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button onClick={prev} className="w-7 h-7 rounded-full bg-[#0A0A0A]/15 flex items-center justify-center hover:bg-[#0A0A0A]/25 transition-colors duration-200">
              <ChevronLeft size={14} className="text-[#0A0A0A]" />
            </button>
            <span className="text-[#0A0A0A]/70 text-xs font-mono">{currentIndex + 1}/{announcements.length}</span>
            <button onClick={next} className="w-7 h-7 rounded-full bg-[#0A0A0A]/15 flex items-center justify-center hover:bg-[#0A0A0A]/25 transition-colors duration-200">
              <ChevronRight size={14} className="text-[#0A0A0A]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
