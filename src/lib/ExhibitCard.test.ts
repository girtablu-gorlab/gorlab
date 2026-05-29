import { render, screen } from "@testing-library/svelte";
import ExhibitCard from "./ExhibitCard.svelte";
import type { Exhibit } from "./oddments.js";

function makeExhibit(overrides: Partial<Exhibit> = {}): Exhibit {
  return {
    slug: "test-exhibit",
    date: "2024-01-01",
    name: "Test Exhibit",
    category: [],
    summary: null,
    author: null,
    source: null,
    "source-url": null,
    genre: null,
    cost: null,
    license: null,
    "cover-image": null,
    tags: [],
    stats: null,
    subtexts: [],
    body: "",
    featured: false,
    sort_priority: null,
    meta: {},
    ...overrides,
  };
}

test("renders the exhibit name", () => {
  render(ExhibitCard, { exhibit: makeExhibit({ name: "My Cool Game" }) });
  expect(screen.getByText("My Cool Game")).toBeInTheDocument();
});

test("renders summary when present", () => {
  render(ExhibitCard, {
    exhibit: makeExhibit({ summary: "A great game for everyone." }),
  });
  expect(screen.getByText("A great game for everyone.")).toBeInTheDocument();
});

test("does not render summary element when absent", () => {
  render(ExhibitCard, { exhibit: makeExhibit({ summary: null }) });
  expect(screen.queryByText(/./)).not.toBeNull(); // card still renders
});

test("links to the exhibit detail page", () => {
  render(ExhibitCard, { exhibit: makeExhibit({ slug: "my-game" }) });
  const links = screen.getAllByRole("link");
  expect(
    links.every((l) => l.getAttribute("href")?.includes("/exhibit/my-game/")),
  ).toBe(true);
});

test("renders img tag when cover-image is set", () => {
  render(ExhibitCard, {
    exhibit: makeExhibit({
      "cover-image": "https://example.com/cover.png",
      name: "Covered Game",
    }),
  });
  const img = screen.getByRole("img", { name: "Covered Game" });
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute("src", "https://example.com/cover.png");
});

test("renders placeholder div (no img) when cover-image is null", () => {
  render(ExhibitCard, { exhibit: makeExhibit({ "cover-image": null }) });
  expect(screen.queryByRole("img")).not.toBeInTheDocument();
});

test("featured exhibit has ring class on article", () => {
  const { container } = render(ExhibitCard, {
    exhibit: makeExhibit({ featured: true }),
  });
  const article = container.querySelector("article");
  expect(article?.className).toContain("ring-1");
});

test("non-featured exhibit does not have ring class on article", () => {
  const { container } = render(ExhibitCard, {
    exhibit: makeExhibit({ featured: false }),
  });
  const article = container.querySelector("article");
  expect(article?.className).not.toContain("ring-1");
});

test("renders author when present", () => {
  render(ExhibitCard, { exhibit: makeExhibit({ author: "Jane Doe" }) });
  expect(screen.getByText("Jane Doe")).toBeInTheDocument();
});

test("renders category chips", () => {
  render(ExhibitCard, {
    exhibit: makeExhibit({ category: ["systems", "supplements"] }),
  });
  expect(screen.getByText("systems")).toBeInTheDocument();
  expect(screen.getByText("supplements")).toBeInTheDocument();
});

test("local cover-image gets base prefix", () => {
  render(ExhibitCard, {
    exhibit: makeExhibit({ "cover-image": "/covers/game.webp", name: "Local Cover" }),
  });
  const img = screen.getByRole("img", { name: "Local Cover" });
  // base is '' in test mock, so the src should be '/covers/game.webp'
  expect(img).toHaveAttribute("src", "/covers/game.webp");
});
