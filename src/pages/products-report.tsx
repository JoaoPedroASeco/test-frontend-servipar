import { GetServerSideProps } from "next";
import { useContext, useEffect } from "react";

//Components
import { ProductsReportScreen } from "@/components/Pages/ProductsReport/screen";

//Libs
import nookies from "nookies";
import { api } from "@/services/api";

//Contexts
import { ProductType } from "@/contexts/GeneralContext";
import { ProductsReporContextProvider } from "@/contexts/ProductsReportContext";

export default function ProductsReport({
  products,
}: {
  products: ProductType[];
}) {
  return (
    <ProductsReporContextProvider>
      <ProductsReportScreen products={products} />
    </ProductsReporContextProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Get token from server side
  const token = ctx.req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("access_token="))
    ?.split("=")
    .pop();

  // Get user from server side
  const user = ctx.req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("user="))
    ?.split("=")
    .pop();

  // If user is undefined
  if (
    !user ||
    user === undefined ||
    !user.includes("%22bruno%40email.com%22")
  ) {
    nookies.set(ctx, "unauthorized_user", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
    ctx.res.setHeader("location", "/home");
    ctx.res.statusCode = 302;
    ctx.res.end();
  }

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
      props: {
        poroducts: [],
      },
    };
  }

  // fetching products
  try {
    const response = await api.get(`/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedProducts: ProductType[] = response.data.map(
      (product: ProductType) => {
        if (!product.name) {
          product.name = "Sem nome";
          return product;
        }
        return product;
      }
    );

    return {
      props: {
        products: parsedProducts,
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
      props: {
        props: {
          poroducts: [],
        },
      },
    };
  }
};
