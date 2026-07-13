export default function RecipeHero({ recipe }) {
  return (
    <section className="text-center py-4">
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className="img-fluid rounded-4 mb-4"
        style={{ maxHeight: 380, width: "100%", objectFit: "cover" }}
      />
      <h1>{recipe.title}</h1>
    </section>
  );
}
