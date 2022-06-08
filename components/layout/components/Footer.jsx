import React from "react";

export default function Footer() {
  return (
    <div className="footers">
      <div className="footer__block">
        Home
        <div>home page</div>
        <div>home page</div>
        <div>home page</div>
      </div>
      <div className="footer__block">
        Blogs
        <div>home page</div>
        <div>home page</div>
        <div>home page</div>
      </div>
      <div className="footer__block">
        Menu
        <div>home page</div>
        <div>home page</div>
        <div>home page</div>
      </div>

      {/* <style jsx>
        {`
          .footer__block {
            display: flex-box;
            flex-direction: row;
            margin: 5px 10rem;
          }
          .footers {
            display: flex;
            flex-direction: row;
          }
        `}
      </style> */}
    </div>
  );
}
