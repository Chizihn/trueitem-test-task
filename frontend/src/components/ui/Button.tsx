import type { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: Props) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-orange-600 hover:bg-orange-500 text-white",

    secondary:
      "border border-neutral-700 hover:border-neutral-500 text-white bg-transparent",

    ghost: "text-neutral-400 hover:text-white bg-transparent",

    danger: "text-neutral-500 hover:text-red-400 bg-transparent",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3",
    icon: "w-9 h-9 p-0",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
