export default function VendorProductsPageSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">

      {/* Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="h-8 w-64 rounded bg-gray-200"></div>
            <div className="mt-3 h-4 w-48 rounded bg-gray-200"></div>
          </div>

          <div className="h-12 w-40 rounded-2xl bg-gray-200"></div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-5"
          >
            <div className="mb-4 h-12 w-12 rounded-2xl bg-gray-200"></div>

            <div className="h-8 w-16 rounded bg-gray-200"></div>

            <div className="mt-3 h-4 w-24 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>

      {/* Products */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="h-7 w-48 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-40 rounded bg-gray-200"></div>
          </div>

          <div className="h-12 w-full rounded-2xl bg-gray-200 lg:w-[320px]"></div>
        </div>

        {/* Desktop Rows */}
        <div className="hidden lg:block space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center rounded-2xl bg-gray-50 p-4"
            >
              <div className="h-12 w-12 rounded-xl bg-gray-200"></div>

              <div className="ml-4 flex-1">
                <div className="h-4 w-40 rounded bg-gray-200"></div>
                <div className="mt-2 h-3 w-24 rounded bg-gray-200"></div>
              </div>

              <div className="h-4 w-24 rounded bg-gray-200"></div>

              <div className="ml-10 h-4 w-16 rounded bg-gray-200"></div>

              <div className="ml-10 h-4 w-16 rounded bg-gray-200"></div>

              <div className="ml-10 h-8 w-24 rounded-full bg-gray-200"></div>

              <div className="ml-10 flex gap-2">
                <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
                <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="rounded-3xl border border-gray-200 bg-white p-4"
            >
              <div className="flex gap-3">
                <div className="h-14 w-14 rounded-xl bg-gray-200"></div>

                <div className="flex-1">
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="mt-2 h-3 w-24 rounded bg-gray-200"></div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="h-16 rounded-xl bg-gray-100"></div>
                <div className="h-16 rounded-xl bg-gray-100"></div>
              </div>

              <div className="mt-4 flex gap-3">
                <div className="h-12 flex-1 rounded-2xl bg-gray-200"></div>
                <div className="h-12 flex-1 rounded-2xl bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}