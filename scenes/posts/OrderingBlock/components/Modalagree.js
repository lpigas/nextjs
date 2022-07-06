import React from "react";

export default function Modalagree({ children, visible, width, zindex = 100 }) {
  const changeClasses = ["MyModal"];

  if (visible) {
    changeClasses.push("active");
  }

  return (
    <div className={changeClasses.join(" ")} style={{ zIndex: zindex }}>
      <div style={{ width: width }} className="MyModalContent">
        {children}
      </div>
    </div>
  );
}
