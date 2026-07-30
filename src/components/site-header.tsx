// Site header — shows "Sign in" to visitors, or your avatar menu when signed in.
// Plain server-side check: auth() returns { userId: null } for anonymous
// visitors (it never redirects), so the storefront stays freely browsable.
import { auth } from "@clerk/nextjs/server";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export async function SiteHeader() {
  const { userId } = await auth();

  return (
    <header className="flex items-center justify-between border-b border-border px-6 py-3">
      <a href="/" className="font-semibold tracking-tight">
        App Dashboard
      </a>
      {userId ? (
        <UserButton />
      ) : (
        <SignInButton mode="modal">
          <Button size="sm">Sign in</Button>
        </SignInButton>
      )}
    </header>
  );
}
