import { useMemo } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import RecipeCard from "../shared/RecipeCard.jsx";
import { useRecipes } from "../../context/RecipesContext.jsx";
import { pickRandomPairing } from "../../utils/pairing.js";

export default function FeaturedPairing() {
  const { recipes } = useRecipes();
  // useMemo with an empty dependency array picks one pairing per Homepage mount.
  const { morsel, mix } = useMemo(() => pickRandomPairing(recipes), []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!morsel && !mix) return null;

  return (
    <section className="py-5">
      <h2 className="text-center mb-4">Featured This Week</h2>
      <Row className="justify-content-center g-4">
        {morsel && (
          <Col xs={12} md={5}>
            <RecipeCard recipe={morsel} />
          </Col>
        )}
        {mix && (
          <Col xs={12} md={5}>
            <RecipeCard recipe={mix} />
          </Col>
        )}
      </Row>
    </section>
  );
}
