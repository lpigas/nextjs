import Link from "next/link";
import React from "react";

export default function Navigate() {
  return (
    <div className="nav">
      <div className="navig">
        <button className="navButton">
          <Link href="/blogs">
            <a className="nav__link">Blogs</a>
          </Link>
        </button>
        <button className="navButton">
          <Link href="/">
            <a className="nav__link">Home</a>
          </Link>
        </button>
      </div>
      {/* <style jsx>
        {`
          .nav {
            margin: 5px;
            width: 100%;
            height: 70px;
            display: flex;
            border: 2px solid black;
            border-radius: 15px;
          }
          .navig{
            width: 100%;
            display: flex;
            justify-content: space-evenly;
          }
          .navButton {
            padding: 0;
            min-width: 150px;
          }
          .nav__link {
            display: flex;
            width: 100%;
            font-size: 20px;
            height: 100%;
            justify-content: center;
            align-items: center;
            text-decoration: none;
            color: black;
          }
        `}
      </style> */}
    </div>
  );
}
