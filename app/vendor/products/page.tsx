"use client";


import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faBoxesStacked, faBox, faTag, faMagnifyingGlass, faTrash, faBoxOpen, faRotateRight, faTriangleExclamation, faWarehouse } from "@fortawesome/free-solid-svg-icons";
import formatDate from "@/app/admin/utils/formateData";
import { useDeleteProductMutation, useGetProductsQuery } from "@/app/redux/services/vendorsApi";
import { getImageUrl } from "@/app/admin/utils/getImageUrl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VendorProductsPageSkeleton from "@/app/components/skeletonUI/vendor-products-skeleton";
import { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";




export default function VendorProductsPage() {

    function getInitialPage() {
      if (typeof window === "undefined") return 1;

      const saved = localStorage.getItem("products_page");
      return saved ? Number(saved) : 1;
    };
    
    const router = useRouter();
    
    // Search State & Page State 
    const [page, setPage] = useState(getInitialPage);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [ isShowDeleteModal, setIsShowDeleteModal ] = useState(false);
    const [ selectedProductId, setSelectedProductId ] = useState<string | null>(null);

    // Using RTK For Vendor Products
    const { data, refetch, isLoading, isFetching, isError} = useGetProductsQuery({page, limit:5, search: debouncedSearch});
    const [deleteProduct] = useDeleteProductMutation();

    const products = data?.data?.products ?? [];
    const pagination = data?.data?.pagination;
    const totalPages = pagination?.totalPages || 1;
    const totalProducts = pagination?.total ?? 0;
    const inStockProducts = pagination?.availableProducts ?? 0;
    const outOfStockProducts = pagination?.outOfStockProducts ?? 0;
    const totalInventory = pagination?.totalInventory ?? 0;
    
    // Show First & Last pages And The Current Page & Its Adjacent Pages
    const visiblePages = Array.from({ length: totalPages },(_, i) => i + 1)
    .filter((p) =>
      p === 1 ||
      p === totalPages ||
      Math.abs(p - page) <= 1
    );

    useEffect(() => {
      localStorage.setItem("products_page", String(page));
    }, [page]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

  
    function navigateToAddProduct(){
      return router.push("/vendor/products/create");
    }

    function navigateToEditProduct(id: string) {
      return router.push(`/vendor/products/${id}/edit`)
    }

    async function confirmDelete() {
      if (!selectedProductId) return;

      try {
        await deleteProduct(selectedProductId).unwrap();
        toast.success("Product deleted successfully");

        setIsShowDeleteModal(false);
        setSelectedProductId(null);

        refetch()
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }

    function cancelDelete() {
      setIsShowDeleteModal(false);
      setSelectedProductId(null);
    }

    function handleDeleteProduct(id: string) {
      setSelectedProductId(id);
      setIsShowDeleteModal(true);
    }


    if(isLoading){
      return(
        <VendorProductsPageSkeleton /> 
      )
    }

    if (isError) {
      return (
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="w-full max-w-md rounded-3xl border border-red-100 bg-white p-8 text-center shadow-lg">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
              <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="text-3xl text-red-500"
              />
            </div>
    
            <h2 className="mt-6 text-2xl font-bold text-gray-900">
              Failed to load orders
            </h2>
    
            <p className="mt-2 text-sm leading-6 text-gray-500">
              We couldn't retrieve your orders right now.
              Please check your connection and try again.
            </p>
    
            <button
            onClick={refetch}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-[#DB4444] px-5 py-3 font-medium text-white transition hover:bg-[#c83a3a]"
            >
              <FontAwesomeIcon icon={faRotateRight} />
                Try Again
            </button>
          </div>
        </div>
      );
    }

    return (
    
      <div className="space-y-6 lg:space-y-8">
        
        {/* Header */}
        <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">
          
          <div>
              <h1 className="text-2xl font-bold text-black sm:text-3xl">Products Management</h1>
              <p className="mt-2 text-sm text-gray-500">Manage products, stock and inventory.</p>
          </div>

          <button onClick={()=> { navigateToAddProduct() }} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DB4444] bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition duration-300 hover:bg-white hover:text-[#DB4444] sm:w-fit">
            <FontAwesomeIcon icon={faPlus} />
            Add New Product
          </button>

        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
          
          {/* Total Products */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
                  <FontAwesomeIcon icon={faBoxesStacked} />
              </div>

              <h3 className="text-2xl font-bold">
                  {totalProducts}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                  Total Products
              </p>
          </div>

          {/* Available Products */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50 text-green-600">
                  <FontAwesomeIcon icon={faCircleCheck} />
              </div>

              <h3 className="text-2xl font-bold">
                  {inStockProducts}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                  Available Products
              </p>
          </div>

          {/* Out of Stock */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-50 text-orange-600">
                  <FontAwesomeIcon icon={faTriangleExclamation} />
              </div>

              <h3 className="text-2xl font-bold">
                  {outOfStockProducts}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                  Out of Stock
              </p>
          </div>

          {/* Total Inventory */}
          <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <FontAwesomeIcon icon={faWarehouse} />
              </div>

              <h3 className="text-2xl font-bold">
                  {totalInventory}
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                  Total Inventory
              </p>
          </div>

        </div>

        {/* Products Section */}
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
          
          {/* Products Section Table Header */}
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            
            <div>
              <h2 className="text-xl font-bold text-black sm:text-2xl">
                Products List
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Manage your products inventory
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 sm:w-75">
                <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="text-gray-400"
                />

                <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1); 
                }}
                className="w-full bg-transparent text-sm outline-none"
                />

                    {isFetching && (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-[#DB4444]" />
                    )}
              </div>

            </div>

          </div>

          {/* Check Products > 0) */} 
          { products.length > 0 ? 

          // {/* Products Section (Products > 0) */} 
          <div>

            {/* Products Section Data Table Desktop */} 
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
                              src={getImageUrl(product.thumbnail)}
                              alt={product.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>

                          <div>
                            <h3 className="font-semibold">
                              {product.title}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {formatDate(product.createdAt)}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-4 py-4">
                        {product.category?.name}
                      </td>

                      <td className="px-4 py-4">
                        ${product.variants?.[0]?.price}
                      </td>

                      <td className="px-4 py-4">
                        {product.variants?.[0]?.stock}
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            product.variants?.[0]?.stock == 0
                              ? "bg-red-100 text-red-600" 
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {product.variants?.[0]?.stock == 0 ? "Out Of Stock" : "In Stock"}
                        </span>
                      </td>

                      <td className="rounded-r-2xl px-4 py-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {navigateToEditProduct(product.id)}}
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444] cursor-pointer">
                            <FontAwesomeIcon icon={faPenToSquare} />
                          </button>

                          <button
                            onClick={() => {handleDeleteProduct(product.id)}} 
                            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444] cursor-pointer">
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

            </div>
          
          

          {isShowDeleteModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

              <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                  <FaTrashAlt className="text-2xl text-[#DB4444]" />
                </div>

                {/* Title */}
                <h2 className="mt-5 text-center text-2xl font-bold text-gray-800">
                  Delete Product ?
                </h2>

                {/* Description */}
                <p className="mt-3 text-center text-gray-500">
                  Are you sure you want to delete this product?
                  <br />
                  This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="mt-8 flex gap-3">

                  <button
                    onClick={cancelDelete}
                    disabled={isLoading}
                    className="flex-1 rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={confirmDelete}
                    disabled={isLoading}
                    className="flex-1 rounded-xl bg-[#DB4444] py-3 font-medium text-white transition hover:bg-red-700 disabled:opacity-50 cursor-pointer"
                  >
                    {isLoading ? "Deleting..." : "Delete"}
                  </button>

                </div>

              </div>

            </div>
          )}
          

          {/* Mobile */}
          <div className="space-y-5 lg:hidden">
            {products.map((product) => (
              <div
                key={product.id}
                className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    
                    <div className="relative h-14 w-14 overflow-hidden rounded-xl border">
                      <Image
                        src={getImageUrl(product.thumbnail)}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {product.title}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {product.category?.name}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      product.variants?.[0]?.stock == 0 
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                    }`}
                  >
                    {product.variants?.[0]?.stock == 0 ? "Out Of Stock" : "In Stock"}
                  </span>
                </div>

                {/* Info */}
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-gray-500">Price</p>
                    <p className="font-semibold">${product.variants?.[0]?.price}</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-gray-500">Stock</p>
                    <p className="font-semibold">{product.variants?.[0]?.stock}</p>
                  </div>

                  <div className="rounded-xl bg-gray-50 p-3">
                    <p className="text-gray-500">Created</p>
                    <p className="font-semibold">
                      {formatDate(product.createdAt)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => {navigateToEditProduct(product.id)}}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3 text-sm hover:border-[#DB4444] hover:text-[#DB4444]"
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit
                  </button>

                  <button
                    onClick={() => {handleDeleteProduct(product.id)}}  
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3 text-sm hover:border-red-500 hover:text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
    
            <p className="text-sm text-gray-500">
              Showing page {pagination?.page} of {pagination?.totalPages}
            </p>

            <div className="flex items-center gap-2">

              <button
                onClick={() => setPage((prev) => prev - 1)}
                disabled={page === 1}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm transition hover:border-[#DB4444] hover:text-[#DB4444] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

      
              {visiblePages.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setPage(pageNumber)}
                  className={`h-10 w-10 rounded-xl text-sm font-medium transition ${
                    page === pageNumber
                      ? "bg-[#DB4444] text-white"
                      : "border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444]"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page === pagination?.totalPages}
                className="rounded-xl border border-gray-200 px-4 py-2 text-sm transition hover:border-[#DB4444] hover:text-[#DB4444] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>

            </div>
          </div>

          </div>

          :
          
          // {/* Empty Products State */} 
          <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center">
              
              {/* Empty State Icon */}
              <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
                  <FontAwesomeIcon
                      icon={faBoxOpen}
                      className="text-3xl text-[#DB4444]"
                  />
              </div>

              {/* Empty State Content */}
              <h3 className="text-xl font-semibold text-gray-900">
                  No Products Found
              </h3>

              <p className="mt-2 max-w-md text-sm text-gray-500">
                  There are no products to display at the moment.
              {debouncedSearch &&
                  " Try adjusting your search or clear the search term."}
              </p>

              {/* Clear Search Button */}
              {debouncedSearch && (
              <button
                  onClick={() => {
                  setSearch("");
                  setDebouncedSearch("");
                  setPage(1);
                  }}
                  className="mt-6 rounded-xl bg-[#DB4444] px-5 py-3 text-sm font-medium text-white transition hover:bg-red-600"
              >
                  Clear Search
              </button>
              )}

          </div> 
          }

          
        </div>

        
      </div>
  );
}