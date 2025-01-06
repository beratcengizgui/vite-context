import React from "react";
import { AppContextProvider } from "./app/contexts/ContextContainer";
import MyRouter from "./app/store/MyRouter";
import AppFrame from "./app/components/appFrame/AppFrame";
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
