import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router";

import BackToCatalogLink from "../components/recipe/BackToCatalogLink.jsx";
import IngredientsList from "../components/recipe/IngredientsList.jsx";
import InstructionsList from "../components/recipe/InstructionsList.jsx";
import MetaRow from "../components/recipe/MetaRow.jsx";
import RecipeHero from "../components/recipe/RecipeHero.jsx";
import { useRecipes } from "../context/RecipesContext.jsx";

export default function RecipePage() {
  const { id } = useParams();
  const { getRecipeById } = useRecipes();
  const recipe = getRecipeById(id);

  if (!recipe) {
    return (
      <Container className="py-5 text-center">
        <BackToCatalogLink />
        <h2>Recipe not found</h2>
        <p className="text-muted">
          We couldn&apos;t find that recipe. It may have been removed.
        </p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <BackToCatalogLink />
      <RecipeHero recipe={recipe} />
      <MetaRow recipe={recipe} />
      <Row className="g-5 py-4">
        <Col xs={12} md={4}>
          <IngredientsList ingredients={recipe.ingredients} />
        </Col>
        <Col xs={12} md={8}>
          <InstructionsList instructions={recipe.instructions} />
        </Col>
      </Row>
    </Container>
  );
}
