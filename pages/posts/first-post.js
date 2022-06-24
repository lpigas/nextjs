import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import productdata from "../../constants/data/productdata.json";
import Enterproduct from "../../scenes/posts/Enterproduct";
import Cart from "../../components/atoms/cart/cart";
import MyModal from "../../components/atoms/modal/MyModal";
import FullScreenProd from "../../scenes/posts/FullScreenProd";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import { useRouter } from "next/router";
import ButtonClose from "../../components/atoms/Buttons/ButtonClose/ButtonClose";


export default function FirstPost() {
  const curs = 36;
  const [openProductInfo, setOpenProductInfo] = useState(false);
  const [cart, setCart] = useState([]);
  const [modalCart, setModalCart] = useState(false);
  const [newArrayCart, setNewArrayCart] = useState(cart.filter(onlyUnique));
  const [totalSum, setTotalSum] = useState(0);
  const [fullScreenData, setFullScreenData] = useState();
  const router = useRouter();
  const homemove = () => {
    router.push("/posts/ordering");
  };
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
 

  return (
    <Layout>
      <MyModal visible={modalCart} setVisible={setModalCart}>
        <div className="p-0">
          <ButtonClose onClick={() => setModalCart(false)}/>
          {newArrayCart.length > 0 ? (
            newArrayCart.map((item) => (
              <div
                className="flex m-2 p-3"
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
      </MyModal>
      <MyModal visible={openProductInfo} setVisible={setOpenProductInfo}>
        <div>
          <ButtonClose onClick={() => setOpenProductInfo(false)}/>
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
                onClick={homemove}
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
      <div className="border-2 w-14 h-10 bg-sky-500  flex flex-col">{curs} uhy</div>

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
                buyNow={homemove}
              />
            </div>
          ))}
      </div>
      <div>
        <Cart dataCart={cart} onClick={() => setModalCart(true)}> Cart</Cart>
      </div>
    </Layout>
  );
}
