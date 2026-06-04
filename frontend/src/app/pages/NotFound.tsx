import { motion } from "motion/react";
import { Link } from "react-router";
import { Home } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A0A0A] px-6">
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-2xl"
      >
        {/* 404 Text */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-[#D4AF37] to-[#C5A059] bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-[#FAFAFA] mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-[#6B7280] mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Back to Home Button */}
        <Link to="/">
          <Button
            size="lg"
            className="bg-gradient-to-r from-[#D4AF37] to-[#C5A059] text-[#0A0A0A] hover:from-[#C5A059] hover:to-[#D4AF37] font-semibold px-8 py-6 h-auto"
          >
            <Home size={20} className="mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
