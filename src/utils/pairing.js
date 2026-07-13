// Picks one random Morsel (snack) and one random Mix (drink) from the catalog.
export function pickRandomPairing(recipes) {
  const morsels = recipes.filter((r) => r.category === "Morsel");
  const mixes = recipes.filter((r) => r.category === "Mix");

  const morsel = morsels.length
    ? morsels[Math.floor(Math.random() * morsels.length)]
    : null;
  const mix = mixes.length ? mixes[Math.floor(Math.random() * mixes.length)] : null;

  return { morsel, mix };
}
