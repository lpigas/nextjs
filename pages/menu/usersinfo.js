import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import MyModal from "../../components/atoms/modal/MyModal";
import UserInfo from "../../scenes/menu/UserInfo";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import { useRouter } from "next/router";
import ButtonClose from "../../components/atoms/Buttons/ButtonClose/ButtonClose";
import Image from "next/image";
import PasswordBlock from "../../components/moleculs/PasswordBlock/PasswordBlock";
import Modalagree from "../../scenes/posts/OrderingBlock/components/Modalagree";
import { validPass } from "../../components/functions/validPass";

export default function userinfo() {
  const [pass, setPass] = useState();
  const router = useRouter();
  const [getOrdersData, setGetOrdersData] = useState([]);
  const [userName, setUserName] = useState();
  const [orders, setOrders] = useState();
  const [totalSum, setTotalSum] = useState();
  const [fullUserInfo, setFullUserInfo] = useState();
  const [curs, setCurs] = useState(0);
  const [modalUserInfo, setModalUserInfo] = useState(false);
  const [oneUserInfo, setOneUserInfo] = useState();
  const [modalPass, setModalPass] = useState(false);
  const [inputPass, setInputPass] = useState({ login: "", password: "" });
  const [modalError, setModalError] = useState(false);

  const getPass = async () => {
    if (typeof window !== "undefined") {
      const hostname = window.location.origin;
      const getApi = await axios.get(
        `${hostname + process.env.API_HOST}socials`
      );
      setPass(getApi.data);
    }
  };

  // console.log(pass);

  const testValidPass = () => {
    const validetePass = validPass(inputPass, pass);
    if (validetePass) {
      setInputPass({ login: "", password: "" });
      setModalPass(false);
      router.push("./usersinfo");
    } else {
      setModalError(true);
    }
  };
  useEffect(() => {
    !modalPass && setInputPass({ login: "", password: "" });
  }, [modalPass]);
  const getsFullOrdersData = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("OrdersData");
      const returnData = data && JSON.parse(data);
      setGetOrdersData(returnData || []);
    }
  };

  const sendCurs = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.setItem("Curs", curs);
    }
  };
  const getCurs = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("Curs");
      const returnData = data && +JSON.parse(data);
      setCurs(returnData || 0);
    }
  };

  useEffect(() => {
    getPass();
    setModalPass(true);
    getsFullOrdersData();
    getCurs();
  }, []);
  useEffect(() => {
    sendCurs();
  }, [curs]);
  useEffect(() => {
    setUserName(getOrdersData.map((item) => item.UserName));
    setOrders(getOrdersData.map((item) => item.orderNum));
    setTotalSum(getOrdersData.map((item) => item.sumOrders));
    setFullUserInfo(getOrdersData.map((item) => item.userinfo));
  }, [getOrdersData]);

  const openFullUserInfo = (e) => {
    setModalUserInfo(true);
    setOneUserInfo(e);
  };
  const openOrders = (e) => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.setItem("Orders", JSON.stringify(e));
    }
    router.push("./orders");
  };
  const resetUsers = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.removeItem("OrdersData");
    }
    getsFullOrdersData();
  };

  return (
    <Layout>
      <MyModal
        visible={modalError}
        setVisible={setModalError}
        zindex={400}
        width={400}
      >
        <ButtonClose onClick={() => setModalError(false)} />
        <div className="text-xl text-center m-1">
          {" "}
          Wrong Login or Password<p>Try againe</p>
        </div>
        <div className="text-center my-2">
          <Image
            onClick={() => setModalError(false)}
            src={"https://cdn-icons-png.flaticon.com/512/1828/1828843.png"}
            width={30}
            height={30}
          ></Image>
        </div>
      </MyModal>
      <Modalagree visible={modalPass} width={400}>
        <PasswordBlock
          dataInput={inputPass}
          setDataInput={setInputPass}
          onClick={testValidPass}
          onClickBack={() => router.push("../menu")}
        />
      </Modalagree>

      <MyModal visible={modalUserInfo} setVisible={setModalUserInfo}>
        {fullUserInfo && <UserInfo data={oneUserInfo} />}
      </MyModal>
      <div className="flex items-center flex-col  w-full ">
        <MyButton
          size="lg"
          color="danger"
          onClick={() => router.push("./productsetings")}
        >
          {" "}
          Product Setings
        </MyButton>
        <input
          className="border-4 h-10"
          type={"number"}
          onChange={(e) => setCurs(+e.target.value)}
          value={curs}
        ></input>
        <table className="border-2 border-black w-full flex justify-center mt-4">
          <tbody className=" flex justify-center w-full flex-col ">
            <tr className="text-center flex w-full">
              <td className="border-2 w-full border-black ">Name</td>
              <td className="border-2 w-full border-black">Orders</td>
              <td className="border-2 w-full border-black">Total pay</td>
            </tr>
            {getOrdersData.length > 0 &&
              userName.map((item, index) => (
                <tr key={item} className="text-center flex w-full">
                  <td
                    className="border-2 w-full border-black "
                    onClick={() => openFullUserInfo(fullUserInfo[index])}
                  >
                    {item}{" "}
                  </td>
                  <td
                    className="border-2 w-full border-black "
                    onClick={() => openOrders(orders[index])}
                  >
                    {orders[index].length}{" "}
                  </td>

                  <td className="border-2 w-full border-black ">
                    {" "}
                    {totalSum[index].toFixed(2)} po kursy -{" "}
                    {curs === 0
                      ? "Set Kurs"
                      : (totalSum[index] * curs).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="m-4">
          <MyButton size="lg" color="danger" onClick={resetUsers}>
            Reset All Users
          </MyButton>
        </div>
      </div>
    </Layout>
  );
}
// export async function getStaticProps() {

//   try {
//     let pass = ''
//     if (typeof window !== 'undefined') {
//     const hostname =  window.location.origin;
//     const getApi = await axios.get(`${hostname+process.env.API_HOST}socials`);
//      pass = getApi.data;
//     }
//     return {
//       props: {
//         pass,
//       },
//     };
//   } catch (e) {
//     return {
//       notFound: true,
//     };
//   }
// }
