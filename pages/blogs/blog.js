import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import Button from "../../components/atoms/Buttons/MyButton/MyButton";
import axios from "axios";
import { BASE_URL } from "../../components/constants/consturl";
import { urlmaker } from "../../components/functions/urlmaker";

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
    `todos?_limit=${router.query._limit}&_page=${+router.query._page}`
  );

  const changeData = async () => {
    try {
      const datas = await axios.get(BASE_URL + fullQuery);
      setTodosData(datas.data);
    } catch {
      return {
        notFound: true,
      };
    }
  };

  useEffect(() => {
    router.push(`?_limit=${10}&_page=${1}`);
  }, []);
  useEffect(() => {
    setNumPage(router.query._page);
    setNumLimit(router.query._limit);
    setFullQuery(
      `todos?_limit=${router.query._limit}&_page=${+router.query._page}`
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
  };
  return (
    <Layout>
      <div className="flex flex-col w-full">
        <div className="w-full flex justify-center text-4xl">
          <p className="bg-red-800 m-4 w-28 flex justify-center">
            {totalBlogs}
          </p>
        </div>
        {todosData.map((item) => (
          <div
            className="flex w-full  flex-col justify-center border-4"
            disabled={!item.completed}
            key={item.userId + item.id + item.title}
          >
            <div className="flex w-full  justify-center">
              {item.id}: {item.title}{" "}
            </div>
            <div className="flex  justify-center">
              {" "}
              Completed -{" "}
              <p
                className={`${
                  item.completed ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.completed.toString()}
              </p>
            </div>
            <div className="flex  justify-center">
              <Button
                disabled={!item.completed}
                onClick={() => deletedblog(item)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
        <div className="flex justify-center w-full bg-orange-700">
          page num = {numPage} from {totalPages}
        </div>
        <div className="flex justify-center w-full ">
          <Button onClick={minusPage}> page - 1</Button>
          <Button onClick={addPage}> page + 1</Button>
        </div>
        <div className="flex justify-center w-full bg-orange-700">
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
  const dataUrl = urlmaker("todos?_limit=10&_page=1");
  const dataUrlLenght = urlmaker("todos");
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
