interface CTAButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "white";
  size?: "sm" | "md" | "lg";
}

export function CTAButton({
  text,
  onClick,
  variant = "primary",
  size = "md",
}: CTAButtonProps) {
  const baseClass =
    "font-semibold rounded-lg transition-all duration-300 transform hover:scale-105";

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg",
    secondary: "bg-gray-800 text-white hover:bg-gray-900",
    white: "bg-white text-blue-600 hover:bg-gray-100",
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-12 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClass} ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      {text}
    </button>
  );
}
