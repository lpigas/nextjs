import React from "react";

export default function Inputoder({
  placeholder,
  onFocus,
  type,
  required = false,
  onChange,
  value,
}) {
  return (
    <div className={`mx-2 min-w-12 flex items-center `}>
      <div className="flex  w-1/2 justify-center">
        <input
          onFocus={onFocus}
          className="m-1 w-96 border-2 border-black"
          onChange={onChange}
          value={"" || value}
          required={required}
          type={type}
        ></input>
      </div>
      <div className="flex justify-around w-1/2">{placeholder}</div>
    </div>
  );
}
