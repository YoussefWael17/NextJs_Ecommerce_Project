"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "sonner";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { faPlus, faBoxesStacked, faBox, faTag, faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useAddProductMutation } from "@/app/redux/services/vendorsApi";
import { Product } from "@/app/types/product";




export default function CreatePage() {

   

    const [categoriesApi, setCategoriesApi] = useState([]);

    const [previewImage, setPreviewImage] = useState("");
    
    const [addProduct] = useAddProductMutation();
    

    
    
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
    
    
      useEffect(()=>{
        getCategories();
      }, [])


    const validationSchema = Yup.object({
        title: Yup.string()
          .required("Title is required")
          .min(3, "Title must be at least 3 characters"),
    
        description: Yup.string()
          .required("Description is required")
          .min(10, "Description must be at least 10 characters"),
    
        thumbnail: Yup.mixed<File>()
          .required("Thumbnail is required"),
    
        categoryId: Yup.string()
          .required("Category is required"),
    
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


    const handleSubmit = async (values: any) => {
        try {
            const formData = new FormData();

            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("categoryId", values.categoryId);

            formData.append("thumbnail", values.thumbnail as File);

            formData.append("isActive", values.isActive);

            if(values.isSale) {
              formData.append("salePercentage", values.salePercentage);
              formData.append("saleStartDate", values.saleStartDate);
              formData.append("saleEndDate", values.saleEndDate);
            }

            await addProduct(formData).unwrap();

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
            isActive: true,
            isSale: false,
            salePercentage: "",
            saleStartDate: "",
            saleEndDate: "",
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

        



  return (
        <div className="space-y-6 lg:space-y-8">

            <form onSubmit={formik.handleSubmit}>

              {/* Header */}
              <div className="mb-6">
                <h1 className="text-2xl font-bold">
                Add Product
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                Create a new product and manage inventory.
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
                          src={previewImage}
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
                      className="peer sr-only"
                      name="isSale"
                      checked={formik.values.isSale}
                      onChange={formik.handleChange}
                    />
                  {/* track */}
                  <div className="peer h-6 w-11 rounded-full bg-gray-300 peer-checked:bg-[#DB4444] after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:after:translate-x-full">
                  </div>

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

                {/* {isSale && (
                  <div className="mt-4 p-4 border rounded-lg bg-gray-50 space-y-3">
                    
                    <div>
                      <label className="block text-sm font-medium">Sale Percentage</label>
                      <input
                        type="number"
                        placeholder="e.g. 20%"
                        className="w-full mt-1 p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">Start Date</label>
                      <input
                        type="datetime-local"
                        className="w-full mt-1 p-2 border rounded"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium">End Date</label>
                      <input
                        type="datetime-local"
                        className="w-full mt-1 p-2 border rounded"
                      />
                    </div>

                  </div>
                )} */}

                {formik.values.isSale && (
                  <div className="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm space-y-5">

                    {/* HEADER */}
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#DB4444]"></span>
                      <h3 className="text-sm font-semibold text-gray-800">
                        Sale Configuration
                      </h3>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                    {/* PERCENT */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Discount %
                      </label>

                      <input
                        type="number"
                        name="salePercentage"
                        value={formik.values.salePercentage}
                        onChange={formik.handleChange}
                        placeholder="e.g. 20"
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                      />
                    </div>

                    {/* START */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Start Date
                      </label>

                      <input
                        type="datetime-local"
                        name="saleStartDate"
                        value={formik.values.saleStartDate}
                        onChange={formik.handleChange}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                      />
                    </div>

                    {/* END */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        End Date
                      </label>

                      <input
                        type="datetime-local"
                        name="saleEndDate"
                        value={formik.values.saleEndDate}
                        onChange={formik.handleChange}
                        className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm
                        focus:outline-none focus:ring-2 focus:ring-[#DB4444]"
                      />
                    </div>

                  </div>

                  {/* INFO NOTE */}
                  <p className="text-xs text-gray-500">
                    Sale will be active only between start and end date.
                  </p>

                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="mt-8 flex justify-end gap-3">

                <button
                  type="submit"
                  className="rounded-xl bg-[#DB4444] px-6 py-3 text-white"
                >
                  
                    Add Product
                </button>

              </div>

            </form>

          </div>
        
        
  )
}
