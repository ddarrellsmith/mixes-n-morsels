import Card from "react-bootstrap/Card";
import { Link } from "react-router";

import CategoryBadge from "./CategoryBadge.jsx";
import KeywordBadge from "./KeywordBadge.jsx";

export default function RecipeCard({ recipe }) {
  return (
    <Card as={Link} to={`/recipe/${recipe.id}`} className="recipe-card">
      <Card.Img variant="top" src={recipe.imageUrl} alt={recipe.title} />
      <Card.Body>
        <div className="d-flex gap-2 mb-2">
          <CategoryBadge category={recipe.category} />
          {recipe.keywords.map((k) => (
            <KeywordBadge key={k} keyword={k} />
          ))}
        </div>
        <Card.Title>{recipe.title}</Card.Title>
        <div className="card-author mb-2">By {recipe.author}</div>
        <Card.Text className="card-description">{recipe.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
