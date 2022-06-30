import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import MyModal from "../../components/atoms/modal/MyModal";
import ButtonClose from "../../components/atoms/Buttons/ButtonClose/ButtonClose";
import {
  mailValid,
  numberValid,
} from "../../components/functions/numbersvalid";
import OrderingBlock from "../../scenes/posts/OrderingBlock/OrderingBlock";
export default function ordering() {
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
  const validName = buyerData.name.length >= 2;
  const validSurname = buyerData.surname.length >= 2;
  const validPhone = buyerData.phone.length >= 5 + numberValid(buyerData.phone);
  const validMail = mailValid(buyerData.mail);
  const validAdress = buyerData.adress.length > 10;
  const valid =
    validAdress &&
    validMail &&
    validPhone &&
    validName &&
    validSurname &&
    buyerData.checked;
  const [modalEuserinfo, setModalEuserinfo] = useState(false);
  const [focus, setFocus] = useState();
  useEffect(() => {
    if (data && data.length > 1) {
      const x = data.reduce(
        (first, second) => first + second.pcs * +second.price,
        0
      );

      setTotalSum(x);
    } else if (data && data.length === 1) {
      setTotalSum(+data[0].pcs * +data[0].price);
    }
  }, [data]);

  const addLocal = () => {
    if (typeof window !== "undefined") {
      setGetdata(window.localStorage.getItem("dataCart"));
    }
  };
  useEffect(() => {
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
    cart2[index].pcs = pcs;
    setData([...cart2]);
  };
  const euserinfo = () => {
    setModalEuserinfo(true);
  };
  const agree = () => {
    console.log("agree");
  };
  console.log(data);
  return (
    <Layout>
      {data && (
        <OrderingBlock
          productData={data}
          userData={buyerData}
          setUserData={setBuyerData}
          euserinfo={euserinfo}
          valid={valid}
          totalSum={totalSum}
          ChangePcs={ChangePcs}
          focus={focus}
        />
      )}

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
    </Layout>
  );
}
