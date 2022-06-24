import React from 'react'

export default function ButtonClose({onClick}) {
  return (
<div className="mr-2 mt-2 flex justify-end">
            <p
              onClick={onClick}
              className="cursor-pointer ml-4 w-4 text-white border-2 flex justify-center"
            >
              {"X"}
            </p>
          </div>
  )
}
