import { createContext, useContext, useEffect, useState } from "react";

import { fetchRecipes, insertRecipe } from "../utils/supabase.js";

const RecipesContext = createContext(null);

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const remoteRecipes = await fetchRecipes();
        if (isMounted) {
          setRecipes(remoteRecipes);
        }
      } catch (fetchError) {
        console.error(fetchError);
        if (isMounted) {
          setError(fetchError);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  async function addRecipe(recipe) {
    const createdRecipe = await insertRecipe(recipe);
    setRecipes((prev) => [...prev, createdRecipe]);
    return createdRecipe;
  }

  function getRecipeById(id) {
    return recipes.find((r) => r.id === id);
  }

  const value = { recipes, addRecipe, getRecipeById, loading, error };

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error("useRecipes must be used within a RecipesProvider");
  return ctx;
}
