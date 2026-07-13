import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

export default function SearchBar({ placeholder = "Search for morsels, mixes, and more..." }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    navigate(`/catalog?${params.toString()}`);
  }

  return (
    <Form onSubmit={handleSubmit} className="search-bar d-flex align-items-center">
      <Form.Control
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-label="Search recipes"
      />
      <Button type="submit" className="btn-terracotta">
        Search
      </Button>
    </Form>
  );
}
