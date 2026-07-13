import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/theme.css";

import App from "./App.jsx";
import { RecipesProvider } from "./context/RecipesContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <RecipesProvider>
        <App />
      </RecipesProvider>
    </BrowserRouter>
  </StrictMode>
);
