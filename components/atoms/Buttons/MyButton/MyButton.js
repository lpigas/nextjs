import React from "react";

export const SIZES = {
  sm: "min-w-15 p-2",
  md: "min-w-48 p-2",
  lg: "min-w-96 p-2",
};

export const COLORS = {
  light: "bg-red-500 text-2xl text-zinc-50  hover:bg-red-700 active:bg-red-500",
  simple:
    "bg-green-500 text-2xl text-zinc-900 hover:bg-green-700  active:bg-green-500",
  danger:
    "bg-sky-500 text-xxl text-zinc-900 hover:bg-sky-700 active:bg-sky-500",
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
