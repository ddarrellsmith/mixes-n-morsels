import { createContext, useContext, useEffect, useState } from "react";

import { fetchRecipes } from "../utils/supabase.js";
import { loadUserRecipes, saveUserRecipes, mergeRecipes } from "../utils/storage.js";

const RecipesContext = createContext(null);

function normalizeRecipeId(value) {
  return String(value ?? "").trim().toLowerCase();
}

function matchesRecipeId(recipe, candidateId) {
  if (!recipe || candidateId === undefined || candidateId === null) {
    return false;
  }

  return normalizeRecipeId(recipe.id) === normalizeRecipeId(candidateId);
}

export function RecipesProvider({ children }) {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        const remoteRecipes = await fetchRecipes();
        const localRecipes = loadUserRecipes();
        if (isMounted) {
          setRecipes(mergeRecipes(remoteRecipes, localRecipes));
        }
      } catch (fetchError) {
        console.error(fetchError);
        const fallbackLocalRecipes = loadUserRecipes();
        if (isMounted) {
          setRecipes(fallbackLocalRecipes);
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

  function addRecipe(recipe) {
    const createdRecipe = {
      ...recipe,
      id: `local-${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: recipe.title ?? recipe.recipe_name ?? "Untitled Recipe",
      author: recipe.author ?? "",
      category: recipe.category ?? "Morsel",
      keywords: Array.isArray(recipe.keywords) ? recipe.keywords : [],
      description: recipe.description ?? "",
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
      imageUrl: recipe.imageUrl ?? recipe.recipe_image ?? "",
      videoUrl: recipe.videoUrl ?? recipe.video_link ?? undefined,
      prepTime: recipe.prepTime ?? recipe.prep_time ?? "",
      servings: recipe.servings ?? "",
    };

    const nextLocalRecipes = [createdRecipe, ...loadUserRecipes()];
    saveUserRecipes(nextLocalRecipes);
    setRecipes((prev) => mergeRecipes(prev, [createdRecipe]));
    return createdRecipe;
  }

  function getRecipeById(id) {
    return recipes.find((recipe) => matchesRecipeId(recipe, id));
  }

  const value = { recipes, addRecipe, getRecipeById, loading, error };

  return <RecipesContext.Provider value={value}>{children}</RecipesContext.Provider>;
}

export function useRecipes() {
  const ctx = useContext(RecipesContext);
  if (!ctx) throw new Error("useRecipes must be used within a RecipesProvider");
  return ctx;
}
