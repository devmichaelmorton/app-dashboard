// The storefront. Freely browsable by anyone — products render for everyone,
// only the launch action is gated. Styled after the Clerk dashboard overview:
// dark, minimal cards up top, a quiet table below.
import { ExternalLink, Boxes } from "lucide-react";
import { getAccess } from "@/lib/access";
import { products, showcase } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function Home() {
  const access = await getAccess(); // one call per request; cards get booleans

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Overview</h1>

      {/* Products — the sellable apps */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.slug}
            product={product}
            owns={access.owns(product.slug)}
            signedIn={access.signedIn}
          />
        ))}

        {/* Suite teaser — one login for everything (billing comes later) */}
        <div className="flex flex-col rounded-xl border border-dashed border-border p-5">
          <Boxes className="mb-4 size-6 text-muted-foreground" strokeWidth={1.5} />
          <h3 className="text-[15px] font-semibold leading-snug">The Suite</h3>
          <p className="mt-1 flex-1 text-sm leading-relaxed text-muted-foreground">
            Every app, one account, one plan. Same login everywhere.
          </p>
          <div className="mt-4">
            <Button size="sm" variant="outline" disabled className="h-8 text-xs">
              Coming soon
            </Button>
          </div>
        </div>
      </div>

      {/* Workshop — free things, no locks, no account needed */}
      <section className="mt-12">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <span className="text-xs font-medium text-muted-foreground">
              From the workshop
            </span>
            <span className="text-xs text-muted-foreground">Free to use</span>
          </div>
          <ul className="divide-y divide-border">
            {showcase.map((item) => (
              <li key={item.name}>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-5 py-3.5 transition-colors hover:bg-accent/50"
                >
                  <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-base">
                    {item.icon}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium">{item.name}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {item.blurb}
                    </span>
                  </span>
                  <ExternalLink className="size-3.5 shrink-0 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-border px-5 py-3">
            <span className="text-xs text-muted-foreground">
              Built by Michael Morton
            </span>
            <a
              href="https://github.com/devmichaelmorton"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground underline-offset-4 hover:underline"
            >
              github.com/devmichaelmorton
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
