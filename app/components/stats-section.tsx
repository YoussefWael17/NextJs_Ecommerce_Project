"use client";

import {
  FaUsers,
  FaShoppingBag,
  FaStore,
  FaDollarSign,
} from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    {
      id: 1,
      icon: <FaUsers />,
      number: "10K+",
      title: "Sallers active our site",
    },
    {
      id: 2,
      icon: <FaShoppingBag />,
      number: "25K+",
      title: "Mopnthly Produduct Sale",
    },
    {
      id: 3,
      icon: <FaStore />,
      number: "350+",
      title: "Customer active in our site",
    },
    {
      id: 4,
      icon: <FaDollarSign />,
      number: "$1.2M",
      title: "Anual gross sale in our site",
    },
  ];

  return (
    <section className="flex h-[70vh] w-full items-center my-10">
      <div className="mx-auto w-full max-w-screen-xl px-4">

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">
          {stats.map((item) => (
            <div
                key={item.id}
                className="group bg-white border border-gray-200 p-8 text-center shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:bg-[#DB4444]"
                >
                {/* Icon */}
                <div className="w-20 h-20 bg-[#7D8184] rounded-full mx-auto flex items-center justify-center shadow-lg transition-all duration-300 group-hover:bg-[#E67C7C]">
                    
                    <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-white text-2xl transition-all duration-300 group-hover:bg-white group-hover:text-black">
                    {item.icon}
                    </div>

                </div>

                {/* Number */}
                <h3 className="text-[32px] font-bold text-black mt-6 mb-2 transition-all duration-300 group-hover:text-white">
                    {item.number}
                </h3>

                {/* Title */}
                <p className="text-[16px] text-black transition-all duration-300 group-hover:text-white">
                    {item.title}
                </p>
                </div>
          ))}
        </div>
      </div>
    </section>
  );
}