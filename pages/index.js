import Layout from "../components/layout/Layout";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { COLORS } from "../components/atoms/Buttons/MyButton/MyButton";
import { SIZES } from "../components/atoms/Buttons/MyButton/MyButton";
import Button from '../components/atoms/Buttons/MyButton/MyButton'
import Clock from '../components/atoms/clock/Clock'


export default function Home() {
// console.log(SIZES)
  const router = useRouter();
  const postsmove = () => {
    router.push("/posts");
  };

  const firstpostsmove = () => {
    router.push("/posts/first-post");
  };
  const blogmove = () => {
    router.push("/blogs");
  };

  return (
    <Layout>
    <Head>
    <title> Home</title>
    </Head>
      <div className="">
        <main>
          <div className=''>

          {/* <Button  onClick={postsmove} >Move Post</Button> */}

          {/* <MyButton onClick={firstpostsmove}>Move firstPost</MyButton>

          <MyButton onClick={blogmove}>Move Blogs</MyButton>

          <MyButton onClick={blogmove} >Move Bloasdasdasdgs</MyButton> */}

          </div>


          <p className={'p-6 lg:p-8 flex gap-6 flex-col bg-black'}>© harmon.ie 2022</p>


          {/* <div className=''>
          <Image
            priority
            src="/images/profile.jpg"
            width={200}
            height={200}
            alt="blogmove"
            onClick={blogmove}
          ></Image>
          </div>
          <div class={"bottom-10 flex bg-black"}>
          <Clock/>

          </div> */}

        </main>
      </div>
    </Layout>
  );
}
