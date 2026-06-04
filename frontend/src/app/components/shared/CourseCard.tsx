import { ReactNode } from "react";

interface CourseCardProps {
  title: string;
  description: string;
  icon: ReactNode;
  duration?: string;
  seats?: string;
}

export function CourseCard({
  title,
  description,
  icon,
  duration = "3 Years",
  seats = "60",
}: CourseCardProps) {
  return (
    <div className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Top gradient bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:h-2 transition-all" />

      <div className="p-8">
        {/* Icon */}
        <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>

        {/* Info Footer */}
        <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-200">
          <span className="text-gray-500">
            <span className="font-semibold">Duration:</span> {duration}
          </span>
          <span className="text-gray-500">
            <span className="font-semibold">Seats:</span> {seats}
          </span>
        </div>

        {/* Hover button */}
        <button className="mt-6 w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          Learn More
        </button>
      </div>
    </div>
  );
}
