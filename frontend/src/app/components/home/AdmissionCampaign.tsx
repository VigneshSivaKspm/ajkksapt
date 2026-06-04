import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Download, FileText, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";

export function AdmissionCampaign() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const campaigns = [
    {
      icon: Download,
      title: "Download Brochure",
      description: "Get complete information about our programs, facilities, and admission process",
      buttonText: "Download PDF",
      buttonLink: "/admissions",
      gradient: "from-[#D4AF37]/20 to-[#C5A059]/20",
    },
    {
      icon: FileText,
      title: "Apply Online",
      description: "Start your journey with us. Fill out the online application form now",
      buttonText: "Apply Now",
      buttonLink: "/admissions",
      gradient: "from-[#C5A059]/20 to-[#D4AF37]/20",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Have questions? Chat with our admission counselors instantly",
      buttonText: "Chat Now",
      buttonLink: "https://wa.me/917339596165",
      gradient: "from-[#D4AF37]/20 to-[#C5A059]/20",
    },
  ];

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-6">
            <span className="text-[#D4AF37] text-sm font-medium tracking-wide">
              ADMISSIONS 2026-27
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-4">
            Begin Your Success Story
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Take the first step towards a promising career with India's premier polytechnic institution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {campaigns.map((campaign, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-8 h-full flex flex-col transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] hover:translate-y-[-8px]">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${campaign.gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}>
                  <campaign.icon size={32} className="text-[#D4AF37]" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold text-[#FAFAFA] mb-3">
                  {campaign.title}
                </h3>
                <p className="text-[#6B7280] mb-6 flex-1">
                  {campaign.description}
                </p>

                {/* Button */}
                {campaign.buttonLink.startsWith("http") ? (
                  <a href={campaign.buttonLink} target="_blank" rel="noopener noreferrer">
                    <Button
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] hover:from-[#C5A059] hover:to-[#D4AF37] font-semibold group/btn"
                    >
                      {campaign.buttonText}
                      <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </a>
                ) : (
                  <Link to={campaign.buttonLink}>
                    <Button
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] hover:from-[#C5A059] hover:to-[#D4AF37] font-semibold group/btn"
                    >
                      {campaign.buttonText}
                      <ArrowRight size={18} className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* WhatsApp Floating Button */}
        <motion.a
          href="https://wa.me/917339596165"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-8 right-8 z-40 w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 group"
        >
          <MessageCircle size={28} className="text-white" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </motion.a>
      </div>
    </section>
  );
}
