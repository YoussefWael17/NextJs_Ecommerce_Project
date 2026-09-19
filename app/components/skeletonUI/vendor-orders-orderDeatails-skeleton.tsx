"use client";

export default function OrderDetailsSkeleton() {
  return (
    <div className="animate-pulse space-y-8">

      {/* Back */}
      <div className="h-5 w-36 rounded bg-gray-200" />

      {/* Header */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div className="space-y-3">
            <div className="h-8 w-56 rounded bg-gray-200" />
            <div className="h-4 w-40 rounded bg-gray-100" />
          </div>

          <div className="flex gap-3">
            <div className="h-10 w-28 rounded-full bg-gray-200" />
            <div className="h-10 w-28 rounded-full bg-gray-200" />
          </div>

        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Left */}
        <div className="space-y-6 xl:col-span-2">

          {/* Products */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 h-6 w-40 rounded bg-gray-200" />

            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-2xl border border-gray-100 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl bg-gray-200" />

                    <div className="space-y-2">
                      <div className="h-4 w-40 rounded bg-gray-200" />
                      <div className="h-3 w-24 rounded bg-gray-100" />
                    </div>
                  </div>

                  <div className="space-y-2 text-right">
                    <div className="h-4 w-20 rounded bg-gray-200" />
                    <div className="h-4 w-16 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 h-6 w-36 rounded bg-gray-200" />

            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="h-10 w-10 rounded-full bg-gray-200" />

                  <div className="space-y-2">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                    <div className="h-3 w-24 rounded bg-gray-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right */}
        <div className="space-y-6">

          {/* Customer */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 h-6 w-48 rounded bg-gray-200" />

            <div className="space-y-5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-2xl bg-gray-200" />

                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded bg-gray-100" />
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 h-6 w-44 rounded bg-gray-200" />

            <div className="space-y-5">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="h-12 w-12 rounded-2xl bg-gray-200" />

                  <div className="space-y-2">
                    <div className="h-3 w-24 rounded bg-gray-100" />
                    <div className="h-4 w-40 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 h-6 w-36 rounded bg-gray-200" />

            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between"
                >
                  <div className="h-4 w-24 rounded bg-gray-100" />
                  <div className="h-4 w-20 rounded bg-gray-200" />
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="h-6 w-20 rounded bg-gray-200" />
                  <div className="h-7 w-24 rounded bg-gray-300" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}