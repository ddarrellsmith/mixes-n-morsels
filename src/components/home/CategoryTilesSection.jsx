import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import CategoryTile from "../shared/CategoryTile.jsx";

const TILES = [
  { label: "Morsels", to: "/catalog?category=Morsel", color: "#CA5D34" },
  { label: "Mixes", to: "/catalog?category=Mix", color: "#A9703E" },
  { label: "Chocolate", to: "/catalog?keyword=Chocolate", color: "#5D3625" },
  { label: "Savory", to: "/catalog?keyword=Savory", color: "#8B6239" },
];

export default function CategoryTilesSection() {
  return (
    <section className="pb-5">
      <h2 className="text-center mb-4">Browse by Category</h2>
      <Row className="g-3 justify-content-center">
        {TILES.map((tile) => (
          <Col xs={6} md={3} key={tile.label}>
            <CategoryTile {...tile} />
          </Col>
        ))}
      </Row>
    </section>
  );
}
