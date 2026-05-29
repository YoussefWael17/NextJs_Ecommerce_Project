"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4780 },
  { name: "May", sales: 5890 },
  { name: "Jun", sales: 6390 },
];

const ordersData = [
  { name: "Completed", value: 65 },
  { name: "Pending", value: 20 },
  { name: "Cancelled", value: 15 },
];

const usersData = [
  { month: "Jan", users: 200 },
  { month: "Feb", users: 350 },
  { month: "Mar", users: 500 },
  { month: "Apr", users: 700 },
  { month: "May", users: 950 },
];

const COLORS = ["#DB4444", "#ffd741", "#4caf52"];

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Monitor your store performance and statistics
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Revenue</p>
          <h2 className="mt-3 text-3xl font-bold text-[#DB4444]">$24,500</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">Total Orders</p>
          <h2 className="mt-3 text-3xl font-bold text-[#DB4444]">1,230</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">Customers</p>
          <h2 className="mt-3 text-3xl font-bold text-[#DB4444]">840</h2>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-gray-500">Products</p>
          <h2 className="mt-3 text-3xl font-bold text-[#DB4444]">320</h2>
        </div>

      </div>

      {/* Charts Top */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Line Chart */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Sales Overview
            </h2>
          </div>

          <div className="w-full h-80 min-w-0">

            <LineChart
                width={"100%"}
                height={"100%"}
                data={salesData}
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />

                <Line
                type="monotone"
                dataKey="sales"
                stroke="#DB4444"
                strokeWidth={3}
                />

            </LineChart>

            </div>

        </div>

        {/* Pie Chart */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Orders Status
            </h2>
          </div>

          <div className="flex justify-center w-full min-w-0 h-80">

            <PieChart width={320} height={320}>

              <Pie
                data={ordersData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {ordersData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>

          </div>

        </div>

      </div>

      {/* Bottom Charts */}
      <div className="grid gap-6 xl:grid-cols-3">

        {/* Bar Chart */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm xl:col-span-2">

          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Users Growth
            </h2>
          </div>

          <div className="w-full h-80 min-w-0">

            <BarChart
                width={"100%"}
                height={"100%"}
                data={usersData}
            >

                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Bar
                dataKey="users"
                fill="#DB4444"
                radius={[8, 8, 0, 0]}
                />

            </BarChart>

            </div>

        </div>

        {/* Activity */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-6">
            Recent Activity
          </h2>

          <div className="space-y-4">

            <div className="rounded-xl border p-4 transition hover:border-[#DB4444]">
              <p className="font-medium text-gray-800">
                New Order Received
              </p>

              <span className="text-sm text-gray-500">
                2 minutes ago
              </span>
            </div>

            <div className="rounded-xl border p-4 transition hover:border-[#DB4444]">
              <p className="font-medium text-gray-800">
                New User Registered
              </p>

              <span className="text-sm text-gray-500">
                10 minutes ago
              </span>
            </div>

            <div className="rounded-xl border p-4 transition hover:border-[#DB4444]">
              <p className="font-medium text-gray-800">
                Product Stock Updated
              </p>

              <span className="text-sm text-gray-500">
                30 minutes ago
              </span>
            </div>

            <div className="rounded-xl border p-4 transition hover:border-[#DB4444]">
              <p className="font-medium text-gray-800">
                Payment Successfully Processed
              </p>

              <span className="text-sm text-gray-500">
                1 hour ago
              </span>
            </div>

        </div>

        </div>

      </div>

    </div>
  );
}



        
