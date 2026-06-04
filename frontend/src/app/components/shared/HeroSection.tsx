import { ReactNode } from "react";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  children?: ReactNode;
  gradient?: boolean;
}

export function HeroSection({
  title,
  subtitle,
  backgroundImage,
  children,
  gradient = true,
}: HeroSectionProps) {
  return (
    <div
      className="relative w-full h-[600px] flex items-center justify-center overflow-hidden"
      style={
        backgroundImage
          ? {
              backgroundImage: `url('${backgroundImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : {
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }
      }
    >
      {/* Overlay */}
      {gradient && <div className="absolute inset-0 bg-black/40" />}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6">
        <h1
          className="text-5xl md:text-7xl font-bold mb-4 animate-fadeIn"
          style={{
            animation: "fadeInDown 0.8s ease-out",
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="text-xl md:text-2xl text-gray-100"
            style={{
              animation: "fadeInUp 0.8s ease-out 0.2s both",
            }}
          >
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
