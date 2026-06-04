import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Quote, GraduationCap } from "lucide-react";
import { Link } from "react-router";

export function PrincipalMessage() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-[#0D0D0D] to-[#0A0A0A] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Image + credentials */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9 }}
            className="relative"
          >
            <div className="relative mx-auto lg:mx-0 max-w-sm">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-3xl" />
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20">
                <img
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=750&fit=crop"
                  alt="Principal"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="text-[#D4AF37] font-black text-lg">Prof. P. Ramesh</div>
                  <div className="text-[#FAFAFA] text-sm">M.Tech., (Ph.D.)</div>
                  <div className="text-[#9CA3AF] text-xs mt-1">Principal, AJKKSAPT</div>
                </div>
              </div>
              {/* Badge */}
              <div className="absolute -right-4 top-8 bg-[#D4AF37] text-[#0A0A0A] rounded-xl px-3 py-2 shadow-lg">
                <div className="text-xs font-black">15+ Years</div>
                <div className="text-[10px] font-semibold">Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Message */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.1 }}
          >
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-5">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Message from the Principal</span>
            </div>

            <div className="relative mb-6">
              <Quote size={40} className="text-[#D4AF37]/15 absolute -top-4 -left-2" />
              <blockquote className="text-[#FAFAFA]/80 italic text-lg leading-relaxed pl-4 border-l-2 border-[#D4AF37]/30">
                "Education is the manifestation of Perfection already in a man." — Swami Vivekananda
              </blockquote>
            </div>

            <div className="space-y-4 text-[#6B7280] text-sm leading-relaxed mb-8">
              <p>
                Our institution stands committed to developing rural and disadvantaged students into tomorrow's leaders. With spacious classrooms, equipped laboratories, modern workshops, and five computer centres with 250 systems connected to high-speed internet, we ensure every student has the resources to excel.
              </p>
              <p>
                Our active Placement Cell coordinates with industries throughout the year to prepare students for campus recruitment. Beyond academics, we promote spiritual, cultural, social, and physical development through NCC, NSS, YRC, RRC, and our vibrant clubs.
              </p>
              <p>
                You are about to make one of the most important decisions of your life — choosing a course that is right for you. We are here for three years to make sure you have every opportunity to improve your skill and become eminently employable.
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-[#D4AF37]/10">
              <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-xl flex items-center justify-center">
                <GraduationCap size={22} className="text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[#FAFAFA] font-bold">Prof. P. Ramesh, M.Tech., (Ph.D.)</div>
                <div className="text-[#6B7280] text-sm">Principal — Annai J.K.K. Sampoorani Ammal Polytechnic College</div>
              </div>
            </div>

            <Link
              to="/about#principal"
              className="inline-flex items-center gap-2 mt-6 text-sm text-[#D4AF37] hover:text-[#C5A059] transition-colors duration-300 font-semibold"
            >
              Read Full Message →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
