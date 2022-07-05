import React, { useState, useEffect } from "react";
import Layout from "../../components/layout/Layout";
import OrdersInfo from "../../scenes/menu/ordersInfo";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import { useRouter } from "next/router";

export default function orders() {
  const router = useRouter();
  const [ordersData, setOrdersData] = useState();
  const getOrdersData = () => {
    if (typeof window !== "undefined") {
      const data = window.localStorage.getItem("Orders");
      const returnData = data && JSON.parse(data);
      setOrdersData(returnData || 0);
      console.log(returnData);
    }
  };
  useEffect(() => {
    getOrdersData();
  }, []);
  return (
    <Layout>
      <div className="w-full">
        <OrdersInfo data={ordersData} />

        <div className="text-right">
          {" "}
          <MyButton
            size="lg"
            color="danger"
            onClick={() => router.push("./usersinfo")}
          >
            {" "}
            Back
          </MyButton>
        </div>
      </div>
    </Layout>
  );
}
