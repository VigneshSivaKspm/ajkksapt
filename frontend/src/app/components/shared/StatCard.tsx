import { ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  number: string;
  label: string;
  color?: string;
}

export function StatCard({
  icon,
  number,
  label,
  color = "blue",
}: StatCardProps) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    pink: "from-pink-500 to-pink-600",
    green: "from-green-500 to-green-600",
    orange: "from-orange-500 to-orange-600",
  };

  const bgGradient =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div
      className={`bg-gradient-to-br ${bgGradient} rounded-2xl p-8 text-white transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer`}
      style={{
        animation: "scaleIn 0.6s ease-out",
      }}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-4xl font-bold mb-2">{number}</h3>
      <p className="text-gray-100 text-lg">{label}</p>

      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
