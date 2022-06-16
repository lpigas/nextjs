import React from "react";
import Button from "../../components/atoms/Buttons/MyButton/MyButton";
export default function BlogForm({ item, onClick }) {
  return (
    <div>
      <div
        className="flex w-full  flex-col justify-center border-2 rounded-xl bg-sky-400  mb-3 p-2"
        disabled={!item.completed}
      >
        <div className="flex w-full justify-center">
          {item.id}: {item.title}{" "}
        </div>
        <div className="flex justify-center">
          {" "}
          Completed -{" "}
          <div
            className={`flexbox justify-center ${
              item.completed ? "bg-green-500" : "bg-red-500"
            }`}
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
