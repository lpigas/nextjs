import { useRouter } from "next/router";
import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import ProductsetingsBlock from "../../scenes/menu/ProductsetingsBlock";

export default function productsetings({ getproductData }) {
  const [allProduct, setAllProduct] = useState(getproductData);
  const router = useRouter();
  console.log(Object.keys({ a: 1 }).join("") === "a");
  const deleteProduct = async (Id) => {
    //change deleting state

    try {
      // Delete post
      await fetch("/api/productdata", {
        method: "DELETE",
        body: Id,
      });
      // reload the page

      let reload = window.location.reload();
    } catch (error) {
      // stop deleting state
      alert(error);
    }
  };
  //   const getProduct = async () => {
  //       try {
  //           const x =await fetch("/api/productdata", {
  //               method: "GET",
  //             });
  //             const y = await x.json()
  //     } catch (error) {
  //       alert(error)
  //     }
  //   };

  return (
    <Layout>
      <div className="w-full block border-2 border-black">
        <div className="m-2 block w-full text-center">
          <MyButton
            size="lg"
            color="danger"
            onClick={() => router.push("./addnew")}
          >
            Add new{" "}
          </MyButton>
        </div>
        <ProductsetingsBlock data={allProduct} deleteProduct={deleteProduct} />
      </div>
    </Layout>
  );
}
export async function getServerSideProps(ctx) {
  // get the current environment
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  // request posts from api
  let response = await fetch(
    `${(dev ? DEV_URL : PROD_URL) + process.env.API_HOST}productdata`
  );

  // extract the data

  const getinfo = await response.json();
  return {
    props: {
      getproductData: getinfo.message,
    },
  };
}
