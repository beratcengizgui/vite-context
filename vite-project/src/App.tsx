import React from "react";
import { AppContextProvider } from "./app/contexts/ContextContainer";
import MovieRouter from "./app/store/MovieRouter";
import AppFrame from "./app/components/appFrame/AppFrame";
import {
  HashRouter as Router,
} from "react-router-dom";
const App: React.FC = () => {
  return (
    <Router>
      <AppContextProvider>
        <AppFrame>
          <MovieRouter />
        </AppFrame>
      </AppContextProvider>
    </Router>
  );
};

export default App;
