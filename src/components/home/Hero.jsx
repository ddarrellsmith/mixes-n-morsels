import SearchBar from "../shared/SearchBar.jsx";

export default function Hero() {
  return (
    <section className="hero-section">
      <h1>Warm Bites &amp; Cozy Mixes, Made to Share</h1>
      <p className="mb-4">
        Hand-picked morsels and mixes from home bakers who love sharing a good recipe.
      </p>
      <SearchBar />
    </section>
  );
}
