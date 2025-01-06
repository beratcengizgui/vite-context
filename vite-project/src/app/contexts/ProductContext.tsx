import React, { createContext, useContext, useState } from "react";

interface IProduct {
  id: string;
  name: string;
  price: number;
}

interface IProductContext {
  products: IProduct[];
  addProduct: (product: IProduct) => void;
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export const ProductContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<IProduct[]>([
    { id: "1", name: "Product A", price: 50 },
    { id: "2", name: "Product B", price: 100 },
  ]);

  const addProduct = (product: IProduct) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  return (
    <ProductContext.Provider value={{ products, addProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProductContext must be used within a ProductContextProvider");
  }
  return context;
};
