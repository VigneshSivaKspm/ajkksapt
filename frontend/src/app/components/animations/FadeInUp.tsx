import { ReactNode } from "react";

interface FadeInUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
}

export function FadeInUp({
  children,
  delay = 0,
  duration = 0.6,
}: FadeInUpProps) {
  return (
    <div
      style={{
        animation: `fadeInUp ${duration}s ease-out ${delay}s both`,
      }}
    >
      {children}
      <style>{`
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
