import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";

export default function coctails() {
  const [getOrdersData, setGetOrdersData] = useState([]);
  const [userName, setUserName] = useState();
  const [orders, setOrders] = useState();
  const [totalSum, setTotalSum] = useState();
  const [fullUserInfo, setFullUserInfo] = useState();
  const [curs, setCurs] = useState(0);

  const getsFullOrdersData = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("OrdersData");
      const returnData = data && JSON.parse(data);
      setGetOrdersData(returnData || []);
    }
  };
  useEffect(() => {
    getsFullOrdersData();
  }, []);
  useEffect(() => {
    setUserName(getOrdersData.map((item) => item.UserName));
    setOrders(getOrdersData.map((item) => item.orderNum));
    setTotalSum(getOrdersData.map((item) => item.sumOrders));
    setFullUserInfo(...getOrdersData.map((item) => item.userinfo));
  }, [getOrdersData]);

  return (
    <Layout>
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
                  <td className="border-2 w-full border-blue-500 ">{item} </td>
                  <td className="border-2 w-full border-blue-500 ">
                    {orders[index].length}{" "}
                  </td>

                  <td className="border-2 w-full border-blue-500 ">
                    {" "}
                    {totalSum[index].toFixed(2)} po kursy -{" "}
                    {curs === 0 ? "Set Kurs" : (totalSum * curs).toFixed(2)}
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
