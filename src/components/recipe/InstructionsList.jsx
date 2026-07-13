export default function InstructionsList({ instructions }) {
  return (
    <div>
      <h3>Instructions</h3>
      <ol className="list-unstyled">
        {instructions.map((step, i) => (
          <li key={i} className="d-flex align-items-start gap-3 mb-3">
            <span
              className="d-flex align-items-center justify-content-center rounded-circle flex-shrink-0 text-white fw-bold"
              style={{ width: 28, height: 28, backgroundColor: "var(--terracotta)", fontSize: 14 }}
            >
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
