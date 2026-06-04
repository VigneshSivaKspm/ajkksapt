import { useEffect } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { Award, Target, Shield, Quote, GraduationCap, Star, MapPin, Calendar } from "lucide-react";

function PageHero() {
  return (
    <section className="relative h-80 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1562774053-701939374585?w=1920&h=600&fit=crop"
          alt="About AJKKSAPT"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
      </div>
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
            <div className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-3">Est. 1984 · AICTE Approved · DOTE Affiliated</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FAFAFA] mb-3">About Us</h1>
            <p className="text-lg text-[#9CA3AF] max-w-2xl">Annai J.K.K. Sampoorani Ammal Polytechnic College — 40 years of empowering rural and urban students through quality technical education.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen pt-20">
      <PageHero />

      {/* Overview */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-5">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Our Institution</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#FAFAFA] mb-6">A Centre of Technical Excellence in Tamil Nadu</h2>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>Annai J.K.K. Sampoorani Ammal Polytechnic College was established in the year <strong className="text-[#FAFAFA]">1984</strong> under Annai J.K.K. Sampooraniammal Charitable Trust, founded by <strong className="text-[#FAFAFA]">Dr. J.K.K. Munirajahh M.Tech., (Bolton)</strong>, with the intention of bringing technical education to both urban and rural students.</p>
                <p>Our institution is situated on a <strong className="text-[#FAFAFA]">21.34-acre campus</strong> in the northern part of Gobichettipalayam on the Anthiyur–Sathiyamangalam Road, approved by <strong className="text-[#FAFAFA]">AICTE, New Delhi</strong> and affiliated to the <strong className="text-[#FAFAFA]">State Board of Technical Education, Chennai</strong>, Govt. of Tamil Nadu.</p>
                <p>Started with three Diploma programmes and a student strength of around 180, the institution has now grown into a polytechnic of excellence offering <strong className="text-[#FAFAFA]">10 Diploma Programmes</strong> with a student strength of around <strong className="text-[#FAFAFA]">1,400 students</strong>.</p>
              </div>
            </motion.div>
            <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Calendar, value: "1984", label: "Year Established", sub: "40+ Years Legacy" },
                  { icon: MapPin, value: "21.34", label: "Acres Campus", sub: "Gobichettipalayam" },
                  { icon: GraduationCap, value: "1,400+", label: "Students", sub: "Currently Enrolled" },
                  { icon: Star, value: "10", label: "Programmes", sub: "3-Year Diploma" },
                ].map((item, i) => (
                  <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6 text-center hover:border-[#D4AF37]/30 transition-all duration-500">
                    <div className="w-10 h-10 mx-auto mb-3 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center">
                      <item.icon size={20} className="text-[#D4AF37]" />
                    </div>
                    <div className="text-2xl font-black text-[#D4AF37] mb-1">{item.value}</div>
                    <div className="text-[#FAFAFA] font-bold text-sm">{item.label}</div>
                    <div className="text-[#6B7280] text-xs">{item.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Founder */}
      <section id="trust" className="py-16 bg-[#0D0D0D] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1">
              <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20 relative">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&h=625&fit=crop" alt="Dr. J.K.K. Munirajahh" className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <div className="text-[#D4AF37] font-black text-lg">Dr. J.K.K. Munirajahh</div>
                    <div className="text-[#FAFAFA] text-sm">M.Tech., (Bolton) · D.Litt.</div>
                    <div className="text-[#9CA3AF] text-xs mt-1">Chairman & Managing Trustee</div>
                  </div>
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-2">
              <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-5">
                  <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Trust & Managing Trustee</span>
                </div>
                <h2 className="text-3xl font-black text-[#FAFAFA] mb-6">Annai J.K.K. Sampooraniammal Charitable Trust</h2>
                <div className="space-y-4 text-[#6B7280] leading-relaxed mb-8">
                  <p>Dr. J.K.K. Munirajahh is a reputed industrialist, technocrat, and educationalist par excellence — an avid social worker, a person imbibed in deep spiritual values, and a Philanthropist. He had his Post Graduate Studies in <strong className="text-[#FAFAFA]">Textile Management at Bolton Institute of Technology, Bolton, United Kingdom</strong>.</p>
                  <p>He founded the Charitable Trust in the name of his beloved mother — <strong className="text-[#FAFAFA]">Annai J.K.K. Sampoorani Ammal</strong> — at Komarapalayam, Namakkal District, Tamil Nadu in 1971. The Trust maintains Paramedical Institutions, Polytechnic College, Engineering College, ITI, College of Education, Agricultural College, Matriculation Schools, a Higher Secondary School for Physically Challenged, Blind, Deaf and Dumb, and a Rehabilitation Centre.</p>
                  <p>A school for Blind, Deaf and Dumb at Komarapalayam has been running for 20+ years, providing free accommodation, food, and clothing for nearly <strong className="text-[#FAFAFA]">200 handicapped children</strong>.</p>
                </div>
                {/* Awards */}
                <div>
                  <h3 className="text-[#FAFAFA] font-bold mb-4">Awards & Honours</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      "California Golden State Award — 1972",
                      "National Award by President Dr. Giani Zail Singh — 1987",
                      "National Award by President Dr. APJ Abdul Kalam — 2004",
                      "State Awards from Govt. of Tamil Nadu (1971, 1972, 1987, 1991, 1996, 1999)",
                      "Cultural Doctorate in Humanities — World University Round Table, USA",
                    ].map((award, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-[#111111] rounded-xl border border-[#D4AF37]/8">
                        <Award size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-[#6B7280] text-xs">{award}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Message */}
      <section id="chairman" className="py-16 bg-[#0A0A0A] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="bg-[#111111] border border-[#D4AF37]/10 rounded-3xl p-8 md:p-12">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Quote size={24} className="text-[#D4AF37]" />
              </div>
              <div>
                <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">Chairman's Message</div>
                <h2 className="text-2xl font-black text-[#FAFAFA]">Dr. J.K.K. Munirajahh</h2>
                <p className="text-[#6B7280] text-sm">M.Tech., (Bolton) · D.Litt. · Chairman & Managing Trustee, JKK Munirajah Educational Institutions</p>
              </div>
            </div>
            <div className="space-y-4 text-[#6B7280] leading-relaxed">
              <p>Dr. J.K.K. Munirajahh is a reputed industrialist, technocrat, and educationalist excellence — an avid social worker, a person imbibed in deep spiritual values, and a Philanthropist.</p>
              <p>Dr. J.K.K. Munirajahh founded a Charitable Trust by name Annai J.K.K. Sampoorani Ammal Trust, Komarapalayam-638 183, Namakkal District, Tamilnadu in the year 1971. Dr. J.K.K. Munirajahh established many temples of learning to perpetuate the ever-lasting memory of his beloved mother. At present, Annai J.K.K. Sampoorani Ammal Trust maintains and runs Paramedical Institutions offering Diploma, Graduate and Post Graduate courses in Pharmacy, Nursing, Physiotherapy and Occupational Therapy at Komarapalayam, Namakkal District, and a Polytechnic, Community Polytechnic and an Industrial Training Center at T.N. Palayam, Erode District. Besides, the Trust runs a Matriculation School, a Higher Secondary School for Physically Handicapped, Blind and Deaf, and a Rehabilitation Center for Handicapped at Komarapalayam.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-[#D4AF37]/10">
              <div className="text-[#D4AF37] font-bold">Best Wishes,</div>
              <div className="text-[#FAFAFA] font-black text-lg mt-1">Dr. J.K.K. MUNIRAJAHH M.Tech., (Bolton), D.Litt.</div>
              <div className="text-[#6B7280] text-sm">Chairman & Managing Trustee, JKK Munirajah & Educational Institutions</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Secretary Message */}
      <section id="secretary" className="py-16 bg-[#0D0D0D] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-3 bg-[#111111] border border-[#D4AF37]/10 rounded-3xl p-8 md:p-10">
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">Secretary's Message</div>
              <h2 className="text-2xl font-black text-[#FAFAFA] mb-1">Mrs. M. Kasthuri Priya Kirupakar Murali</h2>
              <p className="text-[#6B7280] text-sm mb-6">MBA · Secretary</p>
              <div className="relative mb-6">
                <Quote size={36} className="text-[#D4AF37]/10 absolute -top-2 -left-2" />
                <blockquote className="text-[#FAFAFA]/80 italic text-lg leading-relaxed pl-4 border-l-2 border-[#D4AF37]/30">
                  "Changing times and uplifting environment needs nurturing in every possible dimension."
                </blockquote>
              </div>
              <div className="space-y-4 text-[#6B7280] leading-relaxed">
                <p>JKKM group of Institutions is a temple of knowledge that promotes self learning, improves self discipline, and caters self esteem of every future citizen of India. What the need of the hour today is not just financial help, and not just quality of teaching, but the whole circle of education in its entirety.</p>
                <p>This circle is not complete without active participation from students, faculty and management as one family, with a single goal — empowerment of education for a 'leading' India. I welcome all students into our ever-growing family with an open heart. Come join us to avail the knowledge, facilities, and infrastructure, and create a prosperous future for yourself and our country.</p>
              </div>
            </motion.div>
            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-2">
              <div className="aspect-square rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20 relative">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=500&h=500&fit=crop" alt="Secretary" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principal Message */}
      <section id="principal" className="py-16 bg-[#0A0A0A] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:col-span-2">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border-2 border-[#D4AF37]/20 relative">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=625&fit=crop" alt="Principal Prof. P. Ramesh" className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent" />
                <div className="absolute bottom-0 p-5">
                  <div className="text-[#D4AF37] font-black">Prof. P. Ramesh</div>
                  <div className="text-[#FAFAFA] text-sm">M.Tech., (Ph.D.)</div>
                  <div className="text-[#9CA3AF] text-xs">Principal</div>
                </div>
              </div>
              {/* Qualifications */}
              <div className="mt-4 bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-5">
                <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-3">Qualifications & Career</div>
                <ul className="space-y-2 text-xs text-[#6B7280]">
                  <li className="flex gap-2"><span className="text-[#D4AF37]">›</span> Diploma — Chemical Technology, Kongu Polytechnic (1994)</li>
                  <li className="flex gap-2"><span className="text-[#D4AF37]">›</span> B.Tech — Adhiyaman Engineering College, Hosur (1997)</li>
                  <li className="flex gap-2"><span className="text-[#D4AF37]">›</span> M.Tech — Kongu Engineering College, Perundurai (2010)</li>
                  <li className="flex gap-2"><span className="text-[#D4AF37]">›</span> Ph.D. — Pursuing, Anna University</li>
                  <li className="flex gap-2"><span className="text-[#D4AF37]">›</span> 15+ Years Teaching Experience</li>
                </ul>
              </div>
            </motion.div>
            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-3 bg-[#111111] border border-[#D4AF37]/10 rounded-3xl p-8 md:p-10">
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">Principal's Message</div>
              <h2 className="text-2xl font-black text-[#FAFAFA] mb-1">Prof. P. Ramesh, M.Tech., (Ph.D.)</h2>
              <p className="text-[#6B7280] text-sm mb-6">Principal, Annai J.K.K. Sampoorani Ammal Polytechnic College</p>
              <div className="relative mb-6">
                <Quote size={36} className="text-[#D4AF37]/10 absolute -top-2 -left-2" />
                <blockquote className="text-[#FAFAFA]/80 italic text-lg leading-relaxed pl-4 border-l-2 border-[#D4AF37]/30">
                  "Education is the manifestation of Perfection already in a man." — Swami Vivekananda
                </blockquote>
              </div>
              <div className="space-y-4 text-[#6B7280] leading-relaxed text-sm">
                <p>Our institution stands committed to developing rural and disadvantaged students into tomorrow's leaders. With spacious classrooms, equipped laboratories, workshops, and five computer centers with 250 systems connected to high-speed internet, a computerized library with 31,567 volumes, we ensure every student has the resources to excel.</p>
                <p>An active Placement Cell coordinates with industries throughout the year for campus recruitment, providing compulsory soft skill and vocational training. We promote spiritual, cultural, social, and physical activities through NCC, NSS, YRC, RRC, ED Cell, Eco Green Club, and Trekking Club.</p>
                <p>You are about to make one of the most important decisions of your life — choosing a course that is right for you. We are here to make sure that you have all the opportunities to improve your skill which will make you eminently employable after attainment of your qualification.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="vision" className="py-16 bg-[#0D0D0D] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Vision, Mission & Quality Policy</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-[#FAFAFA]">Our Guiding Principles</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Target,
                title: "Vision",
                content: "A vision of developing into a multidisciplinary multi-campus technological institution of excellence in the field of Engineering and Technology by providing high quality education and to create engineers and technocrats who serve the needs and demands of society.",
              },
              {
                icon: GraduationCap,
                title: "Mission",
                content: "To create and develop technocrats, entrepreneurs and business leaders who will strive to improve the quality of human life through Empowering Education to rural and urban students in the field of Engineering and Technology.",
              },
              {
                icon: Shield,
                title: "Quality Policy",
                items: [
                  "Uplift society through quality education using contemporary technologies",
                  "Develop professional competencies in engineering and technology",
                  "Cultivate ethical conduct and civic responsibility",
                  "Support industrial advancement and societal progress",
                  "Attain world-class standing through continuous enhancement",
                ],
              },
            ].map((item, index) => (
              <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 }}>
                <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-8 h-full hover:border-[#D4AF37]/30 transition-all duration-500">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-2xl flex items-center justify-center mb-6">
                    <item.icon size={28} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-black text-[#FAFAFA] mb-4">{item.title}</h3>
                  {"content" in item ? (
                    <p className="text-[#6B7280] leading-relaxed text-sm">{item.content}</p>
                  ) : (
                    <ul className="space-y-2">
                      {item.items!.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#6B7280] text-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] mt-1.5 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* College Motto */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-10 p-8 bg-gradient-to-r from-[#D4AF37]/10 via-[#C5A059]/5 to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-2xl text-center">
            <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">Our Motto</div>
            <div className="text-2xl md:text-3xl font-black text-[#FAFAFA] italic">
              "Enter to Learn, Drink the Nectar of Knowledge, Flyout to Serve"
            </div>
          </motion.div>
        </div>
      </section>

      {/* Accreditations */}
      <section id="accreditation" className="py-16 bg-[#0A0A0A] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
            <h2 className="text-3xl font-black text-[#FAFAFA] mb-2">Accreditations & Approvals</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: "AICTE Approved", detail: "F.No. Southern/1-2017043172/2014/EOA", sub: "All India Council for Technical Education, New Delhi, Govt. of India" },
              { icon: Award, title: "DOTE Affiliated", detail: "State Board of Technical Education, Chennai", sub: "Government of Tamil Nadu" },
              { icon: Star, title: "Govt. of Tamil Nadu Approval", detail: "GO Ms.No. 1804 dated 17/11/1984", sub: "Original Government Sanction from 1984" },
            ].map((item, index) => (
              <motion.div key={index} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: index * 0.1 }}>
                <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6 h-full hover:border-[#D4AF37]/30 transition-all duration-500">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center mb-4">
                    <item.icon size={24} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="text-lg font-black text-[#FAFAFA] mb-1">{item.title}</h3>
                  <div className="text-[#D4AF37] text-sm font-semibold mb-2">{item.detail}</div>
                  <p className="text-[#6B7280] text-xs">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
