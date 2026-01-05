export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-background text-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Storefront setup</p>
          <h1 className="mt-2 text-3xl font-semibold">Fake Store UI</h1>
          <p className="mt-2 max-w-2xl text-base text-muted-foreground">
            The product grid, product detail view, and cart experience will land next. This page is a placeholder while we build against the Figma design and Fake Store API.
          </p>
        </div>
        <div className="grid gap-4 rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">API</span>
              <span className="font-medium">https://fakestoreapi.com</span>
            </div>
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
              Connected soon
            </span>
          </div>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <span>• Product listing at /</span>
            <span>• Product details at /product/[id]</span>
            <span>• Cart experience at /cart</span>
          </div>
        </div>
      </div>
    </main>
  );
}
