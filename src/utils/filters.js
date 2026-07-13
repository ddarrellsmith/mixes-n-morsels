// Filters recipes by category, keyword, author, ingredient substring, and free-text search.
// All filters are optional and combine with AND semantics; string filters are case-insensitive.
export function filterRecipes(recipes, { category, keyword, author, ingredient, q } = {}) {
  return recipes.filter((recipe) => {
    if (category && recipe.category !== category) return false;

    if (keyword) {
      const hasKeyword = recipe.keywords.some(
        (k) => k.toLowerCase() === keyword.toLowerCase()
      );
      if (!hasKeyword) return false;
    }

    if (author) {
      if (!recipe.author.toLowerCase().includes(author.toLowerCase())) return false;
    }

    if (ingredient) {
      const needle = ingredient.toLowerCase();
      const hasIngredient = recipe.ingredients.some((i) =>
        i.toLowerCase().includes(needle)
      );
      if (!hasIngredient) return false;
    }

    if (q) {
      const needle = q.toLowerCase();
      const haystack = [
        recipe.title,
        recipe.author,
        recipe.description,
        recipe.category,
        ...recipe.keywords,
        ...recipe.ingredients,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(needle)) return false;
    }

    return true;
  });
}

// Distinct keyword list across the catalog, for populating filter selects.
export function collectKeywords(recipes) {
  const set = new Set();
  recipes.forEach((r) => r.keywords.forEach((k) => set.add(k)));
  return Array.from(set).sort();
}
