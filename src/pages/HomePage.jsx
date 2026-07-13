import Container from "react-bootstrap/Container";

import Hero from "../components/home/Hero.jsx";
import FeaturedPairing from "../components/home/FeaturedPairing.jsx";
import CategoryTilesSection from "../components/home/CategoryTilesSection.jsx";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container>
        <FeaturedPairing />
        <CategoryTilesSection />
      </Container>
    </>
  );
}
