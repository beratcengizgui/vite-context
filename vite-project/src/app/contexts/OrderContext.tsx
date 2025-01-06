import React, { createContext, useContext, useState } from "react";

interface IOrder {
  id: string;
  items: { id: string; name: string; price: number; quantity: number }[];
  total: number;
  date: string;
}

interface IOrderContext {
  orders: IOrder[];
  addOrder: (order: IOrder) => void;
}

const OrderContext = createContext<IOrderContext | undefined>(undefined);

export const OrderContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);

  const addOrder = (order: IOrder) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrderContext = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrderContext must be used within an OrderContextProvider");
  }
  return context;
};
