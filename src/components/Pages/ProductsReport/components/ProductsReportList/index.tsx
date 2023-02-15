import { useCallback, useContext, useState } from "react";

//Contexts
import { ProductsReportContext } from "@/contexts/ProductsReportContext";

//Styles
import { ProductsReportListContainer } from "./styles";

//Libs
import _ from "lodash";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";

//Components
import { ThemeTable } from "@/components/General/Table";

//Mocks
const tableHeaderMock = [
  {
    name: "id",
    index: "id",
  },
  {
    name: "quantidade",
    index: "quantity",
  },
  {
    name: "preço total",
    index: "cost",
  },
];

export const ProductsReportList = () => {
  const { allProducts } = useContext(ProductsReportContext);

  const [orderBy, setOrderBy] = useState<{
    name: string;
    order: "asc" | "desc";
  }>({ name: "id", order: "asc" });

  const handleOrderBy = useCallback(
    (name: string) => {
      if (orderBy.order === "asc") {
        setOrderBy({ name, order: "desc" });
      } else {
        setOrderBy({ name, order: "asc" });
      }
    },
    [orderBy.order]
  );

  return (
    <ProductsReportListContainer>
      <ThemeTable
        theadChildren={
          <>
            {tableHeaderMock.map(({ index, name }) => (
              <th key={index} className={index}>
                <button onClick={() => handleOrderBy(index)} type="button">
                  {name}

                  {orderBy.name === index && orderBy.order === "asc" && (
                    <BsArrowUp width={16} height={16} />
                  )}
                  {orderBy.name === index && orderBy.order === "desc" && (
                    <BsArrowDown width={16} height={16} />
                  )}
                </button>
              </th>
            ))}
          </>
        }
        tbodyChildren={
          <>
            {_.orderBy(allProducts, orderBy.name, orderBy.order)?.map(
              (product) => (
                <tr key={product.id}>
                  <th className="id">{product.id}</th>
                  <th className="quantity">
                    {product.quantity ? Number(product.quantity) : 0}
                  </th>
                  <th className="cost">
                    {product.cost
                      ? new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(
                          (Number(product.cost) / 100) *
                            Number(product.quantity)
                        )
                      : new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(0)}
                  </th>
                </tr>
              )
            )}
          </>
        }
      />
    </ProductsReportListContainer>
  );
};
