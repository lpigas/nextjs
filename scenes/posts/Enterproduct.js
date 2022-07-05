import React, { useEffect, useState } from "react";
import Image from "next/image";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import PhotoBlock from "./components/PhotoBlock";

export default function Enterproduct({
  product,
  curs,
  openprod,
  buyNow,
  addToBasket,
}) {
  const imageData = product.img.split(",");
  const [photoFull, setPhotoFull] = useState(false);
  const [photo, setPhoto] = useState(0);

  const bigPhoto = (e) => {
    setPhotoFull(true);
    setPhoto(e);
  };
  const changePhotoPlus = () => {
    if (photo < imageData.length - 1) {
      setPhoto(photo + 1);
    } else {
      setPhoto(0);
    }
  };
  const changePhotovMinus = () => {
    if (photo > 0) {
      setPhoto(photo - 1);
    } else {
      setPhoto(imageData.length - 1);
    }
  };

  return (
    <div
      aria-disabled={product.availability === "-"}
      className=" flex flex-col p-2 border-2 bg-white m-2 w-full"
    >
      <PhotoBlock
        visible={photoFull}
        setVisible={setPhotoFull}
        plus={changePhotoPlus}
        minus={changePhotovMinus}
        imageData={imageData}
        photo={photo}
      />
      {}
      <div
        onClick={() => openprod(product)}
        className={`flex justify-center  ${
          product.availability === "-" ? "bg-slate-700" : "bg-sky-400"
        } p-4 m-2`}
      >
        {product.id}.{product.name_product}
      </div>
      <div className="flex justify-center bg-slate-500  p-2 m-1 mx-2">
        Retail Prices - {product.price} {product.currency} /{" "}
        {Math.ceil(+product.price * curs)} UAH
      </div>
      {product.type === "u" && (
        <div>
          {" "}
          <div className="flex justify-center items-center bg-slate-500  p-2 mx-2">
            Opt Prices - {product.wholesale_price} {product.currency} /{" "}
            {(+product.wholesale_price * curs).toFixed(2)} UAH
          </div>
        </div>
      )}
      {/* <div className="flex justify-center items-center m-3">{product.body.length > 300 && product.body.slice(0,300)+'...'}</div> */}
      <div className="flex justify-center ">
        {imageData.map((item, index) => (
          <div
            onClick={() => bigPhoto(index)}
            key={item}
            className="m-4 border-4 items-center border-sky-500 p-0"
          >
            <Image src={item} alt={item} width={100} height={100}></Image>
          </div>
        ))}
      </div>
      {product.producing_country !== null && (
        <div className={` w-2/4`}>
          Producing Country - {product.producing_country}
        </div>
      )}
      <div className={`w-2/4 `}>Group in Site - {product.group_name}</div>
      <div className="flex justify-center">
        <MyButton
          size="lg"
          color={`${product.availability === "-" ? "notactive" : "danger"}`}
          // onClick={() => setCart([...cart, product])}
          onClick={() => addToBasket(product)}
          disabled={product.availability === "-"}
        >
          Add to Cart
        </MyButton>
        <MyButton
          size="lg"
          color={`${product.availability === "-" ? "notactive" : "danger"}`}
          onClick={buyNow}
          disabled={product.availability === "-"}
        >
          Buy Now
        </MyButton>
      </div>
    </div>
  );
}
