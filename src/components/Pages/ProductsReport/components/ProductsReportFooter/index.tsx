import { useContext } from "react";

//Styles
import { ProductsReportFooterContainer } from "./styles";

//Contexts
import { ProductsReportContext } from "@/contexts/ProductsReportContext";

export const ProductsReportFooter = () => {
  const { reportData } = useContext(ProductsReportContext);
  return (
    <ProductsReportFooterContainer>
      <div className="quantity">
        Quantidade Total: <span>{reportData.totalQuantity}</span>
      </div>
      <div className="price">
        Preço Total:{" "}
        <span>
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(reportData.totalPrice / 100)}
        </span>
      </div>
    </ProductsReportFooterContainer>
  );
};
