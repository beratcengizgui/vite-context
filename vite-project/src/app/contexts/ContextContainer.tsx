import React from "react";
import { MovieContextProvider } from "./MovieContext";
import { HttpClientProvider } from "./HttpClientContext";
import { AuthProvider } from "./AuthContext";
import "./styles.css";
import { LanguageProvider} from "./LanguageContext";
export const AppContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {

  return (
    <LanguageProvider>
      <HttpClientProvider>
        <AuthProvider>
          <MovieContextProvider>{children}</MovieContextProvider>
        </AuthProvider>
      </HttpClientProvider>
    </LanguageProvider>
  );
};
