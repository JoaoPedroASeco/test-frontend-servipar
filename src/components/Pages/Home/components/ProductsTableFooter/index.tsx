import { useCallback, useContext, ChangeEvent } from "react";

//Styles
import { ProductsTableFooterContainer } from "./styles";

//Coponents
import { ThemeButton } from "@/components/General/Button";
import { ThemeInput } from "@/components/General/Input";
import { GeneralContext } from "@/contexts/GeneralContext";

export const ProductsTableFooter = () => {
  const {
    setIsCreateProductModalOpen,
    router,
    paginationsOps,
    setPaginationOps,
    pagesAmount,
  } = useContext(GeneralContext);

  const handleSetLimit = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      router.replace({
        query: { page: "1", limit: event.target.value },
      });

      setPaginationOps({
        page: "1",
        limit: event.target.value,
      });
    },
    [router, setPaginationOps]
  );

  const handleSetPage = useCallback(
    (page: string) => {
      router.replace({
        query: { page: page, limit: paginationsOps.limit },
      });
    },
    [paginationsOps, router]
  );

  return (
    <ProductsTableFooterContainer>
      <ThemeButton
        onclick={() => setIsCreateProductModalOpen(true)}
        type="button"
        style={{
          fontWeight: "normal",
          textTransform: "capitalize",
          height: "37px",
          fontSize: "0.875rem",
          letterSpacing: "unset",
          padding: "0 1rem",
        }}
      >
        Adicionar Produto
      </ThemeButton>

      <div className="pagination">
        <div className="limit">
          <span>Limit:</span>
          <ThemeInput
            name="limit"
            id="limit"
            type="select"
            onChange={handleSetLimit}
            value={paginationsOps.limit}
          >
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </ThemeInput>
        </div>

        <div className="page">
          <span>Page: </span>
          <ul>
            {new Array(pagesAmount).fill(" ").map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  handleSetPage((index + 1).toString());
                  setPaginationOps({
                    ...paginationsOps,
                    page: (index + 1).toString(),
                  });
                }}
                className={
                  index + 1 === parseInt(paginationsOps.page) ? "active" : ""
                }
              >
                {index + 1}
              </button>
            ))}
          </ul>
        </div>
      </div>
    </ProductsTableFooterContainer>
  );
};
