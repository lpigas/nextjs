import React from "react";
import MyButton from "../../atoms/Buttons/MyButton/MyButton";

export default function PasswordBlock({ dataInput, setDataInput, onClick }) {
  return (
    <div className="bg-white p-4 rounded-xl flex justify-center flex-col">
      <div>
        <input
          type="text"
          className="border-2 border-black w-80 mb-3"
          value={dataInput.login}
          onChange={(e) =>
            setDataInput({ ...dataInput, login: e.target.value })
          }
          placeholder={"Enter your login"}
        ></input>{" "}
      </div>
      <div>
        <input
          type="password"
          className="border-2 border-black w-80"
          value={dataInput.password}
          onChange={(e) =>
            setDataInput({ ...dataInput, password: e.target.value })
          }
          placeholder={"Enter your password"}
        ></input>{" "}
        <div className="m-1 flex justify-between">
          <MyButton size="lg" color="danger" onClick={onClick}>
            LogIn
          </MyButton>
          <MyButton
            size="lg"
            color="danger"
            onClick={() => setDataInput({ login: "", password: "" })}
          >
            Reset
          </MyButton>
        </div>
      </div>
    </div>
  );
}
