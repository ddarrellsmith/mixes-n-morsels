import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useSearchParams } from "react-router";

export default function FilterBar() {
  const [searchParams, setSearchParams] = useSearchParams();

  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setSearchParams(next);
  }

  return (
    <Form className="mb-4">
      <Row className="g-3">
        <Col xs={12} md={3}>
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={searchParams.get("category") || ""}
            onChange={(e) => updateParam("category", e.target.value)}
          >
            <option value="">All</option>
            <option value="Morsel">Morsel</option>
            <option value="Mix">Mix</option>
          </Form.Select>
        </Col>
        <Col xs={12} md={3}>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by author"
            value={searchParams.get("author") || ""}
            onChange={(e) => updateParam("author", e.target.value)}
          />
        </Col>
        <Col xs={12} md={3}>
          <Form.Label>Ingredient</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by ingredient"
            value={searchParams.get("ingredient") || ""}
            onChange={(e) => updateParam("ingredient", e.target.value)}
          />
        </Col>
        <Col xs={12} md={3}>
          <Form.Label>Keywords</Form.Label>
          <Form.Control
            type="text"
            placeholder="Search by keyword"
            value={searchParams.get("q") || ""}
            onChange={(e) => updateParam("q", e.target.value)}
          />
        </Col>
      </Row>
    </Form>
  );
}
