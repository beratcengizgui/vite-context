// import { GuiAppRouter } from "@guibil/router";
import { AppFrame } from "./components/AppFrame";
import { AppContextProvider } from "./contexts/ContextContainer";
export default function AppContainer() {
  return (
    <AppContextProvider>
      <AppFrame>
        <div>selam</div>
        {/* <GuiAppRouter
          documentTitle={{
            appName: "routes.app",
            seperator: " | ",
          }}
        /> */}
      </AppFrame>
    </AppContextProvider>
  );
}
