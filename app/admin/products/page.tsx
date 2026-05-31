"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "sonner";

import { useGetProductsQuery, useAddProductMutation, useUpdateProductMutation } from "@/app/redux/services/adminsApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faBoxesStacked, faBox, faTag, faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";

const getImageUrl = (img: unknown): string => {
  if (!img) return "/product-placeholder.jpg";

  if (typeof img === "string") return img;

  if (img instanceof File) {
    return URL.createObjectURL(img);
  }

  return "/product-placeholder.jpg";
};

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const mockData = [
  {
    "id": "p1",
    "title": "Nike Air Max 270",
    "slug": "nike-air-max-270",
    "description": "Comfortable and stylish running shoes for everyday wear.",
    "thumbnail": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",

    "isActive": true,
    "isSale": false,

    "categoryId": "c1",
    "category": {
      "id": "c1",
      "name": "Shoes",
      "slug": "shoes",
      "image": "https://images.unsplash.com/photo-1528701800489-20be3c1ea5f3",
      "createdAt": "2026-05-01T10:00:00.000Z"
    },

    "vendorId": "v1",
    "vendor": {
      "id": "v1",
      "name": "Nike Store",
      "email": "nike@store.com"
    },

    "variants": [
      {
        "id": "v1-1",
        "sku": "NIKE-270-RED-42",
        "price": 150,
        "discountPrice": 130,
        "stock": 12,
        "productId": "p1",
        "sizeId": "s1",
        "colorId": "col1",
        "createdAt": "2026-05-01T10:00:00.000Z",
        "size": {
          "id": "s1",
          "name": "42"
        },
        "color": {
          "id": "col1",
          "name": "Red",
          "hexCode": "#ff0000"
        }
      }
    ],

    "images": [
      {
        "id": "img1",
        "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
        "isPrimary": true,
        "productId": "p1",
        "createdAt": "2026-05-01T10:00:00.000Z"
      },
      {
        "id": "img2",
        "image": "https://images.unsplash.com/photo-1528701800489-20be3c1ea5f3",
        "isPrimary": false,
        "productId": "p1",
        "createdAt": "2026-05-01T10:00:00.000Z"
      }
    ],

    "createdAt": "2026-05-01T10:00:00.000Z",
    "updatedAt": "2026-05-02T10:00:00.000Z"
  },

  {
    "id": "p2",
    "title": "Adidas Ultraboost",
    "slug": "adidas-ultraboost",
    "description": "High performance running shoes with maximum comfort.",
    "thumbnail": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",

    "isActive": true,
    "isSale": true,

    "categoryId": "c1",
    "category": {
      "id": "c1",
      "name": "Shoes",
      "slug": "shoes",
      "image": "https://images.unsplash.com/photo-1528701800489-20be3c1ea5f3",
      "createdAt": "2026-05-01T10:00:00.000Z"
    },

    "vendorId": "v2",
    "vendor": {
      "id": "v2",
      "name": "Adidas Store",
      "email": "adidas@store.com"
    },

    "variants": [
      {
        "id": "v2-1",
        "sku": "ADIDAS-UB-44",
        "price": 180,
        "discountPrice": 160,
        "stock": 5,
        "productId": "p2",
        "sizeId": "s2",
        "colorId": "col2",
        "createdAt": "2026-05-01T10:00:00.000Z",
        "size": {
          "id": "s2",
          "name": "44"
        },
        "color": {
          "id": "col2",
          "name": "Black",
          "hexCode": "#000000"
        }
      }
    ],

    "images": [
      {
        "id": "img3",
        "image": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb",
        "isPrimary": true,
        "productId": "p2",
        "createdAt": "2026-05-01T10:00:00.000Z"
      }
    ],

    "createdAt": "2026-05-01T10:00:00.000Z",
    "updatedAt": "2026-05-03T10:00:00.000Z"
  }
]


interface ProductFormValues {
  title: string;
  slug: string;
  description: string;
  thumbnail: File | null;
  categoryId: string;

  variants: {
    sku: string;
    price: number;
    discountPrice: number;
    stock: number;
    sizeId: string;
    colorId: string;
  }[];

  images: {
    image: File | null;
    isPrimary: boolean;
  }[];
}


interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
}

interface Vendor {
  id: string;
  name: string;
  email: string;
}

interface Size {
  id: string;
  name: string;
}

interface Color {
  id: string;
  name: string;
  hexCode?: string;
}

interface Variant {
  id: string;
  sku: string;
  price: number;
  discountPrice: number;
  stock: number;

  productId: string;

  sizeId: string;
  colorId: string;

  createdAt: string;

  size?: Size;
  color?: Color;
}

interface ProductImage {
  id: string;
  image: string;
  isPrimary: boolean;
  productId: string;
  createdAt: string;
}

interface Product {
  id: string;

  title: string;
  slug: string;
  description: string;
  thumbnail: string;

  isActive: boolean;
  isSale: boolean;

  categoryId: string;
  category: Category;

  vendorId: string;
  vendor: Vendor;

  variants: Variant[];
  images: ProductImage[];

  createdAt: string;
  updatedAt: string;
}


export default function AdminProductsPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Mock Data
  const [products, setProducts] = useState<Product[]>(mockData);

  // Mock Data
  const handleSubmit = async (values: ProductFormValues) => {
  try {
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : `p${Date.now()}`,
      title: values.title,
      slug: values.slug,
      description: values.description,
      thumbnail: previewImage || "/product-placeholder.jpg",

      isActive: true,
      isSale: false,

      categoryId: values.categoryId,
      category: editingProduct?.category || {
        id: values.categoryId,
        name: "Unknown",
        slug: "",
        image: "",
        createdAt: new Date().toISOString(),
      },

      vendorId: editingProduct?.vendorId || "v1",
      vendor: editingProduct?.vendor || {
        id: "v1",
        name: "Mock Vendor",
        email: "vendor@test.com",
      },

      variants: values.variants.map((v, idx) => ({
        id: editingProduct
          ? editingProduct.variants[idx]?.id || `v-${Date.now()}-${idx}`
          : `v-${Date.now()}-${idx}`,
        sku: v.sku,
        price: v.price,
        discountPrice: v.discountPrice,
        stock: v.stock,
        productId: editingProduct?.id || "",
        sizeId: v.sizeId,
        colorId: v.colorId,
        createdAt: new Date().toISOString(),
      })),

      images: [
        {
          id: `img-${Date.now()}`,
          image: previewImage || "",
          isPrimary: true,
          productId: editingProduct?.id || "",
          createdAt: new Date().toISOString(),
        },
      ],

      createdAt: editingProduct?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? newProduct : p))
      );

      toast.success("Product Updated Successfully");
    } else {
      setProducts((prev) => [newProduct, ...prev]);
      toast.success("Product Added Successfully");
    }

    setIsModalOpen(false);
    setEditingProduct(null);
    setPreviewImage("");
    formik.resetForm();
  } catch (err) {
    toast.error("Something went wrong");
  }
};

  //Api Calling
  // const { data: products = [] } = useGetProductsQuery();
  // const [addProduct] = useAddProductMutation();
  // const [updateProduct] = useUpdateProductMutation();

  //Api Calling
  // const handleSubmit = async (values: ProductFormValues) => {
  //   try {
  //     const formData = new FormData();

  //     formData.append("title", values.title);
  //     formData.append("slug", values.slug);
  //     formData.append("description", values.description);
  //     formData.append("categoryId", values.categoryId);

  //     formData.append("thumbnail", values.thumbnail as File);

  //     formData.append(
  //       "variant_price",
  //       String(values.variants[0].price)
  //     );

  //     formData.append(
  //       "variant_stock",
  //       String(values.variants[0].stock)
  //     );

  //     if (editingProduct) {
  //       await updateProduct({
  //         id: editingProduct.id,
  //         data: formData,
  //       }).unwrap();

  //       toast.success("Product Updated Successfully");
  //     } else {
  //       await addProduct(formData).unwrap();

  //       toast.success("Product Added Successfully");
  //     }

  //     setIsModalOpen(false);
  //     setEditingProduct(null);
  //     setPreviewImage("");
  //     formik.resetForm();
  //   } catch (err) {
  //     toast.error("Something went wrong");
  //   }
  // };

  const validationSchema = Yup.object({
    title: Yup.string()
      .required("Title is required")
      .min(3, "Title must be at least 3 characters"),

    slug: Yup.string()
      .required("Slug is required")
      .min(3, "Slug must be at least 3 characters"),

    description: Yup.string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters"),

    thumbnail: Yup.mixed<File>()
      .required("Thumbnail is required"),

    categoryId: Yup.string()
      .required("Category is required"),

    variants: Yup.array()
      .of(
        Yup.object({
          sku: Yup.string()
            .required("SKU is required"),

          price: Yup.number()
            .required("Price is required")
            .min(0, "Price cannot be negative"),

          discountPrice: Yup.number()
            .nullable()
            .min(0, "Discount price cannot be negative")
            .test(
              "discount-price",
              "Discount price must be less than or equal to price",
              function (value) {
                if (value === undefined || value === null) return true;

                return value <= this.parent.price;
              }
            ),

          stock: Yup.number()
            .required("Stock is required")
            .min(0, "Stock cannot be negative"),

          sizeId: Yup.string()
            .required("Size is required"),

          colorId: Yup.string()
            .required("Color is required"),
        })
      )
      .min(1, "At least one variant is required"),

    images: Yup.array()
      .of(
        Yup.object({
          image: Yup.mixed<File>()
            .required("Image is required"),

          isPrimary: Yup.boolean()
            .required("Primary image status is required"),
        })
      )
      .min(1, "At least one image is required"),
  });

  const formik = useFormik<ProductFormValues>({
    initialValues: {
      title: "",
      slug: "",
      description: "",
      thumbnail: null,
      categoryId: "",
      variants: [
        {
          sku: "",
          price: 0,
          discountPrice: 0,
          stock: 0,
          sizeId: "",
          colorId: "",
        },
      ],
      images: [
        {
          image: null,
          isPrimary: true,
        },
      ],
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreviewImage(URL.createObjectURL(file));

    formik.setFieldValue("thumbnail", file);

    formik.setFieldValue("images[0].image", file);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);

    setPreviewImage(product.thumbnail);

    formik.setValues({
      title: product.title,
      slug: product.slug,
      description: "Product description",
      thumbnail: null,
      categoryId: product.category.id,

      variants: [
        {
          sku: "SKU-001",
          price: product.variants[0].price,
          discountPrice: product.variants[0].discountPrice,
          stock: product.variants[0].stock,
          sizeId: "SIZE-1",
          colorId: "COLOR-1",
        },
      ],

      images: [
        {
          image: null,
          isPrimary: true,
        },
      ],
    });

    setIsModalOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);

    setPreviewImage("");

    formik.resetForm();

    setIsModalOpen(true);
  };

  const totalProducts = products.length;
  
  const inStockProducts = 100;
  const outOfStockProducts = 200
  const totalInventory = 1033;

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
                <th className="px-4">Vendor</th>
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
                    {product.vendor?.name || "-"}
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
                  <p className="text-gray-500">Vendor</p>
                  <p className="font-semibold">{product.vendor?.name}</p>
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
                  onClick={() => handleEditProduct(product)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3 text-sm hover:border-[#DB4444] hover:text-[#DB4444]"
                >
                  <FontAwesomeIcon icon={faPenToSquare} />
                  Edit
                </button>

                <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-3 text-sm hover:border-red-500 hover:text-red-500">
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {
        isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white p-6 shadow-xl">

            <form onSubmit={formik.handleSubmit}>

              {/* Header */}
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="text-3xl text-gray-400 hover:text-red-500"
                >
                  ×
                </button>
              </div>

              {/* Fields */}
              <div className="grid gap-4 md:grid-cols-2">

                {/* Title */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Title
                  </label>

                  <input
                    type="text"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />

                  {formik.touched.title &&
                    formik.errors.title && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.title}
                      </p>
                    )}
                </div>

                {/* Slug */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={formik.values.slug}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />

                  {formik.touched.slug &&
                    formik.errors.slug && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.slug}
                      </p>
                    )}
                </div>

                {/* Category */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Category Id
                  </label>

                  <input
                    type="text"
                    name="categoryId"
                    value={formik.values.categoryId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />

                  {formik.touched.categoryId &&
                    formik.errors.categoryId && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.categoryId}
                      </p>
                    )}
                </div>

                {/* SKU */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    SKU
                  </label>

                  <input
                    type="text"
                    name="variants[0].sku"
                    value={formik.values.variants[0].sku}
                    onChange={formik.handleChange}
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
                    name="variants[0].price"
                    value={formik.values.variants[0].price}
                    onChange={formik.handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />
                </div>

                {/* Discount Price */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Discount Price
                  </label>

                  <input
                    type="number"
                    name="variants[0].discountPrice"
                    value={formik.values.variants[0].discountPrice}
                    onChange={formik.handleChange}
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
                    name="variants[0].stock"
                    value={formik.values.variants[0].stock}
                    onChange={formik.handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />
                </div>

                {/* Size */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Size Id
                  </label>

                  <input
                    type="text"
                    name="variants[0].sizeId"
                    value={formik.values.variants[0].sizeId}
                    onChange={formik.handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />
                </div>

                {/* Color */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Color Id
                  </label>

                  <input
                    type="text"
                    name="variants[0].colorId"
                    value={formik.values.variants[0].colorId}
                    onChange={formik.handleChange}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none focus:border-[#DB4444]"
                  />

                  {formik.touched.description &&
                    formik.errors.description && (
                      <p className="mt-1 text-sm text-red-500">
                        {formik.errors.description}
                      </p>
                    )}
                </div>

                {/* Thumbnail */}
                <div className="md:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Thumbnail
                  </label>

                  <div className="flex items-center gap-4">

                    <div className="h-28 w-28 overflow-hidden rounded-xl border">
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-gray-400">
                          No Image
                        </div>
                      )}
                    </div>

                    <label className="cursor-pointer rounded-xl border border-[#DB4444] px-5 py-3 text-[#DB4444] hover:bg-[#DB4444] hover:text-white">

                      Upload Image

                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];

                          if (!file) return;

                          const url = URL.createObjectURL(file);

                          setPreviewImage(url);

                          formik.setFieldValue(
                            "thumbnail",
                            file
                          );

                          formik.setFieldValue(
                            "images[0].image",
                            file
                          );
                        }}
                      />

                    </label>
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="mt-8 flex justify-end gap-3">

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-xl border px-6 py-3"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-[#DB4444] px-6 py-3 text-white"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>
        </div>
        )
      }
    </div>
  );
}