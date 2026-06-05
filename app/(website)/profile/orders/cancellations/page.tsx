import React from "react";

export default function CancellationsPage() {
  return (
    <div className="mx-auto max-w-4xl py-10 px-20 shadow-md bg-white">
      <h1 className="mb-6 text-[20px] font-medium text-[#DB4444]">
        My Cancellations
      </h1>

      <div className="space-y-4">
        <div className="rounded-md border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium">
                Order #45678
              </h2>

              <p className="text-sm text-gray-500">
                Cancelled on July 12
              </p>
            </div>

            <span className="text-red-500">
              Cancelled
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}