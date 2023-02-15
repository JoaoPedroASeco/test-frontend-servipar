import { useCallback, useContext, useState } from "react";

//Contexts
import { GeneralContext } from "@/contexts/GeneralContext";

//Styles
import { ProductsTableListContainer } from "./styled";

//Libs
import _ from "lodash";
import { BsArrowUp, BsArrowDown } from "react-icons/bs";
import { ThemeTable } from "@/components/General/Table";

//Mocks
const tableHeaderMock = [
  {
    name: "id",
    index: "id",
  },
  {
    name: "nome",
    index: "name",
  },
  {
    name: "preço",
    index: "cost",
  },
  {
    name: "quantidade",
    index: "quantity",
  },
  {
    name: "localidade",
    index: "locationId",
  },
  {
    name: "tipo",
    index: "familyId",
  },
];

export const ProductsTableList = () => {
  const { filteredProducts, locations, families } = useContext(GeneralContext);

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
    <ProductsTableListContainer>
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
            {_.orderBy(filteredProducts, orderBy.name, orderBy.order)?.map(
              (product) => (
                <tr key={product.id}>
                  <th className="id">{product.id}</th>
                  <th className="name">
                    {product.name ? product.name : "Sem nome"}
                  </th>
                  <th className="cost">
                    {product.cost
                      ? new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(Number(product.cost) / 100)
                      : new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        }).format(0)}
                  </th>
                  <th className="quantity">
                    {product.quantity ? Number(product.quantity) : 0}
                  </th>
                  <th className="locationId">
                    {product.locationId
                      ? locations.find(
                          (location) => location.id === product.locationId
                        )?.name
                      : "Sem localidade"}
                  </th>
                  <th className="familyId">
                    {product.familyId
                      ? families.find(
                          (family) => family.id === product.familyId
                        )?.name
                      : "Sem tipo"}
                  </th>
                </tr>
              )
            )}
          </>
        }
      />
    </ProductsTableListContainer>
  );
};
