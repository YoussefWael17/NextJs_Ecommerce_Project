export default function VendorBannerRequestsPageSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-200" />

          <div className="space-y-2">
            <div className="h-7 w-64 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-80 animate-pulse rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-8 w-16 animate-pulse rounded-lg bg-gray-200" />
              </div>

              <div className="h-12 w-12 animate-pulse rounded-2xl bg-gray-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        {/* Section Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2">
            <div className="h-7 w-40 animate-pulse rounded-lg bg-gray-200" />
            <div className="h-4 w-64 animate-pulse rounded bg-gray-100" />
          </div>

          {/* Search */}
          <div className="h-12 w-full animate-pulse rounded-2xl bg-gray-100 sm:w-75" />
        </div>

        {/* Desktop Table Skeleton */}
        <div className="hidden overflow-hidden rounded-2xl border border-gray-200 md:block">
          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 border-b border-gray-200 bg-gray-50 px-5 py-4">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-4 animate-pulse rounded bg-gray-200"
              />
            ))}
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-100">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="grid grid-cols-6 items-center gap-4 px-5 py-5"
              >
                {/* Product */}
                <div className="col-span-2 flex items-center gap-3">
                  <div className="h-14 w-14 shrink-0 animate-pulse rounded-xl bg-gray-200" />

                  <div className="min-w-0 flex-1 space-y-2">
                    <div className="h-4 w-32 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                  </div>
                </div>

                {/* Date */}
                <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />

                {/* Status */}
                <div className="h-8 w-24 animate-pulse rounded-full bg-gray-100" />

                {/* Offer */}
                <div className="h-4 w-14 animate-pulse rounded bg-gray-200" />

                {/* Icon / Action */}
                <div className="flex justify-end">
                  <div className="h-9 w-9 animate-pulse rounded-xl bg-gray-100" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Cards Skeleton */}
        <div className="space-y-4 md:hidden">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-gray-200 p-4"
            >
              <div className="flex gap-4">
                <div className="h-16 w-16 shrink-0 animate-pulse rounded-xl bg-gray-200" />

                <div className="min-w-0 flex-1 space-y-3">
                  <div className="h-4 w-40 animate-pulse rounded bg-gray-200" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />

                  <div className="flex gap-2">
                    <div className="h-7 w-20 animate-pulse rounded-full bg-gray-100" />
                    <div className="h-7 w-14 animate-pulse rounded-full bg-gray-100" />
                  </div>
                </div>
              </div>

              <div className="mt-4 border-t border-gray-100 pt-4">
                <div className="flex justify-between">
                  <div className="h-3 w-20 animate-pulse rounded bg-gray-100" />
                  <div className="h-3 w-24 animate-pulse rounded bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="mt-6 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-32 animate-pulse rounded bg-gray-100" />

          <div className="flex items-center justify-center gap-2">
            <div className="h-10 w-20 animate-pulse rounded-xl bg-gray-100" />

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-10 w-10 animate-pulse rounded-xl bg-gray-100"
              />
            ))}

            <div className="h-10 w-16 animate-pulse rounded-xl bg-gray-100" />
          </div>
        </div>
      </div>
    </div>
  );
}