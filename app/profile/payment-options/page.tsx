import React from "react";

export default function PaymentOptionsPage() {
  return (
    <div className="mx-auto max-w-4xl py-10 px-20 shadow-md bg-white">
      <h1 className="mb-6 text-[20px] font-medium text-[#DB4444]">
        My Payment Options
      </h1>

      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-md border p-4">
          <div>
            <p className="font-medium">Visa ending in 1234</p>
            <p className="text-sm text-gray-500">
              Expiry 12/28
            </p>
          </div>

          <button className="text-[#DB4444]">
            Remove
          </button>
        </div>

        <button className="rounded-md bg-[#DB4444] px-5 py-3 text-white">
          Add New Card
        </button>
      </div>
    </div>
  );
}