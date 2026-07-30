// Placeholder home page — slice 1 only proves deploy + shared sign-in.
// The storefront (product cards, locks, showcase) is the next slice.
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-semibold">App Dashboard</h1>
        <p className="mt-2 text-muted-foreground">
          The storefront is coming — sign in up top to test the shared account.
        </p>
      </div>
    </main>
  );
}
