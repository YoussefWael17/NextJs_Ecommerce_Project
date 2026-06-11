"use client";


import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faBoxesStacked, faBox, faTag, faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import formatDate from "@/app/admin/utils/formateData";
import { useDeleteProductMutation, useGetProductsQuery } from "@/app/redux/services/vendorsApi";
import { getImageUrl } from "@/app/admin/utils/getImageUrl";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import VendorProductsPageSkeleton from "@/app/components/skeletonUI/vendor-products-skeleton";




export default function VendorProductsPage() {
  
  const router = useRouter();
  
  const { data, refetch, isLoading, isFetching} = useGetProductsQuery();
  const products = data?.data || [];

  const [deleteProduct] = useDeleteProductMutation();
 
  function navigateToAddProduct(){
    return router.push("/vendor/products/create");
  }

  function navigateToEditProduct(id: string) {
    return router.push(`/vendor/products/${id}/edit`)
  }

  async function handleDeleteProduct(id: string) {
    try {
      await deleteProduct(id).unwrap()
      toast.success("Product deleted successfully");
      refetch()
    } catch (error) {
      toast.error("Failed to delete product");
    }
  }

  
  

  

  const totalProducts = products.length;
  
  const inStockProducts = 100;
  const outOfStockProducts = 200
  const totalInventory = 1033;


  if(isLoading || isFetching){
    return(
      <VendorProductsPageSkeleton /> 
    )
  }

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

        <button onClick={()=> { navigateToAddProduct() }} className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DB4444] bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition duration-300 hover:bg-white hover:text-[#DB4444] sm:w-fit">
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
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:border-[#DB4444] hover:text-[#DB4444]">
                        <FontAwesomeIcon icon={faPenToSquare} />
                      </button>

                      <button
                        onClick={() => {handleDeleteProduct(product.id)}} 
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 hover:border-red-500 hover:text-red-500">
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
      </div>

      
    </div>
  );
}