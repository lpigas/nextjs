import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import productdata from "../../constants/data/productdata.json";
import Enterproduct from "../../scenes/posts/Enterproduct";
import Cart from "../../components/atoms/cart/cart";
import MyModal from "../../components/atoms/modal/MyModal";
import FullScreenProd from "../../scenes/posts/FullScreenProd";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import ButtonClose from "../../components/atoms/Buttons/ButtonClose/ButtonClose";
import { useRouter } from "next/router";
import { localstor } from "../../components/functions/localstor";

export default function FirstPost() {
  const [curs, setCurs] = useState(0);
  const [openProductInfo, setOpenProductInfo] = useState(false);
  const [modalCart, setModalCart] = useState(false);
  const [totalSum, setTotalSum] = useState(0);
  const [fullScreenData, setFullScreenData] = useState();
  const router = useRouter();
  const [cart, setCart] = useState([]);
  const [focus, setFocus] = useState();
  const addToBasket = (product) => {
    const isInBasket =
      cart.findIndex((item) => item.product_id === product.product_id) !== -1;
    if (!isInBasket) {
      setCart([...cart, { ...product, pcs: 1 }]);
    } else {
      const modifProduct = cart.find(
        (item) => item.product_id === product.product_id
      );
      const filterProduct = cart.filter(
        (item) => item.product_id !== product.product_id
      );
      setCart([
        ...filterProduct,
        { ...modifProduct, pcs: modifProduct.pcs + 1 },
      ]);
    }
  };
  const getCurs = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("Curs");
      const returnData = data && +JSON.parse(data);
      setCurs(returnData || 0);
    }
  };
  const ChangePcs = (pcs, items) => {
    const index = cart.findIndex((item) => {
      if (items.product_id === item.product_id) {
        return item;
      }
    });
    const cart2 = cart;
    setFocus(items);
    cart2[index].pcs = pcs;
    setCart([...cart2]);
  };

  useEffect(() => {
    addCart();
    getCurs();
  }, []);
  useEffect(() => {
    if (cart.length > 1) {
      const x = cart.reduce(
        (first, second) => first + second.pcs * +second.price,
        0
      );

      setTotalSum(x);
    } else if (cart.length === 1) {
      setTotalSum(+cart[0].pcs * +cart[0].price);
    }
    addLocal();
  }, [cart]);
  const openprod = (e) => {
    setFullScreenData(e);
    setOpenProductInfo(true);
  };

  const buyNow = (e) => {
    setCart([{ ...e, pcs: 1 }]);
    router.push("/posts/ordering");
  };

  const buyAll = () => {
    setModalCart(false);
    router.push("/posts/ordering");
  };
  const ResetCart = () => {
    setCart([]);
    if (typeof window !== "undefined" && cart.length > 0) {
      window.localStorage.removeItem("dataCart");
    }
    setTotalSum(0);
  };
  const addLocal = () => {
    localstor("dataCart", cart);
  };
  const addCart = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("dataCart");
      if (data === null) {
        return setCart([]);
      } else if (data !== "undefined") {
        setCart(JSON.parse(data));
      } else {
        setCart([]);
      }
    }
  };

  return (
    <Layout>
      <MyModal visible={modalCart} setVisible={setModalCart}>
        <div className="p-0">
          <ButtonClose onClick={() => setModalCart(false)} />
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div
                className="flex mx-2 p-1 pt-0"
                key={
                  item.id + item.name_product + item.product_id + Math.random()
                }
              >
                <div className="border-4 flex w-11/12 items-center ">
                  {item.product_id}. {item.name_product}{" "}
                </div>
                <div className="border-4 flex w-5/12 items-center justify-between">
                  <div className="w-3/4">
                    {item.price} {item.currency} X{" "}
                  </div>
                  <div>
                    <input
                      onChange={(e) => ChangePcs(+e.target.value, item)}
                      type="number"
                      autoFocus={
                        focus ? item.product_id === focus.product_id : false
                      }
                      className="w-10"
                      value={item.pcs}
                    ></input>
                  </div>{" "}
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
          <div className="mx-2">
            <MyButton
              disabled={totalSum === 0}
              onClick={buyAll}
              color={`${totalSum === 0 ? "notactive" : "danger"}`}
              size="lg"
            >
              Buy All
            </MyButton>
          </div>
          <div>
            <MyButton
              disabled={totalSum === 0}
              onClick={ResetCart}
              color={`${totalSum === 0 ? "notactive" : "danger"}`}
              size="lg"
            >
              Reset
            </MyButton>
          </div>
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
                onClick={() => addToBasket(fullScreenData)}
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
      <div className="border-2 w-14 max-h-14 bg-sky-500  flex flex-col">
        {curs} uhy
      </div>

      <div className="max-w-11/12  border-sky-500 m-auto">
        {productdata.products &&
          productdata.products.map((item) => (
            <div
              key={item.product_id}
              className=" border-2 bg-blue-500 flex justify-center p-4 m-3"
            >
              <Enterproduct
                openprod={openprod}
                product={item}
                curs={curs}
                setCart={setCart}
                cart={cart}
                addToBasket={addToBasket}
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
