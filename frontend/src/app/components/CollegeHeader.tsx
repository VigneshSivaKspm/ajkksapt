import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface CollegeHeaderProps {
  isMobileMenuOpen?: boolean;
  onToggleMobileMenu?: () => void;
}

export function CollegeHeader({
  isMobileMenuOpen,
  onToggleMobileMenu,
}: CollegeHeaderProps) {
  return (
    <>
      <div className="bg-gradient-to-r from-[#FAFAFA] via-[#F8F6F0] to-[#F5F5F5] border-b border-[#D4AF37]/20 py-2 sm:py-3 px-4 sm:px-6 lg:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto">
          {/* Main Header with Logo Top-Left and Hamburger Bottom-Left */}
          <div className="flex gap-3 sm:gap-4">
            {/* Left Side - Logo Top, Hamburger Bottom */}
            <div className="flex flex-col items-center justify-between py-1">
              {/* Logo */}
              <Link to="/" className="flex-shrink-0">
                <div className="w-12 sm:w-14 h-12 sm:h-14 bg-white rounded-lg overflow-hidden border border-[#D4AF37]/40 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                  <img
                    src="https://ajkksapt.com/images/Home_Page/Logo.PNG"
                    alt="AJKKSAPT Logo"
                    className="w-full h-full object-contain p-0.5"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                </div>
              </Link>

              {/* Mobile Menu Button - Bottom */}
              <button
                onClick={onToggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-[#0052CC] hover:bg-[#E60B7B]/10 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Center - College Info */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                {/* Main Title */}
                <h1 className="text-sm sm:text-base md:text-lg font-black text-[#E60B7B] tracking-wide leading-tight">
                  ANNAI J.K.K. SAMPOORANIAMMAL POLYTECHNIC COLLEGE
                </h1>

                {/* Location */}
                <p className="text-xs text-[#0052CC] font-semibold mt-0.5 leading-tight">
                  T.N.Palayam - 638 506. Gobi(Taluk), Erode(District), Tamilnadu
                </p>

                {/* Approvals */}
                <div className="space-y-0.5 mt-1">
                  <p className="text-[9px] sm:text-[10px] text-[#0052CC] font-medium leading-tight">
                    ( Approved by AICTE, Govt of India, New Delhi & Affiliated
                    to DOTE, Govt of Tamilnadu, Chennai )
                  </p>
                  <p className="text-[8px] sm:text-[9px] text-[#0052CC] font-medium leading-tight">
                    ( AICTE Approval
                    No.FNo.Southern/1-3512947234/2018/EOA.Govt.of
                    Tamilnadu.GO.Ms.NO.1804/Dated 17/11/1984 )
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
