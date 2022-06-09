import React from "react";
import Link from "next/link";
import { NAV_MENU_BLOCK } from "../../constants/constantsNavMenu";

export default function Footer() {
  return (
    <div
      className="flex 
    flex-row 
    w-11/12 
    bg-blue-500 
    justify-evenly 
    mb-3 
    p-2 
    border-4 
    border-indigo-600"
    >
      {NAV_MENU_BLOCK.map((item) => (
        <div
          key={item.href + item.alt}
          className="w-full 
      m-3-auto 
      mx-0.5 
      flex 
      text-center 
      flex-col 
      border-2 
      border-indigo-600"
        >
          <Link className=" w-full m-auto" href={item.href}>
            {item.alt}
          </Link>
          {item.items &&
            item.items.map((link) => (
              <Link key={link.href + link.title} href={link.href}>
                {link.title}
              </Link>
            ))}
        </div>
      ))}
    </div>
  );
}
