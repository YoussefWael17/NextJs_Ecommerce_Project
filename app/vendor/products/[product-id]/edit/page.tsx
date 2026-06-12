"use client"

import { getImageUrl } from '@/app/admin/utils/getImageUrl';
import { useAddProductVariantMutation, useDeleteProductVariantMutation, useGetSingleProductQuery, useUpdateProductVariantMutation } from '@/app/redux/services/vendorsApi';
import { Color, EditedVariant, Size, Variant } from '@/app/types/variant';
import { faImage, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

import { toast } from 'sonner';
import * as Yup from "yup";

const initialVariantState = {
    sizeId: "",
    colorId: "",
    stock: 0,
    price: 0,
};



export default function page() {

    const params = useParams();

    const id = params?.["product-id"] as string;

    const { data: product, isLoading, isError, isFetching, refetch } = useGetSingleProductQuery(id as string, {
        skip: !id,
    });

    const [addProductVaraint] = useAddProductVariantMutation()
    const [deleteVariant] = useDeleteProductVariantMutation()
    const [updateVariant] = useUpdateProductVariantMutation()


    const [previewImage, setPreviewImage] = useState("");
    const [categoriesApi, setCategoriesApi] = useState([]);
    const [sizesApi, setSizesApi] = useState([]);
    const [colorsApi, setColorsApi] = useState([]);
    

    const [showVariantForm, setShowVariantForm] = useState(false);


    const [editingVariantId, setEditingVariantId] = useState<string>("");
    const [editedVariant, setEditedVariant] = useState(initialVariantState);

    const handleEditVariant = (variant: any) => {
        setEditingVariantId(variant.id);
        setEditedVariant({
            sizeId: variant.size?.id || "",
            colorId: variant.color?.id || "",
            stock: variant.stock || "",
            price: variant.price || "",
        });
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        setEditedVariant((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSaveVariant = async (variantId: string) => {
        try {
            await updateVariant({
                id: variantId,
                data: editedVariant,
            }).unwrap();

            console.log(editedVariant);

            setEditingVariantId("");
            setEditedVariant(initialVariantState);

            refetch()
        } catch (error) {
            console.log(error);
        }
    };

    async function getCategories() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
            if(response.data.success === true){
            setCategoriesApi(response?.data?.data)
            }
            // console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function getSizes() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendor/sizes`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            if(response.data.success === true){
                setSizesApi(response?.data?.data)
            }
            // console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    async function getColors() {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vendor/colors`,{
                headers:{
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            });
            if(response.data.success === true){
                setColorsApi(response?.data?.data)
            }
            // console.log(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteVariant = async (variantId: string) => {
        try {
            await deleteVariant(variantId).unwrap();
            toast.success("Variant deleted successfully");
            refetch()
        } catch (error) {
            toast.error("Failed to delete variant");
        }
    };

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
        getSizes();
        getColors()

        if (!product?.data) return;

        formik.setValues({
            title: product.data.title || "",
            description: product.data.description || "",
            thumbnail: null,
            categoryId: product.data.categoryId || "",
            isSale: product.data.isSale || false,
            isActive: product.data.isActive || false,
        });

        console.log(product.data.variants)

        setPreviewImage(product.data.thumbnail || "");
    }, [product?.data]);


    const variantProductValidationSchema = Yup.object({
        sizeId: Yup.string()
            .required("Size is required"),

        colorId: Yup.string()
            .required("Color is required"),

        stock: Yup.number()
            .typeError("Stock must be a number")
            .min(0, "Stock cannot be negative")
            .required("Stock is required"),

        price: Yup.number()
            .typeError("Price must be a number")
            .min(0, "Price cannot be negative")
            .required("Price is required"),
    });

    const handleVariantSubmit = async (values: any) => {
        try {
            if (!id) return;

            await addProductVaraint({
                id: id as string,
                data: {
                    sizeId: values.sizeId,
                    colorId: values.colorId,
                    stock: values.stock,
                    price: values.price,
                },
            }).unwrap();

            toast.success("Variant Saved Successfully");
            variantFormik.resetForm();
            setShowVariantForm(false)

        } catch (err) {
            console.log(err);
            toast.error("Something went wrong");
        }
    };

    const variantFormik = useFormik({
        initialValues: {
            sizeId: "",
            colorId: "",
            stock: 0,
            price: 0,
        },
        validationSchema: variantProductValidationSchema,
        onSubmit: handleVariantSubmit,
    });
    
    
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


                    {/* Available Variants */}
                    { product?.data?.variants?.length ? (
                        product?.data?.variants?.map((variant, index) => (
                            <div
                                key={variant.id || index}
                                className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                            >
        
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-800">
                                        Variant {index + 1}
                                    </h2>

                                    <div className="flex items-center gap-2">

                                        {editingVariantId !== variant.id ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() => handleEditVariant(variant)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                                                >
                                                    <FontAwesomeIcon icon={faPenToSquare} />
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteVariant(variant.id)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600 transition hover:bg-red-100"
                                                >
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </>
                                        ): (null)}

                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                             Size
                                        </label>
                                        {editingVariantId === variant.id ? (
                                            <div className="relative">
                                                
                                                <select
                                                    name="sizeId"
                                                    value={editedVariant.sizeId}
                                                    onChange={handleChange}
                                                    className="w-full appearance-none rounded-lg border border-gray-300 p-2"
                                                >
                                                    <option value="">Select Size</option>

                                                    {sizesApi.map((size: Size) => (
                                                        <option
                                                            key={size.id}
                                                            value={size.id}
                                                        >
                                                            {size.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
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
                                        ) : (
                                            <h2>{variant.size?.name}</h2>
                                        )}
                                    </div>
                                    

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Color
                                        </label>
                                        {editingVariantId === variant.id ? (
                                            <div className="relative">
                                                
                                                <select
                                                    name="colorId"
                                                    value={editedVariant.colorId}
                                                    onChange={handleChange}
                                                    className="w-full appearance-none rounded-lg border border-gray-300 p-2"
                                                >
                                                    <option value="">Select Color</option>

                                                    {colorsApi.map((color: Color) => (
                                                        <option
                                                            key={color.id}
                                                            value={color.id}
                                                        >
                                                            {color.name}
                                                        </option>
                                                    ))}
                                                </select>

                                                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
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
                                        ) : (
                                            <h2>{variant.color?.name}</h2>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Stock
                                        </label>

                                        {editingVariantId === variant.id ? (
                                            <input
                                                type="number"
                                                name="stock"
                                                value={editedVariant.stock}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border p-2"
                                            />
                                        ) : (
                                            <h2 className="inline-flex rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                                {variant.stock}
                                            </h2>
                                        )}
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-gray-700">
                                            Price
                                        </label>

                                        {editingVariantId === variant.id ? (
                                            <input
                                                type="number"
                                                name="price"
                                                value={editedVariant.price}
                                                onChange={handleChange}
                                                className="w-full rounded-lg border p-2"
                                            />
                                        ) : (
                                            <h2 className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700">
                                                ${variant.price}
                                            </h2>
                                        )}
                                    </div>

                                    {editingVariantId === variant.id && (
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleSaveVariant(variant.id)}
                                            className="rounded-xl bg-[#DB4444] px-5 py-2.5 text-white transition hover:opacity-90"
                                        >
                                            Save
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setEditingVariantId("");
                                                setEditedVariant(initialVariantState);
                                            }}
                                            className="rounded-xl border border-gray-300 px-5 py-2.5 text-gray-600 transition hover:bg-gray-100"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                    )}

                                </div>
                            </div>
                        ))
                    )  :  null}


                    {/* Variant Form For Adding */}
                    { showVariantForm && (
                        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                            
                            <div className="mb-5 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-800">
                                    Add New Variant
                                </h2>

                                <button
                                    type="button"
                                    onClick={() => setShowVariantForm(false)}
                                    className="flex h-8 w-8 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-red-500"
                                    >
                                    <FontAwesomeIcon icon={faXmark} />
                                </button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">

                        
                            <div className="relative">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Sizes
                                </label>

                                <select
                                    name="sizeId"
                                    value={variantFormik.values.sizeId}
                                    onChange={variantFormik.handleChange}
                                    onBlur={variantFormik.handleBlur}
                                    className="w-full appearance-none rounded-2xl border border-gray-200 px-4 py-3 pr-10 outline-none focus:border-[#DB4444]"
                                >
                                    <option value="">Select Size</option>

                                    {sizesApi.map((size: Size) => (
                                        <option
                                        key={size.id}
                                        value={size.id}
                                        >
                                        {size.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-4 top-6 flex items-center">
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

                            <div className="relative">
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Color
                                </label>

                                <select
                                    name="colorId"
                                    value={variantFormik.values.colorId}
                                    onChange={variantFormik.handleChange}
                                    onBlur={variantFormik.handleBlur}
                                    className="w-full appearance-none rounded-2xl border border-gray-200 px-4 py-3 pr-10 outline-none focus:border-[#DB4444]"
                                >
                                    <option value="">Select Color</option>

                                    {colorsApi.map((color: Color) => (
                                        <option
                                        key={color.id}
                                        value={color.id}
                                        >
                                        {color.name}
                                        </option>
                                    ))}
                                </select>

                                <div className="pointer-events-none absolute inset-y-0 right-4 top-6 flex items-center">
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

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Stock
                                </label>

                                <input
                                name="stock"
                                value={variantFormik.values.stock}
                                onChange={variantFormik.handleChange}
                                onBlur={variantFormik.handleBlur}
                                type="number"
                                placeholder="e.g. Large, Red, 128GB"
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#DB4444]"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Price
                                </label>

                                <input
                                name="price"
                                value={variantFormik.values.price}
                                onChange={variantFormik.handleChange}
                                onBlur={variantFormik.handleBlur}
                                type="number"
                                placeholder="Enter price"
                                className="w-full rounded-2xl border border-gray-200 px-4 py-3 outline-none transition focus:border-[#DB4444]"
                                />
                            </div>

                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                            
                            <button
                                type="button"
                                onClick={() => setShowVariantForm(false)}
                                className="rounded-xl border border-gray-300 px-5 py-2.5 text-gray-600 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={() => variantFormik.handleSubmit()}
                                className="rounded-xl bg-[#DB4444] px-5 py-2.5 text-white transition hover:opacity-90"
                            >
                                Save Variant
                            </button>

                            </div>

                        </div>
                    )}


                    {/* Button For Add New Varaint */}
                    <div
                        onClick={() => setShowVariantForm(true)}
                        className="mt-6 cursor-pointer rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 p-8 transition hover:border-[#DB4444] hover:bg-red-50"
                        >
                        <div className="flex flex-col items-center justify-center text-center">

                            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                            <FontAwesomeIcon
                                icon={faPlus}
                                className="text-xl text-[#DB4444]"
                            />
                            </div>

                            <h3 className="text-lg font-semibold text-gray-800">
                            Add New Variant
                            </h3>

                        </div>
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
