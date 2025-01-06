import React from "react";
import { UserContextProvider } from "./UserContext";
import { CartContextProvider } from "./CartContext";
import { ProductContextProvider } from "./ProductContext";
import { OrderContextProvider } from "./OrderContext";
import { HttpClientProvider } from "./HttpClientContext";
import { AuthProvider } from "./AuthContext";
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <HttpClientProvider>
      <AuthProvider>
        <UserContextProvider>
          <CartContextProvider>
            <ProductContextProvider>
              <OrderContextProvider>{children}</OrderContextProvider>
            </ProductContextProvider>
          </CartContextProvider>
        </UserContextProvider>
      </AuthProvider>
    </HttpClientProvider>
  );
};
