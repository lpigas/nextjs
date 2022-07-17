import React from "react";
import MyModal from "../../../components/atoms/modal/MyModal";
import Image from "next/image";
import ButtonClose from "../../../components/atoms/Buttons/ButtonClose/ButtonClose";

export default function PhotoBlock({
  visible,
  setVisible,
  plus,
  imageData,
  photo,
  minus,
}) {
  return (
    <div>
      {imageData && (
        <MyModal visible={visible} setVisible={setVisible} zindex={999}>
          <div>
            <ButtonClose onClick={() => setVisible(false)} />
          </div>
          <div className="w-full h-full flex justify-center p-4">
            <div className="flex items-center cursor-pointer" onClick={minus}>
              <Image
                src={"https://cdn-icons-png.flaticon.com/512/1/1627.png"}
                width={40}
                height={40}
              />
            </div>
            <div className="flex items-center w-full justify-center">
              {imageData[photo].includes("http") && (
                <Image src={imageData[photo]} width={500} height={500} />
              )}
            </div>
            <div
              className="flex items-center justify-end cursor-pointer"
              onClick={plus}
            >
              <Image
                src={"https://cdn-icons-png.flaticon.com/512/57/57116.png"}
                width={40}
                height={50}
              />
            </div>
          </div>
        </MyModal>
      )}
    </div>
  );
}
