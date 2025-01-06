import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // BrowserRouter kullanıyoruz
import { AppContextProvider } from "./app/contexts/ContextContainer";
import UserPage from "./app/pages/UserPage";
import ImagePage from "./app/pages/ImagePage";
import MyRouter from "./app/store/MyRouter";
import AppFrame from "./app/components/appFrame/AppFrame";
import { AuthProvider } from "./app/contexts/AuthContext";
const App: React.FC = () => {
  return (
    <AppContextProvider>
      <AppFrame>
        <MyRouter />
      </AppFrame>
    </AppContextProvider>
  );
};

export default App;
