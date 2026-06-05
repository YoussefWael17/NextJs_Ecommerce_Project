export default function VendorPage() {
  return (
    <div>
      <h1 className="mb-8 text-3xl font-bold">
        Vendor Dashboard
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">
            My Products
          </h2>

          <p className="mt-3 text-3xl font-bold text-[#DB4444]">
            85
          </p>

          <span className="mt-2 inline-block text-sm text-gray-400">
            Active products
          </span>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">
            Total Orders
          </h2>

          <p className="mt-3 text-3xl font-bold text-[#DB4444]">
            320
          </p>

          <span className="mt-2 inline-block text-sm text-gray-400">
            All received orders
          </span>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">
            Revenue
          </h2>

          <p className="mt-3 text-3xl font-bold text-[#DB4444]">
            $12,400
          </p>

          <span className="mt-2 inline-block text-sm text-gray-400">
            Total earnings
          </span>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="text-gray-500">
            Pending Orders
          </h2>

          <p className="mt-3 text-3xl font-bold text-[#DB4444]">
            18
          </p>

          <span className="mt-2 inline-block text-sm text-gray-400">
            Awaiting processing
          </span>
        </div>

      </div>

      {/* Recent Orders */}

      <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-semibold">
          Recent Orders
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="border-b text-left">
                <th className="py-3">Order ID</th>
                <th className="py-3">Customer</th>
                <th className="py-3">Amount</th>
                <th className="py-3">Status</th>
              </tr>
            </thead>

            <tbody>

              <tr className="border-b">
                <td className="py-4">#1001</td>
                <td>Ahmed Ali</td>
                <td>$120</td>
                <td>
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    Pending
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">#1002</td>
                <td>Mohamed Samy</td>
                <td>$240</td>
                <td>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
                    Completed
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-4">#1003</td>
                <td>Sara Adel</td>
                <td>$90</td>
                <td>
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    Shipped
                  </span>
                </td>
              </tr>

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
}