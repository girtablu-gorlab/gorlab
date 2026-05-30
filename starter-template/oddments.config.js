/**
 * Oddments configuration
 * The commented-out options show the default value. 
 * To override a setting: uncomment it, then change the value.
 */

export default {
  // ── Identity ──────────────────────────────────────────────────────────────
  // Required. The catalog title shown in the header and browser tab.
  title: "My Catalog",

  // description: shown in the header subtitle and page meta tags.
  // description: "",

  // icon: path to a custom SVG or PNG icon image in static/. When set, this
  // appears before the title in the header.
  // icon: "/icon.svg",

  // logo: path to a custom SVG or PNG logo image in static/. When set, this
  // replaces the icon and text title in the header.
  // logo: "/logo.svg",

  // siteUrl: your deployed GitHub Pages URL. When set, the title links here.
  // Set this after your first deploy.
  // siteUrl: "https://username.github.io/my-catalog",

  // basePath: uncomment only for GitHub Pages *project* sites
  // (username.github.io/my-catalog). Leave commented for root sites.
  // basePath: '/my-catalog',

  // ── Appearance ────────────────────────────────────────────────────────────
  // theme: one of the bundled presets below. Default: cerberus.
  // cerberus | wintry | vintage | crimson | pine | modern
  // theme: "cerberus",

  // customCss: path to an extra CSS file in static/ loaded after theme styles.
  // Use this to add custom fonts or override specific styles.
  // customCss: "/my-styles.css",

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

  // showCost: set to false to hide price info everywhere (cards, filters, pages).
  // showCost: false,

  // ── Navigation & filters ──────────────────────────────────────────────────
  // showTagCloud: true,   // pill buttons for category filtering
  // showFilterBar: true,  // dropdown menus for category / author / genre / cost

  // filters: fine-grained control over where each dimension appears.
  // Omit this block entirely to use the defaults shown below.
  // filters: {
  //   category: { cloud: true,  menu: true  },
  //   author:   { cloud: false, menu: true  },
  //   genre:    { cloud: false, menu: true  },
  //   cost:     { cloud: false, menu: true  },
  //   tags:     { cloud: false, menu: false },
  // },

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
  // Add extra fields specific to your catalog. They appear on exhibit pages.
  // Fields not listed here are ignored by the app.
  //
  // key      — the frontmatter key in your markdown files
  // label    — human-readable label shown in the UI
  // type     — "text" | "date" | "url"  (url renders as a clickable link)
  // multiple — true allows an array of values
  //
  // customFields: [
  //   { key: "page_count", label: "Pages",       type: "text", multiple: false },
  //   { key: "publisher",  label: "Publisher",   type: "text", multiple: false },
  //   { key: "system",     label: "Game System", type: "text", multiple: true  },
  // ],

};
