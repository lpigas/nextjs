import React, { Children, useEffect, useState } from "react";

export default function MyModal({ children, visible, setVisible, zindex=100 }) {
  const changeClasses = ["MyModal"];

  if (visible) {
    changeClasses.push("active");
  }

  return (
    <div className={changeClasses.join(" ")} style={{zIndex:zindex}} onClick={() => setVisible(false)}>
      <div className="MyModalContent"  onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
