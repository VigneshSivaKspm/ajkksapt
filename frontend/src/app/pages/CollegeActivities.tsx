import { useEffect } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { Shield, Heart, Leaf, Lightbulb, TreePine, Users, ChevronRight } from "lucide-react";

const activities = [
  {
    id: "ncc",
    name: "NCC",
    fullName: "National Cadet Corps",
    icon: Shield,
    color: "from-green-600/20 to-emerald-600/5",
    border: "border-green-600/20",
    activeBorder: "border-green-500/40",
    motto: "Unity and Discipline",
    patron: "Prof. Dr. P. Ramesh, M.Tech., Principal",
    caretaker: "Ms. D. Gayathri",
    day: "Fourth Sunday of November",
    description: "The NCC unit at AJKKSAPT instills discipline, leadership, and national spirit in cadets through rigorous training and community service activities.",
    activities: ["Parades and Drill Practice", "Swachh Bharat Pakhwada Activities", "Plastic Awareness Campaigns", "Plogging Events", "Campus Cleaning Drives", "Blood Donation Camps", "Aadhaar Card and Voter Awareness"],
    commitments: ["Annual blood donation", "Digital transaction promotion", "Tree planting", "100 hours of social service annually", "Gender sensitivity programs"],
  },
  {
    id: "nss",
    name: "NSS",
    fullName: "National Service Scheme",
    icon: Users,
    color: "from-blue-600/20 to-indigo-600/5",
    border: "border-blue-600/20",
    activeBorder: "border-blue-500/40",
    motto: "Not Me But You",
    patron: "Prof. Dr. P. Ramesh, M.Tech., Principal",
    officers: "Mrs. A. Sumathi (Unit I) · Mr. A. Rajeshkumar (Unit II)",
    day: "September 24",
    description: "Established in 1969, the NSS unit channels student energy towards community service, social welfare, and national development activities.",
    activities: ["AIDS Awareness Campaigns", "Road Safety Drives", "Tree Plantation Programs", "Blood Donation Camps", "Campus and Roadside Cleaning", "Fruit Garden Maintenance", "Soil Conservation Activities", "Tailoring & Embroidery Training"],
    technical: ["Computer Training for Rural Youth", "LMV Driving Practice Support"],
  },
  {
    id: "rrc",
    name: "RRC",
    fullName: "Red Ribbon Club",
    icon: Heart,
    color: "from-red-600/20 to-rose-600/5",
    border: "border-red-600/20",
    activeBorder: "border-red-500/40",
    motto: "Celebrating Life",
    patron: "Prof. Dr. P. Ramesh, M.Tech., Principal",
    officer: "Mr. A. Rajeshkumar",
    coordinator: "TANSACS — Tamil Nadu State AIDS Control Society",
    description: "Coordinated by TANSACS, the Red Ribbon Club promotes HIV/AIDS awareness, life skills, and peer education among students aged 17–25.",
    activities: ["Life Skills Education (Celebrating Life Curriculum)", "Peer Education Programs", "Debates, Quizzes & Art Contests", "Interactions with Medical Professionals", "Rallies and Awareness Campaigns", "Blood Donation Camps", "Peer Leader Conventions"],
  },
  {
    id: "yrc",
    name: "YRC",
    fullName: "Youth Red Cross",
    icon: Heart,
    color: "from-rose-600/20 to-pink-600/5",
    border: "border-rose-600/20",
    activeBorder: "border-rose-500/40",
    motto: "Protection · Service · Friendship",
    patron: "Prof. Dr. P. Ramesh, M.Tech., Principal",
    officer: "Mr. A. Rajeshkumar",
    day: "February 15",
    description: "The Youth Red Cross unit at AJKKSAPT follows the three foundational principles of protection of health & life, service to the sick & suffering, and promotion of national & international friendship.",
    activities: ["Blood Donation Camps", "Orphanage Visits and Support", "Anti-Smoking and Drug Awareness Lectures", "First Aid Training Programs", "Environmental Awareness Drives", "Community Health Camps in Villages and Slums", "Cleanliness Drives"],
  },
  {
    id: "ed-cell",
    name: "ED Cell",
    fullName: "Entrepreneurship Development Cell",
    icon: Lightbulb,
    color: "from-amber-600/20 to-yellow-600/5",
    border: "border-amber-600/20",
    activeBorder: "border-amber-500/40",
    motto: "Dare to Dream, Make a Difference",
    patron: "Prof. Dr. P. Ramesh, M.Tech., Principal",
    officer: "Mr. G. Venkatesan",
    description: "The ED Cell develops students across socio-economic backgrounds to become entrepreneurs who dare to dream, strive for excellence, and make a difference in society through innovation and enterprise.",
    activities: ["Entrepreneurship Seminars and Workshops", "National and International Conferences", "Interactive Business Discussions", "Film Screenings on Startup Culture", "Business Plan Competitions", "Industry Expert Guest Lectures", "Startup Incubation Guidance"],
  },
  {
    id: "eco-green",
    name: "Eco Green Club",
    fullName: "Eco Green Club",
    icon: Leaf,
    color: "from-green-600/20 to-teal-600/5",
    border: "border-green-600/20",
    activeBorder: "border-green-500/40",
    motto: "Save Environment, Save Life",
    patron: "Prof. Dr. P. Ramesh, M.Tech., Principal",
    officer: "Mr. K. Sakthivel",
    description: "The Eco Green Club promotes environmental consciousness and sustainable practices among students through awareness campaigns, plantation drives, and conservation activities.",
    activities: ["Water Conservation Campaigns", "Waste Management Programs", "Anti-Plastic Drives", "Tree Plantation Events", "Biodiversity Education", "Nature Trails and Eco-Tours", "Kitchen Gardens Maintenance", "Water Harvesting Structure Projects", "Environmental Debates and Lectures"],
  },
  {
    id: "trekking",
    name: "Trekking Club",
    fullName: "Trekking Club",
    icon: TreePine,
    color: "from-[#D4AF37]/20 to-[#C5A059]/5",
    border: "border-[#D4AF37]/20",
    activeBorder: "border-[#D4AF37]/40",
    motto: "Fitness, Health, and Peaceful Life",
    patron: "Prof. Dr. P. Ramesh, M.Tech., Principal",
    officer: "Mr. K. Sakthivel",
    established: 2012,
    members: 50,
    description: "Founded in 2012 with 50 student members, the Trekking Club improves physical fitness and health while creating socially responsible citizens through nature-based activities.",
    activities: ["Tree Plantation Drives in Forest Areas", "Forest and Wildlife Protection Awareness", "Plastic Removal from Natural Areas", "Clean India Initiative Campaigns", "Seed Ball Cultivation Projects", "Environmental Awareness Competitions", "Nature Study and Trekking Expeditions"],
  },
];

export function CollegeActivities() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-72 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1920&h=600&fit=crop" alt="Activities" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">NCC · NSS · RRC · YRC · ED Cell · Eco Green · Trekking</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">College Activities</h1>
              <p className="text-[#9CA3AF]">Building character, community spirit, and social responsibility beyond the classroom.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activity Nav */}
      <div className="bg-[#0D0D0D] border-b border-[#D4AF37]/10 sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {activities.map((a) => (
              <a key={a.id} href={`#${a.id}`} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200 text-xs font-semibold whitespace-nowrap flex-shrink-0">
                <a.icon size={13} />
                {a.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-16">
        {activities.map((activity, index) => (
          <motion.section
            key={activity.id}
            id={activity.id}
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="scroll-mt-32"
          >
            <div className={`bg-gradient-to-r ${activity.color} border ${activity.border} rounded-3xl p-8 md:p-10`}>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-14 h-14 bg-gradient-to-br ${activity.color} border ${activity.border} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                      <activity.icon size={26} className="text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">{activity.name}</div>
                      <h2 className="text-xl font-black text-[#FAFAFA]">{activity.fullName}</h2>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#0A0A0A]/30 rounded-lg mb-4">
                    <span className="text-[#D4AF37] text-xs font-bold">Motto:</span>
                    <span className="text-[#FAFAFA] text-xs italic">"{activity.motto}"</span>
                  </div>

                  <p className="text-[#9CA3AF] text-sm leading-relaxed mb-6">{activity.description}</p>

                  <h3 className="text-[#FAFAFA] font-bold mb-3 text-sm">Key Activities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {activity.activities.map((act, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <ChevronRight size={13} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                        <span className="text-[#9CA3AF] text-xs">{act}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className={`bg-[#0A0A0A]/40 border ${activity.border} rounded-2xl p-5`}>
                    <h3 className="text-[#FAFAFA] font-bold text-sm mb-3">Faculty Coordinators</h3>
                    <div className="space-y-2 text-xs">
                      <div><span className="text-[#D4AF37] font-semibold">Chief Patron / Patron:</span><div className="text-[#9CA3AF] mt-0.5">{activity.patron}</div></div>
                      {"caretaker" in activity && <div><span className="text-[#D4AF37] font-semibold">Caretaker:</span><div className="text-[#9CA3AF] mt-0.5">{activity.caretaker as string}</div></div>}
                      {"officers" in activity && <div><span className="text-[#D4AF37] font-semibold">Programme Officers:</span><div className="text-[#9CA3AF] mt-0.5">{activity.officers as string}</div></div>}
                      {"officer" in activity && !("officers" in activity) && <div><span className="text-[#D4AF37] font-semibold">Programme Officer:</span><div className="text-[#9CA3AF] mt-0.5">{activity.officer as string}</div></div>}
                      {"coordinator" in activity && <div><span className="text-[#D4AF37] font-semibold">Coordinated by:</span><div className="text-[#9CA3AF] mt-0.5">{activity.coordinator as string}</div></div>}
                    </div>
                  </div>
                  <div className={`bg-[#0A0A0A]/40 border ${activity.border} rounded-2xl p-5`}>
                    <h3 className="text-[#FAFAFA] font-bold text-sm mb-3">Details</h3>
                    <div className="space-y-1.5 text-xs">
                      {"day" in activity && <div className="flex gap-2"><span className="text-[#D4AF37] font-semibold min-w-[60px]">Day:</span><span className="text-[#9CA3AF]">{activity.day as string}</span></div>}
                      {"established" in activity && <div className="flex gap-2"><span className="text-[#D4AF37] font-semibold min-w-[60px]">Est.:</span><span className="text-[#9CA3AF]">{String(activity.established)}</span></div>}
                      {"members" in activity && <div className="flex gap-2"><span className="text-[#D4AF37] font-semibold min-w-[60px]">Members:</span><span className="text-[#9CA3AF]">{String(activity.members)}+ students</span></div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
