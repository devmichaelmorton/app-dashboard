// One storefront card, styled after the Clerk dashboard overview cards:
// muted line icon top-left, title, two-line blurb, small action button.
// Purely presentational — receives plain booleans, imports nothing from Clerk.
import { ChefHat, Wallet, Package } from "lucide-react";
import { LaunchButton } from "@/components/launch-button";
import type { Product } from "@/lib/products";

const ICONS: Record<string, typeof ChefHat> = {
  "chef-hat": ChefHat,
  wallet: Wallet,
};

export function ProductCard({
  product,
  owns,
  signedIn,
}: {
  product: Product;
  owns: boolean;
  signedIn: boolean;
}) {
  const Icon = ICONS[product.icon] ?? Package;
  const featured = owns; // owned apps get the subtle accent glow (see .featured-glow)

  return (
    <div
      className={`relative flex flex-col rounded-xl border border-border bg-card p-5 ${
        featured ? "featured-glow" : ""
      }`}
    >
      <Icon className="mb-4 size-6 text-foreground/70" strokeWidth={1.5} />
      <h3 className="text-base font-semibold leading-snug">{product.name}</h3>
      <p className="mt-1.5 flex-1 text-[13px] leading-relaxed text-muted-foreground">
        {product.blurb}
      </p>
      <div className="mt-4">
        <LaunchButton product={product} owns={owns} signedIn={signedIn} />
      </div>
    </div>
  );
}
