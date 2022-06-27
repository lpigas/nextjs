import React from "react";

export default function Inputoder({
  placeholder,
  style,
  type,
  required = false,
  onChange,
  value,
}) {
  return (
    <div className={`mx-2 min-w-12 flex items-center ${style}`}>
      <input
        className="m-1 w-96"
        onChange={onChange}
        value={"" || value}
        required={required}
        type={type}
      ></input>
      <div>{placeholder}</div>
    </div>
  );
}
