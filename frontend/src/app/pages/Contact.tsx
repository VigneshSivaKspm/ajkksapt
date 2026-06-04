import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, MessageCircle } from "lucide-react";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 6000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=500&fit=crop" alt="Contact" className="w-full h-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/97 via-[#0A0A0A]/80 to-[#0A0A0A]/50" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8 }}>
              <h1 className="text-4xl md:text-5xl font-black text-[#FAFAFA] mb-2">Contact Us</h1>
              <p className="text-[#9CA3AF]">T.N Palayam, Gobichettipalayam, Erode District, Tamil Nadu</p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Contact Info */}
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="lg:col-span-2 space-y-5">
            <div>
              <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/20 rounded-full mb-4">
                <span className="text-[#D4AF37] text-xs font-bold tracking-widest uppercase">Get In Touch</span>
              </div>
              <h2 className="text-2xl font-black text-[#FAFAFA] mb-2">We'd Love to Hear From You</h2>
              <p className="text-[#6B7280] text-sm">Reach out for admissions, general enquiries, or visit us at our campus in Gobichettipalayam.</p>
            </div>

            {[
              {
                icon: MapPin,
                title: "College Address",
                lines: ["Annai J.K.K. Sampoorani Ammal Polytechnic College", "JKK Campus, T.N. Palayam, Arakkankottai,", "Gobichettipalayam – 638506, Erode District,", "Tamil Nadu"],
              },
              {
                icon: Phone,
                title: "Phone Numbers",
                lines: ["+91 98942 65545 (Principal/General)", "+91 97894 56753 (Transport: Mr. Laksmiganthan)"],
              },
              {
                icon: Mail,
                title: "Email Addresses",
                lines: ["ajkksapt@gmail.com"],
              },
              {
                icon: Clock,
                title: "Office Hours",
                lines: ["Monday – Saturday: 9:00 AM – 5:00 PM", "Sunday & Public Holidays: Closed"],
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#111111] border border-[#D4AF37]/10 rounded-xl p-5 flex gap-4 hover:border-[#D4AF37]/30 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} className="text-[#D4AF37]" />
                </div>
                <div>
                  <div className="text-[#D4AF37] font-bold text-xs uppercase tracking-wider mb-1">{item.title}</div>
                  {item.lines.map((line, li) => (
                    line.includes("@") ? (
                      <a key={li} href={`mailto:${line}`} className="block text-[#9CA3AF] text-sm hover:text-[#D4AF37] transition-colors duration-200">{line}</a>
                    ) : line.startsWith("+") ? (
                      <a key={li} href={`tel:${line.replace(/\s/g, "")}`} className="block text-[#9CA3AF] text-sm hover:text-[#D4AF37] transition-colors duration-200">{line}</a>
                    ) : (
                      <div key={li} className="text-[#9CA3AF] text-sm">{line}</div>
                    )
                  ))}
                </div>
              </div>
            ))}

            {/* WhatsApp */}
            <a href="https://wa.me/917339596165" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#25D366]/10 to-[#128C7E]/10 border border-[#25D366]/20 rounded-xl hover:border-[#25D366]/50 transition-all duration-300 group">
              <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <div className="text-[#FAFAFA] font-bold text-sm">WhatsApp Us</div>
                <div className="text-[#6B7280] text-xs">Chat directly with our admission team</div>
              </div>
            </a>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="lg:col-span-3">
            <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl p-8">
              <h2 className="text-xl font-black text-[#FAFAFA] mb-6">Send Us a Message</h2>
              {submitted ? (
                <div className="py-16 text-center">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/10 rounded-full flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-[#D4AF37]" />
                  </div>
                  <h3 className="text-2xl font-black text-[#FAFAFA] mb-2">Message Sent!</h3>
                  <p className="text-[#6B7280]">Thank you for contacting us. Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Full Name *</label>
                      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 placeholder-[#4B5563]" placeholder="Your full name" />
                    </div>
                    <div>
                      <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Phone Number *</label>
                      <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 placeholder-[#4B5563]" placeholder="+91 XXXXX XXXXX" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Email Address *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 placeholder-[#4B5563]" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Subject *</label>
                    <select required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200">
                      <option value="" className="text-[#4B5563]">Select a subject</option>
                      <option>Admission Enquiry</option>
                      <option>Course Information</option>
                      <option>Fee Structure</option>
                      <option>Hostel Enquiry</option>
                      <option>Transport Routes</option>
                      <option>Placement Information</option>
                      <option>General Enquiry</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#9CA3AF] text-xs font-bold uppercase tracking-wider mb-2">Message *</label>
                    <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-[#D4AF37]/20 text-[#FAFAFA] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D4AF37] transition-colors duration-200 placeholder-[#4B5563] resize-none" placeholder="Write your message here..." />
                  </div>
                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] font-black rounded-xl hover:from-[#C5A059] hover:to-[#D4AF37] transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]">
                    <Send size={18} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="mt-16">
          <h2 className="text-2xl font-black text-[#FAFAFA] mb-6">Find Us on the Map</h2>
          <div className="bg-[#111111] border border-[#D4AF37]/10 rounded-2xl overflow-hidden h-80">
            <iframe
              src="https://maps.google.com/maps?q=11.3279434,77.4594711&z=15&output=embed"
              className="w-full h-full"
              loading="lazy"
              title="AJKKSAPT Location"
            />
          </div>
          <p className="text-[#6B7280] text-sm mt-3 text-center">Annai J.K.K. Sampoorani Ammal Polytechnic College, T.N Palayam, Gobichettipalayam, Erode District, Tamil Nadu</p>
        </motion.div>
      </div>
    </div>
  );
}
