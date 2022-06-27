import React, { useEffect, useState } from "react";
import ButtonClose from "../../../components/atoms/Buttons/ButtonClose/ButtonClose";
import MyModal from "../../../components/atoms/modal/MyModal";
import Inputoder from "./components/Inputoder";
import MyButton from "../../../components/atoms/Buttons/MyButton/MyButton";

export default function OrderingBlock({
  visible,
  setVisible,
  productData,
  userData,
  setUserData,
  totalSum,
  curs,
  euserinfo,
  agree,
  valid,
}) {
  const [product, setProduct] = useState(
    productData.length > 1
      ? productData.slice(0, productData.length - 1)
      : productData
  );

  useEffect(() => {
    setProduct(
      productData.length > 1
        ? productData.slice(0, productData.length - 1)
        : productData
    );
  }, [productData]);
  console.log(product)
  return (
    <div className="">
      <MyModal visible={visible} setVisible={setVisible} zindex={899}>
        <ButtonClose onClick={() => setVisible(false)} />
        {product && productData.length > 1 ? (
          product.map((item) => (
            <div
              className="flex m-1 mx-2 p-1 pt-0"
              key={
                item.id + item.name_product + item.product_id + Math.random()
              }
            >
              <div className="border-4 flex w-11/12 items-center ">
                {item.product_id}. {item.name_product}{" "}
              </div>
              <div className="border-4 flex w-5/12 items-center ">
                {item.price} {item.currency} X{" "}
                <input
                  disabled
                  className="w-10"
                  value={productData[productData.length - 1][item.product_id]}
                ></input>{" "}
                {item.measurement}
              </div>
            </div>
          ))
        ) : (
          <div className="flex m-1 mx-2 p-1 pt-0">
            <div className="border-4 flex w-11/12 items-center ">
              {product.product_id}. {product.name_product}{" "}
            </div>
            <div className="border-4 flex w-5/12 items-center ">
              {product.price} {product.currency} X{" "}
              <input disabled className="w-10" value="1"></input>{" "}
              {product.measurement}
            </div>
          </div>
        )}
        <div className="flex justify-end m-2 p-2">
          Total:{" "}
          {productData.length > 1
            ? `${totalSum.toFixed(2)} ${product[0].currency} / ${
                (totalSum * curs).toFixed(2) 
              } UAH`
            : `${productData.price} ${product.currency} / ${
                (+productData.price * curs).toFixed(2) 
              } UAH`}
        </div>
        <form>
          <Inputoder
            placeholder="Enter your name*"
            style={"justify-between"}
            type={"text"}
            required={true}
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          />
          <Inputoder
            placeholder="Enter your surname*"
            style={"justify-between"}
            type={"text"}
            required={true}
            value={userData.surname}
            onChange={(e) =>
              setUserData({ ...userData, surname: e.target.value })
            }
          />
          <Inputoder
            placeholder="Enter your Phone number*"
            style={"justify-between"}
            type={"tel"}
            required={true}
            value={userData.phone}
            onChange={(e) =>
              setUserData({ ...userData, phone: e.target.value })
            }
          />
          <Inputoder
            placeholder="Enter your Adress*"
            style={"justify-between"}
            type={"text"}
            required={true}
            value={userData.adress}
            onChange={(e) =>
              setUserData({ ...userData, adress: e.target.value })
            }
          />
          <Inputoder
            placeholder="Enter your Email*"
            style={"justify-between"}
            type={"email"}
            required={true}
            value={userData.mail}
            onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
          />
          <div className="flex m-2 justify-end items-center">
          <label for="check1">
            <input
              type={"checkbox"}
              required={true}
              id="check1"
              checked={userData.checked || false}
              onChange={(e) =>
                setUserData({ ...userData, checked: e.target.checked })
              }
            />
            Agree send data
            </label>
          </div>
          <div className="m-1"></div>
        </form>
              <div className="m-2">
              <MyButton
          size="lg"
          color="danger"
          onClick={valid ? agree : euserinfo}
          value={1}
        >
          Agree
        </MyButton>
              </div>

      </MyModal>
    </div>
  );
}
