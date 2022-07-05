import Button from "../components/atoms/Buttons/MyButton/MyButton";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getSortedPostsData } from "../lib/menu";
import { useRouter } from "next/router";


export default function blogs({ allPostsData, pass }) {
  const router =useRouter()
  console.log(process.env.API_HOST)
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
      <div className="flex w-full justify-center items-center">
        <Button
          size="lg"
          color="danger"
          onClick={() => router.push("./menu/usersinfo")}
        >
          All Users Data
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
