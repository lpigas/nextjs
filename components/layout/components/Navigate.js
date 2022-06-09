import React from "react";
import { NAV_MENU_BLOCK } from "../../constants/constantsNavMenu";

export default function Navigate() {
  return (
    <div className="w-full min-h-full flex justify-center mb-8">
      <div className="flex justify-center  w-full ">
        {NAV_MENU_BLOCK.map((item) => (
          <div
            key={item.backgroundImage + item.href}
            className="flex justify-center w-full"
          >
            <a
              className="flex 
          bg-image
          w-11/12 
          h-48
          justify-center 
          items-center
          font-bold 
          border-2
          text-3xl
          opacity-75
          text-lime-600/100 
          hover:opacity-100
          hover:text-black
          "
              href={item.href}
              alt={item.alt}
              style={{
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundSize: "cover",
              }}
            >
              {item.alt}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
