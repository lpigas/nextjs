import React from 'react'

export default function ordersInfo({data}) {
  console.log(data)
  return (
    <div className='p-2'>
      {data&&
      <table className='border-2 border-black w-full flex justify-center '>
        <tbody className=" flex justify-center w-full flex-col">
          <tr className="text-center flex w-full">
            <td className="border-2 w-4/12 border-blue-500 ">
              Orders
            </td>
            <td  className="border-2 w-8/12 border-blue-500 " >
              Products
            </td>
          </tr>
          {data.map((items,index )=> 
            
            <tr  key={items[0]+ Math.random()}className="text-center flex w-full">
              <td className="border-2 w-4/12 border-blue-500 ">
                {items[0]}
              </td>
              <td>
                {1}
              </td>

            </tr>
            )}
        </tbody>
        </table>
}
    </div>
  )
}
