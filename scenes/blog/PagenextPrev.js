import React from "react";
import Button from "../../components/atoms/Buttons/MyButton/MyButton";

export default function PagenextPrev(add, minus) {
  console.log(add);
  return (
    <div className="flex justify-center w-full ">
      <Button onClick={add}> page - 1</Button>
      <Button onClick={minus}> page + 1</Button>
    </div>
  );
}
