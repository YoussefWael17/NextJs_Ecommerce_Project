import React from "react";

export default function ReturnsPage() {
  return (
    <div className="mx-auto max-w-4xl py-10 px-20 shadow-md bg-white">
      <h1 className="mb-6 text-[20px] font-medium text-[#DB4444]">
        My Returns
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="py-3 text-left">Order ID</th>
              <th className="py-3 text-left">Product</th>
              <th className="py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-4">#12345</td>
              <td>Gaming Mouse</td>
              <td className="text-yellow-500">
                Pending
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}