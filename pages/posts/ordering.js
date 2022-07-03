import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MyModal from "../../components/atoms/modal/MyModal";
import ButtonClose from "../../components/atoms/Buttons/ButtonClose/ButtonClose";
import {
  mailValid,
  numberValid,
} from "../../components/functions/numbersvalid";
import OrderingBlock from "../../scenes/posts/OrderingBlock/OrderingBlock";
import Modalagree from "../../scenes/posts/OrderingBlock/components/Modalagree";
import Image from "next/image";
import { useRouter } from "next/router";
import { localstor } from "../../components/functions/localstor";
import { makorderinfo } from "../../components/functions/makorderinfo";

export default function ordering() {
  const router = useRouter();
  const [modalAgree, setModalAgree] = useState(false);
  const [getdata, setGetdata] = useState();
  const [data, setData] = useState();
  const [totalSum, setTotalSum] = useState(0);
  const [buyerData, setBuyerData] = useState({
    name: "",
    surname: "",
    phone: "",
    adress: "",
    mail: "",
    checked: "",
  });
  const [getOrdersData, setGetOrdersData] = useState([]);
  const validName = buyerData.name.length >= 2;
  const validSurname = buyerData.surname.length >= 2;
  const validPhone = numberValid(buyerData.phone) + buyerData.phone.length > 5;
  const validMail = mailValid(buyerData.mail);
  const validAdress = buyerData.adress.length > 10;
  const validData = data && data.length > 0 ? true : false;
  const valid =
    validAdress &&
    validMail &&
    validPhone &&
    validName &&
    validSurname &&
    validData &&
    buyerData.checked;
  const [modalEuserinfo, setModalEuserinfo] = useState(false);
  const [focus, setFocus] = useState();
  const fullOrderData = data && makorderinfo(buyerData, data, totalSum);

  useEffect(() => {
    if (data && data.length > 1) {
      const x = data.reduce(
        (first, second) => first + second.pcs * +second.price,
        0
      );

      setTotalSum(x);
    } else if (data && data.length === 1) {
      setTotalSum(+data[0].pcs * +data[0].price);
    } else {
      setTotalSum(0);
    }
  }, [data]);

  const addLocal = () => {
    if (typeof window !== "undefined") {
      setGetdata(window.localStorage.getItem("dataCart"));
    }
  };
  const getsFullOrdersData = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("OrdersData");
      const returnData = data && JSON.parse(data);
      setGetOrdersData(returnData || []);
    }
  };
  const addFullOrdersData = () => {
    if (getOrdersData.length === 0) {
      localstor("OrdersData", [fullOrderData]);
    } else {
      const inOrdersdata = getOrdersData.find(
        (item) => item.UserName === fullOrderData.UserName
      );
      const indexInOrdersdata = getOrdersData.findIndex(
        (item) => item.UserName === fullOrderData.UserName
      );
      if (inOrdersdata === undefined && indexInOrdersdata === -1) {
        localstor("OrdersData", [...getOrdersData, fullOrderData]);
      } else if (inOrdersdata !== undefined && indexInOrdersdata !== -1) {
        const newOrderingData = {
          ...getOrdersData[indexInOrdersdata],
          sumOrders: getOrdersData[indexInOrdersdata].sumOrders + +totalSum,
          orderNum: [
            ...getOrdersData[indexInOrdersdata].orderNum,
            ...fullOrderData.orderNum,
          ],
        };
        const filterOrderingData = getOrdersData.filter(
          (item) => item.UserName !== fullOrderData.UserName
        );
        const newData = [newOrderingData, ...filterOrderingData];
        localstor("OrdersData", newData);
      }
    }
  };
  useEffect(() => {
    getsFullOrdersData();
    addLocal();
  }, []);
  useEffect(() => {
    if (getdata) {
      setData(JSON.parse(getdata));
    }
  }, [getdata]);

  const ChangePcs = (pcs, items) => {
    const index = data.findIndex((item) => {
      if (items.product_id === item.product_id) {
        return item;
      }
    });
    const cart2 = data;
    setFocus(items);
    if (pcs < 0) {
      pcs = -pcs;
    }
    cart2[index].pcs = pcs;
    setData([...cart2]);
    localstor("dataCart", cart2);
  };

  const delProduct = (del) => {
    const newCart = data.filter((item) => item.product_id !== del.product_id);
    setData(newCart);
    localstor("dataCart", newCart);
  };

  const euserinfo = () => {
    setModalEuserinfo(true);
  };

  const agree = () => {
    setModalAgree(true);
  };

  const endOrder = () => {
    addFullOrdersData();
    if (typeof window !== "undefined") {
      const data = window.localStorage.removeItem("dataCart");
    }
    setModalAgree(false);
    router.push("/posts/first-post");
  };

  return (
    <Layout>
      {data && (
        <OrderingBlock
          productData={data}
          userData={buyerData}
          setUserData={setBuyerData}
          euserinfo={euserinfo}
          agree={agree}
          valid={valid}
          totalSum={totalSum}
          ChangePcs={ChangePcs}
          focus={focus}
          setFocus={setFocus}
          backProductPage={() => router.push("/posts/first-post")}
          delProduct={delProduct}
        />
      )}

      <MyModal
        visible={modalEuserinfo}
        setVisible={setModalEuserinfo}
        zindex={999}
      >
        <ButtonClose onClick={() => setModalEuserinfo(false)} />
        <div className="m-3 bg-slate-50">
          {!validData ? (
            <div className="text-3xl flex justify-center">
              {" "}
              Your cart Is Empty, return to product list{" "}
            </div>
          ) : (
            <div>
              {!validName && (
                <div>Enter a name that is longer than 2 characters </div>
              )}
              {!validSurname && (
                <div>Enter a surname that is longer than 2 characters </div>
              )}
              {!validPhone && (
                <div>
                  Enter a phone number that consists of numbers and is longer
                  than 6 characters{" "}
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
          )}
        </div>
      </MyModal>

      <Modalagree visible={modalAgree} setVisible={setModalAgree} zindex={999}>
        <div className="bg-white h-48 rounded-2xl flex flex-col items-center">
          <p className=""> Dear!</p>
          <p>
            {" "}
            Our buyer {buyerData.name} {buyerData.surname}
          </p>
          <p>
            Your order at totall {totalSum && totalSum} USD hired by our company
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
    </Layout>
  );
}
