import { useEffect } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { BookOpen, Home, Bus, Trophy, Coffee, Cpu, CreditCard, Briefcase, ChevronRight, Clock, Users } from "lucide-react";

const facilities = [
  { id: "library", icon: BookOpen, label: "Library", title: "Dr. JKK Munirajahh Library" },
  { id: "hostel", icon: Home, label: "Hostel", title: "Boys & Girls Hostels" },
  { id: "transport", icon: Bus, label: "Transport", title: "Fleet of 20 Buses" },
  { id: "sports", icon: Trophy, label: "Sports", title: "Sports Facilities" },
  { id: "cafeteria", icon: Coffee, label: "Cafeteria", title: "College Cafeteria" },
  { id: "computer", icon: Cpu, label: "Computer Labs", title: "5 Computer Centres" },
  { id: "atm", icon: CreditCard, label: "ATM", title: "KVB ATM On Campus" },
  { id: "placement", icon: Briefcase, label: "Placement", title: "Placement & Training Cell" },
];

export function Infrastructure() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }, 100);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-72 overflow-hidden hero-preserve">
        <div className="absolute inset-0">
          <img src="https://ajkksapt.com/images/Slider_Photos/image-slider-2.jpg" alt="AJKKSAPT Campus" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">21.34-Acre Campus · Gobichettipalayam</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Infrastructure</h1>
              <p className="text-[#9CA3AF]">World-class facilities supporting holistic student development across academics, sports, and community.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Facility Nav */}
      <div className="bg-[#0D0D0D] border-b border-[#D4AF37]/10 sticky top-20 z-10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-2 scrollbar-none">
            {facilities.map((f) => (
              <a key={f.id} href={`#${f.id}`} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200 text-xs font-semibold whitespace-nowrap flex-shrink-0">
                <f.icon size={14} />
                {f.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 space-y-20">

        {/* Library */}
        <section id="library" className="scroll-mt-32">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Est. 2014</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Dr. JKK Munirajahh Library</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="aspect-video rounded-2xl overflow-hidden border border-[#D4AF37]/10 mb-6">
                  <img src="https://ajkksapt.com/images/Gallery/Library.jpg" alt="Dr. JKK Munirajahh Library" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <p className="text-[#6B7280] leading-relaxed text-sm">
                  The Dr. JKK Munirajahh Library, established in 2014, operates on an Open Access system with the motto: <strong className="text-[#FAFAFA]">"Books are for use and not for preservation."</strong> It provides an extensive collection covering all 10 engineering disciplines offered by the college.
                </p>
                <div className="mt-4 space-y-1 text-sm">
                  {[
                    { icon: Clock, text: "Morning: 9:00 AM – 2:00 PM (Issue) | 2:30 PM – 4:20 PM (Return) | 4:30 – 5:00 PM" },
                    { icon: Users, text: "Borrowing: Up to 5 books, 10-day return. Late fee: ₹5/day. Lost books: replace within 15 days or pay double cost." },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-[#111111] rounded-xl">
                      <Icon size={14} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <span className="text-[#9CA3AF] text-xs">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "31,567", label: "Book Volumes", sub: "Across all departments" },
                  { value: "11,168", label: "Titles", sub: "Covering all disciplines" },
                  { value: "104", label: "Journals", sub: "71 National + 33 International" },
                  { value: "2,500", label: "Back Volumes", sub: "Historical reference" },
                  { value: "2,100", label: "Question Banks", sub: "All semesters" },
                  { value: "1,523", label: "Student Projects", sub: "Final year projects" },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-4 text-center hover:border-[#D4AF37]/30 transition-all duration-300">
                    <div className="text-2xl font-black text-[#D4AF37] mb-1">{stat.value}</div>
                    <div className="text-[#FAFAFA] font-bold text-sm">{stat.label}</div>
                    <div className="text-[#6B7280] text-xs">{stat.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Hostel */}
        <section id="hostel" className="scroll-mt-32">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Residential</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Hostel Facilities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  name: "Boys' Hostel",
                  nameLocal: '"Sri Ramakrishnar Illam"',
                  capacity: "~400 students",
                  rooms: "52 rooms + dormitory",
                  chief: "Prof. P. Ramesh (Principal)",
                  deputy: "Vadivel.P · SasiKumar.P",
                  assistant: "Dinesh.P · Dinesh.V",
                  img: "https://ajkksapt.com/images/Gallery/Hostel.jpg",
                },
                {
                  name: "Girls' Hostel",
                  nameLocal: '"Sri Sarathadevi Illam"',
                  capacity: "~50 students",
                  rooms: "5 rooms + dormitory",
                  chief: "Prof. P. Ramesh (Principal)",
                  deputy: "Mythily",
                  assistant: "Akiladevi",
                  img: "https://ajkksapt.com/images/Gallery/Hostel.jpg",
                },
              ].map((hostel, i) => (
                <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden hover:border-[#D4AF37]/30 transition-all duration-500">
                  <div className="h-48 overflow-hidden">
                    <img src={hostel.img} alt={hostel.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-[#FAFAFA] font-black text-lg mb-0.5">{hostel.name}</h3>
                    <div className="text-[#D4AF37] text-sm italic mb-4">{hostel.nameLocal}</div>
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-[#0A0A0A] rounded-xl p-3">
                        <div className="text-[#6B7280] text-xs mb-0.5">Capacity</div>
                        <div className="text-[#FAFAFA] font-bold text-sm">{hostel.capacity}</div>
                      </div>
                      <div className="bg-[#0A0A0A] rounded-xl p-3">
                        <div className="text-[#6B7280] text-xs mb-0.5">Rooms</div>
                        <div className="text-[#FAFAFA] font-bold text-sm">{hostel.rooms}</div>
                      </div>
                    </div>
                    <div className="space-y-1.5 text-xs text-[#9CA3AF]">
                      <div><span className="text-[#D4AF37] font-semibold">Chief Warden:</span> {hostel.chief}</div>
                      <div><span className="text-[#D4AF37] font-semibold">Deputy Wardens:</span> {hostel.deputy}</div>
                      <div><span className="text-[#D4AF37] font-semibold">Asst. Wardens:</span> {hostel.assistant}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-5">
              <h4 className="text-[#FAFAFA] font-bold mb-3">Hostel Amenities</h4>
              <div className="flex flex-wrap gap-2">
                {["Cross-ventilated rooms", "2/3/4-sitter furnished rooms", "Vegetarian & Non-vegetarian food", "Aqua Guard drinking water", "Indoor & outdoor sports", "First aid + ambulance", "TV with DTH in common room", "24-hour secure campus", "Daily newspapers"].map((a) => (
                  <span key={a} className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-[#9CA3AF] text-xs">{a}</span>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Transport */}
        <section id="transport" className="scroll-mt-32">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Transport Network</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Transport Facilities</h2>
            <div className="mb-5 h-48 rounded-2xl overflow-hidden border border-[#D4AF37]/10">
              <img src="https://ajkksapt.com/images/Gallery/Transport.jpg" alt="AJKKSAPT Transport Fleet" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 space-y-4">
                {[{ value: "20", label: "Buses in Fleet" },{ value: "20", label: "Routes Covered" },{ value: "35", label: "Transport Staff" }].map((s, i) => (
                  <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-5 flex items-center gap-4">
                    <div className="text-3xl font-black text-[#D4AF37]">{s.value}</div>
                    <div className="text-[#FAFAFA] font-semibold">{s.label}</div>
                  </div>
                ))}
                <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-5">
                  <div className="text-[#D4AF37] font-bold text-sm mb-1">Transport Committee Head</div>
                  <div className="text-[#FAFAFA] font-semibold">Mr. Laksmiganthan</div>
                  <a href="tel:+919789456753" className="text-[#6B7280] text-sm hover:text-[#D4AF37] transition-colors">+91 97894 56753</a>
                </div>
              </div>
              <div className="lg:col-span-2">
                <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6">
                  <h3 className="text-[#FAFAFA] font-bold mb-4">Routes Coverage</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {["Gobichettipalayam", "Erode", "Tiruppur", "Anthiyur", "Sathiyamangalam", "Nambiyur", "Guruvarediyur", "Bhavani", "Perundurai", "Kangayam"].map((route) => (
                      <span key={route} className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-[#9CA3AF] text-xs">{route}</span>
                    ))}
                  </div>
                  <h4 className="text-[#FAFAFA] font-semibold mb-3 text-sm">Timings</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-[#0A0A0A] rounded-xl p-4">
                      <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-2">Morning Pickups</div>
                      <div className="text-[#9CA3AF] text-sm">6:45 AM – 8:40 AM (varies by route)</div>
                    </div>
                    <div className="bg-[#0A0A0A] rounded-xl p-4">
                      <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-2">Afternoon Departure</div>
                      <div className="text-[#9CA3AF] text-sm">4:35 PM – 6:30 PM (varies by route)</div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-[#FAFAFA] font-semibold mb-2 text-sm">Transport Rules</h4>
                    <ul className="space-y-1">
                      {["No smoking, drinking, or ragging on the bus","Girls board first, then staff, then boys","ID card and Bus ID card are mandatory","No audio devices without headphones"].map((r, i) => (
                        <li key={i} className="flex items-start gap-2 text-[#9CA3AF] text-xs"><ChevronRight size={12} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />{r}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Sports */}
        <section id="sports" className="scroll-mt-32">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Sports & Fitness</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Sports Facilities</h2>
            <div className="mb-5 h-56 rounded-2xl overflow-hidden border border-[#D4AF37]/10">
              <img src="https://ajkksapt.com/images/Gallery/Sports.jpg" alt="AJKKSAPT Sports Facilities" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Trophy size={26} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-[#FAFAFA] font-black">Mr. R. Saminathan</div>
                    <div className="text-[#6B7280] text-sm">Physical Director, H.PEd.</div>
                    <a href="tel:+919894265545" className="text-[#D4AF37] text-sm hover:text-[#C5A059] transition-colors">+91 98942 65545</a>
                  </div>
                </div>
                <p className="text-[#6B7280] text-sm leading-relaxed mb-4">"A healthy mind in a healthy body" — The college actively promotes sports culture with participation in inter-collegiate and district-level competitions.</p>
              </div>
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6">
                <h3 className="text-[#FAFAFA] font-bold mb-4">Games & Sports Available</h3>
                <div className="flex flex-wrap gap-2">
                  {["Cricket","Volleyball","Football","Basketball","Badminton","Ball Badminton","Kabaddi","Kho-Kho","Chess","Carrom","Athletics","Table Tennis"].map((game) => (
                    <span key={game} className="px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full text-[#9CA3AF] text-xs">{game}</span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Computer Labs */}
        <section id="computer" className="scroll-mt-32">
          <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Digital Infrastructure</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-8">Computer Centres</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-6">
              {[{ value: "5", label: "Computer Centres", sub: "Across all departments" },{ value: "250+", label: "Systems", sub: "High-speed internet connected" },{ value: "24/7", label: "Internet Access", sub: "High-speed broadband" }].map((s, i) => (
                <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6 text-center hover:border-[#D4AF37]/30 transition-all duration-300">
                  <div className="text-3xl font-black text-[#D4AF37] mb-1">{s.value}</div>
                  <div className="text-[#FAFAFA] font-bold">{s.label}</div>
                  <div className="text-[#6B7280] text-xs">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-5">
              <p className="text-[#6B7280] text-sm">Five dedicated computer centers with 250+ high-speed internet-connected systems support the computing needs of all 10 departments. Labs are equipped with latest software for CAD, programming, simulation, and web development.</p>
            </div>
          </motion.div>
        </section>

        {/* Cafeteria + ATM + Placement */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { id: "cafeteria", icon: Coffee, title: "Cafeteria", img: "https://ajkksapt.com/images/Gallery/Cateen1.JPG", content: "A large spacious cafeteria with a view of greenery serves nutritious meals via college coupons. Students can purchase coupons in advance. The cafeteria is the most popular gathering spot on campus, promoting a healthy and social student culture.", rules: ["Maintain cleanliness","No casual loitering after meals","Coupons must be purchased in advance"] },
            { id: "atm", icon: CreditCard, title: "KVB ATM", img: "https://ajkksapt.com/images/Gallery/KVB_ATM.jpg", content: "A Kaveri Bank (KVB) ATM is located on the college premises, available 24 hours a day for students, staff, and hostel residents. Parents can deposit money directly into student accounts, ensuring convenient and secure access to funds.", rules: ["Available 24 hours","For students, staff & hostel residents","Parents can deposit directly to student accounts"] },
            { id: "placement", icon: Briefcase, title: "Placement & Training Cell", img: "https://ajkksapt.com/images/Gallery/Placementcell.jpg", content: "The Placement and Training Cell provides compulsory soft skill and vocational training throughout the year, coordinating with industries for campus recruitment. Five computer centers with 250 systems support the technical training programs.", rules: ["Compulsory soft skills training","Year-round vocational programs","Active industry coordination for placements"] },
          ].map((item) => (
            <motion.div key={item.id} id={item.id} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="scroll-mt-32">
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden h-full hover:border-[#D4AF37]/30 transition-all duration-500 group">
                <div className="h-36 overflow-hidden">
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center">
                      <item.icon size={18} className="text-[#D4AF37]" />
                    </div>
                    <h3 className="text-[#FAFAFA] font-black">{item.title}</h3>
                  </div>
                  <p className="text-[#6B7280] text-sm leading-relaxed mb-3">{item.content}</p>
                  <ul className="space-y-1.5">
                    {item.rules.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#9CA3AF] text-xs"><ChevronRight size={12} className="text-[#D4AF37] mt-0.5 flex-shrink-0" />{r}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

      </div>
    </div>
  );
}
