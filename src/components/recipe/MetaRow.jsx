import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function siteName(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function MetaItem({ label, value }) {
  if (!value) return null;
  return (
    <Col xs="auto" className="text-center">
      <span className="meta-item-label">{label}</span>
      <span className="meta-item-value">{value}</span>
    </Col>
  );
}

function VideoMetaItem({ url }) {
  if (!url) return null;
  return (
    <Col xs="auto" className="text-center">
      <span className="meta-item-label">Video</span>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="meta-item-value link"
      >
        {siteName(url)}
      </a>
    </Col>
  );
}

export default function MetaRow({ recipe }) {
  return (
    <Row className="meta-row justify-content-center g-4 my-4">
      <MetaItem label="Prep Time" value={recipe.prepTime} />
      <MetaItem label="Servings" value={recipe.servings} />
      <MetaItem label="Difficulty" value={recipe.difficulty} />
      <MetaItem label="Author" value={recipe.author} />
      <VideoMetaItem url={recipe.videoUrl} />
    </Row>
  );
}
