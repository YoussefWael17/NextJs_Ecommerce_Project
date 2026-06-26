import ProductCardSkeleton from "./product-card-skeleton";

export default function WishlistSkeleton() {
  return (
    <main className="mt-15 mb-10 flex min-h-screen w-full items-center py-10 md:mt-15">
      <div className="mx-auto w-full max-w-7xl px-4">

        <section className="mb-20">

          <header className="mb-10 flex items-end justify-between px-4">
            <div className="animate-pulse">
              <div className="h-6 w-36 rounded bg-gray-200"></div>
            </div>

            <div className="hidden md:block animate-pulse">
              <div className="h-12 w-40 rounded bg-gray-200"></div>
            </div>
          </header>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <div className="mt-8 w-full animate-pulse md:hidden">
            <div className="rounded-sm w-full px-6 py-3 h-12 bg-gray-200"></div>
          </div>

        </section>

      </div>
    </main>
  );
}