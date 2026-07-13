import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import RecipeCard from "../shared/RecipeCard.jsx";

export default function RecipeGrid({ recipes }) {
  if (recipes.length === 0) {
    return <p className="text-center text-muted py-5">No recipes match those filters.</p>;
  }

  return (
    <Row className="g-4">
      {recipes.map((recipe) => (
        <Col xs={12} md={6} lg={4} key={recipe.id}>
          <RecipeCard recipe={recipe} />
        </Col>
      ))}
    </Row>
  );
}
