import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import Button from "../../components/atoms/Buttons/MyButton/MyButton";
import axios from "axios";
import BlogForm from "../../scenes/blog/BlogForm";

export default function blog(props) {
  const router = useRouter();
  const limit = ["10", "20", "50", "100"];
  const [numPage, setNumPage] = useState(+router.query._page);
  const [numLimit, setNumLimit] = useState(+router.query._limit);
  const [indexLimit, setIndexLimit] = useState(0);
  const [todosData, setTodosData] = useState(props.posts);
  const [totalBlogs, setTotalBlogs] = useState(props.dataLength.length);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalBlogs / numLimit)
  );
  const [fullQuery, setFullQuery] = useState(
    `/todos?_limit=${router.query._limit}&_page=${+router.query._page}`
  );
  const changeData = async () => {
    try {
      const datas = await axios.get(`${process.env.API_DATAS}${fullQuery}`);
      setTodosData(datas.data);
    } catch {
      return {
        notFound: true,
      };
    }
  };

  useEffect(() => {
    router.push(
      `?_limit=${+router.query._limit || 10}&_page=${+router.query._page || 1}`
    );
    setNumLimit(+router.query._limit);
  }, []);
  useEffect(() => {
    setNumPage(router.query._page);
    setNumLimit(router.query._limit);
    Math.ceil(totalBlogs / numLimit);
    setFullQuery(
      `/todos?_limit=${router.query._limit}&_page=${+router.query._page}`
    );
  }, [router]);
  useEffect(() => {
    numPage > totalPages &&
      router.push(`?_limit=${router.query._limit}&_page=${totalPages}`);
    setTotalPages(Math.ceil(totalBlogs / numLimit));
    changeData();
  }, [numPage, numLimit]);

  const addPage = () => {
    numPage < totalPages &&
      router.push(
        `?_limit=${router.query._limit}&_page=${+router.query._page + 1}`
      );
  };
  const minusPage = () => {
    numPage > 1 &&
      router.push(
        `?_limit=${router.query._limit}&_page=${+router.query._page - 1}`
      );
  };
  const addlimit = () => {
    if (indexLimit < limit.length - 1) {
      router.push(
        `?_limit=${limit[indexLimit + 1]}&_page=${router.query._page}`
      );
      setIndexLimit(indexLimit + 1);
    }
  };
  const minusLimit = () => {
    if (indexLimit > 0) {
      router.push(
        `?_limit=${limit[indexLimit - 1]}&_page=${router.query._page}`
      );
      setIndexLimit(indexLimit - 1);
    }
  };
  const deletedblog = (e) => {
    alert(e.title);
    setTotalBlogs(totalBlogs - 1);
    setTotalPages(Math.ceil(totalBlogs / numLimit));
  };

  return (
    <Layout>
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-center text-4xl">
          <p className="bg-white m-4 w-28 flex justify-center ">{totalBlogs}</p>
        </div>
        {todosData.map((item) => (
          <div key={Math.random() * 13214864}>
            <BlogForm item={item} onClick={deletedblog} />
          </div>
        ))}
        <div className="flex justify-center w-10/12 bg-sky-400 m-auto my-5 ">
          page num = {numPage} from {totalPages}
        </div>
        <div className="flex justify-center w-full ">
          <Button onClick={minusPage}> page - 1</Button>
          <Button onClick={addPage}> page + 1</Button>
        </div>
        <div className="flex justify-center w-10/12 bg-sky-400 m-auto my-5 ">
          limit = {numLimit}
        </div>
        <div className="flex justify-center w-full ">
          <Button onClick={minusLimit}> Limit - </Button>
          <Button onClick={addlimit}> Limit +</Button>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const dataUrl = `${process.env.API_DATAS}/todos?_limit=10&_page=1`;
  const dataUrlLenght = `${process.env.API_DATAS}/posts`;
  try {
    const datas = await axios.get(dataUrl);
    const posts = datas.data;
    const datasLength = await axios.get(dataUrlLenght);
    const dataLength = datasLength.data;

    return {
      props: {
        dataLength,
        posts,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
