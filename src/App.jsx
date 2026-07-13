import { Route, Routes } from "react-router";

import Footer from "./components/layout/Footer.jsx";
import NavBar from "./components/layout/NavBar.jsx";
import CatalogPage from "./pages/CatalogPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import SubmitPage from "./pages/SubmitPage.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/submit" element={<SubmitPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
