import {
  createContext,
  ReactNode,
  useMemo,
  useState,
  useEffect,
  useCallback,
  useRef,
  MutableRefObject,
  RefObject,
} from "react";
import { NextRouter, useRouter } from "next/router";

//Libs
import { parseCookies } from "nookies";
import _ from "lodash";
import { api } from "@/services/api";

//Types
export type ProductType = {
  id: number;
  name: string;
  cost: number;
  quantity: number;
  locationId: number;
  familyId: number;
};

export type LocationType = {
  id: number;
  name: string;
};

export type FamilieType = {
  id: number;
  name: string;
};

export type TransactionType = {
  id: number;
  cost: number;
  quantity: number;
  productId: number;
};

type GeneralContextType = {
  //Products
  products: ProductType[];
  filteredProducts: ProductType[];
  setProducts: (_: ProductType[]) => void;
  setProductFilterInput: (_: string) => void;
  productFilterInput: string;
  isCreateProductModalOpen: boolean;
  setIsCreateProductModalOpen: (_: boolean) => void;

  //Locations
  locations: LocationType[];
  setLocations: (_: LocationType[]) => void;

  //Families
  families: FamilieType[];
  setFamilies: (_: FamilieType[]) => void;

  //Transactions
  transactions: TransactionType[];
  setTransactions: (_: TransactionType[]) => void;

  //Pgination
  productsLength: number;
  setProductsLength: (_: number) => void;
  setPagesAmount: (_: number) => void;
  setPaginationOps: (_: { page: string; limit: string }) => void;
  pagesAmount: number;
  paginationsOps: {
    page: string;
    limit: string;
  };
  //Cookies
  cookies: { [key: string]: string };
  token: string;

  //router
  router: NextRouter;

  //Autorized User
  authorizedUser: string;

  //Element Ref
  ElementRef: RefObject<HTMLDivElement>;
};

export const GeneralContext = createContext({} as GeneralContextType);

export const GeneralContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [locations, setLocations] = useState<LocationType[]>([]);
  const [families, setFamilies] = useState<FamilieType[]>([]);
  const [transactions, setTransactions] = useState<TransactionType[]>([]);

  //router
  const router = useRouter();

  //Cookies/Tokens
  const cookies = parseCookies();
  const token = cookies.access_token;

  //Pagination
  const [productsLength, setProductsLength] = useState(0);
  const [pagesAmount, setPagesAmount] = useState(0);
  const [paginationsOps, setPaginationOps] = useState({
    page: "1",
    limit: "20",
  });

  //Input
  const [productFilterInput, setProductFilterInput] = useState("");

  //Modals
  const [isCreateProductModalOpen, setIsCreateProductModalOpen] =
    useState(false);

  //Authorizes User
  const authorizedUser = "bruno@email.com";

  //Ref
  const ElementRef = useRef<HTMLDivElement>(null);

  const filteredProducts = useMemo(() => {
    if (products?.length) {
      return _.orderBy(products, "name", "asc").filter((product) =>
        product.name?.includes(productFilterInput)
      );
    }
    return [];
  }, [productFilterInput, products]);

  const fetchLenghtOfProducts = useCallback(async () => {
    try {
      const { data } = await api.get("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProductsLength(data.length);
    } catch (error: any) {
      console.log(error);
    }
  }, [token, setProductsLength]);

  useEffect(() => {
    fetchLenghtOfProducts();
  }, [fetchLenghtOfProducts]);

  useEffect(() => {
    if (!router.query.limit && !router.query.page) {
      router.replace({
        query: { page: paginationsOps.page, limit: paginationsOps.limit },
      });
    }
  }, [paginationsOps.limit, paginationsOps.page, router]);

  useEffect(() => {
    const rest = productsLength / parseInt(paginationsOps.limit);
    setPagesAmount(Math.ceil(rest));
  }, [paginationsOps, productsLength, setPagesAmount]);

  return (
    <GeneralContext.Provider
      value={{
        products,
        setProducts,
        families,
        locations,
        setFamilies,
        setLocations,
        setTransactions,
        transactions,
        filteredProducts,
        setProductFilterInput,
        productFilterInput,
        isCreateProductModalOpen,
        setIsCreateProductModalOpen,
        cookies,
        pagesAmount,
        paginationsOps,
        productsLength,
        router,
        token,
        setPagesAmount,
        setPaginationOps,
        setProductsLength,
        authorizedUser,
        ElementRef,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};
