# app-dashboard

The public storefront + hub for the app suite. Anyone can browse; apps unlock
per-account. One shared Clerk instance across every app = same login everywhere.

## The rules (read before changing anything)

1. **Slugs are FROZEN.** One lowercase word per product, forever:
   `recipes`, `expenses`, `scripture`, `gigahuman`.
   Renaming a slug silently orphans every access grant already written to
   users' metadata. Never name a slug after a repo.
2. **`src/data/products.json` is PUBLIC** — marketing copy only.
   **`src/data/inventory.json` is PRIVATE** (owner-only, later slice).
   Moving an app between them is a deliberate act, not a filter.
3. **Apps check access, not purchases.** Everything entitlement-related lives
   in `src/lib/access.ts`. When billing arrives, ONE marked line in that file
   changes — nothing else, ever.

## How to grant someone access (until billing exists)

Clerk Dashboard → Users → pick the user → Metadata → **Public** → edit:

```json
{ "apps": ["recipes"] }
```

Saves instantly; they get the "Open app" button on next page load.

## Env vars (3, no database)

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — must be IDENTICAL
  to recipes-manager's (same keys = same shared login).
- `OWNER_USER_ID` — Michael's Clerk user id; gates the private /inventory view.

## Notes

- `middleware.ts` prints a deprecation warning on every build — cosmetic.
  Never create `proxy.ts` alongside it (hard build error).
- The hub's lock is storefront credibility, NOT security. Each app must gate
  its own data with its own copy of `access.ts`.
- Dev: `npm run dev` (launch.json entry `app-dashboard-dev`, port 3006).
