import { ReactNode } from "react";

interface FeatureBoxProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
}

export function FeatureBox({
  icon,
  title,
  description,
  color = "blue",
}: FeatureBoxProps) {
  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    pink: "bg-pink-100 text-pink-600",
    green: "bg-green-100 text-green-600",
  };

  const bgClass =
    colorClasses[color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div className="text-center p-8 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105">
      <div
        className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${bgClass} mb-4`}
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
