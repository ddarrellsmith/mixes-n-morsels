import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router";

import ImageUploadField from "./ImageUploadField.jsx";
import { useRecipes } from "../../context/RecipesContext.jsx";
import { makePlaceholderImage } from "../../utils/placeholderImage.js";

const FALLBACK_IMAGE = makePlaceholderImage("#D3924A");

const initialState = {
  title: "",
  author: "",
  category: "Morsel",
  keywords: "",
  description: "",
  ingredients: "",
  instructions: "",
  imageUrl: "",
  videoUrl: "",
};

export default function RecipeForm() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const { addRecipe } = useRecipes();
  const navigate = useNavigate();

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.title.trim() || !form.author.trim() || !form.ingredients.trim() || !form.instructions.trim()) {
      setError("Please fill in at least the recipe name, author, ingredients, and instructions.");
      return;
    }

    const recipe = {
      title: form.title.trim(),
      author: form.author.trim(),
      category: form.category,
      keywords: form.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean),
      description: form.description.trim(),
      ingredients: form.ingredients.split("\n").map((i) => i.trim()).filter(Boolean),
      instructions: form.instructions.split("\n").map((i) => i.trim()).filter(Boolean),
      imageUrl: form.imageUrl || FALLBACK_IMAGE,
      videoUrl: form.videoUrl.trim() || undefined,
    };

    const created = addRecipe(recipe);
    navigate(`/recipe/${created.id}`);
  }

  return (
    <Form onSubmit={handleSubmit} className="recipe-form-card">
      {error && <div className="alert alert-danger">{error}</div>}

      <Form.Group className="mb-4">
        <Form.Label>Recipe Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="e.g. Grandma's Oatmeal Cookies"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Your name"
          value={form.author}
          onChange={(e) => update("author", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Category</Form.Label>
        <Form.Select value={form.category} onChange={(e) => update("category", e.target.value)}>
          <option value="Morsel">Morsel</option>
          <option value="Mix">Mix</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Keyword</Form.Label>
        <Form.Control
          type="text"
          placeholder="Chocolate, Savory, or leave blank"
          value={form.keywords}
          onChange={(e) => update("keywords", e.target.value)}
        />
        <Form.Text muted>Separate multiple keywords with commas.</Form.Text>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          placeholder="A short, tasty summary of your recipe"
          value={form.description}
          onChange={(e) => update("description", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Ingredients</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="List each ingredient on its own line"
          value={form.ingredients}
          onChange={(e) => update("ingredients", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          placeholder="Describe the steps to make your recipe, one step per line"
          value={form.instructions}
          onChange={(e) => update("instructions", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Photo</Form.Label>
        <ImageUploadField value={form.imageUrl} onChange={(v) => update("imageUrl", v)} />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Video Link</Form.Label>
        <Form.Control
          type="url"
          placeholder="Paste a YouTube link to your recipe video (optional)"
          value={form.videoUrl}
          onChange={(e) => update("videoUrl", e.target.value)}
        />
      </Form.Group>

      <Button type="submit" className="btn-terracotta" size="lg">
        Submit Recipe
      </Button>
    </Form>
  );
}
