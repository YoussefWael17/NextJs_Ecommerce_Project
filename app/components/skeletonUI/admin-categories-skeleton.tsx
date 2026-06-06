"use client";

export default function AdminCategoriesPageSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8 animate-pulse">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <div className="h-8 w-72 rounded bg-gray-200"></div>
          <div className="mt-3 h-4 w-96 rounded bg-gray-200"></div>
        </div>

        <div className="h-12 w-44 rounded-2xl bg-gray-200"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {[1, 2].map((item) => (
          <div
            key={item}
            className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start md:justify-start"
          >
            <div className="mb-4 h-12 w-12 rounded-2xl bg-gray-200"></div>

            <div className="h-8 w-16 rounded bg-gray-200"></div>

            <div className="mt-2 h-4 w-28 rounded bg-gray-200"></div>
          </div>
        ))}

      </div>

      {/* Table Section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

        {/* Top */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <div className="h-6 w-56 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-40 rounded bg-gray-200"></div>
          </div>

          <div className="h-12 w-72 rounded-2xl bg-gray-200"></div>

        </div>

        {/* Desktop Table Skeleton */}
        <div className="hidden lg:block">

          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="mb-3 flex items-center justify-between rounded-2xl bg-gray-100 p-4"
            >

              {/* Category */}
              <div className="flex items-center gap-3">

                <div className="h-12 w-12 rounded-full bg-gray-200"></div>

                <div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="mt-2 h-3 w-48 rounded bg-gray-200"></div>
                </div>

              </div>

              {/* Slug */}
              <div className="h-6 w-20 rounded-full bg-gray-200"></div>

              {/* Products */}
              <div className="h-6 w-10 rounded bg-gray-200"></div>

              {/* Date */}
              <div className="h-4 w-28 rounded bg-gray-200"></div>

              {/* Actions */}
              <div className="flex gap-2">
                <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
                <div className="h-10 w-10 rounded-xl bg-gray-200"></div>
              </div>

            </div>
          ))}

        </div>

        {/* Mobile Cards Skeleton */}
        <div className="space-y-4 lg:hidden">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="rounded-3xl border border-gray-200 bg-gray-100 p-4"
            >

              {/* Header */}
              <div className="flex items-center gap-3">

                <div className="h-12 w-12 rounded-full bg-gray-200"></div>

                <div>
                  <div className="h-4 w-32 rounded bg-gray-200"></div>
                  <div className="mt-2 h-3 w-48 rounded bg-gray-200"></div>
                </div>

              </div>

              {/* Info */}
              <div className="mt-5 space-y-4">

                <div className="flex justify-between">
                  <div className="h-3 w-10 rounded bg-gray-200"></div>
                  <div className="h-6 w-16 rounded bg-gray-200"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-16 rounded bg-gray-200"></div>
                  <div className="h-4 w-10 rounded bg-gray-200"></div>
                </div>

                <div className="flex justify-between">
                  <div className="h-3 w-20 rounded bg-gray-200"></div>
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <div className="h-10 flex-1 rounded-2xl bg-gray-200"></div>
                  <div className="h-10 flex-1 rounded-2xl bg-gray-200"></div>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}