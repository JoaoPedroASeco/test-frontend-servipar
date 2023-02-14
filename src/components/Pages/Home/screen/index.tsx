import { api } from "@/services/api";
import Head from "next/head";
import { useEffect, useState } from "react";

export const HomeScreen = ({ products }: { products: any }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <div>
        {products.map((product: any) => (
          <li key={product.id}>{product.id}</li>
        ))}
      </div>
    </>
  );
};
