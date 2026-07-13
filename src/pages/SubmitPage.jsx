import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

import RecipeForm from "../components/submit/RecipeForm.jsx";

export default function SubmitPage() {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-2">Submit Your Recipe</h1>
      <p className="text-center text-muted mb-5">
        Share your favorite morsel or mix with the community.
      </p>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={6}>
          <RecipeForm />
        </Col>
      </Row>
    </Container>
  );
}
