import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Heart, Users, TreePine, Award, Leaf, Shield, GraduationCap, CheckCircle } from "lucide-react";
import { Link } from "react-router";

function AnimCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const timer = setInterval(() => {
      start += value / 120;
      if (start >= value) { setCount(value); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return <span ref={ref}>{count >= 1000 ? count.toLocaleString("en-IN") : count}{suffix}</span>;
}

const impactAreas = [
  {
    icon: Users,
    title: "Community Development",
    color: "from-[#D4AF37]/15 to-[#C5A059]/5",
    border: "border-[#D4AF37]/20",
    desc: "Since 1998, our Community Polytechnic Scheme has trained over 15,000 rural youth, empowering them with skills for better livelihoods and entrepreneurship opportunities.",
    points: ["Rural Skill Training Programs", "Entrepreneurship Development", "Village Adoption Schemes", "Free Vocational Courses"],
  },
  {
    icon: Heart,
    title: "Social Welfare",
    color: "from-red-600/15 to-rose-600/5",
    border: "border-red-600/20",
    desc: "Supporting underprivileged communities through healthcare, education, and rehabilitation programs. Our Trust has been instrumental in uplifting marginalized sections of society.",
    points: ["Free Health Camps", "Educational Scholarships", "Rehabilitation Centers", "Assistance for Disabled"],
  },
  {
    icon: Leaf,
    title: "Environmental Conservation",
    color: "from-green-600/15 to-emerald-600/5",
    border: "border-green-600/20",
    desc: "Committed to sustainable practices and environmental protection through campus initiatives, awareness programs, and conservation projects.",
    points: ["Green Campus Initiatives", "Tree Plantation Drives", "Waste Management Programs", "Environmental Awareness"],
  },
  {
    icon: GraduationCap,
    title: "Educational Excellence",
    color: "from-blue-600/15 to-indigo-600/5",
    border: "border-blue-600/20",
    desc: "Providing quality technical education to both urban and rural students, ensuring accessibility and equal opportunities for all.",
    points: ["Affordable Education", "Scholarship Programs", "Industry-Aligned Curriculum", "Research & Innovation"],
  },
];

const milestones = [
  { year: "1984", title: "Institution Established", desc: "Started with 3 programmes and 180 students to bring quality technical education to rural Erode district." },
  { year: "1998", title: "Community Polytechnic Launched", desc: "Beginning of our journey to empower rural youth through skill development and the Govt. of India Community Polytechnic Scheme." },
  { year: "2000s", title: "Expansion Phase", desc: "Added new programmes and facilities, growing from 180 to over 1,000 students across 8 departments." },
  { year: "2010s", title: "Modernisation", desc: "Upgraded infrastructure with state-of-the-art labs, digital classrooms, library expansion, and modern hostel facilities." },
  { year: "2020s", title: "Digital Transformation", desc: "Embraced digital learning, adopted latest technologies, and expanded community outreach programs." },
  { year: "Present", title: "Excellence & Impact", desc: "Serving 1,400+ students, trained 15,000+ rural youth, and continuing our mission of inclusive development." },
];

export function ImpactPage() {
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statsRef, { once: true, amount: 0.2 });

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-72 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1920&h=600&fit=crop" alt="Community Impact" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">Community Polytechnic · Social Welfare · 40+ Years</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Our Impact & Legacy</h1>
              <p className="text-[#9CA3AF] max-w-2xl">40+ Years of Excellence and Social Responsibility in Technical Education</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-20">

        {/* Impact Stats */}
        <section>
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Measuring Our Impact</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA]">Creating Real Change in Lives and Communities</h2>
          </motion.div>
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: Award, value: 40, suffix: "+", label: "Years of Service", sub: "Since 1984" },
              { icon: Users, value: 15000, suffix: "+", label: "Rural Youth Trained", sub: "Community Polytechnic" },
              { icon: GraduationCap, value: 1400, suffix: "+", label: "Current Students", sub: "Enrolled 2025-26" },
              { icon: Shield, value: 10, suffix: "", label: "Diploma Programs", sub: "Full-Time + Part-Time" },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ y: 30, opacity: 0 }} animate={isInView ? { y: 0, opacity: 1 } : {}} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6 text-center hover:border-[#D4AF37]/30 transition-all duration-500 group">
                  <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <stat.icon size={22} className="text-[#D4AF37]" />
                  </div>
                  <div className="text-3xl font-black text-[#D4AF37] mb-1">
                    <AnimCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[#FAFAFA] font-bold text-sm mb-0.5">{stat.label}</div>
                  <div className="text-[#6B7280] text-xs">{stat.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Areas of Impact */}
        <section>
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Areas of Impact</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA]">Multi-dimensional Contribution to Society</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {impactAreas.map((area, i) => (
              <motion.div key={i} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <div className={`bg-gradient-to-br ${area.color} border ${area.border} rounded-2xl p-7 h-full hover:shadow-[0_0_25px_rgba(212,175,55,0.08)] transition-all duration-500`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-11 h-11 bg-gradient-to-br ${area.color} border ${area.border} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <area.icon size={22} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-[#FAFAFA] font-black text-lg">{area.title}</h3>
                  </div>
                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-5">{area.desc}</p>
                  <ul className="grid grid-cols-2 gap-1.5">
                    {area.points.map((p, pi) => (
                      <li key={pi} className="flex items-center gap-2 text-[#9CA3AF] text-xs">
                        <CheckCircle size={13} className="text-[#D4AF37] flex-shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Trust Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <motion.div initial={{ x: -30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
              <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-5">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">The Trust</span>
              </div>
              <h2 className="text-2xl font-black text-[#FAFAFA] mb-2">Annai J.K.K. Sampoorani Ammal Charitable Trust</h2>
              <p className="text-[#D4AF37] text-sm font-semibold mb-5">A Legacy of Giving and Social Responsibility</p>
              <div className="space-y-4 text-[#6B7280] text-sm leading-relaxed">
                <p>Founded in <strong className="text-[#FAFAFA]">1971</strong> by Dr. J.K.K. Munirajahh, the Annai J.K.K. Sampoorani Ammal Charitable Trust has been instrumental in creating lasting social impact across Tamil Nadu. The Trust operates multiple institutions including polytechnics, engineering colleges, paramedical colleges, teacher training institutes, and rehabilitation centres.</p>
                <p>The Trust's vision is to perpetuate the memory of <strong className="text-[#FAFAFA]">Annai J.K.K. Sampoorani Ammal</strong> through education, healthcare, and community development. Over five decades, the Trust has touched the lives of thousands of students and community members.</p>
              </div>
            </motion.div>
            <motion.div initial={{ x: 30, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="space-y-4">
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6">
                <h3 className="text-[#FAFAFA] font-bold mb-4">Trust Achievements</h3>
                <ul className="space-y-2">
                  {["National Award by President Dr. Giani Zail Singh (1987)", "National Award by President Dr. APJ Abdul Kalam (2004)", "California Golden State Award (1972)", "Multiple State Awards from Tamil Nadu Government", "Cultural Doctorate in Humanities"].map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#9CA3AF] text-sm">
                      <Award size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />{a}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6">
                <h3 className="text-[#FAFAFA] font-bold mb-4">Trust Institutions</h3>
                <ul className="space-y-2">
                  {["Paramedical Institutions (Pharmacy, Nursing, Physiotherapy)", "Teacher Training Institute", "Polytechnic & Engineering Colleges", "Industrial Training Institute", "Agricultural College & Special Schools"].map((a, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#9CA3AF] text-sm">
                      <Shield size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />{a}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-10">
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Our Journey</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA]">Key Milestones in Our Growth and Impact</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#D4AF37]/40 via-[#D4AF37]/20 to-transparent" />
            <div className="space-y-6">
              {milestones.map((m, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08 }}
                  className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 border-2 border-[#D4AF37]/30 rounded-full flex items-center justify-center z-10 md:mx-auto">
                    <span className="text-[#D4AF37] font-black text-[10px] text-center leading-tight">{m.year}</span>
                  </div>
                  <div className={`flex-1 bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-5 hover:border-[#D4AF37]/30 transition-all duration-300 md:max-w-[45%] ${i % 2 === 0 ? "md:mr-auto md:ml-6" : "md:ml-auto md:mr-6"}`}>
                    <div className="text-[#D4AF37] text-xs font-bold tracking-wider uppercase mb-1">{m.year}</div>
                    <h3 className="text-[#FAFAFA] font-bold mb-2">{m.title}</h3>
                    <p className="text-[#6B7280] text-xs leading-relaxed">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="text-center bg-gradient-to-r from-[#D4AF37]/10 via-[#C5A059]/5 to-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-3xl p-12">
          <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-4">Be Part of Our Mission</div>
          <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-3">Join Us in Creating a Better Future</h2>
          <p className="text-[#6B7280] max-w-xl mx-auto text-sm mb-8">Whether you're a student, parent, or partner — you can make a difference. Together, we continue our legacy of excellence and social responsibility.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/admission" className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] text-sm">
              Apply for Admission
            </Link>
            <Link to="/contact" className="px-8 py-3.5 bg-[#111111] border border-[#D4AF37]/30 text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-300 text-sm">
              Partner With Us
            </Link>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
