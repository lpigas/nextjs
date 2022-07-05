import React from "react";

export default function userInfo({ data }) {
  return (
    <table className="w-full flex justify-center bg-white p-2">
      {data && (
        <tbody className="w-full flex flex-col">
          <tr className="border-2 flex w-full text-center">
            <td className="w-2/12 border-2"> Surname</td>
            <td className="w-2/12 border-2"> Name</td>
            <td className="w-2/12 border-2"> Phone</td>
            <td className="w-2/12 border-2"> E-mail</td>
            <td className="w-4/12 border-2"> Adress</td>
          </tr>
          <tr className="border-2 400 flex w-full text-center">
            <td className="w-2/12 border-2 break-words"> {data.surname}</td>
            <td className="w-2/12 border-2 break-words"> {data.name}</td>
            <td className="w-2/12 border-2 break-words"> {data.phone}</td>
            <td className="w-2/12 border-2 break-words"> {data.mail}</td>
            <td className="w-4/12 border-2 break-words"> {data.adress}</td>
          </tr>
        </tbody>
      )}
    </table>
  );
}
