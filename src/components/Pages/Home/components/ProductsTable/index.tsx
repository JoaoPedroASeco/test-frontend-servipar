//Coponents
import { ProductsTableFooter } from "../ProductsTableFooter";
import { ProductsTableHeader } from "../ProductsTableHeader";
import { ProductsTableList } from "../ProductsTableList";

//Styles
import { ProductTableContainer } from "./styles";

export const ProductsTable = () => {
  return (
    <ProductTableContainer>
      <ProductsTableHeader />
      <ProductsTableList />
      <ProductsTableFooter />
    </ProductTableContainer>
  );
};
