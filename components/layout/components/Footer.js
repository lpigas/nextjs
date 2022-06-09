import React from "react";
import Link from "next/link";
const footerStyle = 'w-full m-3-auto mx-0.5 flex text-center flex-col border-2 border-indigo-600'
export default function Footer() {
  
  return (
    <div className="flex 
    flex-row 
    w-11/12 
    bg-blue-500 
    justify-evenly 
    mb-3 
    p-2 
    border-4 
    border-indigo-600">
      <div className={footerStyle}>
        <Link className=" w-full m-auto" href='/'>Home</Link>
        <div>home page</div>
        <div>home page</div>
        <div>home page</div>

      </div>
      <div className={footerStyle}>
        <Link href='/menu'>Menu</Link>
        <div>home page</div>
        <div>home page</div>
        <div>home page</div>
      </div>
      <div className={footerStyle}>
          <Link href='/posts'>Posts</Link>
        <div>home page</div>
        <div>home page</div>
        <div>home page</div>
      </div>
      <div className={footerStyle}>
        <Link href='/blogs'>Blogs</Link>
        <div>home page</div>
        <div>home page</div>
        <div>home page</div>
      </div>
    </div>
  );
}
