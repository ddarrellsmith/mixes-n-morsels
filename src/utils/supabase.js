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

export async function fetchRecipes() {
  requireApiKey();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/recipes?select=*`, {
    headers: headers(),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase fetch failed: ${response.status} ${body}`);
  }

  return response.json();
}

export async function insertRecipe(recipe) {
  requireApiKey();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/recipes`, {
    method: "POST",
    headers: {
      ...headers(),
      Prefer: "return=representation",
    },
    body: JSON.stringify(recipe),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Supabase insert failed: ${response.status} ${body}`);
  }

  const result = await response.json();
  return result[0];
}
