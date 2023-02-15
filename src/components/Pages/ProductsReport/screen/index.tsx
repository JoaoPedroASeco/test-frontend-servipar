import { useEffect, useContext } from "react";
import Head from "next/head";

//Styles
import { ProductsReportComponent, ProductsReportContainer } from "./styles";

//Components
import { ProductsReportHeader } from "../components/ProductsReportHeader";
import { ProductsReportList } from "../components/ProductsReportList";

//Contexts & types
import { GeneralContext, ProductType } from "@/contexts/GeneralContext";
import { ProductsReportContext } from "@/contexts/ProductsReportContext";
import { ProductsReportFooter } from "../components/ProductsReportFooter";

export const ProductsReportScreen = ({
  products,
}: {
  products: ProductType[];
}) => {
  const { setAllProducts } = useContext(ProductsReportContext);
  const { ElementRef } = useContext(GeneralContext);

  useEffect(() => {
    setAllProducts(products);
  }, [setAllProducts, products]);

  return (
    <>
      <Head>
        <title>Relatório</title>
      </Head>

      <ProductsReportContainer>
        <ProductsReportComponent ref={ElementRef}>
          <ProductsReportHeader />
          <ProductsReportList />
          <ProductsReportFooter />
        </ProductsReportComponent>
      </ProductsReportContainer>
    </>
  );
};
