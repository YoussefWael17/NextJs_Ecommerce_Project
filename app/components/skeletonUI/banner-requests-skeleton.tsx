"use client";

export default function BannerRequestsPageSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">

      {/* ================================================================
          Header
      ================================================================ */}

      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-gray-200" />

        <div className="space-y-2">
          <div className="h-7 w-44 rounded-lg bg-gray-200" />
          <div className="h-4 w-80 rounded bg-gray-200" />
        </div>
      </div>

      {/* ================================================================
          Main Card
      ================================================================ */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* Card Header */}

        <div className="mb-8 space-y-3">
          <div className="h-6 w-56 rounded-lg bg-gray-200" />
          <div className="h-4 w-96 max-w-full rounded bg-gray-200" />
        </div>

        {/* Product + Icon */}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="space-y-2">
            <div className="h-4 w-28 rounded bg-gray-200" />
            <div className="h-11.5 w-full rounded-xl bg-gray-200" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-11.5 w-full rounded-xl bg-gray-200" />
          </div>

        </div>

        {/* Offer + Note */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-11.5 w-full rounded-xl bg-gray-200" />
            <div className="h-3 w-48 rounded bg-gray-100" />
          </div>

          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-24 w-full rounded-xl bg-gray-200" />
          </div>

        </div>

        {/* Banner Preview */}

        <div className="mt-8 border-t border-gray-200 pt-8">

          <div className="h-5 w-32 rounded bg-gray-200" />

          <div className="mt-4 h-56 w-full rounded-2xl bg-gray-200" />

        </div>

        {/* Button */}

        <div className="mt-8 flex justify-end">
          <div className="h-11 w-36 rounded-xl bg-gray-200" />
        </div>

      </div>
    </div>
  );
}