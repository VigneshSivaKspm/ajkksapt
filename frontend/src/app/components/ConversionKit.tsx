/**
 * ConversionKit — All admission/enquiry conversion elements in one component:
 * 1. Auto-popup modal (8s delay, exit-intent, 24hr cooldown)
 * 2. Floating action buttons (WhatsApp, Phone, Enquiry)
 * 3. Sticky admission bar (bottom, dismissible)
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X, Phone, MessageCircle, GraduationCap, Send, CheckCircle2,
  ChevronUp, ChevronDown, ArrowRight, Bell
} from "lucide-react";
import { Link } from "react-router";

const COURSES = [
  "Civil Engineering",
  "Mechanical Engineering",
  "Automobile Engineering",
  "Electrical & Electronics Engineering",
  "Electronics & Communication Engineering",
  "Computer Engineering",
  "Chemical Engineering",
  "Petrochemical Engineering",
  "Textile Technology",
  "Textile Processing",
];

const WHATSAPP_NUM = "917339596165";
const PHONE_NUM = "+919894265545";
const PHONE_DISPLAY = "+91 98942 65545";

/* ─── Enquiry Modal ─────────────────────────────────────────── */
function EnquiryModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", course: "", email: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = `Hello AJKKSAPT! I'm interested in admission.\nName: ${form.name}\nPhone: ${form.phone}\nCourse: ${form.course}`;
    window.open(`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    localStorage.setItem("ajkk_enquiry_done", Date.now().toString());
  };

  const handleClose = () => {
    localStorage.setItem("ajkk_popup_closed", Date.now().toString());
    onClose();
    setTimeout(() => { setStep(1); setSubmitted(false); setForm({ name: "", phone: "", course: "", email: "" }); }, 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0A0A0A]/80 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full max-w-md bg-[#0F0F0F] border border-[#D4AF37]/20 rounded-3xl overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top gradient bar */}
            <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#C5A059] to-[#D4AF37]" />

            {/* Header */}
            <div className="relative px-7 pt-7 pb-5 bg-gradient-to-br from-[#D4AF37]/10 via-transparent to-transparent">
              <button onClick={handleClose} className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center text-[#6B7280] hover:text-[#FAFAFA] hover:border-[#D4AF37]/50 transition-all duration-200">
                <X size={16} />
              </button>
              <div className="flex items-center gap-3 mb-1">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#C5A059] rounded-xl flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-[#0A0A0A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#D4AF37] uppercase tracking-wider">Admissions Open</span>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div className="text-[#FAFAFA] font-black text-lg leading-tight">Join AJKKSAPT 2026–27</div>
                </div>
              </div>
              <p className="text-[#6B7280] text-xs mt-2">
                10 Diploma Programmes · AICTE Approved · 21.34 Acres Campus · Gobichettipalayam
              </p>
            </div>

            {/* Body */}
            <div className="px-7 pb-7">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={32} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="text-xl font-black text-[#FAFAFA] mb-2">You're Connected!</h3>
                  <p className="text-[#6B7280] text-sm mb-5">Our admission team will reach out on WhatsApp shortly.</p>
                  <button onClick={handleClose} className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-bold rounded-xl text-sm hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300">
                    Close
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-4">
                    {[1, 2, 3].map(s => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all duration-300 ${s <= step ? "bg-[#D4AF37] text-[#0A0A0A]" : "bg-[#1a1a1a] border border-[#D4AF37]/20 text-[#6B7280]"}`}>{s}</div>
                        {s < 3 && <div className={`h-px w-8 transition-all duration-300 ${s < step ? "bg-[#D4AF37]" : "bg-[#D4AF37]/20"}`} />}
                      </div>
                    ))}
                    <span className="text-[#6B7280] text-xs ml-2">{step === 1 ? "Your Details" : step === 2 ? "Contact" : "Course"}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-3">
                        <div>
                          <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Full Name *</label>
                          <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your full name"
                            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-[#4B5563]" />
                        </div>
                        <button type="button" disabled={!form.name.trim()} onClick={() => setStep(2)}
                          className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-black rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                          Continue <ArrowRight size={16} />
                        </button>
                      </motion.div>
                    )}
                    {step === 2 && (
                      <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-3">
                        <div>
                          <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">WhatsApp / Phone *</label>
                          <input required type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX"
                            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-[#4B5563]" />
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setStep(1)} className="px-4 py-3 bg-[#1a1a1a] border border-[#D4AF37]/10 text-[#9CA3AF] rounded-xl text-sm hover:border-[#D4AF37]/30 transition-all duration-300">Back</button>
                          <button type="button" disabled={!form.phone.trim()} onClick={() => setStep(3)}
                            className="flex-1 py-3 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-black rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                            Continue <ArrowRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                    {step === 3 && (
                      <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }} className="space-y-3">
                        <div>
                          <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Interested Course *</label>
                          <select required value={form.course} onChange={e => setForm({ ...form, course: e.target.value })}
                            className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors">
                            <option value="">Select course...</option>
                            {COURSES.map(c => <option key={c}>Diploma in {c}</option>)}
                          </select>
                        </div>
                        <div className="flex gap-2">
                          <button type="button" onClick={() => setStep(2)} className="px-4 py-3 bg-[#1a1a1a] border border-[#D4AF37]/10 text-[#9CA3AF] rounded-xl text-sm hover:border-[#D4AF37]/30 transition-all duration-300">Back</button>
                          <button type="submit" disabled={!form.course}
                            className="flex-1 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white font-black rounded-xl hover:from-[#128C7E] hover:to-[#25D366] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm">
                            <MessageCircle size={16} /> Send on WhatsApp
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Alt CTA */}
                  <div className="pt-3 border-t border-[#D4AF37]/10 flex items-center justify-between">
                    <a href={`tel:${PHONE_NUM}`} className="flex items-center gap-2 text-[#6B7280] hover:text-[#D4AF37] transition-colors duration-200 text-xs">
                      <Phone size={13} className="text-[#D4AF37]" />{PHONE_DISPLAY}
                    </a>
                    <Link to="/admission" onClick={handleClose} className="text-[#D4AF37] text-xs font-semibold hover:text-[#C5A059] transition-colors duration-200">
                      Full Admission Info →
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Floating Buttons ──────────────────────────────────────── */
function FloatingButtons({ onOpenModal }: { onOpenModal: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const buttons = [
    {
      label: "Enquire Now",
      icon: <GraduationCap size={20} />,
      bg: "bg-gradient-to-r from-[#D4AF37] to-[#C5A059]",
      text: "text-[#0A0A0A]",
      action: onOpenModal,
    },
    {
      label: "Call Us",
      icon: <Phone size={20} />,
      bg: "bg-[#111111] border border-[#D4AF37]/30",
      text: "text-[#D4AF37]",
      href: `tel:${PHONE_NUM}`,
    },
  ];

  return (
    <div className="fixed bottom-24 right-5 z-50 flex flex-col items-end gap-3">
      {/* Scroll to top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all duration-200 shadow-lg"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Expandable buttons */}
      <AnimatePresence>
        {expanded && (
          <>
            {buttons.map((btn, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.8 }}
                transition={{ duration: 0.2, delay: i * 0.06 }}
                className="flex items-center gap-2"
              >
                <span className="bg-[#111111] border border-[#D4AF37]/20 text-[#FAFAFA] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
                  {btn.label}
                </span>
                {btn.href ? (
                  <a href={btn.href} className={`w-12 h-12 rounded-full ${btn.bg} flex items-center justify-center ${btn.text} shadow-lg hover:scale-110 transition-transform duration-200`}>
                    {btn.icon}
                  </a>
                ) : (
                  <button onClick={btn.action} className={`w-12 h-12 rounded-full ${btn.bg} flex items-center justify-center ${btn.text} shadow-lg hover:scale-110 transition-transform duration-200`}>
                    {btn.icon}
                  </button>
                )}
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setExpanded(!expanded)}
        whileTap={{ scale: 0.92 }}
        className="w-13 h-13 rounded-full bg-[#1a1a1a] border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:border-[#D4AF37]/60 transition-all duration-200 shadow-xl"
        style={{ width: 52, height: 52 }}
      >
        {expanded ? <ChevronDown size={22} /> : <Bell size={22} />}
      </motion.button>

      {/* WhatsApp — always visible */}
      <motion.a
        href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent("Hello! I want to know about admissions at AJKKSAPT.")}`}
        target="_blank"
        rel="noopener noreferrer"
        whileTap={{ scale: 0.92 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_28px_rgba(37,211,102,0.6)] transition-all duration-300 relative"
        style={{ width: 56, height: 56 }}
      >
        <MessageCircle size={26} />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full animate-ping" />
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-red-500 rounded-full" />
      </motion.a>
    </div>
  );
}

/* ─── Sticky Admission Bar ──────────────────────────────────── */
function AdmissionBar({ onOpenModal }: { onOpenModal: () => void }) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const closed = localStorage.getItem("ajkk_bar_closed");
    if (closed) {
      const diff = Date.now() - parseInt(closed);
      if (diff < 86400000) { setDismissed(true); return; }
    }
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("ajkk_bar_closed", Date.now().toString());
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-gradient-to-r from-[#0A0A0A] via-[#111111] to-[#0A0A0A] border-t border-[#D4AF37]/30 shadow-[0_-4px_30px_rgba(0,0,0,0.6)]"
        >
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-3">
            <div className="flex items-center justify-between gap-4">
              {/* Left */}
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="hidden sm:flex w-9 h-9 bg-gradient-to-br from-[#D4AF37] to-[#C5A059] rounded-xl items-center justify-center flex-shrink-0">
                  <GraduationCap size={18} className="text-[#0A0A0A]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37] font-black text-sm">Admissions Open 2026–27</span>
                    <span className="hidden md:inline-flex items-center gap-1 w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <div className="text-[#6B7280] text-xs hidden sm:block">10 Diploma Programmes · AICTE Approved · Gobichettipalayam</div>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={onOpenModal}
                  className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-black rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 text-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] whitespace-nowrap"
                >
                  Apply Now
                </button>
                <a
                  href={`https://wa.me/${WHATSAPP_NUM}?text=${encodeURIComponent("Hi! I want information about admissions.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex px-4 py-2 bg-[#25D366]/15 border border-[#25D366]/30 text-[#25D366] font-bold rounded-xl hover:bg-[#25D366]/25 transition-all duration-300 text-xs items-center gap-1.5 whitespace-nowrap"
                >
                  <MessageCircle size={13} /> WhatsApp
                </a>
                <Link
                  to="/admission"
                  className="hidden md:flex px-4 py-2 bg-[#1a1a1a] border border-[#D4AF37]/20 text-[#D4AF37] font-bold rounded-xl hover:bg-[#D4AF37]/10 transition-all duration-300 text-xs whitespace-nowrap"
                >
                  Learn More
                </Link>
                <button onClick={handleDismiss} className="w-7 h-7 rounded-lg bg-[#1a1a1a] border border-[#D4AF37]/10 flex items-center justify-center text-[#6B7280] hover:text-[#FAFAFA] transition-colors duration-200 flex-shrink-0">
                  <X size={14} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Auto-trigger Logic ────────────────────────────────────── */
function useTriggerModal(openModal: () => void) {
  const triggered = useRef(false);

  useEffect(() => {
    // Check 24-hour cooldown
    const closed = localStorage.getItem("ajkk_popup_closed");
    const done = localStorage.getItem("ajkk_enquiry_done");
    if (done) return;
    if (closed && Date.now() - parseInt(closed) < 86400000) return;

    // Auto-trigger after 10 seconds
    const timer = setTimeout(() => {
      if (!triggered.current) {
        triggered.current = true;
        openModal();
      }
    }, 10000);

    // Exit intent (desktop)
    const onMouseOut = (e: MouseEvent) => {
      if (e.clientY <= 5 && !triggered.current) {
        triggered.current = true;
        openModal();
      }
    };

    // Scroll depth trigger (75% of page)
    const onScroll = () => {
      const scrollPct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      if (scrollPct > 60 && !triggered.current) {
        triggered.current = true;
        openModal();
      }
    };

    document.addEventListener("mouseleave", onMouseOut);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", onMouseOut);
      window.removeEventListener("scroll", onScroll);
    };
  }, [openModal]);
}

/* ─── Main Export ────────────────────────────────────────────── */
export function ConversionKit() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useTriggerModal(openModal);

  return (
    <>
      <EnquiryModal isOpen={modalOpen} onClose={closeModal} />
      <FloatingButtons onOpenModal={openModal} />
      <AdmissionBar onOpenModal={openModal} />
    </>
  );
}
