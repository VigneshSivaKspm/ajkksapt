import { motion } from "motion/react";
import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Button } from "../components/ui/button";
import { Search, Printer, GraduationCap, Award } from "lucide-react";

// Mock student data
const mockStudentData = {
  registerNumber: "21ME001",
  studentName: "Rahul Kumar Sharma",
  department: "Mechanical Engineering",
  batch: "2021-2024",
  semester: "Semester 6",
  academicYear: "2023-24",
  results: [
    { code: "ME601", subject: "Design of Machine Elements", credits: 4, grade: "O", gradePoint: 10, earnedPoints: 40 },
    { code: "ME602", subject: "Heat Transfer", credits: 4, grade: "O", gradePoint: 10, earnedPoints: 40 },
    { code: "ME603", subject: "Dynamics of Machinery", credits: 4, grade: "A+", gradePoint: 9, earnedPoints: 36 },
    { code: "ME604", subject: "Manufacturing Technology", credits: 4, grade: "O", gradePoint: 10, earnedPoints: 40 },
    { code: "ME605", subject: "Industrial Management", credits: 3, grade: "A+", gradePoint: 9, earnedPoints: 27 },
    { code: "ME606", subject: "CAD/CAM Lab", credits: 2, grade: "O", gradePoint: 10, earnedPoints: 20 },
  ],
};

export function Results() {
  const [registerNumber, setRegisterNumber] = useState("");
  const [semester, setSemester] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResults(true);
  };

  const handlePrint = () => {
    window.print();
  };

  const totalCredits = mockStudentData.results.reduce((sum, result) => sum + result.credits, 0);
  const totalEarnedPoints = mockStudentData.results.reduce((sum, result) => sum + result.earnedPoints, 0);
  const sgpa = (totalEarnedPoints / totalCredits).toFixed(2);
  const cgpa = "8.85"; // Mock CGPA

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden print:hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] to-[#121212]" />
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="flex items-center space-x-4"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#D4AF37]/20 to-[#C5A059]/20 rounded-2xl flex items-center justify-center">
                <GraduationCap size={32} className="text-[#D4AF37]" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-2">
                  Student Results Portal
                </h1>
                <p className="text-lg text-[#6B7280]">
                  View Your Academic Performance and Grades
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {!showResults ? (
            // Search Form
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="bg-[#121212] border border-[#D4AF37]/10 rounded-2xl p-8 md:p-12"
            >
              <h2 className="text-2xl font-bold text-[#FAFAFA] mb-8 text-center">
                Enter Your Details to View Results
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="registerNumber" className="text-[#FAFAFA]">
                    Register Number *
                  </Label>
                  <Input
                    id="registerNumber"
                    required
                    placeholder="e.g., 21ME001"
                    className="mt-2 bg-[#1a1a1a] border-[#D4AF37]/20 text-[#FAFAFA] focus:border-[#D4AF37] h-12"
                    value={registerNumber}
                    onChange={(e) => setRegisterNumber(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="semester" className="text-[#FAFAFA]">
                      Semester *
                    </Label>
                    <Select required value={semester} onValueChange={setSemester}>
                      <SelectTrigger className="mt-2 bg-[#1a1a1a] border-[#D4AF37]/20 text-[#FAFAFA] h-12">
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#D4AF37]/30">
                        {[1, 2, 3, 4, 5, 6].map((sem) => (
                          <SelectItem key={sem} value={`sem${sem}`}>
                            Semester {sem}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="academicYear" className="text-[#FAFAFA]">
                      Academic Year *
                    </Label>
                    <Select required value={academicYear} onValueChange={setAcademicYear}>
                      <SelectTrigger className="mt-2 bg-[#1a1a1a] border-[#D4AF37]/20 text-[#FAFAFA] h-12">
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121212] border-[#D4AF37]/30">
                        <SelectItem value="2025-26">2025-26</SelectItem>
                        <SelectItem value="2024-25">2024-25</SelectItem>
                        <SelectItem value="2023-24">2023-24</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] hover:from-[#C5A059] hover:to-[#D4AF37] font-semibold py-6 h-auto"
                >
                  <Search size={20} className="mr-2" />
                  View Results
                </Button>
              </form>
            </motion.div>
          ) : (
            // Results Display
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Print Button */}
              <div className="mb-6 flex justify-end print:hidden">
                <Button
                  onClick={handlePrint}
                  className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] hover:from-[#C5A059] hover:to-[#D4AF37] font-semibold"
                >
                  <Printer size={18} className="mr-2" />
                  Print Marksheet
                </Button>
              </div>

              {/* Marksheet */}
              <div className="bg-white text-black rounded-2xl overflow-hidden print:shadow-none">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059] p-8 text-center">
                  <h1 className="text-3xl font-bold text-[#0A0A0A] mb-2">LEGENDARY ONE</h1>
                  <p className="text-[#0A0A0A] font-medium">
                    Polytechnic College, Gobichettipalayam
                  </p>
                  <p className="text-[#0A0A0A] text-sm mt-2">
                    Academic Transcript - {mockStudentData.academicYear}
                  </p>
                </div>

                {/* Student Information */}
                <div className="p-8 bg-gray-50 border-b-2 border-[#D4AF37]">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Register Number</p>
                      <p className="font-semibold text-lg">{mockStudentData.registerNumber}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Student Name</p>
                      <p className="font-semibold text-lg">{mockStudentData.studentName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Department</p>
                      <p className="font-semibold">{mockStudentData.department}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Batch</p>
                      <p className="font-semibold">{mockStudentData.batch}</p>
                    </div>
                  </div>
                </div>

                {/* Results Table */}
                <div className="p-8">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Award size={24} className="text-[#D4AF37] mr-2" />
                    {mockStudentData.semester} Results
                  </h3>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-4 py-3 text-left">Course Code</th>
                          <th className="border border-gray-300 px-4 py-3 text-left">Subject</th>
                          <th className="border border-gray-300 px-4 py-3 text-center">Credits</th>
                          <th className="border border-gray-300 px-4 py-3 text-center">Grade</th>
                          <th className="border border-gray-300 px-4 py-3 text-center">Grade Point</th>
                          <th className="border border-gray-300 px-4 py-3 text-center">Earned Points</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockStudentData.results.map((result, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3">{result.code}</td>
                            <td className="border border-gray-300 px-4 py-3">{result.subject}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center">{result.credits}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center font-semibold">
                              {result.grade}
                            </td>
                            <td className="border border-gray-300 px-4 py-3 text-center">{result.gradePoint}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center">{result.earnedPoints}</td>
                          </tr>
                        ))}
                        <tr className="bg-gray-100 font-semibold">
                          <td colSpan={2} className="border border-gray-300 px-4 py-3 text-right">
                            TOTAL
                          </td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{totalCredits}</td>
                          <td className="border border-gray-300 px-4 py-3"></td>
                          <td className="border border-gray-300 px-4 py-3"></td>
                          <td className="border border-gray-300 px-4 py-3 text-center">{totalEarnedPoints}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* SGPA & CGPA */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#C5A059]/10 border-2 border-[#D4AF37] rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Semester Grade Point Average</p>
                      <p className="text-4xl font-bold text-[#D4AF37]">{sgpa}</p>
                    </div>
                    <div className="bg-gradient-to-r from-[#D4AF37]/10 to-[#C5A059]/10 border-2 border-[#D4AF37] rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-600 mb-2">Cumulative Grade Point Average</p>
                      <p className="text-4xl font-bold text-[#D4AF37]">{cgpa}</p>
                    </div>
                  </div>

                  {/* Grade Legend */}
                  <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                    <h4 className="font-semibold mb-3">Grade Legend</h4>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
                      <div><span className="font-semibold">O:</span> Outstanding (10)</div>
                      <div><span className="font-semibold">A+:</span> Excellent (9)</div>
                      <div><span className="font-semibold">A:</span> Very Good (8)</div>
                      <div><span className="font-semibold">B+:</span> Good (7)</div>
                      <div><span className="font-semibold">B:</span> Above Average (6)</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-8 pt-6 border-t border-gray-300 text-sm text-gray-600">
                    <p className="mb-2">
                      <strong>Note:</strong> This is a computer-generated document and does not require a signature.
                    </p>
                    <p>Generated on: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              {/* Back Button */}
              <div className="mt-6 text-center print:hidden">
                <Button
                  onClick={() => setShowResults(false)}
                  variant="outline"
                  className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37]/10"
                >
                  Search Another Result
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
