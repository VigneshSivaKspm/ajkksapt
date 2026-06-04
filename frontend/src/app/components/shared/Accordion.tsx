import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface AccordionItemProps {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItemProps[];
}

export function Accordion({ items }: AccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden"
        >
          <button
            onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
            className="w-full px-6 py-4 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <span className="font-semibold text-gray-900">{item.title}</span>
            <ChevronDown
              size={20}
              className={`text-purple-600 transition-transform ${
                activeIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          {activeIndex === index && (
            <div className="px-6 py-4 bg-white text-gray-700 animate-fadeIn">
              {item.content}
            </div>
          )}
        </div>
      ))}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
