"use client";

import { useEffect } from "react";
import { socket } from "./utils/socket";


export default function AdminPage() {

  useEffect(() => {
    socket.on("new-banner-request", (data) => {
      console.log("🔔", data);
    });

    return () => {
      socket.off("new-banner-request");
    };
  }, []);

  return (
    <div>

      <h1 className="mb-8 text-3xl font-bold">
        Dashboard Overview
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-gray-500">Total Users</h2>
          <p className="mt-3 text-3xl font-bold">1,240</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-gray-500">Orders</h2>
          <p className="mt-3 text-3xl font-bold">320</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="mt-3 text-3xl font-bold">$12,400</p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm border">
          <h2 className="text-gray-500">Products</h2>
          <p className="mt-3 text-3xl font-bold">85</p>
        </div>

      </div>

    </div>
  );
}