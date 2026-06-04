import { ReactNode } from "react";

interface SectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  backgroundColor?: string;
  centered?: boolean;
}

export function Section({
  title,
  subtitle,
  children,
  backgroundColor = "bg-white",
  centered = false,
}: SectionProps) {
  return (
    <section className={`py-20 ${backgroundColor}`}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={centered ? "text-center" : ""}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-600 mb-12 max-w-2xl">{subtitle}</p>
          )}
          {/* Decorative line */}
          <div
            className="h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-600 mb-12"
            style={centered ? { margin: "0 auto 48px" } : {}}
          />
        </div>

        {/* Content */}
        {children}
      </div>
    </section>
  );
}
