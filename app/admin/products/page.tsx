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
import Image from "next/image";
import { toast } from "sonner";

type ProductStatus = "IN_STOCK" | "OUT_OF_STOCK";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  createdAt: string;
  status: ProductStatus;
  image: string;
}

export default function AdminProductsPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState("");

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const imageUrl = URL.createObjectURL(file);

    setPreviewImage(imageUrl);

    setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    image: "",
    status: "IN_STOCK",
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setPreviewImage("");

    setFormData({
      name: "",
      category: "",
      price: "",
      stock: "",
      image: '',
      status: "IN_STOCK",
    });

    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {

    setEditingProduct(product);

    setPreviewImage(product.image);

    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
      image: product.image,
      status: product.status,
    });

    setIsModalOpen(true);
  };

  const handleSaveProduct = () => {

  if (editingProduct) {

    setProducts((prev) =>
      prev.map((item) =>
        item.id === editingProduct.id
          ? {
              ...item,
              name: formData.name,
              category: formData.category,
              price: Number(formData.price),
              stock: Number(formData.stock),
              image: formData.image,
              status: formData.status as ProductStatus,
            }
          : item
      )
    );
    toast.success("Update Product Successfully")

  } else {

    const newProduct: Product = {
      id: crypto.randomUUID(),
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      stock: Number(formData.stock),
      status: formData.status as ProductStatus,
      createdAt: new Date().toISOString(),
      image: formData.image
    };

    setProducts((prev) => [newProduct, ...prev]);

    toast.success("Product Added Successfully")
  }

  setIsModalOpen(false);
};

  const [products, setProducts] = useState<Product[]>([
    {
      id: "1",
      name: "Gaming Laptop",
      category: "Electronics",
      price: 1200,
      stock: 15,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      createdAt: "2025-07-20",
      status: "IN_STOCK",
    },
    {
      id: "2",
      name: "Wireless Headphones",
      category: "Accessories",
      price: 180,
      stock: 8,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      createdAt: "2025-07-18",
      status: "IN_STOCK",
    },
    {
      id: "3",
      name: "Smart Watch",
      category: "Wearables",
      price: 250,
      stock: 0,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
      createdAt: "2025-07-15",
      status: "OUT_OF_STOCK",
    },
    {
      id: "4",
      name: "Mechanical Keyboard",
      category: "Accessories",
      price: 90,
      stock: 20,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
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

        <button onClick={handleAddProduct} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DB4444] bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition duration-300 hover:bg-white hover:text-[#DB4444] sm:w-fit">
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
            
                      <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-200">
                        <Image
                          src={
                            product.image && product.image.trim()
                              ? product.image
                              : "/product-placeholder.jpg"
                          }
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
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
                      <button onClick={() => handleEditProduct(product)} className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444]">
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
                <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-gray-200">
                  <Image
                    src={
                      product.image && product.image.trim()
                        ? product.image
                        : "/product-placeholder.jpg"
                    }
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
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
                  <button onClick={() => handleEditProduct(product)} className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 hover:border-[#DB4444] hover:text-[#DB4444]">
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

      {
        isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 ">

            <div className="flex min-h-full items-center justify-center  w-full md:w-fit">
              <div className="w-full rounded-3xl bg-white p-6 shadow-xl">

                {/* Header */}
                <div className="mb-6 flex items-center justify-between mt-40 md:mt-0 ">

                  <h2 className="text-2xl font-bold text-black">
                    {editingProduct
                      ? "Edit Product"
                      : "Add Product"}
                  </h2>

                  <button
                    onClick={() =>
                      setIsModalOpen(false)
                    }
                    className="text-2xl text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>

                </div>

                {/* Form */}
                <div className="grid gap-4 md:grid-cols-2">

                  {/* Name */}
                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Product Name
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                    />

                  </div>

                  {/* Category */}
                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Category
                    </label>

                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                    />

                  </div>

                  {/* Price */}
                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Price
                    </label>

                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                    />

                  </div>

                  {/* Stock */}
                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Stock
                    </label>

                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          stock: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                    />

                  </div>

                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      Product Image
                    </label>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">

                      {/* Preview */}
                      <div className="h-28 w-28 overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">

                        {previewImage ? (
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-gray-400">
                            No Image
                          </div>
                        )}

                      </div>

                      {/* Upload Button */}
                      <label className="cursor-pointer rounded-2xl border border-[#DB4444] px-5 py-3 text-sm font-medium text-[#DB4444] transition hover:bg-[#DB4444] hover:text-white">

                        Upload Photo

                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />

                      </label>

                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-medium">
                      Status
                    </label>

                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status: e.target.value,
                        })
                      }
                      className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                    >
                      <option value="IN_STOCK">
                        In Stock
                      </option>

                      <option value="OUT_OF_STOCK">
                        Out Of Stock
                      </option>
                    </select>

                  </div>

                </div>

                {/* Footer */}
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-end">

                  <button
                    onClick={() =>
                      setIsModalOpen(false)
                    }
                    className="rounded-2xl border border-gray-200 px-6 py-3 font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleSaveProduct}
                    className="rounded-2xl bg-[#DB4444] px-6 py-3 font-medium text-white transition hover:opacity-90"
                  >
                    {editingProduct
                      ? "Update Product"
                      : "Add Product"}
                  </button>

                </div>

              </div>
            </div>

          </div>
        )
      }
    </div>
  );
}