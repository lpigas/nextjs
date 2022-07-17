import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import Enterproduct from "../../scenes/posts/Enterproduct";
import Cart from "../../components/atoms/cart/cart";
import MyModal from "../../components/atoms/modal/MyModal";
import FullScreenProd from "../../scenes/posts/FullScreenProd";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import ButtonClose from "../../components/atoms/Buttons/ButtonClose/ButtonClose";
import { useRouter } from "next/router";
import { localstor } from "../../components/functions/localstor";

export default function FirstPost({ getproductData }) {
  const [productdata, setProductdata] = useState(getproductData);
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
  const getCurs = async() => {
    try {
      // Delete post
      const get =  await fetch(`${process.env.API_HOST}curs`, {
        method: "GET",
      });
      // reload the page
      const gets = await get.json()
      setCurs(gets.message[0].curs)
      } catch (error) {
        // stop deleting state
        // alert(error);
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
  // const serverData = async ()=>{
  //   try {
  //     if (typeof window !== "undefined") {
  //       const hostname = window.location.origin;
  //       const fdata = await axios.get(
  //         `${hostname + process.env.API_HOST}productdata`
  //       );
  //      setProductdata(fdata.data)
  //     }

  //   } catch (error) {
  //     alert(error)
  //   }
  // }

  return (
    <Layout>
      <MyModal visible={modalCart} setVisible={setModalCart}>
        <div className="p-0">
          <ButtonClose onClick={() => setModalCart(false)} />
          {cart && cart.length > 0 ? (
            cart.map((item) => (
              <div className="flex mx-2 p-1 pt-0" key={Math.random()}>
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
      <div className="border-2 w-1/12 max-h-14 m-3 bg-sky-500 text-center">
        {curs} uhy
      </div>

      <div className="max-w-10/12 w-10/12 border-sky-500 p-3 m-auto">
        {productdata &&
          productdata.map((item) => (
            <div
              key={Math.random()}
              className=" border-2 bg-blue-500 w-full flex justify-center p-4 "
            >
              {item && (
                <Enterproduct
                  openprod={openprod}
                  product={item}
                  curs={curs}
                  setCart={setCart}
                  cart={cart}
                  addToBasket={addToBasket}
                  buyNow={() => buyNow(item)}
                />
              )}
            </div>
          ))}
      </div>
      <div className="w-1/12">
        <Cart dataCart={cart} onClick={() => setModalCart(true)}>
          {" "}
          Cart
        </Cart>
      </div>
    </Layout>
  );
}
export async function getServerSideProps(ctx) {
  let getinfo = 1;
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(
    `${(dev ? DEV_URL : PROD_URL) + process.env.API_HOST}productdata`
  );

  // extract the data

  getinfo = await response.json();
  return {
    props: {
      getproductData: getinfo.message,
    },
  };
}
