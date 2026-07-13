import { useMemo } from "react";
import Container from "react-bootstrap/Container";
import { useSearchParams } from "react-router";

import FilterBar from "../components/catalog/FilterBar.jsx";
import RecipeGrid from "../components/catalog/RecipeGrid.jsx";
import { useRecipes } from "../context/RecipesContext.jsx";
import { filterRecipes } from "../utils/filters.js";

export default function CatalogPage() {
  const { recipes } = useRecipes();
  const [searchParams] = useSearchParams();

  const filters = {
    category: searchParams.get("category") || "",
    keyword: searchParams.get("keyword") || "",
    author: searchParams.get("author") || "",
    ingredient: searchParams.get("ingredient") || "",
    q: searchParams.get("q") || "",
  };

  const filtered = useMemo(() => filterRecipes(recipes, filters), [recipes, searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Recipe Catalog</h1>
      <FilterBar />
      <RecipeGrid recipes={filtered} />
    </Container>
  );
}
