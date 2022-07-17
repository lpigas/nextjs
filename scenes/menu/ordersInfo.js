import React from "react";

export default function ordersInfo({ data }) {
  return (
    <div className="p-2 bg-white">
      {data && (
        <table className="border-2 bg-white border-black w-full flex justify-center ">
          <tbody className=" flex justify-center w-full flex-col">
            <tr className="text-center flex w-full">
              <td className="border-2 w-2/12 border-black ">Orders</td>
              <td className="border-2 w-6/12 border-black ">Products</td>
              <td className="border-2 w-2/12 border-black ">Pcs</td>
              <td className="border-2 w-2/12 border-black ">Price</td>
            </tr>
            {data.map((items, index) => (
              <tr key={Math.random()} className="text-center flex w-full">
                <td className="border-2 w-2/12 border-black ">{items[0]}</td>
                <td className="border-2 w-6/12 border-black p-0">
                  {items.slice(1).map((item) => (
                    <p key={Math.random()} className="border-2 m-0 h-14">
                      {item.name_product}
                    </p>
                  ))}
                </td>
                <td className="border-2 w-2/12 border-black">
                  {items.slice(1).map((item) => (
                    <p key={Math.random()} className="border-2 m-0 h-14">
                      {item.pcs}
                    </p>
                  ))}
                </td>
                <td className="border-2 w-2/12 border-black flex flex-col">
                  {items.slice(1).map((item) => (
                    <p key={Math.random()} className="border-2 m-0 h-14">
                      {item.price}
                    </p>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
