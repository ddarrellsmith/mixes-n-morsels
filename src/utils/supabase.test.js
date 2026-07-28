import { describe, expect, it } from "vitest";

import { mergeRecipes } from "./storage.js";

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
