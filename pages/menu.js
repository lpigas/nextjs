import Button from "../components/atoms/Buttons/MyButton/MyButton";
import React from "react";
import Layout from "../components/layout/Layout";
import { getSortedPostsData } from "../lib/menu";


export default function blogs({ allPostsData }) {
  return (
    <Layout>
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
        <div  className="flex w-full justify-center items-center">
        <Button size="md" color="danger">
        <a className="hover:no-underline flex w-38 m-1 " href="/menu/coctails"> Coctails menu</a>
        </Button>
        </div>
    </Layout>
  );
}
export async function getStaticProps() {
  try {
    const allPostsData = getSortedPostsData();
    return {
      props: {
        allPostsData,
      },
    };
  } catch (e) {
    return {
      notFound: true,
    };
  }
}
