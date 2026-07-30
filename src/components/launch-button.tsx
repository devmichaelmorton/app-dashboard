// The 3-way action button on a product card. Branch order is FIXED:
//   1. Not launched (no url)  → disabled "Coming soon" — NO lock (nothing to buy)
//   2. Launched but not owned → locked CTA (sign in, or request access)
//   3. Owned                  → "Open app" via /launch/[slug]
// Availability is checked BEFORE entitlement — never padlock a product that
// doesn't exist yet.
//
// Links are styled with buttonVariants() (this Button has no asChild prop).
import { SignInButton } from "@clerk/nextjs";
import { ArrowRight, Lock } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import type { Product } from "@/lib/products";

const linkStyle = buttonVariants({ variant: "outline", size: "sm" });

export function LaunchButton({
  product,
  owns,
  signedIn,
}: {
  product: Product;
  owns: boolean;
  signedIn: boolean;
}) {
  if (!product.url) {
    return (
      <Button size="sm" variant="outline" disabled>
        Coming soon
      </Button>
    );
  }

  if (!owns) {
    if (!signedIn) {
      return (
        <SignInButton mode="modal">
          <Button size="sm" variant="outline">
            <Lock /> Sign in to get access
          </Button>
        </SignInButton>
      );
    }
    return (
      <a
        className={linkStyle}
        href={`mailto:michaelmorton.ai@gmail.com?subject=Access request: ${encodeURIComponent(product.name)}`}
      >
        <Lock /> Request access
      </a>
    );
  }

  return (
    <a className={linkStyle} href={`/launch/${product.slug}`}>
      Open app <ArrowRight />
    </a>
  );
}
