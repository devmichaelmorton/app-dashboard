// The ONE file that decides who can open what.
//
// Today: access is granted by hand in the Clerk Dashboard — open a user,
// edit "public metadata", and set:  { "apps": ["recipes"] }
// Later (billing): change the ONE marked line below. No other file changes.
import { auth, currentUser } from "@clerk/nextjs/server";

export type Access = {
  signedIn: boolean;
  userId: string | null;
  owns: (slug: string) => boolean;
};

export async function getAccess(): Promise<Access> {
  const { userId } = await auth(); // never throws, never redirects
  if (!userId) return { signedIn: false, userId: null, owns: () => false };

  const user = await currentUser();
  const owned = new Set(
    (user?.publicMetadata?.apps as string[] | undefined) ?? []
  );

  // ---- THE ONE LINE THAT CHANGES WHEN BILLING ARRIVES ----
  return { signedIn: true, userId, owns: (slug) => owned.has(slug) };
  //
  // becomes (Clerk Billing):
  //   const { has } = await auth();
  //   return { signedIn: true, userId, owns: (s) => has({ feature: `user:${s}` }) };
}

// Is the signed-in user Michael? Gates the private /inventory view.
export async function isOwner(): Promise<boolean> {
  const { userId } = await auth();
  return !!userId && userId === process.env.OWNER_USER_ID;
}
