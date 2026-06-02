"use client";

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useGetUsersQuery, useUpdateRoleMutation, UserRole, User } from "@/app/redux/services/adminsApi";


import { faUsers, faUserShield, faUser, faMagnifyingGlass, faPenToSquare, faTrash, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import { User, UserRole } from "@/app/redux/services/adminsApi";
import AdminUsersPageSkeleton from "@/app/components/admin-users-skeleton";


export default function AdminUsersPage() {

  const initialUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@shop.com",
    role: UserRole.ADMIN,
    createdAt: "2026-05-27T23:06:56.538Z",
  },
  {
    id: "2",
    name: "Youssef Wael",
    email: "youssef.wael9906@gmail.com",
    role: UserRole.VENDOR,
    createdAt: "2026-05-29T04:53:12.273Z",
  },
  {
    id: "3",
    name: "Test User",
    email: "test@test.com",
    role: UserRole.CUSTOMER,
    createdAt: "2026-05-30T10:15:00.000Z",
  },
];

  const [users, setUsers] = useState<User[]>(initialUsers);
  const [isLoading, setIsLoading] = useState(false);

  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      role: "CUSTOMER" as UserRole,
      createdAt: "",
    },

    onSubmit: async (values) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === values.id
            ? {
                ...user,
                role: values.role,
              }
            : user
        )
      );

      setIsEditUserModalOpen(false);
    },
  });

  const totalUsers = users.length;

  const adminAndVendors = users.filter(
    (user) =>
      user.role === "ADMIN" ||
      user.role === "VENDOR"
  ).length;

  const customers = users.filter(
    (user) => user.role === "CUSTOMER"
  ).length;

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

  const handleEditUser = (user: User) => {
    formik.setValues({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    });

    setSelectedUser(user);
    setIsEditUserModalOpen(true);
  };


  //RTK Api Calling
  // const { data: users = [], isLoading  } = useGetUsersQuery();
  // const [updateRole, { isLoading: isUpdating }] = useUpdateRoleMutation();

  // const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  // const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // const formik = useFormik({
  //   initialValues: {
  //     id: "",
  //     name: "",
  //     email: "",
  //     role: "CUSTOMER" as UserRole,
  //     createdAt: "",
  //   },

  // onSubmit: async (values) => {
  //   try {
  //     await updateRole({
  //       id: values.id,
  //       role: values.role,
  //     }).unwrap();

  //     setIsEditUserModalOpen(false);
  //     } catch (error) {
  //     console.error(error);
  //     }
  //   },
  // });

  // const handleEditUser = (user: User) => {
  //   formik.setValues({
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     role: user.role,
  //     createdAt: user.createdAt,
  //   });

  //   setSelectedUser(user);
  //   setIsEditUserModalOpen(true);
  // };

  // const formatDate = (date: string) => {

  //   return new Date(date).toLocaleDateString(
  //     "en-GB",
  //     {
  //       day: "2-digit",
  //       month: "short",
  //       year: "numeric",
  //     }
  //   );

  // };

  // const totalUsers = users.length;

  // const adminAndVendors = users.filter(
  //   (user) =>
  //     user.role === "ADMIN" ||
  //     user.role === "VENDOR"
  // ).length;

  // const customers = users.filter(
  //   (user) => user.role === "CUSTOMER"
  // ).length;

  

  if (isLoading) {
    return ( <AdminUsersPageSkeleton />);
  }

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

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "CUSTOMER"
                            ? "bg-green-100 text-green-600"
                            : user.role === "VENDOR"
                            ? "bg-blue-100 text-blue-600"
                            : user.role === "ADMIN"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>
                    
                    </div>

                  </td>

                  {/* Joined */}
                  <td className="px-4 py-4 text-sm text-gray-600">

                    {formatDate(user.createdAt)}

                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">

                      <span className="text-sm text-gray-400">
                        N/A
                      </span>

                  </td>

                  {/* Actions */}
                  <td className="rounded-r-2xl px-4 py-4">

                    <div className="flex items-center gap-3">

                      <button
                        type="button"
                        onClick={() => handleEditUser(user)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 text-gray-600 transition hover:border-[#DB4444] hover:text-[#DB4444]">

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

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "CUSTOMER"
                            ? "bg-green-100 text-green-600"
                            : user.role === "VENDOR"
                            ? "bg-blue-100 text-blue-600"
                            : user.role === "ADMIN"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {user.role}
                      </span>

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

                  <span className="text-sm text-gray-400">
                    N/A
                  </span>

                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-2">

                  <button
                    type="button"
                    onClick={() => handleEditUser(user)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 transition hover:border-[#DB4444] hover:text-[#DB4444]"
                  >
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

      {
        isEditUserModalOpen && selectedUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl">

              <form onSubmit={formik.handleSubmit}>

                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-2xl font-bold">
                    Edit User
                  </h2>

                  <button
                    type="button"
                    onClick={() => setIsEditUserModalOpen(false)}
                    className="text-3xl text-gray-400 hover:text-red-500"
                  >
                    ×
                  </button>
                </div>

                {/* Fields */}
                <div className="grid gap-4 md:grid-cols-2">

                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Name
                    </label>

                    <input
                      type="text"
                      value={formik.values.name}
                      disabled
                      className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Email
                    </label>

                    <input
                      type="email"
                      value={formik.values.email}
                      disabled
                      className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                    />
                  </div>

                  {/* User ID */}
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium">
                      User ID
                    </label>

                    <input
                      type="text"
                      value={formik.values.id}
                      disabled
                      className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                    />
                  </div>

                  {/* Created At */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Created At
                    </label>

                    <input
                      type="text"
                      value={new Date(
                        formik.values.createdAt
                      ).toLocaleDateString()}
                      disabled
                      className="w-full rounded-2xl border border-gray-200 bg-gray-100 px-4 py-3 text-gray-500"
                    />
                  </div>

                  {/* Role */}
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Role
                    </label>

                    <div className="relative w-full">
                      <select
                      name="role"
                      value={formik.values.role}
                      onChange={formik.handleChange}
                      className="
                        w-full
                        appearance-none
                        rounded-xl
                         border
                         border-gray-200
                         bg-white
                         py-3
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
                         cursor-pointer"
                    >
                      <option value="CUSTOMER">
                        Customer
                      </option>

                      <option value="VENDOR">
                        Vendor
                      </option>

                      <option value="ADMIN">
                        Admin
                      </option>
                    </select>

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

                </div>

                {/* Footer */}
                <div className="mt-8 flex justify-end gap-3">

                  <button
                    type="button"
                    onClick={() => setIsEditUserModalOpen(false)}
                    className="rounded-xl border px-6 py-3"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    // disabled={isUpdating}
                    className="rounded-xl bg-[#DB4444] px-6 py-3 text-white"
                  >
                    {/* {isUpdating ? "Updating..." : "Update User"} */}
                    Update User
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