import React from "react";
import Head from "next/head";
import Navigate from "./components/Navigate";
import Footer from "./components/Footer";


export default function Layout({ children }) {
  return (
    <div>
      <Head>Navigation</Head>
      <header>
        <Navigate />
      </header>
      <div className='flex w-full min-h-[38vh]'>{children}</div>
      <footer className='w-full flex justify-center items-center mt-2'>
        <Footer />
      </footer>
    </div>
  );
}
