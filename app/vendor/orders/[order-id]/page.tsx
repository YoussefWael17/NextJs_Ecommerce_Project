"use client";

import formatDate from "@/app/admin/utils/formateData";
import OrderDetailsSkeleton from "@/app/components/skeletonUI/vendor-orders-orderDeatails-skeleton";
import { useGetSingleOrderQuery } from "@/app/redux/services/vendorsApi";
import { faArrowLeft, faCheck, faCircle, faCreditCard, faEnvelope, faHashtag, faMoneyBillWave, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from 'next/navigation';

export default function VendorOrderDetailsPage() {

    const params = useParams();

    const orderId = params?.["order-id"] as string;

    const { data: order, isLoading, isError, isFetching, refetch } = useGetSingleOrderQuery(orderId as string, {
        skip: !orderId,
    });

    console.log(order)

    // if (!order) {
    //     return;
    // }

    
    if (isLoading || isFetching) {
        return <OrderDetailsSkeleton />;
    }
    
    if (isError) {
        return (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
      Failed to load order
    </div>
  );
}

if (!order) {
    return (
        <div className="text-center text-gray-500">
      Order not found.
    </div>
  );
}



const subtotal = order?.data.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
);
    const shipping = 0;

    const discount = subtotal + shipping - order?.data.totalAmount;

    const steps = [
        "PENDING",
        "PROCESSING",
        "SHIPPED",
        "DELIVERED",
    ];

    const currentIndex = steps.indexOf(order.data.status);


    return (
        <div className="space-y-8">

        {/* Back */}

        <Link
            href="/vendor/orders"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-[#DB4444]"
        >
            <FontAwesomeIcon icon={faArrowLeft} />
            Back to Orders
        </Link>

        {/* Header */}

        <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>

                <h1 className="text-3xl font-bold text-gray-900">
                Order #{order?.data.id.split("-")[0]}
                </h1>

                <p className="mt-2 text-sm text-gray-500">
                Placed on {formatDate(order?.data.createdAt as string)}
                </p>

            </div>

            <div className="flex gap-3">

                {/* Order Status */}

                <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                    order?.data.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : order?.data.status === "PROCESSING"
                    ? "bg-blue-100 text-blue-700"
                    : order?.data.status === "SHIPPED"
                    ? "bg-purple-100 text-purple-700"
                    : order?.data.status === "DELIVERED"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
                >
                {order?.data.status}
                </span>

                {/* Payment */}

                {/* <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                    order?.data.payment?.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : order?.data.payment?.status === "PAID"
                    ? "bg-green-100 text-green-700"
                    : order?.data.payment?.status === "FAILED"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                > */}
                <span
                className={`rounded-full px-4 py-2 text-sm font-medium ${
                    order?.data.payment?.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : order?.data.payment?.status === "PROCESSING"
                    ? "bg-green-100 text-green-700"
                    : order?.data.payment?.status === "SHIPPED"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700"
                }`}
                >
                {order?.data.payment?.status ?? "N/A"}
                </span>

            </div>

            </div>

        </div>

        {/* Grid */}

        <div className="grid gap-6 xl:grid-cols-3">

            {/* Left */}

            <div className="space-y-6 xl:col-span-2">

            {/* <ProductsTable
                items={order.items}
            /> */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold">
                    Order Summary
                </h2>

                <div className="space-y-4">

                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                            Subtotal
                        </span>

                        <span className="font-medium">
                            ${ subtotal ? subtotal.toFixed(2) : 20 }
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-gray-500">
                            Shipping
                        </span>

                        <span className="font-medium">
                            ${shipping.toFixed(2)}
                        </span>
                    </div>

                    <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                        Discount
                    </span>

                    <span className="font-medium text-green-600">
                        -${discount.toFixed(2)}
                    </span>
                    </div>

                    <div className="border-t pt-4">

                    <div className="flex items-center justify-between">

                        <span className="text-lg font-semibold">
                        Total
                        </span>

                        <span className="text-xl font-bold text-[#DB4444]">
                        ${order.data.totalAmount.toFixed(2)}
                        </span>

                    </div>

                    </div>

                </div>
                </div>

            {/* <Timeline
                status={order.status}
            /> */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                <h2 className="mb-6 text-lg font-semibold">
                    Order Timeline
                </h2>

                <div className="space-y-6">

                    {steps.map((step, index) => {

                    const completed =
                        index < currentIndex;

                    const current =
                        index === currentIndex;

                    return (

                        <div
                        key={step}
                        className="flex items-start gap-4"
                        >

                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full
                            ${
                            completed
                                ? "bg-green-500 text-white"
                                : current
                                ? "bg-[#DB4444] text-white"
                                : "bg-gray-200 text-gray-400"
                            }`}
                        >
                            {completed ? (
                            <FontAwesomeIcon icon={faCheck} />
                            ) : (
                            <FontAwesomeIcon icon={faCircle} />
                            )}
                        </div>

                        <div>

                            <h3 className="font-medium">
                            {step}
                            </h3>

                            <p className="text-sm text-gray-500">

                            {completed &&
                                "Completed"}

                            {current &&
                                "Current Status"}

                            {!completed &&
                                !current &&
                                "Waiting..."}

                            </p>

                        </div>

                        </div>

                    );

                    })}

                </div>

            </div>

            </div>

            {/* Right */}

            <div className="space-y-6">

                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">

                    <h2 className="mb-6 text-lg font-semibold text-gray-900">
                        Customer Information
                    </h2>

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50">
                            <FontAwesomeIcon
                            icon={faUser}
                            className="text-[#DB4444]"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                            Full Name
                            </p>

                            <h3 className="font-semibold text-gray-900">
                            {order.data.user.name}
                            </h3>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                            <FontAwesomeIcon
                            icon={faEnvelope}
                            className="text-blue-600"
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-sm text-gray-500">
                            Email Address
                            </p>

                            <p className="truncate font-medium text-gray-900">
                            {order.data.user.email}
                            </p>
                        </div>
                        </div>

                        <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                            <FontAwesomeIcon
                            icon={faHashtag}
                            className="text-green-600"
                            />
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                            Customer ID
                            </p>

                            <p className="font-medium text-gray-900">
                            #{order.data.user.id.split("-")[0]}
                            </p>
                        </div>
                        </div>

                    </div>
                </div>

            {/* <PaymentCard
                payment={order.payment}
            /> */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold">
                    Payment Information
                </h2>

                <div className="space-y-5">

                    <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                        <FontAwesomeIcon
                        icon={faCreditCard}
                        className="text-blue-600"
                        />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                        Payment Method
                        </p>

                        <h3 className="font-semibold text-gray-900">
                        {order?.data?.payment?.stripeSessionId
                            ? "Stripe"
                            : "Cash On Delivery"}
                        </h3>
                    </div>
                    </div>

                    <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-50">
                        <FontAwesomeIcon
                        icon={faMoneyBillWave}
                        className="text-green-600"
                        />
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                        Amount
                        </p>

                        <h3 className="font-semibold text-gray-900">
                        ${order?.data?.payment?.amount.toFixed(2)}
                        </h3>
                    </div>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-gray-50 p-4">
                    <span className="text-sm text-gray-500">
                        Status
                    </span>

                    {/* <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${badgeClass}`}
                    >
                        <FontAwesomeIcon icon={statusIcon} />
                        {order.data.payment.status}
                    </span> */}
                    </div>

                    {order?.data?.payment?.stripeSessionId && (
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100">
                        <FontAwesomeIcon
                            icon={faHashtag}
                            className="text-gray-600"
                        />
                        </div>

                        <div className="min-w-0">
                        <p className="text-sm text-gray-500">
                            Transaction ID
                        </p>

                        <p className="truncate text-sm font-medium text-gray-900">
                            {order.data.payment.stripeSessionId}
                        </p>
                        </div>
                    </div>
                    )}

                </div>
            </div>

            {/* <SummaryCard
                order={order}
            /> */}

            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-6 text-lg font-semibold text-gray-900">
                    Order Summary
                </h2>

                <div className="space-y-4">

                    <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                        Subtotal
                    </span>

                    <span className="font-medium">
                        ${subtotal.toFixed(2)}
                    </span>
                    </div>

                    <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                        Shipping
                    </span>

                    <span className="font-medium">
                        ${shipping.toFixed(2)}
                    </span>
                    </div>

                    <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                        Discount
                    </span>

                    <span className="font-medium text-green-600">
                        -${discount.toFixed(2)}
                    </span>
                    </div>

                    <hr />

                    <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-gray-900">
                        Total
                    </span>

                    <span className="text-2xl font-bold text-[#DB4444]">
                        ${order.data.totalAmount.toFixed(2)}
                    </span>
                    </div>

                </div>
            </div>

            </div>

        </div>

        </div>
    );
}
