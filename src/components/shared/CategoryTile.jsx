import { Link } from "react-router";

export default function CategoryTile({ label, to, color }) {
  return (
    <Link to={to} className="category-tile" style={{ backgroundColor: color }}>
      {label}
    </Link>
  );
}
