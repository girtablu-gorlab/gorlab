/**
 * @type {import('./src/lib/config.js').CatalogConfig}
 *
 * Oddments configuration
 * The commented-out options show the default value. 
 * To override a setting: uncomment it, then change the value.
 */

export default {
  // ── Identity ──────────────────────────────────────────────────────────────
  title: "Oddments",
  
  // description: shown in the header subtitle and page meta tags.
  description:
    "An establishment of luxury and curiosity, for curious and unusual folk.",

  // icon: path to a custom SVG or PNG icon image in static/. When set, this
  // appears before the title in the header.
  // icon: "/icon.svg",

  // logo: path to a custom SVG or PNG logo image in static/. When set, this
  // replaces the icon and text title in the header.
  // logo: "/logo.svg",

  // siteUrl: public URL of your deployed site. When set, the site title in
  // the footer links here. Leave commented out if not yet deployed.
  siteUrl: "https://github.com/gulluth/oddments",

  // basePath: sub-path for GitHub Pages project sites (userid.github.io/repo).
  // Leave commented out for root deployments (userid.github.io or custom domain).
  // basePath: '/oddments',

  // ── Appearance ────────────────────────────────────────────────────────────
  // theme: "cerberus", // cerberus | wintry | vintage | crimson | pine | modern

  // cardLayout: controls how exhibit cards are arranged on the catalog page.
  //   'masonry' (default) — variable-height cards; gaps collapse naturally.
  //                         Cards are ordered left-to-right in date order.
  //                         Best for catalogs with mixed summary lengths or
  //                         mixed cover image dimensions.
  //   'grid'              — uniform rows; every card in a row shares the same
  //                         height. Best when cards are visually consistent.
  // cardLayout: 'masonry',

  // ── Content display ───────────────────────────────────────────────────────
  // exhibitsPerPage: 24,

  // Exhibit filenames: oddments/<category>/slug.md
  // Optional: prefix with a publication date to control sort order —
  //   oddments/<category>/YYYY-MM-DD-slug.md
  // Exhibits without a date prefix sort after all dated exhibits.

  // imageOrientation: controls exhibit page cover layout and whether cover
  // images are shown. Cards always use the cover image's natural dimensions.
  //   'landscape' (default) — wide images (e.g. A5/half-letter landscape).
  //                           Exhibit page: image above text.
  //   'portrait'            — tall images (e.g. A5/half-letter portrait, book covers).
  //                           Exhibit page: image left, text right.
  //   'none'                — no cover images; content fills full width everywhere.
  // Individual exhibits can override this with imageOrientation: in their frontmatter.
  // imageOrientation: 'landscape',

  // showCost: set to false to hide the price field on exhibit pages and in
  // filters, even when exhibits have cost metadata.
  // showCost: false,

  // ── Navigation & filters ──────────────────────────────────────────────────
  // showTagCloud: true,   // pill-based filter UI — suits small collections
  // showFilterBar: true,  // dropdown menu filter UI — suits large collections

  // filters: per-dimension overrides; takes precedence over master toggles.
  // Each dimension can appear in the tag cloud, the dropdown menu, both, or neither.
  // Defaults shown below — omit the filters block entirely to use defaults.
  // filters: {
  //   category: { cloud: true,  menu: true  },
  //   author:   { cloud: false, menu: true  },
  //   genre:    { cloud: false, menu: true  },
  //   cost:     { cloud: false, menu: true  },
  //   tags:     { cloud: false, menu: false },
  // },
  //
  // Example — tag cloud only, cost hidden everywhere:
  //   showFilterBar: false,
  //   (no filters block needed — cost is hidden from the cloud by default)
  //
  // Example — dropdowns only, cost hidden:
  //   showTagCloud: false,
  //   filters: { cost: { cloud: false, menu: false } },

  // ── Footer ────────────────────────────────────────────────────────────────
  // copyright: "(c) 2026 My Catalog",
  // copyrightUrl: "https://example.com/license",
  // showRss: true,
  //
  // Social/contact links are hidden until you provide a value.
  // instagram: "",
  // tiktok: "",
  // facebook: "",
  // twitter: "",
  // bluesky: "",
  // mastodon: "",
  // itch: "",
  // github: "",
  // deviantart: "",
  // behance: "",
  // discord: "",
  // signal: "",
  // drivethrurpg: "",
  // youtube: "",
  // patreon: "",
  // kofi: "",
  // twitch: "",
  // tumblr: "",
  // reddit: "",
  // threads: "",
  // substack: "",
  // kickstarter: "",
  // backerkit: "",
  // gumroad: "",
  // email: "",
  // website: "",

  // ── Community submissions ─────────────────────────────────────────────────
  // The /submit/ page lets visitors propose exhibits. Requires a backend
  // add-on package to receive submissions (not bundled with oddments).
  // showSubmitForm: false,
  // submitUrl: "https://your-backend-endpoint/submit",

  // ── Custom fields ─────────────────────────────────────────────────────────
  // Extend the data schema with fields specific to your catalog. Each field
  // is shown on exhibit pages and added to the submission form when enabled.
  // Fields not defined here are ignored by the app.
  //
  // key      — the frontmatter key in markdown files
  // label    — human-readable label shown in the UI
  // type     — "text" | "date" | "url"  (url renders as a clickable link)
  // multiple — true allows an array of values (e.g. multiple contributors)
  //
  // Example — credits layout for a podcast catalog:
  // customFields: [
  //   { key: "release_date",  label: "Release Date",  type: "date",   multiple: false },
  //   { key: "writing",       label: "Writing",       type: "text",   multiple: true  },
  //   { key: "layout",        label: "Layout",        type: "text",   multiple: true  },
  //   { key: "editing",       label: "Editing",       type: "text",   multiple: true  },
  //   { key: "development",   label: "Development",   type: "text",   multiple: true  },
  //   { key: "artwork",       label: "Artwork",       type: "text",   multiple: true  },
  //   { key: "cartography",   label: "Cartography",   type: "text",   multiple: true  },
  //   { key: "publisher",     label: "Publisher",     type: "text",   multiple: false },
  //   { key: "format",        label: "Format",        type: "text",   multiple: false },
  //   { key: "game_system",   label: "Game System",   type: "text",   multiple: true  },
  // ],

};
