import { Link } from "react-router";

export default function BackToCatalogLink() {
  return (
    <Link to="/catalog" className="d-inline-block mb-3 fw-semibold text-decoration-none">
      ← Back to Catalog
    </Link>
  );
}
