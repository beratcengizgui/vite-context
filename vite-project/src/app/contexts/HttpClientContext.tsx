import React, { createContext, useContext } from "react";
import httpClient from "../scripts/httpClient";

interface IHttpClientContext {
  httpClient: typeof httpClient;
}

const HttpClientContext = createContext<IHttpClientContext | undefined>(undefined);

export const HttpClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <HttpClientContext.Provider value={{ httpClient }}>
      {children}
    </HttpClientContext.Provider>
  );
};

export const useHttpClient = () => {
  const context = useContext(HttpClientContext);
  if (!context) {
    throw new Error("useHttpClient must be used within an HttpClientProvider");
  }
  return context.httpClient;
};
