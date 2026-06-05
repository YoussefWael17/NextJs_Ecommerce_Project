"use client"

import * as Yup from "yup";
// import { useCreateCategoryMutation } from "@/app/redux/services/adminsApi";
// import { useGetCategoriesQuery } from "@/app/redux/services/categoriesApi";
import { Category } from "@/app/types/category";
import { faTags, faPlus, faMagnifyingGlass, faPenToSquare, faTrash, faBoxOpen,} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFormik } from "formik";
import { useState } from "react";
// import { toast } from "sonner";

const formatDate = (date: string) => {

    return new Date(date).toLocaleDateString(
      "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

    
const initialCategories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices",
    createdAt: "2026-05-27T23:06:56.538Z",
  },
  {
    id: "2",
    name: "Fashion",
    slug: "fashion",
    description: "Clothing and accessories",
    createdAt: "2026-05-29T04:53:12.273Z",
  },
  {
    id: "3",
    name: "Books",
    slug: "books",
    description: "Books and magazines",
    createdAt: "2026-05-30T10:15:00.000Z",
  },
];







export default function CategoriesPage() {

  
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [previewImage, setPreviewImage] = useState("");
    const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);


    function handleAddCategory() {
      setEditingCategory(null);

      formik.resetForm();

      setIsAddCategoryModalOpen(true);
    }

    function handleEditCategory(category: Category) {
      setEditingCategory(category);

      formik.setValues({
        name: category.name,
        image: null,
      });

      setIsEditCategoryModalOpen(true);
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      setPreviewImage(URL.createObjectURL(file));
      formik.setFieldValue("image", file);
    };

    const validationSchema = Yup.object({
      name: Yup.string()
        .required("Name is required")
        .min(3, "Name must be at least 3 characters"),

      image: Yup.mixed().nullable().required("Image is required"),
    });

    const formik = useFormik({
    initialValues: {
      name: "",
      image: null as File | null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("SUBMIT WORKS", values);
        if (editingCategory) {
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === editingCategory.id
                ? {
                    ...cat,
                    name: values.name,
                    slug: values.name.toLowerCase(),
                  }
                : cat
            )
          );

          setIsEditCategoryModalOpen(false);
        } else {
          const newCategory: Category = {
            id: crypto.randomUUID(),
            name: values.name,
            slug: values.name.toLowerCase(),
            description: "",
            createdAt: new Date().toISOString(),
          };

          setCategories((prev) => [...prev, newCategory]);
          setIsAddCategoryModalOpen(false);
        }
      }
    });

    
    // RTK Api Calling
    // const { data, isLoading } = useGetCategoriesQuery();
    // const categories = data?.data ?? [];
    // const [ createCategory ] = useCreateCategoryMutation(); 

    // const [previewImage, setPreviewImage] = useState("");
    
    // const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
    // const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);

    // const handleSubmit = async (
    //   values: any
    // ) => {
    //   try {
    //     const formData = new FormData();

    //     formData.append(
    //       "name",
    //       values.name
    //     );

    //     formData.append(
    //       "image",
    //       values.image
    //     );
        
    //     await createCategory({
    //       data: formData,
    //     }).unwrap();

    //     toast.success("Category Added Successfully");

    //     setIsAddCategoryModalOpen(false);
    //     setPreviewImage("");
    //     formik.resetForm();

        

    //   } catch (err: any) {
    //       console.log("FULL ERROR:", err);

    //       const message =
    //         err?.data?.message ||
    //         err?.error?.data?.message ||
    //         err?.error?.message ||
    //         err?.message ||
    //         "Something went wrong";

    //       toast.error(message);
    //     }
    // };

    // const validationSchema = Yup.object({
    //   name: Yup.string()
    //     .required("Name is required")
    //     .min(3, "Name must be at least 3 characters"),

    //   image: Yup.mixed<File>()
    //     .required("Image is required"),
    // });
    
    // const formik = useFormik({
    //   initialValues: {
    //     name: "",
    //     image: null,
    //   },
    //   validationSchema,
    //   onSubmit: handleSubmit,
    // });
    
    // const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const file = e.target.files?.[0];

    //   if (!file) return;

    //   setPreviewImage(URL.createObjectURL(file));

    //   formik.setFieldValue("image", file);
    // };

    // function handleAddCategory() {
    //   formik.resetForm();
    //   setPreviewImage("");
    //   setIsAddCategoryModalOpen(true);
    // }


  return (
    <div className="space-y-6 lg:space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-black sm:text-3xl">
            Categories Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
              Manage store categories and organize products.
          </p>

        </div>

        <button
            onClick={()=> {handleAddCategory()}}
            className="
            flex w-full items-center justify-center gap-2
            rounded-2xl border border-[#DB4444]
            bg-[#DB4444]
            px-5 py-3
            text-sm font-semibold text-white
            shadow transition duration-300
            hover:bg-white hover:text-[#DB4444]
            sm:w-fit"
            >
            <FontAwesomeIcon icon={faPlus} />
            Add New Category
        </button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

        {/* Total Categories */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start md:justify-start">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
                <FontAwesomeIcon icon={faTags} />
                </div>

                <h3 className="text-2xl font-bold text-black sm:text-3xl">
                {categories.length}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                Total Categories
                </p>

        </div>

        {/* Total Products */}
        <div className="flex flex-col items-center justify-center rounded-3xl border border-gray-200 bg-white p-5 shadow-sm md:items-start md:justify-start">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
                <FontAwesomeIcon icon={faBoxOpen} />
                </div>

                <h3 className="text-2xl font-bold text-black sm:text-3xl">
                0
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                Total Products
                </p>

        </div>

      </div>

      {/* Categories Section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

        {/* Top */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-bold text-black sm:text-2xl">
              All Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently added category
            </p>

          </div>

          {/* Search */}
          <div className="flex w-full items-center gap-2 rounded-2xl border border-gray-200 px-4 py-3 lg:w-[320px]">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="text-gray-400"
            />

            <input
              type="text"
              placeholder="Search category..."
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="min-w-full border-separate border-spacing-y-3">

            <thead>
                <tr className="text-left text-sm text-gray-400">
                    <th className="px-4">Category</th>
                    <th className="px-4">Slug</th>
                    <th className="px-4">Products</th>
                    <th className="px-4">Created At</th>
                    <th className="px-4">Actions</th>
                </tr>
            </thead>

            <tbody>
                {categories.map((category) => (
                    <tr
                    key={category.id}
                    className="bg-gray-50"
                    >
                    <td className="rounded-l-2xl px-4 py-4">
                        <div className="flex items-center gap-3">
                        <div
                            className="
                            flex h-12 w-12 items-center justify-center
                            rounded-full bg-[#DB4444]
                            text-sm font-bold text-white"
                        >
                            {category.name.charAt(0)}
                        </div>

                        <div>
                            <h3 className="font-semibold text-black">
                            {category.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                            {category.description}
                            </p>
                        </div>
                        </div>
                    </td>

                    <td className="px-4 py-4">
                        <span
                        className="
                        rounded-full bg-red-100
                        px-3 py-1 text-xs font-semibold
                        text-[#DB4444]"
                        >
                        {category.slug}
                        </span>
                    </td>

                    <td className="px-4 py-4 ">
                        <span
                        className="
                        py-1 px-4 text-xs  font-semibold"
                        >
                        100
                        </span>
                    </td>

                    <td className="px-4 py-4 text-sm text-gray-600">
                        {formatDate(category.createdAt ?? "")}
                    </td>

                    <td className="rounded-r-2xl px-4 py-4">
                        <div className="flex items-center gap-3">

                        <button
                            onClick={()=> {handleEditCategory(category)}}
                            className="
                            flex h-10 w-10 items-center justify-center
                            rounded-xl border border-gray-200
                            text-gray-600 transition
                            hover:border-[#DB4444]
                            hover:text-[#DB4444]"
                        >
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </button>

                        <button
                            className="
                            flex h-10 w-10 items-center justify-center
                            rounded-xl border border-gray-200
                            text-gray-600 transition
                            hover:border-red-500
                            hover:text-red-500"
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </button>

                        </div>
                    </td>
                    </tr>
                ))}
            </tbody>

          </table>

        </div>


        {/* Mobile Cards */}
        <div className="space-y-4 lg:hidden">
            {categories.map((category) => (
                <div
                key={category.id}
                className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
                >
                {/* Header */}
                <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DB4444] text-sm font-bold text-white">
                    {category.name.charAt(0)}
                    </div>

                    <div>
                    <h3 className="font-semibold text-black">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.description}</p>
                    </div>
                </div>

                {/* Info Grid */}
                <div className="mt-5 space-y-4">

                    {/* Slug */}
                    <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase text-gray-400">
                        Slug
                    </p>

                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-[#DB4444]">
                        {category.slug}
                    </span>
                    </div>

                    {/* Products */}
                    <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase text-gray-400">
                        Products
                    </p>

                    <span className="text-sm font-semibold text-gray-700">
                        100
                    </span>
                    </div>

                    {/* Created At */}
                    <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase text-gray-400">
                        Created At
                    </p>

                    <p className="text-sm text-gray-600">
                        {formatDate(category.createdAt ?? "")}
                    </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-2">
                    <button
                        type="button"
                        onClick={()=> {handleEditCategory(category)}}
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#DB4444] hover:text-[#DB4444]"
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                        Edit
                    </button>

                    <button
                        type="button"
                        className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-red-500 hover:text-red-500"
                    >
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
        isEditCategoryModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">

              <form onSubmit={formik.handleSubmit}>
              
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Edit Category
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsEditCategoryModalOpen(false)}
                    className="text-3xl text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">

              
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Name
                    </label>

                    <input
                      type="text"
                      value={formik.values.name}
                      name="name"
                      id="name"
                      onChange={formik.handleChange}
                      className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                    />
                  </div>

                </div>

                <div className="mt-8 flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => setIsEditCategoryModalOpen(false)}
                    className="rounded-xl border px-6 py-3"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    // disabled={isUpdating}
                    className="rounded-xl bg-[#DB4444] px-6 py-3 text-white"
                  >
                    
                    Update Category
                  </button>

                </div>

              </form>

            </div>
          </div>
        )
      }

      {
        isAddCategoryModalOpen && (
            <div className="fixed inset-0 z-1 flex items-center justify-center bg-black/50 p-4">
                <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">

                <form onSubmit={formik.handleSubmit}>

                   
                    <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">
                        Add Category
                    </h2>

                    <button
                        type="button"
                        onClick={() => setIsAddCategoryModalOpen(false)}
                        className="text-3xl text-gray-400 hover:text-red-500"
                    >
                        ×
                    </button>
                    </div>

                    
                    <div className="grid gap-4 md:grid-cols-2">

                    
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                        Name
                        </label>

                        <input
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                        placeholder="Category name"
                        />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Image
                      </label>

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full rounded-2xl border border-gray-200 px-4 py-3"
                      />

                      {
                        previewImage &&
                          (
                            <img
                              src={previewImage}
                              alt="preview"
                              className="mt-3 h-32 w-32 rounded-xl object-cover"
                            />
                          )
                      }
                    </div>

                    </div>

                    
                    <div className="mt-8 flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => setIsAddCategoryModalOpen(false)}
                        className="rounded-xl border px-6 py-3"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="rounded-xl bg-[#DB4444] px-6 py-3 text-white"
                    >
                        Add Category
                    </button>

                    </div>

                </form>

                </div>
            </div>
        )
      }

    </div>
  )
}

