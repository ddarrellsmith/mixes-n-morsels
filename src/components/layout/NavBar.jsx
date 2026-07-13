import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router";

export default function NavBar() {
  return (
    <Navbar expand="md" className="app-navbar">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Moresels &amp; Mixes
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav" className="justify-content-end">
          <Nav>
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/catalog">
              Catalog
            </Nav.Link>
            <Nav.Link as={NavLink} to="/submit">
              Submit
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
