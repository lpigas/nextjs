import React from "react";
import Button from "../../components/atoms/Buttons/MyButton/MyButton";
export default function BlogForm({ item, onClick }) {
  const color = item.completed ? "text-green-700" : "text-red-500";

  return (
    <div>
      <div
        className="flex w-full  flex-col justify-center border-2 rounded-xl bg-sky-400  mb-4 p-2"
        disabled={!item.completed}
      >
        <div className="flex w-full justify-center">
          {item.id}: {item.title}{" "}
        </div>
        <div className="flex justify-center">
          {" "}
          Completed -{" "}
          <div
            className={`flexbox justify-center ${color}`}
            // style={
            //   item.completed ? { color:"green" } : {color:"red"}
            // }
          >
            {item.completed.toString()}
          </div>
        </div>
        <div className="flex  justify-center">
          <Button
            size="lg"
            color="danger"
            disabled={!item.completed}
            onClick={() => onClick(item)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
