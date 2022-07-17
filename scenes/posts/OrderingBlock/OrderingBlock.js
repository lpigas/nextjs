import React, { useEffect, useState } from "react";
import Inputoder from "./components/Inputoder";
import MyButton from "../../../components/atoms/Buttons/MyButton/MyButton";

export default function OrderingBlock({
  productData,
  userData,
  setUserData,
  totalSum,
  euserinfo,
  agree,
  valid,
  ChangePcs,
  focus,
  setFocus,
  backProductPage,
  delProduct,
}) {
  return (
    <div className="flex flex-col border-2 w-full border-black overflow-x-auto relative p-2">
      {productData &&
        productData.map((item) => (
          <div className="flex m-1 mx-2 p-1 pt-0 border-collapse" key={Math.random()}>
            <div className="border-4 flex w-11/12 items-center ">
              {item.product_id}. {item.name_product}{" "}
            </div>
            <div className="border-4 flex w-5/12 items-center ">
              {(+item.price).toFixed(3)} {item.currency} X{" "}
              <div className="w-24 flex justify-end">
                <input
                  type={"number"}
                  min="1"
                  max="99999"
                  onChange={(e) => ChangePcs(e.target.value, item)}
                  autoFocus={
                    focus ? item.product_id === focus.product_id : false
                  }
                  className="flex border-2 border-black items-center text-center"
                  value={item.pcs}
                ></input>{" "}
              </div>
              <div className="mx-2">{item.measurement} </div>
              <div className="text-red-500 flex w-20 justify-end">
                <div
                  onClick={() => delProduct(item)}
                  className="border-2 border-black"
                >
                  {" "}
                  X
                </div>
              </div>
            </div>
          </div>
        ))}
      <div className="flex justify-end m-2 p-2">
        Total: {totalSum.toFixed(2)}{" "}
      </div>
      <form className="p-2">
        <Inputoder
          placeholder="Enter your name*"
          type={"text"}
          required={true}
          value={userData.name}
          onFocus={() => setFocus()}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
        />
        <Inputoder
          placeholder="Enter your surname*"
          type={"text"}
          required={true}
          value={userData.surname}
          onFocus={() => setFocus()}
          onChange={(e) =>
            setUserData({ ...userData, surname: e.target.value })
          }
        />
        <Inputoder
          placeholder="Enter your Phone number*"
          type={"tel"}
          required={true}
          value={userData.phone}
          onFocus={() => setFocus()}
          onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
        />
        <Inputoder
          placeholder="Enter your Adress*"
          type={"text"}
          required={true}
          value={userData.adress}
          onFocus={() => setFocus()}
          onChange={(e) => setUserData({ ...userData, adress: e.target.value })}
        />
        <Inputoder
          placeholder="Enter your Email*"
          type={"email"}
          required={true}
          value={userData.mail}
          onFocus={() => setFocus()}
          onChange={(e) => setUserData({ ...userData, mail: e.target.value })}
        />
        <div className="flex m-2 justify-end items-center">
          <label htmlFor="check1">
            <input
              type={"checkbox"}
              id="check1"
              checked={userData.checked}
              onFocus={() => setFocus()}
              onChange={(e) =>
                setUserData({ ...userData, checked: e.target.checked })
              }
            />
            Agree send data
          </label>
        </div>
        <div className="m-1"></div>
      </form>
      <div className="m-2 justify-end flex">
        <MyButton size="lg" color="danger" onClick={valid ? agree : euserinfo}>
          Agree
        </MyButton>
        <MyButton size="lg" color="danger" onClick={backProductPage}>
          Return
        </MyButton>
      </div>
    </div>
  );
}
