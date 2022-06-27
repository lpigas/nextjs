import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import productdata from "../../constants/data/productdata.json";
import Enterproduct from "../../scenes/posts/Enterproduct";
import Cart from "../../components/atoms/cart/cart";
import MyModal from "../../components/atoms/modal/MyModal";
import FullScreenProd from "../../scenes/posts/FullScreenProd";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import ButtonClose from "../../components/atoms/Buttons/ButtonClose/ButtonClose";
import OrderingBlock from "../../scenes/posts/OrderingBlock/OrderingBlock";
import {
  numberValid,
  mailValid,
} from "../../components/functions/numbersvalid";
import Image from "next/image";
import Modalagree from "../../scenes/posts/OrderingBlock/components/Modalagree";

export default function FirstPost() {
  const curs = 36;
  const [openProductInfo, setOpenProductInfo] = useState(false);
  const [cart, setCart] = useState([]);
  const [modalCart, setModalCart] = useState(false);
  const [newArrayCart, setNewArrayCart] = useState(cart.filter(onlyUnique));
  const [totalSum, setTotalSum] = useState(0);
  const [fullScreenData, setFullScreenData] = useState();
  const [orderingModal, setOrderingModal] = useState(false);
  const [orderingData, setOrderingData] = useState();
  const [buyerData, setBuyerData] = useState({
    name: "",
    surname: "",
    phone: "",
    adress: "",
    mail: "",
    checked: "",
  });
  const validName = buyerData.name.length >= 2;
  const validSurname = buyerData.surname.length >= 2;
  const validPhone = buyerData.phone.length > 5 + numberValid(buyerData.phone);
  const validMail = mailValid(buyerData.mail);
  const validAdress = buyerData.adress.length > 10;
  const valid =
    validAdress &&
    validMail &&
    validPhone &&
    validName &&
    validSurname &&
    buyerData.checked;
  const [modalAgree, setModalAgree] = useState(false);
  const [modalEuserinfo, setModalEuserinfo] = useState(false);

  const pcsNum = cart.reduce((acc, el) => {
    acc[el.product_id] = (acc[el.product_id] || 0) + 1;
    return acc;
  }, {});

  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  useEffect(() => {
    setNewArrayCart(cart.filter(onlyUnique));
  }, [cart]);
  useEffect(() => {
    const sum = newArrayCart.reduce(
      (first, second) => first + +second.price * +pcsNum[second.product_id],
      0
    );
    setTotalSum(sum);
  }, [pcsNum]);
  const openprod = (e) => {
    setFullScreenData(e);
    setOpenProductInfo(true);
  };

  const buyNow = (e) => {
    setOrderingData(e);
    setOrderingModal(true);
  };

  const buyAll = () => {
    setOrderingData([...newArrayCart, pcsNum]);
    setModalCart(false);
    setOrderingModal(true);
  };
  const agree = () => {
    setModalAgree(true);
    setOrderingModal(false);
  };
  const euserinfo = () => {
    setModalEuserinfo(true);
  };
  const endOrder = () => {
    setModalAgree(false);
    setOrderingModal(false);
    setBuyerData({
      name: "",
      surname: "",
      phone: "",
      adress: "",
      mail: "",
      checked: "",
    });
    setCart([]);
    setTotalSum(0);
    setOrderingData();
  };
  
  // console.log(validPhone)
  return (
    <Layout>
      {orderingData && (
        <OrderingBlock
          visible={orderingModal}
          setVisible={setOrderingModal}
          productData={orderingData}
          userData={buyerData}
          setUserData={setBuyerData}
          totalSum={totalSum}
          curs={curs}
          agree={agree}
          euserinfo={euserinfo}
          valid={valid}
        />
      )}
      
      <Modalagree visible={modalAgree} setVisible={setModalAgree} zindex={999}>
        <div className="bg-white h-48 rounded-2xl flex flex-col items-center">
          <p className=""> Dear!</p>
          <p>
            {" "}
            Our buyer {buyerData.name} {buyerData.surname}
          </p>
          <p>
            Your order at totall {orderingData && orderingData.price} USD hired
            by our company
          </p>
          <p>after a call from our manager on the phone - {buyerData.phone}</p>
          <p>order will be shipped to - {buyerData.adress}</p>
          <p>thanks for your order</p>
          <div onClick={endOrder}>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/403/403474.png"
              width={50}
              height={50}
            ></Image>
          </div>
        </div>
      </Modalagree>

      <MyModal
        visible={modalEuserinfo}
        setVisible={setModalEuserinfo}
        zindex={999}
      >
        <ButtonClose onClick={() => setModalEuserinfo(false)} />
        <div className="m-3 bg-slate-50">
          {!validName && (
            <div>Enter a name that is longer than 2 characters </div>
          )}
          {!validSurname && (
            <div>Enter a surname that is longer than 2 characters </div>
          )}
          {!validPhone && (
            <div>
              Enter a phone number that consists of numbers and is longer than 6
              characters{" "}
            </div>
          )}
          {!validMail && (
            <div>Your email does not contain @ and/or domain </div>
          )}
          {!validAdress && (
            <div>Enter a adres that is longer than 10 characters </div>
          )}
          {!buyerData.checked && <div>You are not checked </div>}
        </div>
      </MyModal>

      <MyModal visible={modalCart} setVisible={setModalCart}>
        <div className="p-0">
          <ButtonClose onClick={() => setModalCart(false)} />
          {newArrayCart.length > 0 ? (
            newArrayCart.map((item) => (
              <div
                className="flex mx-2 p-1 pt-0"
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
                    value={pcsNum[item.product_id]}
                  ></input>{" "}
                  {item.measurement}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center m-2 p-3">
              {" "}
              No any product in Cart
            </div>
          )}
        </div>
        <div className="flex justify-end m-2 p-2">
          Total: {totalSum.toFixed(2)}
        </div>
        <div className="m-1 flex justify-end">
          <MyButton
            disabled={totalSum === 0}
            onClick={buyAll}
            color={`${totalSum === 0 ? "notactive" : "danger"}`}
            size="lg"
          >
            Buy All
          </MyButton>
        </div>
      </MyModal>

      <MyModal visible={openProductInfo} setVisible={setOpenProductInfo}>
        <div>
          <ButtonClose onClick={() => setOpenProductInfo(false)} />
        </div>
        {fullScreenData && (
          <div className="m-2 p-1">
            <FullScreenProd data={fullScreenData} />
            <div className="flex justify-around m-2 p-5">
              <MyButton
                onClick={() => setCart([...cart, fullScreenData])}
                disabled={fullScreenData.availability === "-"}
                size="lg"
                color={`${
                  fullScreenData.availability === "-" ? "notactive" : "danger"
                }`}
              >
                Add to Cart
              </MyButton>
              <MyButton
                onClick={() => buyNow(fullScreenData)}
                disabled={fullScreenData.availability === "-"}
                size="lg"
                color={`${
                  fullScreenData.availability === "-" ? "notactive" : "danger"
                }`}
              >
                Buy Now
              </MyButton>
            </div>
          </div>
        )}
      </MyModal>
      <div className="border-2 w-14 h-10 bg-sky-500  flex flex-col">
        {curs} uhy
      </div>

      <div className="max-w-11/12  bg-green-500  border-sky-500 m-auto">
        {productdata.products &&
          productdata.products.map((item) => (
            <div
              key={item.product_id}
              className=" border-2  flex justify-center p-4 m-3"
            >
              <Enterproduct
                openprod={openprod}
                product={item}
                curs={curs}
                setCart={setCart}
                cart={cart}
                buyNow={() => buyNow(item)}
              />
            </div>
          ))}
      </div>
      <div>
        <Cart dataCart={cart} onClick={() => setModalCart(true)}>
          {" "}
          Cart
        </Cart>
      </div>
    </Layout>
  );
}
