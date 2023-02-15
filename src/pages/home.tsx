import { useContext, useEffect } from "react";
import { GetServerSideProps } from "next";

//Libs
import { api } from "@/services/api";
import nookies from "nookies";

// Context & Types
import {
  FamilieType,
  GeneralContext,
  LocationType,
  ProductType,
} from "@/contexts/GeneralContext";

//Components
import { HomeScreen } from "@/components/Pages/Home/screen";

export default function Home({
  products,
  locations,
  families,
}: {
  products: ProductType[];
  locations: LocationType[];
  families: FamilieType[];
}) {
  const { setProducts, setFamilies, setLocations } = useContext(GeneralContext);

  useEffect(() => {
    setProducts(products);
    setFamilies(families);
    setLocations(locations);
  }, [products, setProducts, families, setFamilies, locations, setLocations]);

  return <HomeScreen />;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Get token from server side
  const token = ctx.req.headers.cookie
    ?.split(";")
    .find((c) => c.trim().startsWith("access_token="))
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
      props: {
        poroducts: [],
        locations: [],
        families: [],
      },
    };
  }

  // fetching products
  try {
    const response = await api.get(
      `/products${
        ctx.query.limit && ctx.query.limit?.length > 0
          ? `?_limit=${ctx.query.limit}`
          : "?_limit=20"
      }${
        ctx.query.page && ctx.query.page.length > 0
          ? `&_page=${ctx.query.page}`
          : ""
      }`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const parsedProducts: ProductType[] = response.data.map(
      (product: ProductType) => {
        if (!product.name) {
          product.name = "Sem nome";
          return product;
        }
        return product;
      }
    );

    const { data: locations } = await api.get("/locations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const { data: families } = await api.get("/families", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      props: {
        products: parsedProducts,
        locations,
        families,
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
          locations: [],
          families: [],
        },
      },
    };
  }
};
