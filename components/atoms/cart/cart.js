import React from "react";
import Image from "next/image";

export default function Cart({ dataCart, onClick }) {
  const cartLength = dataCart.reduce((first, second) => first + second.pcs, 0);
  return (
    <div className="p-2 w-24 h-18" onClick={onClick}>
      <Image src="/images/12.png" alt="Cart" width={50} height={50}></Image>
      {cartLength}
    </div>
  );
}
