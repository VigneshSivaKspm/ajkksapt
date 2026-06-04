import { ReactNode } from "react";

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link?: string;
}

export function InfoCard({ icon, title, description, link }: InfoCardProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer group">
      <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>
      <p className="text-gray-600 mb-4">{description}</p>
      {link && (
        <a
          href={link}
          className="inline-flex items-center text-purple-600 font-semibold hover:text-purple-700"
        >
          Learn more →
        </a>
      )}
    </div>
  );
}
