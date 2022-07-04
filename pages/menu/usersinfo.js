import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import MyModal from "../../components/atoms/modal/MyModal";
import UserInfo from "../../scenes/menu/UserInfo";
import userInfo from "../../scenes/menu/UserInfo";
import OrdersInfo from "../../scenes/menu/ordersInfo";

export default function coctails() {
  const [getOrdersData, setGetOrdersData] = useState([]);
  const [userName, setUserName] = useState();
  const [orders, setOrders] = useState();
  const [totalSum, setTotalSum] = useState();
  const [fullUserInfo, setFullUserInfo] = useState();
  const [curs, setCurs] = useState(0);
  const [modalUserInfo, setModalUserInfo] = useState(false)
  const [oneUserInfo,setOneUserInfo] = useState()
const [modalOrders,setModalOrders] = useState(true)
const [ordersData,setOrdersData] = useState()





  const getsFullOrdersData = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("OrdersData");
      const returnData = data && JSON.parse(data);
      setGetOrdersData(returnData || []);
    }
  };
  // console.log(fullUserInfo)
  const sendCurs = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.setItem("Curs",curs);
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
    getsFullOrdersData();
    getCurs()
  }, []);
  useEffect(()=>{
    sendCurs()
  },[curs])
  useEffect(() => {
    setUserName(getOrdersData.map((item) => item.UserName));
    setOrders(getOrdersData.map((item) => item.orderNum));
    setTotalSum(getOrdersData.map((item) => item.sumOrders));
    setFullUserInfo(getOrdersData.map((item) => item.userinfo));
  }, [getOrdersData]);

  const openFullUserInfo = e =>{
    setModalUserInfo(true)
    setOneUserInfo(e)
  }
  const openOrders =e =>{
    setModalOrders(true)
    setOrdersData(e)
  }





  return (
    <Layout>
      <MyModal visible={modalOrders} setVisible={setModalOrders}>
         
      <OrdersInfo data={ordersData}/>
      </MyModal>

      <MyModal visible={modalUserInfo} setVisible={setModalUserInfo}>
        {fullUserInfo &&
        <UserInfo data={oneUserInfo}/>
}

      </MyModal>
      <div className="flex items-center flex-col  w-full ">
        <input
          className="border-4 h-10"
          type={"number"}
          onChange={(e) => setCurs(+e.target.value)}
          value={curs}
        ></input>
        <table className="border-2 border-blue-500 w-full flex justify-center ">
          <tbody className=" flex justify-center w-full flex-col ">
            <tr className="text-center flex w-full">
              <td className="border-2 w-full border-blue-500 ">Name</td>
              <td className="border-2 w-full border-blue-500">Orders</td>
              <td className="border-2 w-full border-blue-500">Total pay</td>
            </tr>
            {getOrdersData.length > 0 &&
              userName.map((item, index) => (
                <tr key={item} className="text-center flex w-full">
                  <td className="border-2 w-full border-blue-500 " onClick={() => openFullUserInfo(fullUserInfo[index])}>{item} </td>
                  <td className="border-2 w-full border-blue-500 " onClick={() => openOrders(orders[index])}>
                    {orders[index].length}{" "}
                  </td>

                  <td className="border-2 w-full border-blue-500 "onClick={()=> alert(totalSum)}>
                    {" "}
                    {totalSum[index].toFixed(2)} po kursy -{" "}
                    {curs === 0 ? "Set Kurs" : (totalSum[index] * curs).toFixed(2)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
// export async function getServerSideProps() {
//   try {
//     const datas = await axios.get("https://jsonplaceholder.typicode.com/posts");
//     const posts = datas.data;
//     return {
//       props: {
//         posts,
//       },
//     };
//   } catch {
//     return {
//       notFound: true,
//     };
//   }
// }
