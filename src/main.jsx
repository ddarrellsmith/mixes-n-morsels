import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

import App from "./App.jsx";
import { RecipesProvider } from "./context/RecipesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </HashRouter>
  </StrictMode>
);
