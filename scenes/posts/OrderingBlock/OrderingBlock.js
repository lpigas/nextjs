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
  ChangePcs,
}) {
  return (
    <div className="">
      <MyModal visible={visible} setVisible={setVisible} zindex={899}>
        <ButtonClose onClick={() => setVisible(false)} />
        {productData &&
          productData.map((item) => (
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
                <div
                  onChange={(e) => ChangePcs(e.target.value, item)}
                  className="w-10 flex justify-center"
                >
                  {item.pcs || 1}
                </div>{" "}
                {item.measurement}
              </div>
            </div>
          ))}
        <div className="flex justify-end m-2 p-2">Total: {totalSum} </div>
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
            <label htmlFor="check1">
              <input
                type={"checkbox"}
                id="check1"
                checked={userData.checked}
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
