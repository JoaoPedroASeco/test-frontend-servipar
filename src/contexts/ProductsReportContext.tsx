import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

//Types
import { ProductType } from "./GeneralContext";

type ProductReportContextType = {
  //Products
  allProducts: ProductType[];
  setAllProducts: (_: ProductType[]) => void;

  //Report Data
  reportData: {
    totalPrice: number;
    totalQuantity: number;
  };
};

export const ProductsReportContext = createContext(
  {} as ProductReportContextType
);

export const ProductsReporContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [allProducts, setAllProducts] = useState<ProductType[]>([]);
  const [reportData, setReportData] = useState<{
    totalPrice: number;
    totalQuantity: number;
  }>({
    totalPrice: 0,
    totalQuantity: 0,
  });

  useEffect(() => {
    const reduceReportData = allProducts.reduce(
      (counter, product) => {
        if (product.cost && product.quantity) {
          counter.totalPrice =
            Number(product.cost) * Number(product.quantity) +
            counter.totalPrice;
          counter.totalQuantity =
            Number(product.quantity) + counter.totalQuantity;
        }
        return counter;
      },
      { totalPrice: 0, totalQuantity: 0 }
    );

    setReportData({
      totalPrice: reduceReportData.totalPrice,
      totalQuantity: reduceReportData.totalQuantity,
    });
  }, [allProducts]);

  return (
    <ProductsReportContext.Provider
      value={{
        allProducts,
        setAllProducts,
        reportData,
      }}
    >
      {children}
    </ProductsReportContext.Provider>
  );
};
