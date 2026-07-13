import { createContext, useContext, useMemo, useState } from "react";

import { seedRecipes } from "../data/seedRecipes.js";
import { loadUserRecipes, saveUserRecipes } from "../utils/storage.js";

const RecipesContext = createContext(null);

export function RecipesProvider({ children }) {
  const [userRecipes, setUserRecipes] = useState(() => loadUserRecipes());

  const recipes = useMemo(() => [...seedRecipes, ...userRecipes], [userRecipes]);

  function addRecipe(recipe) {
    const newRecipe = { id: crypto.randomUUID(), ...recipe };
    const next = [...userRecipes, newRecipe];
    setUserRecipes(next);
    saveUserRecipes(next);
    return newRecipe;
  }

  function getRecipeById(id) {
    return recipes.find((r) => r.id === id);
  }

  const value = { recipes, addRecipe, getRecipeById };

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error("useRecipes must be used within a RecipesProvider");
  return ctx;
}
