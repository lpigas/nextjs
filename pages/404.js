import React from "react";
import Layout from "../components/layout/Layout";
import Image from "next/image";

export default function Er() {
  return (
    <Layout>
      <div className="flex flex-col justify-center w-full items-center">
        <div>
          <Image className="border-2 rounded-2xl" width={400} height={200} src="/images/errors.gif" />
        </div>
        <div>
          <h1 className="text-5xl bold">Not work!</h1>
        </div>
      </div>
    </Layout>
  );
}
