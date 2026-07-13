# Moresels and Mixes — React Website Architecture

A JavaScript React SPA for browsing, searching, and submitting snack ("Morsel") and drink ("Mix") recipes. Built with Vite, react-bootstrap, and react-router. No backend — recipe data is seeded statically and user submissions persist to browser `localStorage`.

## Libraries

- **react**, **react-dom** — core
- **react-router** — client-side routing. Modern `react-router` (v7+) ships its own DOM bindings, so `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `useParams`, `useNavigate`, and `useSearchParams` are all imported directly from `react-router` — no `react-router-dom` package needed.
- **bootstrap** + **react-bootstrap** — UI primitives: `Card` (required for recipe cards), `Navbar`, `Form`, `Badge`, `Row`/`Col` grid, `Button`, `InputGroup`, `Toast`
- **Vite** (`@vitejs/plugin-react`) — dev server and build tooling
- No Redux/MobX — the data is small and shallow; a single React Context backed by `localStorage` is sufficient
- No extra ID library — new recipe IDs use the browser's built-in `crypto.randomUUID()`
- Google Fonts (Lora + Nunito) loaded via `<link>` in `index.html`, matching the Figma type system

## Persistence

Browser `localStorage` only. Seed recipes ship as a static JS module (`src/data/seedRecipes.js`). User-submitted recipes (including images, stored as data URLs) are saved under the `localStorage` key `moreselsAndMixes:userRecipes` so they survive reloads in the same browser. `RecipesContext` merges seed + stored recipes into one `recipes` list at load time.

## Data model

```js
// Recipe
{
  id: string,                    // crypto.randomUUID()
  title: string,
  author: string,
  category: "Morsel" | "Mix",    // Morsel = snack, Mix = drink
  keywords: string[],            // e.g. ["Chocolate"], ["Savory"], []
  description: string,           // short blurb shown on card + detail page
  ingredients: string[],
  instructions: string[],
  imageUrl: string,              // seed: /images/*.jpg path; user-submitted: data URL
  videoUrl?: string,             // optional YouTube link
  prepTime?: string,
  servings?: string,
  difficulty?: string,
}
```

## Seed data (`src/data/seedRecipes.js`)

Covers both categories and several keywords so Catalog sorting/filtering has real variety, and includes the examples named in `design.md`:

- **Morsel** (snacks): Classic Tiramasu (author Grandma Rosa), Snickerdoodle Cookies, Fudgy Brownie Bites, Chocolate Trail Mix (keyword: Chocolate), Savory Spiced Nuts (keyword: Savory), Fluffy Pancake Mix, Sea Salt Chocolate Bark (keyword: Chocolate)
- **Mix** (drinks): Cinnamon Streusel Hot Cocoa, Peppermint Hot Cocoa, Salted Caramel Hot Cocoa, Espresso Martini (keyword: Coffee)

## Pages / routes

| Path | Page component | Purpose |
|---|---|---|
| `/` | `HomePage` | Hero + search bar, random Morsel+Mix pairing, category browse tiles |
| `/catalog` | `CatalogPage` | Filterable/sortable grid of all recipes; reads `?category=`, `?keyword=`, `?q=` from URL |
| `/recipe/:id` | `RecipePage` | Full recipe detail (any recipe, not just Tiramasu) |
| `/submit` | `SubmitPage` | Recipe submission form |

## Component tree

```
src/
  main.jsx                 # ReactDOM root, wraps <App/> in <RecipesProvider>
  App.jsx                  # <BrowserRouter>, <NavBar/>, <Routes>, <Footer/>
  context/
    RecipesContext.jsx     # loads seedRecipes + localStorage submissions; exposes recipes, addRecipe()
  data/
    seedRecipes.js
  utils/
    pairing.js             # pickRandomPairing(recipes) -> { morsel, mix }
    filters.js             # filterRecipes(recipes, { category, keyword, author, ingredient, q })
    storage.js             # get/set localStorage helpers (key: "moreselsAndMixes:userRecipes")
  components/
    layout/
      NavBar.jsx            # react-bootstrap Navbar; Home/Catalog/Submit NavLinks, active styling
      Footer.jsx
    shared/
      RecipeCard.jsx        # react-bootstrap Card; image, title, author, CategoryBadge, KeywordBadge[], truncated description; wraps in <Link to={`/recipe/${id}`}>
      CategoryBadge.jsx      # filled pill (Morsel/Mix)
      KeywordBadge.jsx        # outlined pill (Chocolate/Savory/...)
      CategoryTile.jsx        # big colored clickable tile -> navigates to /catalog?category=... or ?keyword=...
      SearchBar.jsx           # react-bootstrap InputGroup + Form.Control + Button; navigates to /catalog?q=...
    home/
      Hero.jsx                # headline, subtext, <SearchBar/>
      FeaturedPairing.jsx      # renders two <RecipeCard/> from utils/pairing
      CategoryTilesSection.jsx # renders 4 <CategoryTile/> (Morsels/Mixes/Chocolate/Savory)
    catalog/
      FilterBar.jsx            # category/keyword/author/ingredient controls (react-bootstrap Form.Select + Form.Control), synced to URL search params
      RecipeGrid.jsx           # react-bootstrap Row/Col mapping filtered recipes to <RecipeCard/>
    recipe/
      RecipeHero.jsx           # hero image + title
      MetaRow.jsx              # Prep Time / Servings / Difficulty / Author / Video link
      IngredientsList.jsx
      InstructionsList.jsx
      BackToCatalogLink.jsx
    submit/
      RecipeForm.jsx           # controlled form: Recipe Name, Author, Category (select), Keyword (select/multi), Description, Ingredients, Instructions, Photo upload, Video Link, Submit button
      ImageUploadField.jsx      # file input -> data URL preview, passed up to RecipeForm
  pages/
    HomePage.jsx    # <Hero/> + <FeaturedPairing/> + <CategoryTilesSection/>
    CatalogPage.jsx # <FilterBar/> + <RecipeGrid/>
    RecipePage.jsx  # useParams(id) -> lookup recipe from context; <RecipeHero/> <MetaRow/> <IngredientsList/> <InstructionsList/> <BackToCatalogLink/>
    SubmitPage.jsx  # <RecipeForm/>, on submit calls context.addRecipe() then navigates to the new /recipe/:id
  styles/
    theme.css        # CSS variables for the warm-bakery palette (cream/terracotta/brown/caramel), font-family overrides, react-bootstrap component tweaks (rounded pills/cards)
```

## Styling approach

Import `bootstrap/dist/css/bootstrap.min.css` globally, then layer `src/styles/theme.css` on top with CSS custom properties matching the Figma palette and small overrides (border-radius on `.card`/`.btn`, Navbar background/colors, badge styles for Category vs Keyword) rather than a full Sass rebuild — keeps the setup plain-JS/CSS with no extra build step.

## Next step

Scaffold the Vite project, install the libraries above, and implement the pages/components per this tree — verified by `npm run dev` and manually exercising Home → Catalog → Recipe → Submit → back to Catalog.
