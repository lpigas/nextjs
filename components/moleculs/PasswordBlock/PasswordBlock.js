import React from "react";
import MyButton from "../../atoms/Buttons/MyButton/MyButton";
import { useRouter } from "next/router";

export default function PasswordBlock({
  dataInput,
  setDataInput,
  onClick,
  onClickBack,
}) {
  const router = useRouter;
  return (
    <div className="bg-white rounded-xl flex justify-center flex-col">
      <div className="text-center">
        <input
          type="text"
          className="border-2 border-black w-80 m-3"
          value={dataInput.login}
          onChange={(e) =>
            setDataInput({ ...dataInput, login: e.target.value })
          }
          placeholder={"Enter your login"}
        ></input>{" "}
      </div>
      <div className="text-center">
        <input
          type="password"
          className="border-2 border-black w-80 m-3"
          value={dataInput.password}
          onChange={(e) =>
            setDataInput({ ...dataInput, password: e.target.value })
          }
          placeholder={"Enter your password"}
        ></input>{" "}
        <div className="m-1 flex justify-end">
          <MyButton size="lg" color="danger" onClick={onClick}>
            LogIn
          </MyButton>
          <MyButton size="lg" color="danger" onClick={onClickBack}>
            Back
          </MyButton>
        </div>
      </div>
    </div>
  );
}
