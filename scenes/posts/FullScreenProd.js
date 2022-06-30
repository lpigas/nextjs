import React, { useState } from "react";
import Image from "next/image";
import PhotoBlock from "./components/PhotoBlock";

export default function FullScreenProd({ data }) {
  const newBody = data.body.replace(/[^а-яёА-ЯЁ ]/g, "");
  const imageData = data.img.split(",");
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
    <div className="w-150 flex h-full ">
      <PhotoBlock
        visible={photoFull}
        setVisible={setPhotoFull}
        plus={changePhotoPlus}
        minus={changePhotovMinus}
        imageData={imageData}
        photo={photo}
      />
      <div>
        <div className="flex justify-center">
          {imageData.map((item, index) => (
            <div
              className="flex w-full justify-center m-2"
              key={item + Math.random()}
              onClick={() => bigPhoto(index)}
            >
              <Image key={item} src={item} width={50} height={50}></Image>
            </div>
          ))}
        </div>
        <div className="text-xs">{newBody}</div>
      </div>
    </div>
  );
}
