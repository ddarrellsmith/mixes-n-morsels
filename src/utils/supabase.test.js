import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchRecipes } from "./supabase.js";
import { mergeRecipes } from "./storage.js";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("mergeRecipes", () => {
  it("adds local recipes alongside remote recipes", () => {
    const remoteRecipes = [{ id: "remote-1", title: "Remote recipe" }];
    const localRecipes = [{ id: "local-1", title: "Local recipe" }];

    expect(mergeRecipes(remoteRecipes, localRecipes)).toEqual([
      { id: "remote-1", title: "Remote recipe" },
      { id: "local-1", title: "Local recipe" },
    ]);
  });
});

describe("fetchRecipes", () => {
  it("falls back to sample data when the API request fails", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));

    const recipes = await fetchRecipes();

    expect(recipes.length).toBeGreaterThan(0);
    expect(recipes[0]).toMatchObject({ title: expect.any(String) });
  });
});
