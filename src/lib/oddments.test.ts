import { describe, it, expect } from "vitest";
import { join } from "node:path";
import { parseOddments, getCategories } from "./oddments.js";

const FIXTURES = join(import.meta.dirname, "../test/fixtures/oddments");
const REAL_ODDMENTS = join(import.meta.dirname, "../../oddments");

describe("parseOddments — real _oddments/", () => {
  const exhibits = parseOddments(REAL_ODDMENTS);

  it("every exhibit has a non-empty name", () => {
    expect(
      exhibits.every((p) => typeof p.name === "string" && p.name.length > 0),
    ).toBe(true);
  });

  it("category is always an array", () => {
    expect(exhibits.every((p) => Array.isArray(p.category))).toBe(true);
  });

  it("tags is always an array", () => {
    expect(exhibits.every((p) => Array.isArray(p.tags))).toBe(true);
  });

  it("subtexts is always an array", () => {
    expect(exhibits.every((p) => Array.isArray(p.subtexts))).toBe(true);
  });

  it("slug is derived from filename without date prefix", () => {
    const slugs = exhibits.map((p) => p.slug);
    slugs.forEach((s) => expect(s).not.toMatch(/^\d{4}-\d{2}-\d{2}-/));
  });

  it("layout field is stripped from output", () => {
    exhibits.forEach((p) => expect(p).not.toHaveProperty("layout"));
  });

  it("featured defaults to false", () => {
    exhibits.forEach((p) => expect(typeof p.featured).toBe("boolean"));
  });

  it("sort_priority defaults to null when not set", () => {
    const nonFeatured = exhibits.filter((p) => !p.featured);
    nonFeatured.forEach((p) => expect(p.sort_priority).toBeNull());
  });

  it("meta is empty object when no customFields declared", () => {
    exhibits.forEach((p) => expect(p.meta).toEqual({}));
  });
});

describe("parseOddments — subtext normalization", () => {
  const exhibits = parseOddments(FIXTURES);

  it("coalesces legacy subtext1/subtext2 into subtexts array", () => {
    const exhibit = exhibits.find((p) => p.slug === "legacy-subtexts");
    expect(exhibit).toBeDefined();
    expect(exhibit!.subtexts).toEqual([
      "• First bullet point.",
      "• Second bullet point.",
    ]);
  });

  it("passes through subtexts array directly", () => {
    const exhibit = exhibits.find((p) => p.slug === "modern-subtexts");
    expect(exhibit).toBeDefined();
    expect(exhibit!.subtexts).toEqual([
      "• First point.",
      "• Second point.",
      "• Third point.",
    ]);
  });
});

describe("parseOddments — featured and sort_priority", () => {
  const exhibits = parseOddments(FIXTURES);

  it("featured: true is parsed correctly", () => {
    const exhibit = exhibits.find((p) => p.slug === "modern-subtexts");
    expect(exhibit!.featured).toBe(true);
  });

  it("sort_priority is parsed as a number", () => {
    const exhibit = exhibits.find((p) => p.slug === "modern-subtexts");
    expect(exhibit!.sort_priority).toBe(2);
  });
});

describe("parseOddments — incoming/ directory", () => {
  const exhibits = parseOddments(FIXTURES);

  it("exhibits inside incoming/ appear in results", () => {
    const exhibit = exhibits.find((p) => p.slug === "submitted-exhibit");
    expect(exhibit).toBeDefined();
    expect(exhibit!.name).toBe("Community Submission");
  });

  it("exhibits in incoming/ are indexed under their frontmatter category, not incoming", () => {
    const exhibit = exhibits.find((p) => p.slug === "submitted-exhibit");
    expect(exhibit!.category).toContain("systems");
    expect(exhibit!.category).not.toContain("incoming");
  });
});

describe("getCategories", () => {
  const exhibits = parseOddments(FIXTURES);

  it("returns sorted unique categories from exhibits", () => {
    expect(getCategories(exhibits)).toEqual(["systems"]);
  });

  it('excludes "incoming" from the derived category set', () => {
    expect(getCategories(exhibits)).not.toContain("incoming");
  });

  it("returns sorted unique categories from real exhibits", () => {
    const real = parseOddments(REAL_ODDMENTS);
    const cats = getCategories(real);
    expect(cats).toEqual([...cats].sort());
    expect(cats).not.toContain("incoming");
  });
});

describe("parseOddments — body content", () => {
  const exhibits = parseOddments(FIXTURES);

  it("captures markdown body below frontmatter", () => {
    const exhibit = exhibits.find((p) => p.slug === "legacy-subtexts");
    expect(exhibit!.body).toBe("Optional body content.");
  });

  it("body is empty string when no content below frontmatter", () => {
    const exhibit = exhibits.find((p) => p.slug === "submitted-exhibit");
    expect(exhibit!.body).toBe("");
  });
});

describe("parseOddments — customFields / meta", () => {
  it("collects declared customFields into meta", () => {
    const exhibits = parseOddments(FIXTURES, [
      { key: "license", label: "License", type: "text", multiple: false },
      { key: "tags", label: "Tags", type: "text", multiple: true },
    ]);
    const exhibit = exhibits.find((p) => p.slug === "legacy-subtexts");
    expect(exhibit!.meta.license).toBe("CC BY 4.0");
    expect(exhibit!.meta.tags).toEqual(["osr", "one-shot"]);
  });

  it("discards undeclared keys from meta", () => {
    const exhibits = parseOddments(FIXTURES, []);
    const exhibit = exhibits.find((p) => p.slug === "legacy-subtexts");
    expect(exhibit!.meta).toEqual({});
  });

  it("missing declared keys are absent from meta, not null", () => {
    const exhibits = parseOddments(FIXTURES, [
      {
        key: "nonexistent_field",
        label: "Nonexistent",
        type: "text",
        multiple: false,
      },
    ]);
    const exhibit = exhibits.find((p) => p.slug === "legacy-subtexts");
    expect("nonexistent_field" in exhibit!.meta).toBe(false);
  });
});
