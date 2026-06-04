import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  GraduationCap,
  ExternalLink,
  Sun,
  Moon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../contexts/ThemeContext";

const aboutLinks = [
  { label: "Trust & Founder", path: "/about#trust" },
  { label: "Chairman's Message", path: "/about#chairman" },
  { label: "Secretary's Message", path: "/about#secretary" },
  { label: "Principal's Message", path: "/about#principal" },
  { label: "Vision & Mission", path: "/about#vision" },
];

const collegeLinks = [
  { label: "Notice Board", path: "/notice-board" },
  { label: "News & Events", path: "/news-events" },
  { label: "College Activities", path: "/college-activities" },
  { label: "Circulars", path: "/circulars" },
];

const departmentLinks = [
  { label: "Civil Engineering", path: "/departments#civil", year: "Est. 1984" },
  {
    label: "Mechanical Engineering",
    path: "/departments#mechanical",
    year: "Est. 1984",
  },
  {
    label: "Automobile Engineering",
    path: "/departments#automobile",
    year: "Est. 2004",
  },
  {
    label: "Electrical & Electronics Engg",
    path: "/departments#eee",
    year: "Est. 1992",
  },
  {
    label: "Electronics & Communication",
    path: "/departments#ece",
    year: "Est. 2006",
  },
  {
    label: "Computer Engineering",
    path: "/departments#computer",
    year: "Est. 1999",
  },
  {
    label: "Chemical Engineering",
    path: "/departments#chemical",
    year: "Est. 1997",
  },
  {
    label: "Petrochemical Engineering",
    path: "/departments#petrochem",
    year: "Est. 1999",
  },
  { label: "Textile Technology", path: "/departments#textile-tech", year: "" },
  { label: "Textile Processing", path: "/departments#textile-proc", year: "" },
];

const activitiesLinks = [
  { label: "College Activities", path: "/college-activities" },
  { label: "Gallery", path: "/gallery" },
  { label: "Impact & Community", path: "/impact" },
  { label: "Student Life", path: "/student-life" },
];

export function Navigation() {
  const { isDark, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    setMobileExpanded(null);
  }, [location]);

  const openDropdown = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(key);
  };

  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 180);
  };

  const keepOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const isActive = (path: string) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(path);

  return (
    <>
      {/* Top Info Bar */}
      <div
        className={`hidden lg:block border-b relative z-50 transition-colors duration-300 ${isDark ? "bg-[#0D0D0D] border-[#D4AF37]/10" : "bg-[#F0F4FF] border-[#D4AF37]/15"}`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center space-x-6">
              <a
                href="tel:+919894265545"
                className="flex items-center space-x-2 text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-300 text-xs"
              >
                <Phone size={13} />
                <span>+91 98942 65545</span>
              </a>
              <a
                href="mailto:info@ajkksapt.com"
                className="flex items-center space-x-2 text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-300 text-xs"
              >
                <Mail size={13} />
                <span>info@ajkksapt.com</span>
              </a>
            </div>
            <div className="flex items-center space-x-4 text-xs">
              <span className="text-[#6B7280]">
                AICTE Approved &bull; DOTE Affiliated
              </span>
              <span className="w-px h-4 bg-[#D4AF37]/20" />
              <a
                href="https://tndte.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-300"
              >
                <span>DOTE Portal</span>
                <ExternalLink size={11} />
              </a>
              <Link
                to="/results"
                className="flex items-center space-x-1 text-[#D4AF37] hover:text-[#C5A059] transition-colors duration-300 font-medium"
              >
                <span>Results Portal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 lg:sticky lg:top-0 ${
          isScrolled
            ? isDark
              ? "bg-[#0A0A0A]/96 backdrop-blur-xl border-b border-[#D4AF37]/10 shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
              : "bg-white/96 backdrop-blur-xl border-b border-[#D4AF37]/15 shadow-[0_2px_20px_rgba(15,23,42,0.08)]"
            : isDark
              ? "bg-[#0A0A0A]"
              : "bg-white border-b border-[#D4AF37]/10"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-3 group flex-shrink-0"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] border border-[#D4AF37]/20">
                  <img
                    src="https://ajkksapt.com/images/Home_Page/Logo.PNG"
                    alt="AJKKSAPT Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                      (e.currentTarget.parentElement as HTMLElement).innerHTML =
                        '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
                    }}
                  />
                </div>
              </div>
              <div className="hidden xs:block">
                <div className="text-[#FAFAFA] font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-tight">
                  Annai J.K.K Sampoorani Ammal
                </div>
                <div className="text-[#FAFAFA] font-extrabold text-xs sm:text-sm md:text-base tracking-tight leading-tight">
                  Polytechnic College
                </div>
                <div className="text-[#D4AF37] text-[8px] sm:text-[9px] tracking-widest uppercase leading-tight">
                  Est. 1984 · Gobichettipalayam
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center space-x-0">
              {/* Home */}
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                  isActive("/")
                    ? "text-[#D4AF37]"
                    : "text-[#FAFAFA] hover:text-[#D4AF37]"
                }`}
              >
                Home
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/") ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>

              {/* About Us Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown("about")}
                onMouseLeave={closeDropdown}
              >
                <Link
                  to="/about"
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center space-x-1 relative group ${
                    isActive("/about")
                      ? "text-[#D4AF37]"
                      : "text-[#FAFAFA] hover:text-[#D4AF37]"
                  }`}
                >
                  <span>About Us</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${activeDropdown === "about" ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/about") ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
                <AnimatePresence>
                  {activeDropdown === "about" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={keepOpen}
                      onMouseLeave={closeDropdown}
                      className="absolute top-full left-0 w-56 bg-[#111111] border border-[#D4AF37]/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden z-50 mt-1"
                    >
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-3 text-sm text-[#C8C8C8] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200 border-b border-[#D4AF37]/5 last:border-0"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Departments Mega Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown("departments")}
                onMouseLeave={closeDropdown}
              >
                <Link
                  to="/departments"
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center space-x-1 relative group ${
                    isActive("/departments")
                      ? "text-[#D4AF37]"
                      : "text-[#FAFAFA] hover:text-[#D4AF37]"
                  }`}
                >
                  <span>Departments</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${activeDropdown === "departments" ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/departments") ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
                <AnimatePresence>
                  {activeDropdown === "departments" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={keepOpen}
                      onMouseLeave={closeDropdown}
                      className="absolute top-full left-0 w-[480px] bg-[#111111] border border-[#D4AF37]/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden z-50 mt-1"
                    >
                      <div className="px-4 pt-4 pb-2 border-b border-[#D4AF37]/10">
                        <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">
                          10 Diploma Programmes
                        </span>
                      </div>
                      <div className="grid grid-cols-2 p-2">
                        {departmentLinks.map((link) => (
                          <Link
                            key={link.path}
                            to={link.path}
                            className="flex items-start px-3 py-2.5 rounded-lg text-sm text-[#C8C8C8] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200 group/item"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40 group-hover/item:bg-[#D4AF37] mt-1.5 mr-2.5 flex-shrink-0 transition-colors duration-200" />
                            <div>
                              <div className="leading-tight">{link.label}</div>
                              {link.year && (
                                <div className="text-[10px] text-[#6B7280] mt-0.5">
                                  {link.year}
                                </div>
                              )}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Examination */}
              <Link
                to="/examination"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                  isActive("/examination")
                    ? "text-[#D4AF37]"
                    : "text-[#FAFAFA] hover:text-[#D4AF37]"
                }`}
              >
                Examination
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/examination") ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>

              {/* Infrastructure */}
              <Link
                to="/infrastructure"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                  isActive("/infrastructure")
                    ? "text-[#D4AF37]"
                    : "text-[#FAFAFA] hover:text-[#D4AF37]"
                }`}
              >
                Infrastructure
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/infrastructure") ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>

              {/* Admission */}
              <Link
                to="/admission"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                  isActive("/admission")
                    ? "text-[#D4AF37]"
                    : "text-[#FAFAFA] hover:text-[#D4AF37]"
                }`}
              >
                Admission
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/admission") ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>

              {/* Activities Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => openDropdown("activities")}
                onMouseLeave={closeDropdown}
              >
                <Link
                  to="/college-activities"
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center space-x-1 relative group ${
                    isActive("/college-activities")
                      ? "text-[#D4AF37]"
                      : "text-[#FAFAFA] hover:text-[#D4AF37]"
                  }`}
                >
                  <span>Activities</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-300 ${activeDropdown === "activities" ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/college-activities") ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
                <AnimatePresence>
                  {activeDropdown === "activities" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={keepOpen}
                      onMouseLeave={closeDropdown}
                      className="absolute top-full left-0 w-52 bg-[#111111] border border-[#D4AF37]/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] overflow-hidden z-50 mt-1"
                    >
                      {activitiesLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-3 text-sm text-[#C8C8C8] hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 transition-all duration-200 border-b border-[#D4AF37]/5 last:border-0"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Contact */}
              <Link
                to="/contact"
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative group ${
                  isActive("/contact")
                    ? "text-[#D4AF37]"
                    : "text-[#FAFAFA] hover:text-[#D4AF37]"
                }`}
              >
                Contact Us
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-[#D4AF37] transition-all duration-300 ${isActive("/contact") ? "w-full" : "w-0 group-hover:w-full"}`}
                />
              </Link>
            </div>

            {/* Apply Now + Theme Toggle + Mobile Menu */}
            <div className="flex items-center space-x-2 xl:space-x-4">
              <Link
                to="/admission"
                className="hidden sm:inline-flex items-center px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold text-sm hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:scale-105"
              >
                Apply Now
              </Link>

              {/* Theme Toggle Button - Desktop Only */}
              <motion.button
                onClick={toggleTheme}
                whileTap={{ scale: 0.9 }}
                title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                className={`hidden lg:flex relative w-[52px] h-[28px] rounded-full transition-all duration-300 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/50 ${
                  isDark
                    ? "bg-[#1a1a1a] border border-[#D4AF37]/30"
                    : "bg-gradient-to-r from-[#D4AF37]/20 to-[#C5A059]/20 border border-[#D4AF37]/40"
                }`}
                aria-label="Toggle theme"
              >
                <motion.div
                  animate={{ x: isDark ? 24 : 2 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-[3px] w-[22px] h-[22px] rounded-full flex items-center justify-center shadow-md transition-colors duration-300 ${
                    isDark
                      ? "bg-[#D4AF37]"
                      : "bg-gradient-to-br from-[#D4AF37] to-[#C5A059]"
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isDark ? (
                      <motion.div
                        key="moon"
                        initial={{ rotate: -30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 30, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Moon size={12} className="text-[#0A0A0A]" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="sun"
                        initial={{ rotate: 30, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -30, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Sun size={12} className="text-[#0A0A0A]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className={`fixed top-20 left-0 right-0 z-30 xl:hidden backdrop-blur-xl border-b border-[#D4AF37]/10 overflow-hidden ${isDark ? "bg-[#0A0A0A]/98" : "bg-white/98 shadow-[0_8px_24px_rgba(15,23,42,0.08)]"}`}
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
              <Link
                to="/"
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
              >
                Home
              </Link>

              {/* About mobile accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === "about" ? null : "about",
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
                >
                  <span>About Us</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${mobileExpanded === "about" ? "rotate-180 text-[#D4AF37]" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "about" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {aboutLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-2 rounded-lg text-sm text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Departments mobile accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === "departments" ? null : "departments",
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
                >
                  <span>Departments</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${mobileExpanded === "departments" ? "rotate-180 text-[#D4AF37]" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "departments" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {departmentLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-2 rounded-lg text-sm text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/examination"
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
              >
                Examination
              </Link>
              <Link
                to="/infrastructure"
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
              >
                Infrastructure
              </Link>
              <Link
                to="/admission"
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
              >
                Admission
              </Link>

              {/* Activities mobile accordion */}
              <div>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === "activities" ? null : "activities",
                    )
                  }
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
                >
                  <span>Activities</span>
                  <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${mobileExpanded === "activities" ? "rotate-180 text-[#D4AF37]" : ""}`}
                  />
                </button>
                <AnimatePresence>
                  {mobileExpanded === "activities" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="pl-4 space-y-1 overflow-hidden"
                    >
                      {activitiesLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          className="block px-4 py-2 rounded-lg text-sm text-[#9CA3AF] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                to="/contact"
                className="block px-4 py-3 rounded-xl text-base font-medium text-[#FAFAFA] hover:text-[#D4AF37] hover:bg-[#1a1a1a] transition-all duration-300"
              >
                Contact Us
              </Link>

              <div className="pt-2 pb-4">
                <Link
                  to="/admission"
                  className="block text-center px-6 py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold text-base hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300"
                >
                  Apply Now — 2026-27
                </Link>

                {/* Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 border ${
                    isDark
                      ? "bg-[#1a1a1a] border-[#D4AF37]/20 text-[#FAFAFA]"
                      : "bg-[#EEF2FF] border-[#D4AF37]/20 text-[#0F172A]"
                  }`}
                >
                  <span className="text-sm font-semibold">
                    {isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                  </span>
                  <div
                    className={`w-11 h-6 rounded-full relative transition-colors duration-300 ${isDark ? "bg-[#D4AF37]/20" : "bg-[#D4AF37]/30"}`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 bg-gradient-to-br from-[#D4AF37] to-[#C5A059] rounded-full shadow flex items-center justify-center transition-all duration-300 ${isDark ? "left-5" : "left-0.5"}`}
                    >
                      {isDark ? (
                        <Moon size={11} className="text-[#0A0A0A]" />
                      ) : (
                        <Sun size={11} className="text-[#0A0A0A]" />
                      )}
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
