import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
export default function addnew() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  return (
    <Layout>
      <div className="w-full text-center">
        Add new product
        <div className="m-4 flex justify-around">
          <div>
            <input
              className="border-2 w-24 mx-4 border-black"
              placeholder="id"
            ></input>
            Add Id
          </div>
          <div>
            <input
              className="border-2 mx-4 w-96 text-center border-black"
              placeholder="Title"
            ></input>
            Add Title
          </div>
        </div>
        <div>sada</div>
        <MyButton size="lg" color="danger">
          Add Product
        </MyButton>
      </div>
    </Layout>
  );
}
