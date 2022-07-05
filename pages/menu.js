import Button from "../components/atoms/Buttons/MyButton/MyButton";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getSortedPostsData } from "../lib/menu";
import { useRouter } from "next/router";
import MyModal from "../components/atoms/modal/MyModal";
import PasswordBlock from "../components/moleculs/PasswordBlock/PasswordBlock";
import axios from "axios";
import { validPass } from "../components/functions/validPass";
import ButtonClose from "../components/atoms/Buttons/ButtonClose/ButtonClose";
import Image from "next/image";

export default function blogs({ allPostsData, pass }) {
  const router = useRouter();
  const [modalPass, setModalPass] = useState(false);
  const [inputPass, setInputPass] = useState({ login: "", password: "" });
  const [modalError, setModalError] = useState(true);
  const testValidPass = () => {
    const validetePass = validPass(inputPass, pass);
    if (validetePass) {
      setInputPass({ login: "", password: "" });
      setModalPass(false);
      router.push("./menu/usersinfo");
    } else {
      setModalError(true);
    }
  };
  useEffect(() => {
    !modalPass && setInputPass({ login: "", password: "" });
  }, [modalPass]);

  console.log(pass);
  return (
    <Layout>
      <MyModal visible={modalPass} setVisible={setModalPass} width={400}>
        <PasswordBlock
          dataInput={inputPass}
          setDataInput={setInputPass}
          onClick={testValidPass}
        />
      </MyModal>
      <div>
        <MyModal
          visible={modalError}
          setVisible={setModalError}
          zindex={400}
          width={400}
        >
          <ButtonClose onClick={() => setModalError(false)} />
          <div className="text-xl text-center m-1">
            {" "}
            Wrong Login or Password<p>Try againe</p>
          </div>
          <div className="text-center my-2">
            <Image
              onClick={() => setModalError(false)}
              src={"https://cdn-icons-png.flaticon.com/512/1828/1828843.png"}
              width={30}
              height={30}
            ></Image>
          </div>
        </MyModal>
      </div>
      <div className="flex w-full">
        <section>
          <h2>Menu block</h2>
          <ul>
            {allPostsData.map(
              ({ id, date, title, names }) =>
                id !== "coctails.js" && (
                  <li key={id}>
                    {title}
                    <br />
                    {id}
                    <br />
                    {date}
                    <br />
                    {names}
                  </li>
                )
            )}
          </ul>
        </section>
      </div>
      <div className="flex w-full justify-center items-center">
        <Button size="lg" color="danger" onClick={() => setModalPass(true)}>
          All Users Data
        </Button>
      </div>
    </Layout>
  );
}
export async function getStaticProps() {
  try {
    const allPostsData = getSortedPostsData();
    const getApi = await axios.get(`${process.env.API_HOST}socials`);
    const pass = getApi.data;
    return {
      props: {
        allPostsData,
        pass,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
