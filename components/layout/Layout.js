import React from "react";
import Head from "next/head";
import Navigate from "./components/Navigate";
import Footer from "./components/Footer";
import { useRouter } from "next/router";
import { pageName } from "../functions/titlefound";

export default function Layout({ children }) {
  const router = useRouter();
  const titleFound = pageName(router);
  return (
    <div className="blockr p-2">
      <Head>
        <title>{titleFound}</title>
      </Head>
      <header>
        <Navigate />
      </header>
      <div className="flex  w-11/12 m-auto min-h-[50vh]">{children}</div>
      <footer className="w-full flex items-center mt-2">
        <Footer />
      </footer>
    </div>
  );
}
