export default function AdminUsersPageSkeleton() {
  return (
    <div className="space-y-6 lg:space-y-8 animate-pulse">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="h-8 w-64 rounded bg-gray-200"></div>
          <div className="mt-3 h-4 w-80 rounded bg-gray-200"></div>
        </div>

        <div className="h-12 w-40 rounded-2xl bg-gray-200"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            <div className="mb-4 h-12 w-12 rounded-2xl bg-gray-200"></div>

            <div className="h-8 w-20 rounded bg-gray-200"></div>

            <div className="mt-2 h-4 w-24 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

        <div className="mb-6 flex justify-between">
          <div>
            <div className="h-6 w-48 rounded bg-gray-200"></div>
            <div className="mt-2 h-4 w-32 rounded bg-gray-200"></div>
          </div>

          <div className="h-12 w-72 rounded-2xl bg-gray-200"></div>
        </div>

        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="mb-3 flex items-center justify-between rounded-2xl bg-gray-100 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-gray-200"></div>

              <div>
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="mt-2 h-3 w-48 rounded bg-gray-200"></div>
              </div>
            </div>

            <div className="h-8 w-20 rounded-full bg-gray-200"></div>
          </div>
        ))}
      </div>

    </div>
  );
}