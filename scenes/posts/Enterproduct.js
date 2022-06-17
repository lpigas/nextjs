import React from "react";
import Image from 'next/image'

export default function Enterproduct({ product, curs }) {
    const imageData = product.img.split(',')
  console.log(product)
  return (
    <div className=" flex flex-col p-2 border-2 bg-white m-2">
      <div className="flex justify-center bg-sky-400 p-4 m-8">
        {product.id}.{product.name_product}
      </div>
        <div className="flex justify-center bg-slate-500">Retail Prices - {product.price} {product.currency} / {Math.ceil(+product.price * curs)} UAH</div>
        {product.type === 'u'&&
        <div> <div className="flex justify-center bg-slate-500">Opt Prices - {product.wholesale_price} {product.currency} / {(+product.wholesale_price * curs).toFixed(2)} UAH</div></div>
        }
        <div className="flex justify-center items-center m-3">{product.body.length > 300 && product.body.slice(0,300)+'...'}</div>
        <div className="flex justify-center ">
        {imageData.map(item => 
            <div key={item} className="m-4 border-4 border-sky-500 p-0"><Image  src={item}
      alt={item}
      width={200}
      height={200}
        ></Image></div>
            )}
    </div>
    <div className="bg-red-500 w-1/4 flex-grow">Group in Site  -  {product.group_name}</div>
    </div>
  );
}
