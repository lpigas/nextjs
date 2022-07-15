import React from "react";

export default function ProductsetingsBlock({ data, deleteProduct }) {
  return (
    <table className="w-full ">
      <thead>
        <tr>
          <td className="border-2  border-black text-center">id</td>
          <td className="border-2 w-4/12 border-black text-center">Titel</td>
          <td className="border-2 w-1/12 border-black text-center">
            Price retail
          </td>
          <td className="border-2 w-1/12 border-black text-center">
            Price wholesale
          </td>
          <td className="border-2 w-6/12 border-black text-center">Content</td>
          <td className="border-2 w-2/12 border-black text-center">Photo</td>
          <td className="border-2 w-16 border-black text-center text-white">
            {"del"}
          </td>
        </tr>
      </thead>
      {data ? (
        <tbody>
          {data.map((item) => (
            <tr key={item._id}>
              <td className="border-2 border-black text-center">
                {item.id !== "null" ? item.id : item._id}
              </td>
              <td className="border-2 border-black text-center">
                {item.name_product !== "null" ? item.name_product : "no name"}
              </td>
              <td className="border-2 border-black text-center">
                {item.price !== "null" ? (+item.price).toFixed(2) : 0}
              </td>
              <td className="border-2 border-black text-center">
                {item.wholesale_price !== "null"
                  ? (+item.wholesale_price).toFixed(2)
                  : "-"}
              </td>
              <td className="border-2 border-black text-center ">
                {item.body !== "null"
                  ? item.body.replace(/[^А-Яа-яЁё ,]/gi, "").slice(0, 60)
                  : "-"}
              </td>
              <td className="border-2 border-black text-center ">
                {item.img !== "null" ? item.img.split(" ").length : "-"}
              </td>
              <td
                className="border-2 cursor-default border-black text-center"
                onClick={() => deleteProduct(item._id)}
              >
                <div className="text-red-500 ">X</div>
              </td>
            </tr>
          ))}
        </tbody>
      ) : (
        <thead>
          <tr>
            <td colSpan={5} className="text-center p-20 text-4xl">
              {" "}
              No any product
            </td>
          </tr>
        </thead>
      )}
    </table>
  );
}
