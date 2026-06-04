import { motion } from "motion/react";
import { Mail, Phone, Users, Search } from "lucide-react";
import { useState } from "react";

const staff = [
  { name: "Prof. P. Ramesh", designation: "Principal", dept: "Administration", qual: "M.Tech., (Ph.D.)", exp: "15+ years", email: "principal@ajkksapt.com", phone: "+91 98942 65545" },
  { name: "Mr. R. Saminathan", designation: "Physical Director", dept: "Sports", qual: "H.PEd.", exp: "4 years", email: "samynathanpd@gmail.com", phone: "+91 98942 65545" },
  { name: "Mr. V. Dinesh", designation: "Librarian", dept: "Library", qual: "CLIS., MLIS.", exp: "1 year", email: "library@ajkksapt.com", phone: "" },
  { name: "Mr. E. Vikkirama Raja", designation: "Library Assistant", dept: "Library", qual: "CLIS.", exp: "< 1 year", email: "library@ajkksapt.com", phone: "" },
  { name: "Mrs. A. Sumathi", designation: "NSS Programme Officer (Unit I)", dept: "NSS", qual: "M.E.", exp: "8 years", email: "nss@ajkksapt.com", phone: "" },
  { name: "Mr. A. Rajeshkumar", designation: "NSS Programme Officer (Unit II) / RRC / YRC", dept: "NSS/RRC/YRC", qual: "M.E.", exp: "10 years", email: "nss@ajkksapt.com", phone: "" },
  { name: "Ms. D. Gayathri", designation: "NCC Caretaker", dept: "NCC", qual: "M.Sc.", exp: "5 years", email: "ncc@ajkksapt.com", phone: "" },
  { name: "Mr. G. Venkatesan", designation: "ED Cell Programme Officer", dept: "ED Cell", qual: "M.B.A.", exp: "7 years", email: "edcell@ajkksapt.com", phone: "" },
  { name: "Mr. K. Sakthivel", designation: "Eco Green Club / Trekking Club Officer", dept: "Extra-Curricular", qual: "M.Sc.", exp: "9 years", email: "ecoclub@ajkksapt.com", phone: "" },
  { name: "Mr. Vadivel P", designation: "Deputy Warden — Boys' Hostel", dept: "Hostel", qual: "B.E.", exp: "6 years", email: "hostel@ajkksapt.com", phone: "" },
  { name: "Mr. SasiKumar P", designation: "Deputy Warden — Boys' Hostel", dept: "Hostel", qual: "B.E.", exp: "4 years", email: "hostel@ajkksapt.com", phone: "" },
  { name: "Ms. Mythily", designation: "Deputy Warden — Girls' Hostel", dept: "Hostel", qual: "M.Sc.", exp: "5 years", email: "hostel@ajkksapt.com", phone: "" },
  { name: "Mr. Laksmiganthan", designation: "Transport Committee Head", dept: "Transport", qual: "B.E.", exp: "8 years", email: "transport@ajkksapt.com", phone: "+91 97894 56753" },
];

const depts = ["All", "Administration", "Library", "Sports", "NSS", "NSS/RRC/YRC", "NCC", "ED Cell", "Extra-Curricular", "Hostel", "Transport"];

export function StaffDirectory() {
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("All");

  const filtered = staff.filter(s =>
    (dept === "All" || s.dept === dept) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.designation.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen pt-20">
      <section className="relative h-64 overflow-hidden bg-gradient-to-br from-[#0A0A0A] to-[#111111]">
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <div className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase mb-3">Administration & Staff</div>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Staff Directory</h1>
              <p className="text-[#9CA3AF]">Administrative staff, co-curricular coordinators, and support personnel at AJKKSAPT.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search staff by name or designation..."
              className="w-full bg-[#111111] border border-[#D4AF37]/10 text-[#FAFAFA] rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200" />
          </div>
          <select value={dept} onChange={e => setDept(e.target.value)}
            className="bg-[#111111] border border-[#D4AF37]/10 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200">
            {depts.map(d => <option key={d}>{d}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((member, i) => (
            <motion.div key={i} initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.05 }}>
              <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-500 h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users size={20} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <h3 className="text-[#FAFAFA] font-bold text-sm leading-tight">{member.name}</h3>
                    <div className="text-[#D4AF37] text-xs mt-0.5">{member.designation}</div>
                    <span className="inline-block mt-1 px-2 py-0.5 bg-[#D4AF37]/10 text-[#6B7280] text-[10px] rounded border border-[#D4AF37]/10">{member.dept}</span>
                  </div>
                </div>
                <div className="space-y-1.5 text-xs">
                  <div className="text-[#6B7280]"><span className="text-[#9CA3AF] font-semibold">Qualification:</span> {member.qual}</div>
                  <div className="text-[#6B7280]"><span className="text-[#9CA3AF] font-semibold">Experience:</span> {member.exp}</div>
                  {member.email && (
                    <a href={`mailto:${member.email}`} className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-200">
                      <Mail size={12} className="text-[#D4AF37]" />{member.email}
                    </a>
                  )}
                  {member.phone && (
                    <a href={`tel:${member.phone}`} className="flex items-center gap-1.5 text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-200">
                      <Phone size={12} className="text-[#D4AF37]" />{member.phone}
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
