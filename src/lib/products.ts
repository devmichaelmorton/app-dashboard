// Typed access to the PUBLIC catalog (src/data/products.json).
// The JSON is imported at build time — zero runtime file reads, works on Vercel.
import catalog from "@/data/products.json";

export type Product = {
  slug: string;          // FROZEN identifier — never rename (see README)
  name: string;
  icon: string;          // lucide icon name ("chef-hat" | "wallet")
  tagline: string;
  blurb: string;
  url: string | null;    // null = not launched yet ("Coming soon")
  state: "live" | "soon";
};

export type ShowcaseItem = {
  name: string;
  icon: string;          // emoji
  url: string;
  blurb: string;
};

export const products = catalog.products as Product[];
export const showcase = catalog.showcase as ShowcaseItem[];
