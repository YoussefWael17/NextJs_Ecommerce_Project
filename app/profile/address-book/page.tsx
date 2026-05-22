import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faLocationDot,
  faPhone,
  faPen,
  faTrash,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function AddressBookPage() {
  const addresses = [
    {
      id: 1,
      title: "Home Address",
      fullName: "Ahmed Mohamed",
      city: "Cairo",
      street: "Nasr City, Street 10",
      phone: "+20 100 000 0000",
    },
    {
      id: 2,
      title: "Work Address",
      fullName: "Ahmed Mohamed",
      city: "Giza",
      street: "Smart Village",
      phone: "+20 111 222 3333",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-2 md:px-20 py-10 shadow-md">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="mb-2 text-[20px] font-medium text-[#DB4444]">
            Address Book
          </h1>

          <p className="text-sm text-gray-500">
            Manage your saved addresses
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-md bg-[#DB4444] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90">
          <FontAwesomeIcon icon={faPlus} />
          Add New Address
        </button>
      </div>

      {/* Forms */}
      <div className="space-y-8">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="rounded-md border border-gray-200 bg-white p-2 md:p-6 shadow-sm mb-4"
          >
            {/* Top */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {address.title}
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Saved Address Information
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 rounded-md border border-[#DB4444] px-4 py-2 text-sm font-medium text-[#DB4444] transition hover:bg-[#DB4444] hover:text-white">
                  <FontAwesomeIcon icon={faPen} />
                  Edit
                </button>

                <button className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition hover:bg-red-500 hover:text-white">
                  <FontAwesomeIcon icon={faTrash} />
                  Delete
                </button>
              </div>
            </div>

            {/* Inputs */}
            <form className="space-y-6">
              {/* Full Name + City */}
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={address.fullName}
                    readOnly
                    className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    City
                  </label>

                  <input
                    type="text"
                    value={address.city}
                    readOnly
                    className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 outline-none"
                  />
                </div>
              </div>

              {/* Street */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-[#DB4444]"
                  />
                  Street Address
                </label>

                <input
                  type="text"
                  value={address.street}
                  readOnly
                  className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 outline-none"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <FontAwesomeIcon
                    icon={faPhone}
                    className="text-[#DB4444]"
                  />
                  Phone Number
                </label>

                <input
                  type="text"
                  value={address.phone}
                  readOnly
                  className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 outline-none"
                />
              </div>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}


// import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import {
//   faLocationDot,
//   faPhone,
//   faPen,
//   faTrash,
//   faPlus,
// } from "@fortawesome/free-solid-svg-icons";

// export default function AddressBookPage() {
//   const addresses = [
//     {
//       id: 1,
//       title: "Home Address",
//       fullName: "Ahmed Mohamed",
//       city: "Cairo",
//       street: "Nasr City, Street 10",
//       phone: "+20 100 000 0000",
//     },
//     {
//       id: 2,
//       title: "Work Address",
//       fullName: "Ahmed Mohamed",
//       city: "Giza",
//       street: "Smart Village",
//       phone: "+20 111 222 3333",
//     },
//   ];

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
//       {/* Main Container */}
//       <div className="rounded-2xl bg-white p-5 shadow-md sm:p-8">
//         {/* Header */}
//         <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="mb-2 text-2xl font-semibold text-[#DB4444]">
//               Address Book
//             </h1>

//             <p className="text-sm text-gray-500">
//               Manage your saved addresses
//             </p>
//           </div>

//           <button className="flex items-center justify-center gap-2 rounded-md bg-[#DB4444] px-5 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#c73636]">
//             <FontAwesomeIcon icon={faPlus} />
//             Add New Address
//           </button>
//         </div>

//         {/* Cards */}
//         <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
//           {addresses.map((address) => (
//             <div
//               key={address.id}
//               className="rounded-2xl border border-gray-200 bg-white p-5 transition duration-300 hover:shadow-lg"
//             >
//               {/* Card Header */}
//               <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//                 <div>
//                   <h2 className="text-lg font-semibold text-gray-800">
//                     {address.title}
//                   </h2>

//                   <p className="mt-1 text-sm text-gray-400">
//                     Saved Address Information
//                   </p>
//                 </div>

//                 {/* Buttons */}
//                 <div className="flex flex-wrap items-center gap-3">
//                   <button className="flex items-center gap-2 rounded-md border border-[#DB4444] px-4 py-2 text-sm font-medium text-[#DB4444] transition duration-300 hover:bg-[#DB4444] hover:text-white">
//                     <FontAwesomeIcon icon={faPen} />
//                     Edit
//                   </button>

//                   <button className="flex items-center gap-2 rounded-md border border-red-200 px-4 py-2 text-sm font-medium text-red-500 transition duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white">
//                     <FontAwesomeIcon icon={faTrash} />
//                     Delete
//                   </button>
//                 </div>
//               </div>

//               {/* Form */}
//               <form className="space-y-5">
//                 {/* Full Name + City */}
//                 <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//                   {/* Full Name */}
//                   <div>
//                     <label className="mb-2 block text-sm font-medium text-gray-700">
//                       Full Name
//                     </label>

//                     <input
//                       type="text"
//                       value={address.fullName}
//                       readOnly
//                       className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#DB4444]"
//                     />
//                   </div>

//                   {/* City */}
//                   <div>
//                     <label className="mb-2 block text-sm font-medium text-gray-700">
//                       City
//                     </label>

//                     <input
//                       type="text"
//                       value={address.city}
//                       readOnly
//                       className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#DB4444]"
//                     />
//                   </div>
//                 </div>

//                 {/* Street */}
//                 <div>
//                   <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
//                     <FontAwesomeIcon
//                       icon={faLocationDot}
//                       className="text-[#DB4444]"
//                     />
//                     Street Address
//                   </label>

//                   <input
//                     type="text"
//                     value={address.street}
//                     readOnly
//                     className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#DB4444]"
//                   />
//                 </div>

//                 {/* Phone */}
//                 <div>
//                   <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
//                     <FontAwesomeIcon
//                       icon={faPhone}
//                       className="text-[#DB4444]"
//                     />
//                     Phone Number
//                   </label>

//                   <input
//                     type="text"
//                     value={address.phone}
//                     readOnly
//                     className="w-full rounded-md bg-[#F5F5F5] px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-[#DB4444]"
//                   />
//                 </div>
//               </form>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }