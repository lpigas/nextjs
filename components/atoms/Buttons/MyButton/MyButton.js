import React from "react";

export const SIZES = {
  sm: "min-w-15 h-12 p-2",
  md: "min-w-48 h-15 p-0",
  lg: "min-w-96 h-12 p-2",
};

export const COLORS = {
  light: "bg-teal-500 text-lg text-zinc-50  hover:bg-red-700 active:bg-red-500",
  simple:
    "bg-lime-500 text-lg text-zinc-900 hover:bg-green-700  active:bg-green-500",
  danger:
    "bg-blue-500 text-lg text-gray-900 hover:bg-yellow-300 active:bg-sky-500",
  gold: "bg-amber-500 text-lg text-gray-50 hover:bg-amber-700 active:bg-amber-500",
};

export default function Button({
  size = "sm",
  color = "simple",
  children,
  boxShadow = "shadow-xl",
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`${SIZES[size]} ${COLORS[color]} ${boxShadow} border-2 rounded-xl`}
    >
      {children}
    </button>
  );
}
