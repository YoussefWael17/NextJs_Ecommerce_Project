"use client";

import { useEffect, useState } from "react";

import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faUsers,
  faUserShield,
  faUser,
  faMagnifyingGlass,
  faPenToSquare,
  faTrash,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

type UserRole = "ADMIN" | "VENDOR" | "CUSTOMER";

type UserStatus = "ACTIVE" | "BLOCKED";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
  status?: UserStatus;
}

export default function AdminUsersPage() {

//   const [users, setUsers] = useState<User[]>([]);
//   const [loading, setLoading] = useState(true);

//   const token =
//     typeof window !== "undefined"
//       ? localStorage.getItem("token")
//       : null;

  const [users, setUsers] = useState<User[]>([
    {
      id: "a0e4e63d-bca9-4470-b762-cfd0fdcfb16d",
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      role: "ADMIN",
      createdAt: "2 hours ago",
      status: "ACTIVE",
    },
    {
      id: "bf43fe05-f824-4cc2-9096-ad0c05306995",
      name: "Sara Mohamed",
      email: "sara@example.com",
      role: "VENDOR",
      createdAt: "5 hours ago",
      status: "ACTIVE",
    },
    {
      id: "bf43fe05-f824-4cn2-9096-ad0c05301995",
      name: "Omar Khaled",
      email: "omar@example.com",
      role: "CUSTOMER",
      createdAt: "1 day ago",
      status: "BLOCKED",
    },
    {
      id: "bf73fe05-f824-4cn2-9096-ad0c05301995",
      name: "Mariam Adel",
      email: "mariam@example.com",
      role: "CUSTOMER",
      createdAt: "2 days ago",
      status: "ACTIVE",
    },
  ]);

//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJkZTI3ZjgwMy1hOTJmLTRkMTQtOWQxOC04MTc4YzBjMDAxZmQiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3Nzk5MjU5NjcsImV4cCI6MTc4MDUzMDc2N30.0vyiKXYMKGRmNVLn45GZdc-NZ_XNXJMd84yS9NKS3DM";

//   async function getUsersByAdmin() {

//     try {

//       setLoading(true);

//       const { data } = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/admin/users`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       setUsers(data);

//     } catch (error) {

//       console.log(error);

//     } finally {

//       setLoading(false);

//     }

//   }

//   useEffect(() => {
//     getUsersByAdmin();
//   }, []);

  const handleRoleChange = (
    id: string,
    role: UserRole
  ) => {

    setUsers((prev) =>
      prev.map((user) =>
        user.id === id
          ? { ...user, role }
          : user
      )
    );

  };

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


  const totalUsers = users.length;

  const adminAndVendors = users.filter(
    (user) =>
      user.role === "ADMIN" ||
      user.role === "VENDOR"
  ).length;

  const customers = users.filter(
    (user) => user.role === "CUSTOMER"
  ).length;

//   if (loading) {
//     return (
//       <div className="flex h-[60vh] items-center justify-center">
//         <p className="text-lg font-medium text-gray-500">
//           Loading Users...
//         </p>
//       </div>
//     );
//   }

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* Header */}
      <div className="flex flex-col gap-4 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-black sm:text-3xl">
            Users Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage users, roles and monitor recent registrations.
          </p>

        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-[#DB4444] bg-[#DB4444] px-5 py-3 text-sm font-semibold text-white shadow transition duration-300 hover:bg-white hover:text-[#DB4444] sm:w-fit">

          <FontAwesomeIcon icon={faUserPlus} />
          Add New User

        </button>

      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">

        {/* Total Users */}
        <div className="flex flex-col justify-center items-center md:items-start md:justify-start rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faUsers} />
          </div>

          <h3 className="text-2xl font-bold text-black sm:text-3xl">
            {totalUsers}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Total Users
          </p>

        </div>

        {/* Admin & Vendors */}
        <div className="flex flex-col justify-center items-center md:items-start md:justify-start rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faUserShield} />
          </div>

          <h3 className="text-2xl font-bold text-black sm:text-3xl">
            {adminAndVendors}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Admins & Vendors
          </p>

        </div>

        {/* Customers */}
        <div className="flex flex-col justify-center items-center md:items-start md:justify-start rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faUser} />
          </div>

          <h3 className="text-2xl font-bold text-black sm:text-3xl">
            {customers}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Customers
          </p>

        </div>

        {/* New Today */}
        <div className="flex flex-col justify-center items-center md:items-start md:justify-start rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">

          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-[#DB4444]">
            <FontAwesomeIcon icon={faUserPlus} />
          </div>

          <h3 className="text-2xl font-bold text-black sm:text-3xl">
            {users.length}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            Registered Users
          </p>

        </div>

      </div>

      {/* Users Section */}
      <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">

        {/* Top */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <h2 className="text-xl font-bold text-black sm:text-2xl">
              Last Registered Users
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently joined users
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
              placeholder="Search user..."
              className="w-full bg-transparent text-sm outline-none"
            />

          </div>

        </div>

        {/* Desktop Table */}
        <div className="hidden overflow-x-auto lg:block">

          <table className="min-w-full border-separate border-spacing-y-3">

            <thead>

              <tr className="text-left text-sm text-gray-400">

                <th className="px-4">
                  User
                </th>

                <th className="px-4">
                  Role
                </th>

                <th className="px-4">
                  Joined
                </th>

                <th className="px-4">
                  Status
                </th>

                <th className="px-4">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="bg-gray-50"
                >

                  {/* User */}
                  <td className="rounded-l-2xl px-4 py-4">

                    <div className="flex items-center gap-3">

                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DB4444] text-sm font-bold text-white">

                        {user.name.charAt(0)}

                      </div>

                      <div>

                        <h3 className="font-semibold text-black">
                          {user.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {user.email}
                        </p>

                      </div>

                    </div>

                  </td>

                  {/* Role */}
                  <td className="px-4 py-4">

                    <div className="relative w-fit">

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id,
                            e.target.value as UserRole
                          )
                        }
                        className="
                        appearance-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        py-2
                        pl-4
                        pr-10
                        text-sm
                        font-medium
                        text-gray-700
                        outline-none
                        transition
                        focus:border-[#DB4444]
                        focus:ring-2
                        focus:ring-red-100
                        cursor-pointer
                        "
                      >

                        <option value="ADMIN">
                          ADMIN
                        </option>

                        <option value="VENDOR">
                          VENDOR
                        </option>

                        <option value="CUSTOMER">
                          CUSTOMER
                        </option>

                      </select>

                      {/* Arrow */}
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />

                        </svg>

                      </div>

                    </div>

                  </td>

                  {/* Joined */}
                  <td className="px-4 py-4 text-sm text-gray-600">

                    {formatDate(user.createdAt)}

                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">

                    {user.status ? (

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >

                        {user.status}

                      </span>

                    ) : (

                      <span className="text-sm text-gray-400">
                        N/A
                      </span>

                    )}

                  </td>

                  {/* Actions */}
                  <td className="rounded-r-2xl px-4 py-4">

                    <div className="flex items-center gap-3">

                      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-[#DB4444] hover:text-[#DB4444]">

                        <FontAwesomeIcon icon={faPenToSquare} />

                      </button>

                      <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-red-500 hover:text-red-500">

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

          {users.map((user) => (
            <div
              key={user.id}
              className="rounded-3xl border border-gray-200 bg-gray-50 p-4"
            >

              {/* User */}
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#DB4444] text-sm font-bold text-white">
                  {user.name.charAt(0)}
                </div>

                <div>
                  <h3 className="font-semibold text-black">
                    {user.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {user.email}
                  </p>
                </div>

              </div>

              {/* Info */}
              <div className="mt-5 space-y-4">

                <div>
                  <p className="mb-2 text-xs font-semibold uppercase text-gray-400">
                    Role
                  </p>

                  <div className="relative w-full">

                      <select
                        value={user.role}
                        onChange={(e) =>
                          handleRoleChange(
                            user.id,
                            e.target.value as UserRole
                          )
                        }
                        className="
                        appearance-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        py-2
                        pl-4
                        pr-10
                        text-sm
                        font-medium
                        text-gray-700
                        outline-none
                        transition
                        focus:border-[#DB4444]
                        focus:ring-2
                        focus:ring-red-100
                        cursor-pointer
                        w-full
                        "
                      >

                        <option value="ADMIN">
                          ADMIN
                        </option>

                        <option value="VENDOR">
                          VENDOR
                        </option>

                        <option value="CUSTOMER">
                          CUSTOMER
                        </option>

                      </select>

                      {/* Arrow */}
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >

                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />

                        </svg>

                      </div>

                    </div>
                </div>

                <div className="flex items-center justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase text-gray-400">
                      Joined
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>

                  {user.status ? (

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.status === "ACTIVE"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >

                        {user.status}

                      </span>

                    ) : (

                      <span className="text-sm text-gray-400">
                        N/A
                      </span>

                    )}

                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">

                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#DB4444] hover:text-[#DB4444]">

                    <FontAwesomeIcon icon={faPenToSquare} />
                    Edit

                  </button>

                  <button className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-red-500 hover:text-red-500">

                    <FontAwesomeIcon icon={faTrash} />
                    Delete

                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>


      </div>

    </div>
  );
}