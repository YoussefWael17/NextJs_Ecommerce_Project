"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBox,
  faBoxesStacked,
  faTag,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
  status: ProductStatus;
}

export default function AdminProductsPage() {
  const [products] = useState<Product[]>([
    {
      id: "1",
      name: "Gaming Laptop",
      category: "Electronics",
      price: 1200,
      stock: 15,
      createdAt: "2025-07-20",
      status: "IN_STOCK",
    },
    {
      id: "2",
      name: "Wireless Headphones",
      category: "Accessories",
      price: 180,
      stock: 8,
      createdAt: "2025-07-18",
      status: "IN_STOCK",
    },
    {
      id: "3",
      name: "Smart Watch",
      category: "Wearables",
      price: 250,
      stock: 0,
      createdAt: "2025-07-15",
      status: "OUT_OF_STOCK",
    },
    {
      id: "4",
      name: "Mechanical Keyboard",
      category: "Accessories",
      price: 90,
      stock: 20,
      createdAt: "2025-07-10",
      status: "IN_STOCK",
    },
  ]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const totalProducts = products.length;

  const inStockProducts = products.filter(
    (product) => product.status === "IN_STOCK"
  ).length;

  const outOfStockProducts = products.filter(
    (product) => product.status === "OUT_OF_STOCK"
  ).length;

  const totalInventory = products.reduce(
    (sum, product) => sum + product.stock,
    0
  );

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-black sm:text-3xl">
            Products Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage products, stock and inventory.
          </p>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DB4444] bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition duration-300 hover:bg-white hover:text-[#DB4444] sm:w-fit">
          <FontAwesomeIcon icon={faPlus} />
          Add New Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faBoxesStacked} />
          </div>

          <h3 className="text-2xl font-bold">{totalProducts}</h3>

          <p className="mt-1 text-sm text-gray-500">
            Total Products
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faBox} />
          </div>

          <h3 className="text-2xl font-bold">
            {inStockProducts}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            In Stock
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faTag} />
          </div>

          <h3 className="text-2xl font-bold">
            {outOfStockProducts}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Out Of Stock
          </p>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faBoxesStacked} />
          </div>

          <h3 className="text-2xl font-bold">
            {totalInventory}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Inventory Items
          </p>
        </div>
      </div>

      {/* Products Section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Products List
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage your products inventory
            </p>
          </div>

          <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 lg:w-[320px]">
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search product..."
              className="w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        {/* Desktop */}
        <div className="hidden overflow-x-auto lg:block">
          <table className="min-w-full border-separate border-spacing-y-3">
            <thead>
              <tr className="text-left text-sm text-gray-400">
                <th className="px-4">Product</th>
                <th className="px-4">Category</th>
                <th className="px-4">Price</th>
                <th className="px-4">Stock</th>
                <th className="px-4">Status</th>
                <th className="px-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="bg-gray-50"
                >
                  <td className="rounded-l-2xl px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DB4444] text-white font-bold">
                        {product.name.charAt(0)}
                      </div>

                      <div>
                        <h3 className="font-semibold">
                          {product.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {formatDate(product.createdAt)}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {product.category}
                  </td>

                  <td className="px-4 py-4">
                    ${product.price}
                  </td>

                  <td className="px-4 py-4">
                    {product.stock}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        product.status === "IN_STOCK"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>

                  <td className="rounded-r-2xl px-4 py-4">
                    <div className="flex items-center gap-3">
                      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444]">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>

                      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:border-red-500 hover:text-red-500">
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile */}
        <div className="space-y-4 lg:hidden">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DB4444] text-white font-bold">
                  {product.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {product.category}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <p className="text-sm">
                  Price: ${product.price}
                </p>

                <p className="text-sm">
                  Stock: {product.stock}
                </p>

                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    product.status === "IN_STOCK"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {product.status}
                </span>

                <div className="flex gap-3 pt-2">
                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:border-[#DB4444] hover:text-[#DB4444]">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </button>

                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:border-red-500 hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}