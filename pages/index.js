import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { COLORS } from "../components/atoms/Buttons/MyButton/MyButton";
import { SIZES } from "../components/atoms/Buttons/MyButton/MyButton";
import Button from "../components/atoms/Buttons/MyButton/MyButton";
import Clock from "../components/atoms/clock/Clock";

export default function Home() {
  const router = useRouter();
  const postsmove = () => {
    router.push("/");
  };

  const firstpostsmove = () => {
    router.push("/posts/first-post");
  };
  const blogmove = () => {
    router.push("/menu");
  };

  return (
    <Layout>
      <Head>
        <title> Home</title>
      </Head>
      <div className="min-w-full">
        <main>
          <div className="flex justify-around w-full mb-10">
            <Button size="lg" color="danger" onClick={postsmove}>Move Home</Button>
            <Button size="lg" color="danger" onClick={postsmove}>Move Post</Button>
            <Button size="lg" color="danger" onClick={blogmove}>Move Menu</Button>
          </div>


          <div className={"bottom-10 flex bg-black"}>
            <Clock />
          </div>
        </main>
      </div>
    </Layout>
  );
}
