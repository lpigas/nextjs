import Head from "next/head";
import React from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";

export default function coctails(props) {
  return (
    <Layout>
      <div>
        {props.posts.map((item) => (
          <div
            key={item.body + item.title + item.id}
            className="flex border-4 flex-col"
          >
            <div>
              {item.id}.{item.title}
            </div>
            <div> {item.body}</div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  try {
    const datas = await axios.get("https://jsonplaceholder.typicode.com/posts");
    const posts = datas.data;
    return {
      props: {
        posts,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
}
