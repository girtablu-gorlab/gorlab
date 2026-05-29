import rawConfig from "../../oddments.config.js";
import type { CatalogConfig, CardLayout, CustomField, FilterDimension, ImageOrientation } from "./config.js";

const cfg = rawConfig as CatalogConfig;

export const config = {
  // Identity
  title: cfg.title,
  description: cfg.description ?? "",
  siteUrl: cfg.siteUrl ?? "",

  // Appearance
  theme: cfg.theme ?? "cerberus",

  // Content display
  exhibitsPerPage: cfg.exhibitsPerPage ?? 24,
  showCost: cfg.showCost ?? false,

  // Navigation & filters
  showTagCloud: cfg.showTagCloud ?? true,
  showFilterBar: cfg.showFilterBar ?? true,
  filters:
    cfg.filters ??
    ({} as Partial<
      Record<"category" | "author" | "genre" | "cost" | "tags", FilterDimension>
    >),

  // Custom fields
  customFields: cfg.customFields ?? ([] as CustomField[]),

  // Custom stylesheet
  customCss: cfg.customCss ?? null,

  // Community submissions
  showSubmitForm: cfg.showSubmitForm ?? false,
  submitUrl: cfg.submitUrl ?? "",

  // Image layout
  imageOrientation: (cfg.imageOrientation ?? 'landscape') as ImageOrientation,

  // Card layout
  cardLayout: (cfg.cardLayout ?? 'masonry') as CardLayout,
};

export type ResolvedConfig = typeof config;
