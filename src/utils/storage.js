const STORAGE_KEY = "moreselsAndMixes:userRecipes";

export function loadUserRecipes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveUserRecipes(recipes) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
}

export function mergeRecipes(remoteRecipes = [], localRecipes = []) {
  const seenIds = new Set();
  const merged = [];

  for (const recipe of [...remoteRecipes, ...localRecipes]) {
    const normalizedId = String(recipe?.id ?? "").trim();
    if (!normalizedId || seenIds.has(normalizedId)) {
      continue;
    }

    seenIds.add(normalizedId);
    merged.push(recipe);
  }

  return merged;
}
