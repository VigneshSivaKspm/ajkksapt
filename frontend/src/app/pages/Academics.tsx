import { useState } from "react";
import { motion } from "motion/react";
import { Download, BookOpen, Users, Clock } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";

const departments = [
  {
    id: "mechanical",
    name: "Mechanical Engineering",
    overview: "Mechanical Engineering is one of the oldest and broadest engineering disciplines. Our program focuses on the design, analysis, manufacturing, and maintenance of mechanical systems.",
    duration: "3 Years",
    seats: "60",
    eligibility: "10th Standard with minimum 50% marks",
    faculty: [
      { name: "Dr. Rajesh Kumar", designation: "Head of Department", experience: "15 years", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
      { name: "Prof. Anand Singh", designation: "Senior Lecturer", experience: "12 years", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop" },
      { name: "Ms. Priya Sharma", designation: "Lecturer", experience: "8 years", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "civil",
    name: "Civil Engineering",
    overview: "Civil Engineering deals with the design, construction, and maintenance of the physical and naturally built environment, including works like roads, bridges, dams, and buildings.",
    duration: "3 Years",
    seats: "60",
    eligibility: "10th Standard with minimum 50% marks",
    faculty: [
      { name: "Dr. Suresh Menon", designation: "Head of Department", experience: "18 years", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" },
      { name: "Prof. Lakshmi Iyer", designation: "Senior Lecturer", experience: "14 years", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop" },
      { name: "Mr. Arun Kumar", designation: "Lecturer", experience: "9 years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "eee",
    name: "Electrical & Electronics Engineering",
    overview: "EEE program covers the generation, transmission, distribution, and utilization of electrical energy, along with the design of electronic circuits and systems.",
    duration: "3 Years",
    seats: "60",
    eligibility: "10th Standard with minimum 50% marks",
    faculty: [
      { name: "Dr. Meera Reddy", designation: "Head of Department", experience: "16 years", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop" },
      { name: "Prof. Vijay Krishna", designation: "Senior Lecturer", experience: "13 years", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "ece",
    name: "Electronics & Communication Engineering",
    overview: "ECE focuses on the design and development of electronic devices, circuits, and communication systems, preparing students for careers in telecommunications and electronics industries.",
    duration: "3 Years",
    seats: "60",
    eligibility: "10th Standard with minimum 50% marks",
    faculty: [
      { name: "Dr. Ramesh Patel", designation: "Head of Department", experience: "17 years", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop" },
      { name: "Ms. Sneha Reddy", designation: "Senior Lecturer", experience: "11 years", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "cse",
    name: "Computer Engineering",
    overview: "Computer Engineering combines electrical engineering and computer science to develop computer hardware and software, preparing students for the ever-evolving tech industry.",
    duration: "3 Years",
    seats: "120",
    eligibility: "10th Standard with minimum 50% marks",
    faculty: [
      { name: "Dr. Arjun Patel", designation: "Head of Department", experience: "14 years", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop" },
      { name: "Prof. Kavita Nair", designation: "Senior Lecturer", experience: "10 years", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "aiml",
    name: "Artificial Intelligence & Machine Learning",
    overview: "Our AI & ML program equips students with cutting-edge skills in artificial intelligence, machine learning, deep learning, and data science for the future of technology.",
    duration: "3 Years",
    seats: "60",
    eligibility: "10th Standard with minimum 50% marks in Mathematics",
    faculty: [
      { name: "Dr. Priya Krishnan", designation: "Head of Department", experience: "12 years", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop" },
      { name: "Mr. Rahul Sharma", designation: "Senior Lecturer", experience: "9 years", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
    ],
  },
  {
    id: "fashion",
    name: "Fashion Designing",
    overview: "Fashion Designing program nurtures creativity and technical skills in garment design, textile technology, fashion illustration, and merchandising.",
    duration: "3 Years",
    seats: "30",
    eligibility: "10th Standard with minimum 50% marks",
    faculty: [
      { name: "Ms. Neha Kapoor", designation: "Head of Department", experience: "13 years", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
      { name: "Ms. Anita Desai", designation: "Senior Lecturer", experience: "10 years", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=200&h=200&fit=crop" },
    ],
  },
];

export function Academics() {
  const [selectedDepartment, setSelectedDepartment] = useState(departments[0]);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&h=600&fit=crop"
            alt="Academics"
            className="w-full h-full object-cover"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/95 via-[#0A0A0A]/80 to-[#0A0A0A]/40" />
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#FAFAFA] mb-4">
                Academic Programs
              </h1>
              <p className="text-xl text-[#6B7280] max-w-2xl">
                Industry-Focused Curriculum for Future-Ready Professionals
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Selector & Content */}
      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Department Selector */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <label className="block text-[#FAFAFA] mb-4 text-lg font-semibold">
              Select Department
            </label>
            <Select
              value={selectedDepartment.id}
              onValueChange={(value) => {
                const dept = departments.find((d) => d.id === value);
                if (dept) setSelectedDepartment(dept);
              }}
            >
              <SelectTrigger className="w-full md:w-96 bg-[#121212] border-[#D4AF37]/30 text-[#FAFAFA] h-14">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#121212] border-[#D4AF37]/30">
                {departments.map((dept) => (
                  <SelectItem key={dept.id} value={dept.id} className="text-[#FAFAFA]">
                    {dept.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </motion.div>

          {/* Department Overview */}
          <motion.div
            key={selectedDepartment.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-[#FAFAFA] mb-4">
                {selectedDepartment.name}
              </h2>
              <p className="text-[#6B7280] text-lg leading-relaxed mb-8">
                {selectedDepartment.overview}
              </p>

              {/* Quick Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-xl flex items-center justify-center">
                    <Clock size={24} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-[#6B7280] text-sm">Duration</div>
                    <div className="text-[#FAFAFA] font-semibold">
                      {selectedDepartment.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-xl flex items-center justify-center">
                    <Users size={24} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-[#6B7280] text-sm">Seats Available</div>
                    <div className="text-[#FAFAFA] font-semibold">
                      {selectedDepartment.seats}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-xl flex items-center justify-center">
                    <BookOpen size={24} className="text-[#D4AF37]" />
                  </div>
                  <div>
                    <div className="text-[#6B7280] text-sm">Eligibility</div>
                    <div className="text-[#FAFAFA] font-semibold text-sm">
                      10th Standard
                    </div>
                  </div>
                </div>
              </div>

              <Button className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] hover:from-[#C5A059] hover:to-[#D4AF37] font-semibold">
                <Download size={18} className="mr-2" />
                Download Syllabus
              </Button>
            </div>
          </motion.div>

          {/* Faculty Section */}
          <motion.div
            key={`${selectedDepartment.id}-faculty`}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold text-[#FAFAFA] mb-8">Faculty Members</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedDepartment.faculty.map((member, index) => (
                <div
                  key={index}
                  className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-6 hover:border-[#D4AF37]/30 transition-all duration-500"
                >
                  <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden ring-2 ring-[#D4AF37]/30">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="text-lg font-semibold text-[#FAFAFA] text-center mb-1">
                    {member.name}
                  </h4>
                  <p className="text-[#D4AF37] text-sm text-center mb-2">
                    {member.designation}
                  </p>
                  <p className="text-[#6B7280] text-sm text-center">
                    {member.experience} Experience
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
