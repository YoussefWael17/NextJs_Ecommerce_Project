"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faPenToSquare,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: "ACTIVE" | "OUT_OF_STOCK";
};

export default function VendorProductsPage() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "iPhone 15",
      price: 999,
      stock: 10,
      status: "ACTIVE",
    },
    {
      id: "2",
      name: "MacBook Pro",
      price: 1999,
      stock: 0,
      status: "OUT_OF_STOCK",
    },
  ]);

  const [search, setSearch] = useState("");

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalProducts = products.length;

    const inStock = products.filter(
        (p) => p.status === "ACTIVE" && p.stock > 0
    ).length;

    const outOfStock = products.filter(
        (p) => p.status === "OUT_OF_STOCK" || p.stock === 0
    ).length;

  return (
    <div className="space-y-6">

        {/* STATS */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

        {/* Total */}
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
            <h3 className="text-gray-500">Total Products</h3>
            <p className="text-3xl font-bold">{totalProducts}</p>
        </div>

        {/* In Stock */}
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
            <h3 className="text-gray-500">In Stock</h3>
            <p className="text-3xl font-bold text-green-600">
            {inStock}
            </p>
        </div>

        {/* Out of Stock */}
        <div className="rounded-3xl border bg-white p-5 shadow-sm">
            <h3 className="text-gray-500">Out of Stock</h3>
            <p className="text-3xl font-bold text-red-500">
            {outOfStock}
            </p>
        </div>

        </div>

      {/* SEARCH */}
      <div className="flex items-center gap-2 rounded-2xl border bg-white px-4 py-3 lg:w-[320px]">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="text-gray-400" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search product..."
          className="w-full bg-transparent outline-none"
        />
      </div>

      {/* TABLE HEADER (FAKE TABLE) */}
      <div className="hidden lg:grid grid-cols-12 px-6 py-4 text-sm font-semibold text-gray-500 bg-gray-50 rounded-2xl border">

        <div className="col-span-4">Product</div>
        <div className="col-span-2">Price</div>
        <div className="col-span-2">Stock</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2 text-right">Actions</div>

      </div>

      {/* ROWS (CARDS STYLE) */}
      <div className="space-y-4">

        {filtered.map((product) => (
          <div
            key={product.id}
            className="grid grid-cols-1 lg:grid-cols-12 items-center gap-4 rounded-3xl border border-gray-200 bg-gray-50 p-5 shadow-sm"
          >

            {/* PRODUCT */}
            <div className="lg:col-span-4 flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DB4444] text-sm font-bold text-white">
                {product.name.charAt(0)}
              </div>

              <div>
                <h3 className="font-semibold text-black">
                  {product.name}
                </h3>

                <p className="text-xs text-gray-500">
                  ID: {product.id}
                </p>
              </div>

            </div>

            {/* PRICE */}
            <div className="lg:col-span-2 font-medium text-gray-700">
              ${product.price}
            </div>

            {/* STOCK */}
            <div className="lg:col-span-2">
              <span className={product.stock > 0 ? "text-green-600 font-medium" : "text-red-500 font-medium"}>
                {product.stock}
              </span>
            </div>

            {/* STATUS */}
            <div className="lg:col-span-2">
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  product.status === "ACTIVE"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {product.status === "ACTIVE" ? "Active" : "Out of stock"}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="lg:col-span-2 flex lg:justify-end gap-3">

              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:border-[#DB4444] hover:text-[#DB4444]">
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>

              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 hover:border-red-500 hover:text-red-500">
                <FontAwesomeIcon icon={faTrash} />
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}