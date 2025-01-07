import React from "react";
import { AppContextProvider } from "./app/contexts/ContextContainer";
import MyRouter from "./app/store/MyRouter";
import AppFrame from "./app/components/appFrame/AppFrame";
import {
  HashRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
const App: React.FC = () => {
  return (
    <Router>
      <AppContextProvider>
        <AppFrame>
          <MyRouter />
        </AppFrame>
      </AppContextProvider>
    </Router>
  );
};

export default App;
