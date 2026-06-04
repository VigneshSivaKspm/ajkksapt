import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useLocation } from "react-router";
import { Users, Clock, BookOpen, Download, ChevronRight, Settings, Zap, Cpu, Wrench, FlaskConical, Layers, Shirt } from "lucide-react";

const LAB_BASE = "https://ajkksapt.com/Files/Department";

const departments = [
  {
    id: "civil",
    name: "Civil Engineering",
    established: 1984,
    intake: 120,
    icon: Layers,
    color: "from-amber-600/20 to-yellow-600/5",
    border: "border-amber-600/20",
    activeBorder: "border-amber-500/50",
    labImages: [`${LAB_BASE}/Civil/Civil_Laboratry/Lab1.JPG`, `${LAB_BASE}/Civil/Civil_Laboratry/Lab2.JPG`, `${LAB_BASE}/Civil/Civil_Laboratry/Lab3.JPG`],
    syllabusUrl: `${LAB_BASE}/Civil/Civil_Syllabus.pdf`,
    overview: "Civil Engineering is one of the oldest and most fundamental engineering disciplines, dealing with the design, construction, and maintenance of the built environment — roads, bridges, dams, buildings, and infrastructure.",
    subjects: ["Mechanics of Fluids", "Surveying", "Strength of Materials", "Structural Mechanics", "Soil Mechanics", "Estimation & Cost Analysis", "Steel Structures", "Building Construction"],
    labs: ["Concrete Technology Lab", "Soil Mechanics Lab", "Survey Lab", "CAD Lab", "Fluid Mechanics Lab"],
    career: ["Site Engineer", "Survey Engineer", "Structural Draughtsman", "Construction Supervisor", "Quality Control Engineer"],
    description: "The Department was established in 1984 with an initial intake of 60, later enhanced to 120 from 2013-14. Curriculum is framed by DOTE Chennai and includes extensive practical training.",
  },
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    established: 1984,
    intake: 120,
    icon: Settings,
    color: "from-[#D4AF37]/20 to-[#C5A059]/5",
    border: "border-[#D4AF37]/20",
    activeBorder: "border-[#D4AF37]/50",
    overview: "Mechanical Engineering is one of the broadest engineering disciplines, focusing on the design, analysis, manufacturing, and maintenance of mechanical systems, machines, and processes.",
    subjects: ["Engineering Drawing", "Thermal Engineering", "Fluid Mechanics", "Manufacturing Technology", "Machine Design", "Metallurgy", "CAD/CAM", "Industrial Management"],
    labs: ["Thermal Engineering Lab", "Fluid Mechanics & Fluid Power Lab", "Modern Workshop", "Metallurgy Lab", "Process Automation Lab", "CAD Lab", "Lathe Section"],
    career: ["Machine Operator", "Workshop Supervisor", "Maintenance Technician", "Production Engineer", "Quality Inspector"],
    description: "Established in 1984, the department runs MEGA (Mechanical Engineering Graduates Association) organising seminars, guest lectures, and symposia. Both full-time and part-time courses are offered.",
  },
  {
    id: "automobile",
    name: "Automobile Engineering",
    established: 2004,
    intake: 120,
    icon: Wrench,
    color: "from-orange-600/20 to-amber-600/5",
    border: "border-orange-600/20",
    activeBorder: "border-orange-500/50",
    overview: "Automobile Engineering prepares technically competent engineers for the automotive industry, covering vehicle chassis, engines, transmission systems, body building, and modern vehicle technologies.",
    subjects: ["Auto Chassis & Transmission", "Automobile Engine", "Industrial Automation", "Machine Drawing", "Road Transport Organization", "Body Building Engineering", "Two & Three Wheeler Technology", "Thermodynamics"],
    labs: ["Engine Overhaul Lab", "Auto Electrical Lab", "Chassis & Transmission Lab", "Two-Wheeler Service Lab", "Vehicle Body Shop"],
    career: ["Automobile Service Engineer", "Quality Assurance Technician", "Vehicle Inspector", "Transport Supervisor", "Fleet Manager"],
    description: "AICTE approved and DOTE affiliated, established 2004. 11 teaching staff + 2 supporting technical staff. Includes in-plant training in related automotive industries.",
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engg",
    established: 1992,
    intake: 120,
    icon: Zap,
    color: "from-yellow-500/20 to-amber-500/5",
    border: "border-yellow-500/20",
    activeBorder: "border-yellow-400/50",
    overview: "EEE covers generation, transmission, distribution, and utilization of electrical energy, along with the design of electronic circuits and systems for industry and consumer applications.",
    subjects: ["Basic Electrical Engineering", "Circuit Theory", "Electrical Machines", "Power Systems", "Electronics", "Microprocessors", "Power Electronics", "Industrial Drives"],
    labs: ["Electrical Machines Lab", "Power Electronics Lab", "Control Systems Lab", "Microprocessor Lab", "Basic Electronics Lab"],
    career: ["Electrical Technician", "Wireman", "Maintenance Engineer", "Sub-Station Operator", "Control Panel Operator"],
    description: "Established in 1992 with initial intake of 60, now 120. Well-equipped laboratories, dedicated library, and experienced faculty emphasizing theoretical and practical aspects.",
  },
  {
    id: "ece",
    name: "Electronics & Communication",
    established: 2006,
    intake: 60,
    icon: Cpu,
    color: "from-[#D4AF37]/20 to-[#C5A059]/5",
    border: "border-[#D4AF37]/20",
    activeBorder: "border-[#D4AF37]/50",
    overview: "ECE focuses on the design and development of electronic devices, circuits, and communication systems for careers in telecommunications, consumer electronics, and embedded systems.",
    subjects: ["Electronic Devices & Circuits", "Digital Electronics", "Communication Systems", "Microcontrollers", "Signal Processing", "Wireless Communication", "VLSI Design", "PCB Design"],
    labs: ["Electronics Lab", "Communication Lab", "Microcontroller Lab", "Digital Lab", "PCB Fabrication Lab"],
    career: ["Electronics Technician", "Communication Engineer", "PCB Designer", "Network Technician", "Embedded Systems Engineer"],
    description: "Established in 2006 with annual intake of 60. AICTE approved, DOTE affiliated. Emphasis on seminars, paper presentations, conferences, and industrial training.",
  },
  {
    id: "computer",
    name: "Computer Engineering",
    established: 1999,
    intake: 40,
    icon: Cpu,
    color: "from-blue-600/20 to-indigo-600/5",
    border: "border-blue-600/20",
    activeBorder: "border-blue-500/50",
    overview: "Computer Engineering combines hardware and software knowledge to prepare students for the rapidly evolving IT industry, covering programming, networking, databases, and web technologies.",
    subjects: ["Computer Architecture", "Database Systems", "Artificial Intelligence", "Computer Networks", "Software Engineering", "Web Technology", "Operating Systems", "Object Oriented Programming (JAVA)"],
    labs: ["Programming Lab", "Networking Lab", "Web Technology Lab", "DBMS Lab", "Hardware Lab"],
    career: ["Software Developer", "Database Administrator", "Network Technician", "Web Designer", "System Administrator"],
    description: "Established in 1999 with intake of 40. Well-equipped labs, modern classrooms, 24/7 internet access, and departmental library.",
  },
  {
    id: "chemical",
    name: "Chemical Engineering",
    established: 1997,
    intake: 20,
    icon: FlaskConical,
    color: "from-green-600/20 to-emerald-600/5",
    border: "border-green-600/20",
    activeBorder: "border-green-500/50",
    overview: "Chemical Engineering combines chemistry, physics, biology, microbiology, biochemistry, mathematics, and engineering for production of chemicals and by-products across diverse industries.",
    subjects: ["Process Calculations", "Fluid Flow Operations", "Heat Transfer", "Mass Transfer", "Chemical Reaction Engineering", "Industrial Chemistry", "Process Control", "Plant Design"],
    labs: ["Chemical Reaction Lab", "Mass Transfer Lab", "Heat Transfer Lab", "Fluid Operations Lab", "Process Control Lab"],
    career: ["Chemical Plant Operator", "Quality Control Chemist", "Process Technician", "Lab Technician", "Production Supervisor"],
    description: "Established in 1997 with intake of 20. Student Association: CHESS (Chemical Engineering Students' Seminar). Independent lab, classroom, library, and in-plant training.",
  },
  {
    id: "petrochem",
    name: "Petrochemical Engineering",
    established: 1999,
    intake: 20,
    icon: FlaskConical,
    color: "from-purple-600/20 to-violet-600/5",
    border: "border-purple-600/20",
    activeBorder: "border-purple-500/50",
    overview: "Petrochemical Engineering is a specialized field involving processes relevant to the production of petrochemicals — manufacturing, testing, and characterization of refinery products.",
    subjects: ["Petroleum Refining", "Petrochemical Processes", "Instrumentation", "Polymer Technology", "Lubricants & Fuels", "Crude Oil Processing", "Environmental Engineering", "Plant Safety"],
    labs: ["Petroleum Testing Lab", "Petrochemical Processes Lab", "Instrumentation Lab", "Polymer Lab", "Safety Lab"],
    career: ["Petrochemical Plant Operator", "Quality Control Engineer", "Refinery Technician", "Chemical Lab Analyst", "Process Supervisor"],
    description: "Established in 1999 with intake of 20. Student Association: CHESS (shared with Chemical Engineering). In-plant training at petroleum and refinery industries.",
  },
  {
    id: "textile-tech",
    name: "Textile Technology",
    established: 1984,
    intake: 40,
    icon: Shirt,
    color: "from-pink-600/20 to-rose-600/5",
    border: "border-pink-600/20",
    activeBorder: "border-pink-500/50",
    overview: "Textile Technology covers spinning, weaving, fabric engineering, and textile manufacturing. Philosophy: 'Work is worship' — excellence, efficiency, and effectiveness in all endeavours.",
    subjects: ["Spinning Technology", "Weaving Technology", "Fabric Structure", "Textile Machinery", "Yarn Manufacturing", "Quality Control", "Textile Management", "Computer Applications in Textile"],
    labs: ["Spinning Lab", "Weaving Lab", "Fabric Testing Lab", "CAD Lab", "Yarn Quality Testing Lab"],
    career: ["Textile Technologist", "Production Manager", "Quality Inspector", "Weaving Supervisor", "Textile Merchandiser"],
    description: "Gradually marching towards pursuit of technical excellence in textile education. Vision, Mission, Library, Laboratory, Faculty, Gallery, Activities, Placement, and Syllabus available.",
  },
  {
    id: "textile-proc",
    name: "Textile Processing",
    established: 1984,
    intake: 40,
    icon: Shirt,
    color: "from-red-600/20 to-pink-600/5",
    border: "border-red-600/20",
    activeBorder: "border-red-500/50",
    overview: "Textile Processing involves dyeing, printing, finishing, and chemical processing of textiles. The Indian textile industry is heading towards radical change with remarkable progress and development.",
    subjects: ["Dyeing Technology", "Printing Technology", "Finishing Processes", "Fibre Chemistry", "Wet Processing", "Colour Science", "Textile Chemicals", "Environmental Management"],
    labs: ["Dyeing Lab", "Printing Lab", "Finishing Lab", "Colour Matching Lab", "Chemical Testing Lab"],
    career: ["Dyeing Technologist", "Printing Supervisor", "Quality Controller", "Process Chemist", "Effluent Treatment Operator"],
    description: "Philosophy: 'Work is worship'. Resources available as PDFs for Gallery, Activities, Placement, Syllabi, and Toppers list.",
  },
];

export function Departments() {
  const [selected, setSelected] = useState(departments[0]);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const dept = departments.find((d) => d.id === id);
      if (dept) {
        setSelected(dept);
        setTimeout(() => {
          document.getElementById("dept-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-72 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&h=600&fit=crop" alt="Departments" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">AICTE Approved · DOTE Affiliated · 3-Year Diploma Programmes</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Academic Departments</h1>
              <p className="text-[#9CA3AF]">10 Full-Time + 2 Part-Time Diploma Programmes in Engineering & Technology</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Grid */}
      <section className="py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {departments.map((dept, index) => (
              <motion.button
                key={dept.id}
                onClick={() => setSelected(dept)}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className={`group text-left bg-[#111111] border rounded-xl p-4 transition-all duration-300 ${
                  selected.id === dept.id
                    ? `${dept.activeBorder} shadow-[0_0_20px_rgba(212,175,55,0.15)]`
                    : `${dept.border} hover:${dept.activeBorder}`
                }`}
              >
                <div className={`w-9 h-9 mb-3 bg-gradient-to-br ${dept.color} rounded-lg flex items-center justify-center`}>
                  <dept.icon size={18} className="text-[#D4AF37]" />
                </div>
                <div className={`text-xs font-bold leading-tight transition-colors duration-300 ${selected.id === dept.id ? "text-[#D4AF37]" : "text-[#FAFAFA] group-hover:text-[#D4AF37]"}`}>
                  {dept.name}
                </div>
                <div className="text-[#6B7280] text-[10px] mt-1">Est. {dept.established}</div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Department Detail */}
      <section id="dept-detail" className="py-12 bg-[#0D0D0D] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            key={selected.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${selected.color} border ${selected.border} rounded-2xl p-8 md:p-10 mb-8`}>
              <div className="flex flex-wrap items-start gap-6">
                <div className={`w-16 h-16 bg-gradient-to-br ${selected.color} border ${selected.border} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                  <selected.icon size={32} className="text-[#D4AF37]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-1">Diploma Programme</div>
                  <h2 className="text-2xl md:text-3xl font-black text-[#FAFAFA] mb-2">{selected.name}</h2>
                  <p className="text-[#9CA3AF] text-sm">{selected.description}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  {[
                    { icon: Clock, label: "Duration", value: "3 Years" },
                    { icon: Users, label: "Intake", value: `${selected.intake} Seats` },
                    { icon: BookOpen, label: "Type", value: "Full Time" },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-[#0A0A0A]/50 rounded-xl p-3 text-center min-w-[90px]">
                      <stat.icon size={16} className="text-[#D4AF37] mx-auto mb-1" />
                      <div className="text-[10px] text-[#6B7280]">{stat.label}</div>
                      <div className="text-[#FAFAFA] text-sm font-bold">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Overview */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-[#111111] border border-[#D4AF37]/8 rounded-2xl p-6">
                  <h3 className="text-[#FAFAFA] font-bold mb-3">Department Overview</h3>
                  <p className="text-[#6B7280] text-sm leading-relaxed">{selected.overview}</p>
                </div>

                {/* Subjects */}
                <div className="bg-[#111111] border border-[#D4AF37]/8 rounded-2xl p-6">
                  <h3 className="text-[#FAFAFA] font-bold mb-4">Key Subjects</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selected.subjects.map((subj, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-[#0A0A0A] rounded-lg">
                        <ChevronRight size={14} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="text-[#9CA3AF] text-xs">{subj}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Labs */}
                <div className="bg-[#111111] border border-[#D4AF37]/8 rounded-2xl p-6">
                  <h3 className="text-[#FAFAFA] font-bold mb-4">Laboratories & Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.labs.map((lab, i) => (
                      <span key={i} className={`px-3 py-1.5 bg-gradient-to-r ${selected.color} border ${selected.border} rounded-full text-xs text-[#FAFAFA] font-medium`}>
                        {lab}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Career */}
                <div className="bg-[#111111] border border-[#D4AF37]/8 rounded-2xl p-6">
                  <h3 className="text-[#FAFAFA] font-bold mb-4">Career Opportunities</h3>
                  <ul className="space-y-2">
                    {selected.career.map((c, i) => (
                      <li key={i} className="flex items-center gap-2 text-[#6B7280] text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] flex-shrink-0" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Info */}
                <div className="bg-[#111111] border border-[#D4AF37]/8 rounded-2xl p-6 space-y-4">
                  <h3 className="text-[#FAFAFA] font-bold">Programme Info</h3>
                  {[
                    { label: "Eligibility", value: "10th Standard (SSLC) — No age limit" },
                    { label: "Lateral Entry", value: "10+2 with Maths, Physics & Chemistry" },
                    { label: "Duration", value: "3 Years Full Time" },
                    { label: "Affiliation", value: "DOTE, Chennai, Tamil Nadu" },
                    { label: "Approval", value: "AICTE, New Delhi" },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <div className="text-[#6B7280] text-xs mb-0.5">{label}</div>
                      <div className="text-[#FAFAFA] text-sm font-medium">{value}</div>
                    </div>
                  ))}
                </div>

                {/* Download */}
                <a
                  href={`https://ajkksapt.com/Files/Department/${selected.id.charAt(0).toUpperCase() + selected.id.slice(1)}/${selected.id.charAt(0).toUpperCase() + selected.id.slice(1)}_Syllabus.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                >
                  <Download size={18} />
                  Download Syllabus
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Part-Time Courses */}
      <section className="py-12 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-8">
            <h3 className="text-[#FAFAFA] font-black text-xl mb-2">Part-Time Courses</h3>
            <p className="text-[#6B7280] text-sm mb-6">Available for working professionals seeking to upgrade qualifications alongside employment.</p>
            <div className="flex flex-wrap gap-4">
              {["Diploma in Mechanical Engineering", "Diploma in Electrical and Electronics Engineering"].map((course) => (
                <div key={course} className="flex items-center gap-3 bg-[#0A0A0A] border border-[#D4AF37]/10 rounded-xl px-5 py-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                  <span className="text-[#FAFAFA] text-sm font-medium">{course}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
