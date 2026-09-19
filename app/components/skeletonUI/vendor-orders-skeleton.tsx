import React from "react";

export default function OrderPageSkeleton() {
  return (
    <div className="animate-pulse space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="h-8 w-48 rounded bg-gray-200" />
          <div className="h-4 w-72 rounded bg-gray-100" />
        </div>

        <div className="flex gap-3">
          <div className="h-11 w-56 rounded-xl bg-gray-200" />
          <div className="h-11 w-40 rounded-xl bg-gray-200" />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-5 h-12 w-12 rounded-2xl bg-gray-200" />
            <div className="mb-3 h-7 w-20 rounded bg-gray-200" />
            <div className="h-4 w-28 rounded bg-gray-100" />
          </div>
        ))}
      </div>

      {/* Orders */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* Toolbar */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="h-7 w-52 rounded bg-gray-200" />
            <div className="h-4 w-64 rounded bg-gray-100" />
          </div>

          <div className="flex gap-3">
            <div className="h-12 w-72 rounded-2xl bg-gray-200" />
            <div className="h-12 w-28 rounded-2xl bg-gray-200" />
          </div>
        </div>

        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr>
                {Array.from({ length: 8 }).map((_, i) => (
                  <th key={i} className="px-4 py-3">
                    <div className="h-4 w-16 rounded bg-gray-200" />
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Array.from({ length: 6 }).map((_, row) => (
                <tr key={row} className="bg-gray-50">
                  {Array.from({ length: 8 }).map((_, col) => (
                    <td
                      key={col}
                      className="px-4 py-5"
                    >
                      <div className="h-5 rounded bg-gray-200" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="space-y-2">
                  <div className="h-5 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-32 rounded bg-gray-100" />
                </div>

                <div className="h-7 w-20 rounded-full bg-gray-200" />
              </div>

              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-xl bg-gray-50 p-3"
                  >
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-4 w-24 rounded bg-gray-200" />
                  </div>
                ))}
              </div>

              <div className="mt-5 h-11 rounded-xl bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
          <div className="h-4 w-44 rounded bg-gray-200" />

          <div className="flex gap-2">
            <div className="h-10 w-24 rounded-xl bg-gray-200" />

            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-10 w-10 rounded-xl bg-gray-200"
              />
            ))}

            <div className="h-10 w-24 rounded-xl bg-gray-200" />
          </div>
        </div>

      </div>
    </div>
  );
}