import { describe, expect, it } from "vitest";

import { getCurrentAuthRedirectUrl } from "./supabase.js";

describe("getCurrentAuthRedirectUrl", () => {
  it("returns the current hash route when one is present", () => {
    const redirectUrl = getCurrentAuthRedirectUrl({
      origin: "https://example.com",
      pathname: "/mixes-n-morsels/",
      hash: "#/submit",
    });

    expect(redirectUrl).toBe("https://example.com/mixes-n-morsels/#/submit");
  });

  it("falls back to the origin when no route is present", () => {
    const redirectUrl = getCurrentAuthRedirectUrl({
      origin: "https://example.com",
      pathname: "/mixes-n-morsels/",
      hash: "",
    });

    expect(redirectUrl).toBe("https://example.com/mixes-n-morsels/");
  });
});
