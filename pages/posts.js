import React from "react";
import Link from "next/link";
import Layout from "../components/layout/Layout";

export default function posts() {
  return (
    <Layout>
      <h1>
        <Link href="/posts/first-post">to first post</Link>
      </h1>
    </Layout>
  );
}
