// Gated launcher: /launch/recipes → the app's real URL, but only if you own it.
// Keeps product URLs out of the HTML served to anonymous visitors.
// (Honesty note: this is storefront credibility, not security — each app must
// still gate its own data with its own access check.)
import { redirect } from "next/navigation";
import { getAccess } from "@/lib/access";
import { products } from "@/lib/products";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params; // params is a Promise in Next 16
  const product = products.find((p) => p.slug === slug);
  const access = await getAccess();

  if (product?.url && access.owns(slug)) {
    redirect(product.url);
  }
  redirect(`/?locked=${slug}`);
}
