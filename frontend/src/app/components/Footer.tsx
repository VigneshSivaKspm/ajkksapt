import { Link } from "react-router";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  GraduationCap,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

export function Footer() {
  const quickLinks = [
    { label: "About Us", path: "/about" },
    { label: "Departments", path: "/departments" },
    { label: "Examination", path: "/examination" },
    { label: "Infrastructure", path: "/infrastructure" },
    { label: "Activities", path: "/activities" },
    { label: "Contact Us", path: "/contact" },
  ];

  const importantLinks = [
    { label: "Admission 2026-27", path: "/admission" },
    { label: "Results Portal", path: "/results" },
    { label: "Placement Cell", path: "/placement" },
    { label: "Fee Structure", path: "/admission#fees" },
    { label: "Scholarship Info", path: "/admission#scholarship" },
    { label: "AICTE Approvals", path: "/about#accreditation" },
  ];

  const departments = [
    "Civil Engineering",
    "Mechanical Engineering",
    "Automobile Engineering",
    "Electrical & Electronics",
    "Electronics & Communication",
    "Computer Engineering",
  ];

  return (
    <footer className="bg-[#080808] border-t border-[#D4AF37]/10">
      {/* CTA Strip */}
      <div className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-[#0A0A0A] font-bold text-lg">
                Admissions Open for 2026–27 Academic Year
              </div>
              <div className="text-[#0A0A0A]/70 text-sm">
                10 Diploma Programmes · AICTE Approved · DOTE Affiliated
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/admission"
                className="px-6 py-2.5 bg-[#0A0A0A] text-[#D4AF37] font-bold rounded-lg hover:bg-[#1a1a1a] transition-colors duration-300 text-sm"
              >
                Apply Now
              </Link>
              <a
                href="https://wa.me/917339596165"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 bg-[#0A0A0A]/20 text-[#0A0A0A] font-bold rounded-lg hover:bg-[#0A0A0A]/30 transition-colors duration-300 text-sm border border-[#0A0A0A]/30"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-3 mb-6 group">
              <div className="w-11 h-11 bg-gradient-to-br from-[#D4AF37] to-[#C5A059] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap size={22} className="text-[#0A0A0A]" />
              </div>
              <div>
                <div className="text-[#FAFAFA] font-extrabold text-base tracking-tight leading-tight">
                  AJKKSAPT
                </div>
                <div className="text-[#D4AF37] text-[10px] tracking-widest uppercase">
                  Polytechnic College
                </div>
              </div>
            </Link>
            <p className="text-[#6B7280] text-sm leading-relaxed mb-5">
              Annai J.K.K. Sampoorani Ammal Polytechnic College, established in
              1984, offering 10 Diploma Programmes on a 21.34-acre campus in
              Gobichettipalayam.
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>
                  AICTE Approved — F.No. Southern/1-2017043172/2014/EOA
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>DOTE Affiliated — Govt. of Tamil Nadu</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#6B7280]">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                <span>GO Ms.No. 1804 dated 17/11/1984</span>
              </div>
            </div>
            <div className="flex space-x-2">
              {[
                {
                  icon: Facebook,
                  href: "https://facebook.com",
                  label: "Facebook",
                },
                {
                  icon: Twitter,
                  href: "https://twitter.com",
                  label: "Twitter",
                },
                {
                  icon: Instagram,
                  href: "https://instagram.com",
                  label: "Instagram",
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                },
                {
                  icon: Youtube,
                  href: "https://youtube.com",
                  label: "YouTube",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#6B7280] hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#FAFAFA] font-bold text-sm uppercase tracking-widest mb-6">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#6B7280] hover:text-[#D4AF37] text-sm transition-colors duration-300 inline-flex items-center group"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-[#D4AF37]"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-[#FAFAFA] font-bold text-sm uppercase tracking-widest mb-4 mt-8">
              Important Links
            </h3>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-[#6B7280] hover:text-[#D4AF37] text-sm transition-colors duration-300 inline-flex items-center group"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-[#D4AF37]"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-[#FAFAFA] font-bold text-sm uppercase tracking-widest mb-6">
              Departments
            </h3>
            <ul className="space-y-2">
              {departments.map((dept) => (
                <li key={dept}>
                  <Link
                    to={`/departments#${dept
                      .toLowerCase()
                      .replace(/\s+&\s+/g, "-")
                      .replace(/\s+/g, "-")}`}
                    className="text-[#6B7280] hover:text-[#D4AF37] text-sm transition-colors duration-300 inline-flex items-center group"
                  >
                    <ChevronRight
                      size={14}
                      className="mr-1 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300 text-[#D4AF37]"
                    />
                    {dept}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/departments"
                  className="text-[#D4AF37] hover:text-[#C5A059] text-sm transition-colors duration-300 inline-flex items-center mt-1 font-medium"
                >
                  View All 10 Departments →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-[#FAFAFA] font-bold text-sm uppercase tracking-widest mb-6">
              Contact Us
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start space-x-3 text-sm">
                <MapPin
                  size={18}
                  className="text-[#D4AF37] mt-0.5 flex-shrink-0"
                />
                <div className="text-[#6B7280]">
                  <div className="text-[#FAFAFA] font-medium mb-1">
                    Annai J.K.K. Sampoorani Ammal Polytechnic College
                  </div>
                  JKK Campus, T.N. Palayam, Arakkankottai,
                  <br />
                  Gobichettipalayam – 638506,
                  <br />
                  Erode District, Tamil Nadu
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone
                  size={18}
                  className="text-[#D4AF37] mt-0.5 flex-shrink-0"
                />
                <div className="space-y-1">
                  <a
                    href="tel:+919894265545"
                    className="block text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    +91 98942 65545
                  </a>
                  <a
                    href="tel:+919789456753"
                    className="block text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    +91 97894 56753
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Mail
                  size={18}
                  className="text-[#D4AF37] mt-0.5 flex-shrink-0"
                />
                <a
                  href="mailto:ajkksapt@gmail.com"
                  className="text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-300"
                >
                  ajkksapt@gmail.com
                </a>
              </li>
            </ul>

            <div className="mt-6 p-4 bg-[#121212] rounded-xl border border-[#D4AF37]/10">
              <div className="text-[#FAFAFA] font-medium text-sm mb-2">
                External Links
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "AICTE Portal", href: "https://aicte-india.org" },
                  { label: "DOTE Tamil Nadu", href: "https://tndte.gov.in" },
                  { label: "SBTE Chennai", href: "https://sbte.gov.in" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-300"
                  >
                    <ExternalLink size={11} />
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-[#D4AF37]/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-[#6B7280] text-xs text-center md:text-left">
              © {new Date().getFullYear()} Annai J.K.K. Sampoorani Ammal
              Polytechnic College, T.N Palayam. All Rights Reserved.
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
              <span className="text-[#6B7280]">
                Annai J.K.K. Sampooraniammal Charitable Trust
              </span>
              <span className="w-px h-3 bg-[#D4AF37]/20 hidden sm:block" />
              <span className="text-[#6B7280]">
                Campus: 21.34 Acres · Gobichettipalayam
              </span>
              <span className="w-px h-3 bg-[#D4AF37]/20 hidden sm:block" />
              <span className="text-[#D4AF37]/60 italic text-[10px]">
                "Enter to Learn, Drink the Nectar of Knowledge, Flyout to Serve"
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
