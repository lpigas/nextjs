import React, { useEffect, useState } from "react";
import Link from "next/link";
import { NAV_MENU_BLOCK } from "../../constants/constantsNavMenu";
import Postsocials from "../../../scenes/posts/Postsocial";
import axios from "axios";

export default function Footer() {

  return (
    <div
      className="flex 
    justify-center
    m-auto 
    flex-col
    mb-1
    w-full "
    >
      <div
        className="flex 
      w-11/12 
      bg-blue-500 
      justify-evenly 
      flex-row
      m-auto
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
      border-indigo-600
      "
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
      <div className="flex w-11/12   bg-blue-500 m-auto border-2 border-indigo-600">
        <Postsocials />
      </div>
    </div>
  );
}
