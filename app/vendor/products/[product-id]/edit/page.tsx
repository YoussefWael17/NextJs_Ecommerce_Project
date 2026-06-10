"use client"

import { getImageUrl } from '@/app/admin/utils/getImageUrl';
import { useGetSingleProductQuery } from '@/app/redux/services/vendorsApi';
import { faImage } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner';
import * as Yup from "yup";

export default function page() {

    const params = useParams();

    const id = params?.["product-id"] as string;

    const { data: product, isLoading, isError, isFetching, refetch } = useGetSingleProductQuery(id as string, {
        skip: !id,
    });


    const [previewImage, setPreviewImage] = useState("");
    const [categoriesApi, setCategoriesApi] = useState([]);

    async function getCategories() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            if(response.data.success === true){
            setCategoriesApi(response?.data?.data)
            }
            console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const updateProductValidationSchema = Yup.object({
        title: Yup.string()
            .required("Title is required")
            .min(3, "Title must be at least 3 characters"),

        description: Yup.string()
            .required("Description is required")
            .min(10, "Description must be at least 10 characters"),

        thumbnail: Yup.mixed<File>().when([], {
            is: () => false,
            then: (schema) => schema.required(),
        }),

        categoryId: Yup.string()
            .required("Category is required"),
    });
    
    
    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("categoryId", values.categoryId);

            formData.append("thumbnail", values.thumbnail as File);

            formData.append("isSale", values.isSale);
            formData.append("isActive", values.isActive);

            // await addProduct(formData).unwrap();

            toast.success("Product Added Successfully");
            setPreviewImage("");
            formik.resetForm();

        } catch (err) {
            toast.error("Something went wrong");
        }
    };

    const formik = useFormik({
        initialValues: {
        title: "",
        description: "",
        thumbnail: null,
        categoryId: "",
        isSale: false,
        isActive: false,
    },
        validationSchema: updateProductValidationSchema,
        onSubmit: handleSubmit,
    });
        
    
    useEffect(() => {
        getCategories();

        if (!product?.data) return;

        formik.setValues({
            title: product.data.title || "",
            description: product.data.description || "",
            thumbnail: null,
            categoryId: product.data.categoryId || "",
            isSale: product.data.isSale || false,
            isActive: product.data.isActive || false,
        });

        setPreviewImage(product.data.thumbnail || "");
    }, [product?.data]);


    
    
    if (isLoading || isFetching) {
        return (
            <div className="flex h-screen flex-col items-center justify-center gap-3">
            <div className="h-14 w-14 animate-spin rounded-full border-4 border-gray-200 border-t-[#DB4444]"></div>
            <p className="text-sm text-gray-500">Loading...</p>
            </div>
        );
    }
  
    if (isError) {
      return (
        <div className="flex h-[60vh] items-center justify-center p-6">
          <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
  
            {/* Icon */}
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-8 w-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                />
              </svg>
            </div>
  
            {/* Title */}
            <h2 className="text-xl font-bold text-black">
              Failed to load product to edit
            </h2>
  
            {/* Subtitle */}
            <p className="mt-2 text-sm text-gray-500">
              Something went wrong while fetching data. Please try again.
            </p>
  
            {/* Button */}
            <button
              onClick={refetch}
              className="mt-6 w-full rounded-2xl bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-white hover:text-[#DB4444] hover:border hover:border-[#DB4444]"
            >
              Retry
            </button>
  
          </div>
        </div>
      );
    }        

    return (
        <div className="space-y-6 lg:space-y-8">

                <form onSubmit={formik.handleSubmit}>

                {/* Header */}
                <div className="mb-6">
                    <h1 className="text-2xl font-bold">
                    Edit Product
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                    Edit Product And Manage Inventory.
                    </p>
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


                    {/* Category */}
                    <div className="relative">
                        <label className="mb-2 block text-sm font-medium">
                            Category
                        </label>
                        
                        <select
                        name="categoryId"
                        value={formik.values.categoryId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className="w-full appearance-none rounded-2xl border border-gray-200 px-4 py-3 pr-10 outline-none focus:border-[#DB4444]"
                        >
                        <option value="">Select Category</option>

                        {categoriesApi.map((category: any) => (
                            <option
                            key={category.id}
                            value={category.id}
                            >
                            {category.name}
                            </option>
                        ))}
                        </select>

                        <div className="pointer-events-none absolute inset-y-0 right-4 top-3 flex items-center">
                        <svg
                            className="h-4 w-4 text-gray-500"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                            fillRule="evenodd"
                            d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                            clipRule="evenodd"
                            />
                        </svg>
                        </div>
                    </div>


                    {/* Description */}
                    <div>
                    <label className="mb-2 block text-sm font-medium">
                        Description
                    </label>

                    <textarea
                        rows={8}
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
                    <div>
                        <label className="mb-2 block text-sm font-medium">
                            Thumbnail
                        </label>

                        <div className="flex flex-col items-center gap-4">
                            <label className="group flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-[#DB4444] hover:bg-red-50">

                            {previewImage ? (
                                <img
                                src={getImageUrl(previewImage)}
                                alt="preview"
                                className="h-full w-full rounded-2xl object-contain"
                                />
                            ) : (
                                <>
                                <FontAwesomeIcon
                                    icon={faImage}
                                    className="mb-3 text-5xl text-gray-400 transition group-hover:text-[#DB4444]"
                                />

                                <p className="font-medium text-gray-700">
                                    Upload Product Image
                                </p>

                                <p className="mt-1 text-sm text-gray-400">
                                    Click to browse or drag & drop
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    PNG, JPG, JPEG
                                </p>
                                </>
                            )}

                            <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                const file = e.target.files?.[0];

                                if (!file) return;

                                const url = URL.createObjectURL(file);

                                setPreviewImage(url);

                                formik.setFieldValue("thumbnail", file);
                                formik.setFieldValue("images[0].image", file);
                                }}
                            />
                            </label>
                        </div>
                    </div>

                    {/* Is Sale */}
                    <div className="flex items-center justify-between  p-3">
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                            type="checkbox"
                            name="isSale"
                            checked={formik.values.isSale}
                            onChange={formik.handleChange}
                            className="peer sr-only"
                        />
                        
                            <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#DB4444] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"></div>
                        
                            <span className="font-medium ml-4">On Sale</span>
                        </label>
                    </div>

                    {/* Is Active */}
                    <div className="flex items-center justify-between  p-3">
                        <label className="relative inline-flex cursor-pointer items-center">
                            <input
                            type="checkbox"
                            name="isActive"
                            checked={formik.values.isActive}
                            onChange={formik.handleChange}
                            className="peer sr-only"
                        />
                        
                            <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#DB4444] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full"></div>
                        
                            <span className="font-medium ml-4">Active</span>
                        </label>
                    </div>

                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end gap-3">

                    <button
                    type="submit"
                    className="rounded-xl bg-[#DB4444] px-6 py-3 text-white"
                    >
                    
                        Edit Product
                    </button>

                </div>

                </form>

        </div>
    )
}
