import React from "react";
import { NAV_MENU_BLOCK } from "../../constants/constantsNavMenu";
import { useRouter } from "next/router";

export default function Navigate() {
  const router = useRouter().route;
  return (
    <div className="w-full min-h-full flex justify-center mb-8">
      <div className="flex justify-center  w-full ">
        {NAV_MENU_BLOCK.map((item) => (
          <div
            key={item.backgroundImage + item.href}
            className="flex justify-center w-full"
          >
            <a
              className={`flex 
              w-11/12 
              h-48
              justify-center 
              items-center
              font-bold 
              border-2
              text-3xl
              text-lime-600/100 
              hover:opacity-100
              hover:text-black
              hover:no-underline
              ${
                router === "/" && item.href === "/"
                  ? "opacity-100 text-black"
                  : router.includes(item.href) && item.href !== "/"
                  ? "opacity-100 text-black"
                  : "opacity-75"
              }
              `}
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
