export default function ProductDetailsSkeleton() {
  return (
    <div className="w-full py-4 pt-20 animate-pulse">
      <div className="mx-auto max-w-7xl px-2 lg:px-4">

        {/* Breadcrumb */}
        <div className="flex gap-2 mb-10 mt-6">
          <div className="h-4 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-20 bg-gray-200 rounded" />
          <div className="h-4 w-4 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">

          {/* Thumbnails */}
          <div className="order-1 lg:col-span-2 hidden lg:flex flex-col gap-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="w-full h-28 bg-gray-200 rounded"
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="order-2 lg:col-span-5">
            <div className="w-full h-112.5 bg-gray-200 rounded" />
          </div>

          {/* Details */}
          <div className="order-3 lg:col-span-5">

            <div className="h-8 w-72 bg-gray-200 rounded mb-4" />

            <div className="h-5 w-40 bg-gray-200 rounded mb-4" />

            <div className="h-8 w-24 bg-gray-200 rounded mb-5" />

            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 rounded" />
            </div>

            <div className="border-b border-b-gray-200 mb-6" />

            {/* Colors */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-5 w-16 bg-gray-200 rounded" />

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="w-6 h-6 rounded-full bg-gray-200"
                />
              ))}
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-2 mb-6">
              <div className="h-5 w-12 bg-gray-200 rounded" />

              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className="w-10 h-10 bg-gray-200 rounded"
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <div className="h-12 w-32 bg-gray-200 rounded" />
              <div className="h-12 w-40 bg-gray-200 rounded" />
              <div className="h-12 w-12 bg-gray-200 rounded" />
            </div>

            {/* Delivery Box */}
            <div className="border border-gray-200 rounded">
              <div className="p-4 border-b border-b-gray-200">
                <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-56 bg-gray-200 rounded" />
              </div>

              <div className="p-4">
                <div className="h-5 w-40 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-32 bg-gray-200 rounded" />
              </div>
            </div>

          </div>
        </div>

        {/* Related Products Header */}
        <div className="flex items-center gap-3 mt-32 mb-10">
          <div className="h-10 w-5 bg-gray-200 rounded" />
          <div className="h-6 w-40 bg-gray-200 rounded" />
        </div>

        {/* Related Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <div className="h-52 bg-gray-200" />

              <div className="p-4">
                <div className="h-5 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-24 bg-gray-200 rounded mb-3" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}