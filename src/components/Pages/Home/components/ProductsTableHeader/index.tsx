import { ChangeEvent, useContext, useEffect, useCallback } from "react";

//Components
import { ThemeInput } from "@/components/General/Input";

//Contexts
import { GeneralContext } from "@/contexts/GeneralContext";

//Styles
import { ProductsTableHeaderContainer } from "./styled";
import { ThemeButton } from "@/components/General/Button";

//Libs
import nookies, { destroyCookie } from "nookies";
import { toast } from "react-toastify";

export const ProductsTableHeader = () => {
  const { setProductFilterInput, productFilterInput, router, authorizedUser } =
    useContext(GeneralContext);

  const { cookies } = useContext(GeneralContext);

  useEffect(() => {
    if (cookies && cookies.unauthorized_user) {
      toast.error("Usuario sem Permissão");
      destroyCookie(null, "unauthorized_user");
    }
  }, [cookies]);

  const handleLogout = useCallback(() => {
    destroyCookie(null, "access_token");
    destroyCookie(null, "user");

    nookies.set(null, "logout", "true", {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    router.push("/");
  }, [router]);

  return (
    <ProductsTableHeaderContainer>
      <div className="title-search">
        <h1>
          <span>Listagem</span> de Produtos:
        </h1>

        <div>
          <ThemeInput
            style={{ width: "15vw" }}
            id="products-search"
            name="products-search"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setProductFilterInput(e.target.value)
            }
            placeholder="Nome do produto"
            value={productFilterInput}
          />
        </div>
      </div>

      <div className="report-logout">
        {cookies.user?.includes(authorizedUser) && (
          <ThemeButton
            onclick={() => router.push("/products-report")}
            style={{
              padding: "0 2rem",
            }}
          >
            Relatório de produtos
          </ThemeButton>
        )}
        <ThemeButton
          onclick={handleLogout}
          type="button"
          style={{
            padding: "0 2rem",
            backgroundColor: "#FD5E5E",
          }}
        >
          Sair
        </ThemeButton>
      </div>
    </ProductsTableHeaderContainer>
  );
};
