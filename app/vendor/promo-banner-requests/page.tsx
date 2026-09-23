"use client";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBullhorn,
  faTriangleExclamation,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";

import {
  useCreatePromoBannerRequestMutation,
  useGetProductsQuery,
} from "@/app/redux/services/vendorsApi";

import { toast } from "sonner";

import BannerRequestsPageSkeleton from "@/app/components/skeletonUI/banner-requests-skeleton";
import PromoBannerPreview from "@/app/components/vendor-components/promo-banner-preview";

export default function PromoBannerRequestsPage() {
  const [product, setProduct] = useState("");
  const [offerPercentage, setOfferPercentage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#000000");
  const [note, setNote] = useState("");

  /* ================================================================
      Get Products
  ================================================================ */

  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetProductsQuery({
    search: "",
  });

  const products = data?.data?.products ?? [];

  /* ================================================================
      Create Promo Banner Request
  ================================================================ */

  const [
    createPromoBannerRequest,
    { isLoading: isCreating },
  ] = useCreatePromoBannerRequestMutation();

  /* ================================================================
      Initial Loading
  ================================================================ */

  if (isLoading) {
    return <BannerRequestsPageSkeleton />;
  }

  /* ================================================================
      Selected Product
  ================================================================ */

  const selectedProduct = products.find(
    (item) => item.id === product
  );

  /* ================================================================
      Product Change
  ================================================================ */

  const handleProductChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setProduct(e.target.value);
  };

  /* ================================================================
      Background Color Change
  ================================================================ */

  const handleBackgroundColorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBackgroundColor(e.target.value);
  };

  /* ================================================================
      Offer Percentage Change
  ================================================================ */

  const handleOfferPercentageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;

    if (
      value === "" ||
      (Number(value) >= 0 && Number(value) <= 100)
    ) {
      setOfferPercentage(value);
    }
  };

  /* ================================================================
      Submit
  ================================================================ */

  const handleSubmit = async () => {
    /* --------------------------------------------------------------
        Product Validation
    -------------------------------------------------------------- */

    if (!product) {
      toast.error("Please select a product.");
      return;
    }

    /* --------------------------------------------------------------
        Offer Validation
    -------------------------------------------------------------- */

    if (offerPercentage === "") {
      toast.error("Please enter an offer percentage.");
      return;
    }

    /* --------------------------------------------------------------
        Start Date Validation
    -------------------------------------------------------------- */

    if (!startDate) {
      toast.error("Please select a start date.");
      return;
    }

    /* --------------------------------------------------------------
        End Date Validation
    -------------------------------------------------------------- */

    if (!endDate) {
      toast.error("Please select an end date.");
      return;
    }

    /* --------------------------------------------------------------
        Date Validation
    -------------------------------------------------------------- */

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start >= end) {
      toast.error("End date must be after start date.");
      return;
    }

    /* --------------------------------------------------------------
        Request Data
    -------------------------------------------------------------- */

    const requestData = {
      productId: product,
      offerPercentage: Number(offerPercentage),
      startDate,
      endDate,
      backgroundColor,
      note: note.trim() || undefined,
    };

    try {
      await createPromoBannerRequest(requestData).unwrap();

      toast.success(
        "Promo banner request created successfully."
      );

      /* ------------------------------------------------------------
          Reset Form
      ------------------------------------------------------------ */

      setProduct("");
      setOfferPercentage("");
      setStartDate("");
      setEndDate("");
      setBackgroundColor("#000000");
      setNote("");
    } catch (error: any) {
      const message =
        error?.data?.message ||
        error?.error ||
        "Failed to create promo banner request. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="space-y-8">

      {/* ============================================================
          Header
      ============================================================ */}

      <div>
        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faBullhorn} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Promo Banner Request
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Request your product to be featured in a promotional
              banner on the homepage.
            </p>
          </div>

        </div>
      </div>

      {/* ============================================================
          Create Promo Banner Request Card
      ============================================================ */}

      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

        {/* ==========================================================
            Card Header
        ========================================================== */}

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900">
            Create Promo Banner Request
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select a product, configure the promotion period and
            customize how it should appear on the homepage.
          </p>
        </div>

        {/* ==========================================================
            Product
        ========================================================== */}

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Select Product
          </label>

          {/* --------------------------------------------------------
              Error State
          -------------------------------------------------------- */}

          {isError ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3">

              <div className="flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">

                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500">
                    <FontAwesomeIcon
                      icon={faTriangleExclamation}
                    />
                  </div>

                  <div>
                    <p className="text-sm font-medium text-red-700">
                      Failed to load products
                    </p>

                    <p className="mt-0.5 text-xs text-red-500">
                      Something went wrong while loading your products.
                    </p>
                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="flex shrink-0 items-center gap-2 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FontAwesomeIcon
                    icon={faRotateRight}
                    spin={isFetching}
                  />

                  {isFetching
                    ? "Retrying..."
                    : "Retry"}
                </button>

              </div>

            </div>
          ) : products.length === 0 ? (

            /* ------------------------------------------------------
                Empty State
            ------------------------------------------------------ */

            <div className="flex h-11.5 w-full items-center rounded-xl border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500">
              No products available.
            </div>

          ) : (

            /* ------------------------------------------------------
                Products Select
            ------------------------------------------------------ */

            <select
              value={product}
              onChange={handleProductChange}
              disabled={isCreating || isFetching}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-50"
            >
              <option value="">
                Select a product
              </option>

              {products.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.title}
                </option>
              ))}
            </select>
          )}

        </div>

        {/* ==========================================================
            Offer + Dates
        ========================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">

          {/* ========================================================
              Offer Percentage
          ======================================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Offer Percentage
            </label>

            <div className="relative">

              <input
                type="number"
                min={0}
                max={100}
                value={offerPercentage}
                onChange={handleOfferPercentageChange}
                disabled={isCreating}
                placeholder="Enter offer percentage"
                className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 pr-12 text-sm outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-50"
              />

              <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">
                %
              </span>

            </div>

            <p className="mt-1 text-xs text-gray-400">
              Enter a value between 0% and 100%.
            </p>
          </div>

          {/* ========================================================
              Start Date
          ======================================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Start Date
            </label>

            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              disabled={isCreating}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-50"
            />

            <p className="mt-1 text-xs text-gray-400">
              When the promotion should start.
            </p>
          </div>

          {/* ========================================================
              End Date
          ======================================================== */}

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              End Date
            </label>

            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              disabled={isCreating}
              className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-50"
            />

            <p className="mt-1 text-xs text-gray-400">
              When the promotion should end.
            </p>
          </div>

        </div>

        {/* ==========================================================
            Note
        ========================================================== */}

        <div className="mt-6">

          <label className="mb-2 block text-sm font-medium text-gray-700">
            Note{" "}
            <span className="text-gray-400">
              (Optional)
            </span>
          </label>

          <textarea
            rows={3}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            disabled={isCreating}
            placeholder="Tell the admin why this product should be featured..."
            className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-50"
          />

        </div>

        {/* ==========================================================
            Banner Background Color
        ========================================================== */}

        <div className="mt-8 border-t border-gray-200 pt-8">

          <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Banner Background
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                Choose the background color for your promotional banner.
              </p>
            </div>

            <div className="flex items-center gap-3">

              {/* Color Picker */}

              <input
                type="color"
                value={backgroundColor}
                onChange={handleBackgroundColorChange}
                disabled={isCreating}
                className="h-11 w-14 cursor-pointer rounded-xl border border-gray-300 bg-white p-1 disabled:cursor-not-allowed disabled:opacity-50"
              />

              {/* HEX Input */}

              <input
                type="text"
                value={backgroundColor}
                onChange={handleBackgroundColorChange}
                disabled={isCreating}
                maxLength={7}
                placeholder="#DB4444"
                className="w-28 rounded-xl border border-gray-300 px-3 py-2.5 text-sm uppercase outline-none transition focus:border-[#DB4444] focus:ring-2 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-gray-50"
              />

            </div>

          </div>

          {/* Color Preview */}

          <div className="mb-6 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">

            <div
              className="h-8 w-8 rounded-lg border border-black/10 shadow-sm"
              style={{
                backgroundColor,
              }}
            />

            <div>
              <p className="text-xs font-medium text-gray-700">
                Selected color
              </p>

              <p className="text-xs uppercase text-gray-400">
                {backgroundColor}
              </p>
            </div>

          </div>

          {/* ========================================================
              Promo Banner Preview
          ======================================================== */}

          <PromoBannerPreview
            product={selectedProduct}
            offerPercentage={offerPercentage}
            backgroundColor={backgroundColor}
            startDate={startDate}
            endDate={endDate}
          />

        </div>

        {/* ==========================================================
            Submit
        ========================================================== */}

        <div className="mt-8 flex justify-end">

          <button
            type="button"
            onClick={handleSubmit}
            disabled={
              !product ||
              !offerPercentage ||
              !startDate ||
              !endDate ||
              isCreating ||
              isFetching ||
              isError
            }
            className="rounded-xl bg-[#DB4444] px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >

            <FontAwesomeIcon
              icon={
                isCreating
                  ? faRotateRight
                  : faBullhorn
              }
              spin={isCreating}
              className="mr-2"
            />

            {isCreating
              ? "Sending..."
              : "Send Promo Request"}

          </button>

        </div>

      </div>

    </div>
  );
}