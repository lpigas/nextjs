import React from "react";
import MyButton from "../../components/atoms/Buttons/MyButton/MyButton";
export default function Addproductblock({
  setNewProduct,
  newProduct,
  onClick,
  error,
  message,
}) {
  return (
    <div className="w-full text-center border-4 rounded-3xl bg-cyan-500">
      Add new product
      {error && <div className="text-red-500"> {message}</div>}
      <div className="my-4 flex  justify-around">
        <div>
          <input
            type="number"
            className="border-2 w-24 mx-4 border-black"
            placeholder="id"
            onChange={(e) =>
              setNewProduct({ ...newProduct, id: +e.target.value })
            }
          />
          Add Id *
        </div>
        <div>
          <input
            className="border-2 mx-4 w-96 text-center border-black"
            placeholder="Title"
            onChange={(e) =>
              setNewProduct({ ...newProduct, name_product: e.target.value })
            }
          />
          Add Title *
        </div>
      </div>
      <div className="m-8 flex items-center">
        <textarea
          placeholder="add content here"
          className="border-2 h-48 w-10/12 border-black"
          onChange={(e) =>
            setNewProduct({ ...newProduct, body: e.target.value })
          }
        />
        add description
      </div>
      <div className="m-8 flex items-center justify-around">
        <div>
          <input
            placeholder="add price"
            type="number"
            className="border-2 mx-4 w-24 border-black"
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          Add price *
        </div>
        <div>
          <select
            className="mx-4"
            onChange={(e) =>
              setNewProduct({ ...newProduct, currency: e.target.value })
            }
          >
            <option value={"USD"}>USD</option>
            <option value={"UAH"}>UAH</option>
          </select>
          Currency
        </div>
        <label htmlFor="availability">
          <input
            id="availability"
            className="mx-4"
            type="checkbox"
            value={"availability"}
            onChange={(e) =>
              setNewProduct({
                ...newProduct,
                availability: e.target.checked ? "+" : "-",
              })
            }
          ></input>
          Availability
        </label>
      </div>
      <div>
        <input
          className="w-10/12 border-2 border-black"
          placeholder="add url photo with '  ,  '"
          onChange={(e) =>
            setNewProduct({ ...newProduct, img: e.target.value })
          }
        />
      </div>
      <div className="m-4">
        <MyButton size="lg" color="danger" onClick={onClick}>
          Add Product
        </MyButton>
      </div>
    </div>
  );
}
