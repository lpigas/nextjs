import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
import Addproductblock from "../../scenes/menu/Addproductblock";
import { useRouter } from "next/router";

export default function addnew() {
  const [error, setError] = useState("");
  const message = "Add minimum part with *";
  const router = useRouter();
  const [newProduct, setNewProduct] = useState({
    id: "",
    name_product: "",
    body: "",
    price: "",
    currency: "USD",
    availability: "-",
    img: "",
  });

  const addProduct = async () => {
    if (!newProduct.id || !newProduct.name_product || !newProduct.price) {
      setError("Error");
      console.log(newProduct);
    } else {
      try {
        // add post
        await fetch("/api/productdata", {
          method: "POST",
          body: JSON.stringify(newProduct),
        });
        // reload the page
        router.push("./productsetings");
      } catch (error) {
        // stop deleting state
        alert(error);
      }
    }
  };

  return (
    <Layout>
      <Addproductblock
        setNewProduct={setNewProduct}
        newProduct={newProduct}
        onClick={addProduct}
        error={error}
        message={message}
      />
    </Layout>
  );
}
