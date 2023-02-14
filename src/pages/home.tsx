import { HomeScreen } from "@/components/Pages/Home/screen";
import { GetServerSideProps } from "next";
import { api } from "@/services/api";
import nookies from "nookies";

export default function Home({ products }: { products: string }) {
  return <HomeScreen products={products} />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Get token from server side
  const token = ctx.req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("acess_token="))
    ?.split("=")
    .pop();

  // If token is undefined
  if (!token || token === undefined) {
    nookies.set(ctx, "undefined_token", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    ctx.res.setHeader("location", "/");
    ctx.res.statusCode = 302;
    ctx.res.end();

    return {
      props: {},
    };
  }

  // fetching products
  try {
    const { data: products } = await api.get("/products", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: {
        products,
      },
    };
  } catch (error) {
    // if token is invalid
    nookies.set(ctx, "invalid_token", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    ctx.res.setHeader("location", "/");
    ctx.res.statusCode = 302;
    ctx.res.end();

    return {
      props: {},
    };
  }
};
