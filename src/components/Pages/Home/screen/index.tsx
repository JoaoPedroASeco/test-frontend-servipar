import Head from "next/head";
import { CreateProductModal } from "../components/CreateProductModal";

//Components
import { ProductsTable } from "../components/ProductsTable";

//Styles
import { HomeComponent, HomeContainer } from "./styles";

export const HomeScreen = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <HomeContainer>
        <HomeComponent>
          <ProductsTable />
        </HomeComponent>
      </HomeContainer>

      <CreateProductModal />
    </>
  );
};
