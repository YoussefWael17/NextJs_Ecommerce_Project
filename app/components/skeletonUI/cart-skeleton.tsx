export default function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-10 mt-15 min-h-screen animate-pulse">

      {/* Breadcrumb */}
      <div className="h-4 w-32 bg-gray-200 rounded mb-10" />

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-4 gap-6 bg-white rounded-xl border border-gray-100 px-6 py-5 mb-6">
        <div className="h-4 bg-gray-200 rounded w-20" />
        <div className="h-4 bg-gray-200 rounded w-16 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
        <div className="h-4 bg-gray-200 rounded w-20 ml-auto" />
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {[1].map((item) => (
          <div
            key={item}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center bg-white rounded-xl border border-gray-100 px-6 py-5"
          >
            {/* Product */}
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-200 rounded-xl" />

              <div className="space-y-2">
                <div className="h-4 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-24 bg-gray-200 rounded" />
              </div>
            </div>

            {/* Price */}
            <div className="flex justify-center">
              <div className="h-4 w-16 bg-gray-200 rounded" />
            </div>

            {/* Quantity */}
            <div className="flex justify-center">
              <div className="w-28 h-10 bg-gray-200 rounded-xl" />
            </div>

            {/* Subtotal */}
            <div className="flex justify-end">
              <div className="h-5 w-20 bg-gray-200 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* Cart Total */}
      <div className="flex justify-end mt-10">
        <div className="w-full md:w-87.5 border rounded-2xl p-6">
          <div className="h-6 w-32 bg-gray-200 rounded mb-6" />

          <div className="flex justify-between mb-4">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          <div className="flex justify-between border-b pb-4 mb-6">
            <div className="h-4 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>

          <div className="flex justify-between mb-6">
            <div className="h-5 w-16 bg-gray-200 rounded" />
            <div className="h-5 w-20 bg-gray-200 rounded" />
          </div>

          <div className="h-12 w-full bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
}