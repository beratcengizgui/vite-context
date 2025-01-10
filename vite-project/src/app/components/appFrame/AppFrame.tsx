import MovieBarComponent from "./components/MovieBarComponent";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";


const AppFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      {isAuthenticated === true ? (
        <>
          <MovieBarComponent />
        </>
      ) : (
        <></>
      )}
      <div>{children}</div>
    </div>
  );
};

export default AppFrame;
