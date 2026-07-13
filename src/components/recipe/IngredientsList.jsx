export default function IngredientsList({ ingredients }) {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul className="list-unstyled">
        {ingredients.map((ingredient, i) => (
          <li key={i} className="d-flex align-items-start gap-2 mb-2">
            <span
              className="mt-2 rounded-circle flex-shrink-0"
              style={{ width: 6, height: 6, backgroundColor: "var(--terracotta)" }}
            />
            <span>{ingredient}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
