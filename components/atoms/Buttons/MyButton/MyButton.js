import React from "react";




export const SIZES = {
  sm: "min-w-24 p-4",
  md: "min-w-48 p-8",
  lg: "min-w-24 p-12"
}

export const COLORS = {
  light: "bg-red-500",
  simple: "w-48 p-8",
  danger: "w-24 p-12"
}

export default function Button ({ size = 'sm', color = 'light', children, boxShadow, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${SIZES[size]} ${COLORS[color]}`}
    >
      {children}
    </button>
  )
}



