const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://oqvpuqscwaqvkrddrhgp.supabase.co";
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

function requireApiKey() {
  if (!SUPABASE_KEY) {
    throw new Error("Missing VITE_SUPABASE_KEY. Add it to your .env file.");
  }
}

const headers = () => ({
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  Accept: "application/json",
  "Content-Type": "application/json",
});

export function normalizeRecipe(recipe = {}) {
  if (!recipe || typeof recipe !== "object") {
    return recipe;
  }

  const keywords = Array.isArray(recipe.keywords)
    ? recipe.keywords
    : typeof recipe.keywords === "string" && recipe.keywords.trim()
      ? recipe.keywords.split(",").map((keyword) => keyword.trim()).filter(Boolean)
      : [];

  return {
    ...recipe,
    id: recipe.id ?? recipe.recipe_id,
    title: recipe.title ?? recipe.recipe_name ?? recipe.name ?? "",
    author: recipe.author ?? "",
    category: recipe.category ?? "",
    keywords,
    description: recipe.description ?? "",
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
    imageUrl: recipe.imageUrl ?? recipe.recipe_image ?? recipe.image_url ?? recipe.image ?? "",
    videoUrl: recipe.videoUrl ?? recipe.video_link ?? recipe.video_url ?? recipe.video ?? undefined,
    prepTime: recipe.prepTime ?? recipe.prep_time ?? "",
    servings: recipe.servings ?? "",
  };
}

function toApiRecipe(recipe = {}) {
  const payload = {
    recipe_name: recipe.title ?? recipe.recipe_name ?? "",
    author: recipe.author ?? "",
    category: recipe.category ?? "",
    keywords: Array.isArray(recipe.keywords) ? recipe.keywords : [],
    description: recipe.description ?? "",
    ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
    instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
    recipe_image: recipe.imageUrl ?? recipe.recipe_image ?? "",
    video_link: recipe.videoUrl ?? recipe.video_link ?? null,
    prep_time: recipe.prepTime ?? recipe.prep_time ?? "",
    servings: recipe.servings ?? "",
  };

  if (recipe.id !== undefined) {
    payload.id = recipe.id;
  }

  return payload;
}

export async function fetchRecipes() {
  requireApiKey();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/recipes?select=*`, {
    headers: headers(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase fetch failed: ${response.status} ${body}`);
  }

  const recipes = await response.json();
  return Array.isArray(recipes) ? recipes.map(normalizeRecipe) : [];
}

export async function insertRecipe(recipe) {
  requireApiKey();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/recipes`, {
    method: "POST",
    headers: {
      ...headers(),
      Prefer: "return=representation",
    },
    body: JSON.stringify(toApiRecipe(recipe)),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase insert failed: ${response.status} ${body}`);
  }

  const result = await response.json();
  const createdRecipe = Array.isArray(result) ? result[0] : result;
  return normalizeRecipe(createdRecipe);
}
