import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Software Engineer at TCS",
    batch: "Batch of 2025",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    content: "LEGENDARY ONE provided me with not just education, but a complete transformation. The faculty's dedication and industry-focused curriculum prepared me perfectly for my career.",
  },
  {
    name: "Priya Krishnan",
    role: "Design Engineer at Ashok Leyland",
    batch: "Batch of 2025",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    content: "The hands-on training in state-of-the-art labs and the mentorship I received helped me land my dream job. This institution truly lives up to its name.",
  },
  {
    name: "Arjun Patel",
    role: "Network Engineer at Infosys",
    batch: "Batch of 2024",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    content: "The placement support and industry connections at LEGENDARY ONE are exceptional. They don't just teach theory but prepare you for real-world challenges.",
  },
  {
    name: "Sneha Reddy",
    role: "Quality Analyst at Wipro",
    batch: "Batch of 2024",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    content: "What sets this institution apart is the perfect blend of academic excellence and personality development. I'm grateful for the foundation it provided.",
  },
];

export function Testimonials() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section ref={ref} className="py-24 bg-[#0A0A0A] relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-4">
            Success Stories
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Hear from our alumni who are making their mark in the industry
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-8 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)] h-full">
                {/* Quote Icon */}
                <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Quote size={24} className="text-[#D4AF37]" />
                </div>

                {/* Content */}
                <p className="text-[#FAFAFA] text-lg leading-relaxed mb-8">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-[#D4AF37]/30">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="text-[#FAFAFA] font-semibold text-lg">
                      {testimonial.name}
                    </div>
                    <div className="text-[#D4AF37] text-sm">
                      {testimonial.role}
                    </div>
                    <div className="text-[#6B7280] text-sm">
                      {testimonial.batch}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
