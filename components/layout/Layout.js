import React from "react";
import Head from "next/head";
import Navigate from "./components/Navigate";
import Footer from "./components/Footer";
import styles from './layout.module.css';

export default function Layout({ children }) {

  return (
    <div>
      <Head>Navigation</Head>
      <header>
        <Navigate />
      </header>
      <div className={styles.containers}>{children}</div>
      <footer className={styles.footer}>
        <Footer />
      </footer>
    </div>
  );
}
