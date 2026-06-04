import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Calendar, MapPin, Clock } from "lucide-react";
import { Button } from "../ui/button";

const events = [
  {
    date: { day: "15", month: "JUN" },
    title: "Campus Placement Drive - TCS",
    time: "09:00 AM - 05:00 PM",
    location: "Main Auditorium",
    category: "Placement",
    seats: "200 seats available",
  },
  {
    date: { day: "20", month: "JUN" },
    title: "Workshop: Advanced AI & Machine Learning",
    time: "10:00 AM - 04:00 PM",
    location: "AI Lab, Block C",
    category: "Workshop",
    seats: "50 seats available",
  },
  {
    date: { day: "25", month: "JUN" },
    title: "Annual Sports Day",
    time: "08:00 AM - 06:00 PM",
    location: "Sports Complex",
    category: "Sports",
    seats: "Open for all",
  },
  {
    date: { day: "30", month: "JUN" },
    title: "Annual Day Celebration",
    time: "05:00 PM - 09:00 PM",
    location: "Main Auditorium",
    category: "Cultural",
    seats: "500 seats available",
  },
];

export function UpcomingEvents() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-[#0A0A0A] to-[#121212]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#FAFAFA] mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Join us for exciting events, workshops, and activities throughout the year
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-6 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]">
                <div className="flex space-x-6">
                  {/* Date Badge */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 border border-[#D4AF37]/30 rounded-2xl flex flex-col items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <div className="text-3xl font-bold text-[#D4AF37]">
                        {event.date.day}
                      </div>
                      <div className="text-xs text-[#6B7280] font-semibold">
                        {event.date.month}
                      </div>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-xl font-semibold text-[#FAFAFA] group-hover:text-[#D4AF37] transition-colors duration-300">
                        {event.title}
                      </h3>
                      <span className="px-3 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold rounded-full whitespace-nowrap ml-4">
                        {event.category}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-[#6B7280] text-sm">
                        <Clock size={16} className="text-[#D4AF37]" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#6B7280] text-sm">
                        <MapPin size={16} className="text-[#D4AF37]" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-[#6B7280] text-sm">
                        <Calendar size={16} className="text-[#D4AF37]" />
                        <span>{event.seats}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] hover:from-[#C5A059] hover:to-[#D4AF37] font-semibold"
                    >
                      Register Now
                    </Button>
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
