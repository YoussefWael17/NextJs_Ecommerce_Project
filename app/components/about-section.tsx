"use client"
import Link from 'next/link'
import React from 'react'

export default function AboutSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">

      {/* RIGHT SIDE FORM */}
      <div className="flex items-center justify-center bg-white py-10 ">
        <div className="w-full max-w-md">

          {/* LOGO */}
          <h2 className="text-[54px] font-semibold text-black mb-6">
            Our Story
          </h2>

          <p className="text-black text-[16px] mb-6">
            Launced in 2015, Exclusive is South Asia’s premier online shopping makterplace with an active presense in Bangladesh. Supported by wide range of tailored marketing, data and service solutions, Exclusive has 10,500 sallers and 300 brands and serves 3 millioons customers across the region. 
          </p>

          <p className="text-black text-[16px] mb-12">
            Exclusive has more than 1 Million products to offer, growing at a very fast. Exclusive offers a diverse assotment in categories ranging  from consumer.
          </p>


        </div>
      </div>

      {/* LEFT SIDE IMAGE */}
      <div className="relative hidden lg:block h-[100%] w-full ">
        <img
            src="https://images.unsplash.com/photo-1713693212309-acdbf3a3feb4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="signup"
            className="w-full h-full object-contain"
        />
      </div>
    </div>
  )
}

// "use client";

// import React from "react";

// export default function AboutSection() {
//   return (
//     <section className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
      
//       {/* TEXT SIDE */}
//       <div className="px-6 lg:px-0 ">
//         <h2 className="text-4xl lg:text-5xl font-semibold text-black mb-8">
//           Our Story
//         </h2>

//         <p className="text-gray-700 text-base leading-7 mb-6">
//           Launched in 2015, Exclusive is South Asia’s premier online shopping
//           marketplace with an active presence in Bangladesh. Supported by a wide
//           range of tailored marketing, data, and service solutions, Exclusive
//           has 10,500 sellers and 300 brands and serves 3 million customers
//           across the region.
//         </p>

//         <p className="text-gray-700 text-base leading-7">
//           Exclusive has more than 1 million products to offer and is growing at
//           a very fast rate. Exclusive offers a diverse assortment in categories
//           ranging from consumer products to lifestyle items.
//         </p>
//       </div>

//       {/* IMAGE SIDE */}
//       <div className="w-full h-screen">
//         <img
//           src="https://images.unsplash.com/photo-1713693212309-acdbf3a3feb4?q=80&w=1170&auto=format&fit=crop"
//           alt="About"
//           className="w-full h-[300px] lg:h-full object-contain "
//         />
//       </div>
//     </section>
//   );
// }



// "use client";

// import React from "react";

// export default function AboutSection() {
//   return (
//     <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 overflow-hidden">

//       {/* TEXT SIDE */}
//       <div className="flex items-center justify-center bg-white px-6 py-10">
//         <div className="w-full max-w-md">

//           <h2 className="text-[54px] font-semibold text-black mb-6">
//             Our Story
//           </h2>

//           <p className="text-black text-[16px] leading-7 mb-6">
//             Launched in 2015, Exclusive is South Asia’s premier online shopping
//             marketplace with an active presence in Bangladesh. Supported by a
//             wide range of tailored marketing, data, and service solutions,
//             Exclusive has 10,500 sellers and 300 brands and serves 3 million
//             customers across the region.
//           </p>

//           <p className="text-black text-[16px] leading-7">
//             Exclusive has more than 1 million products to offer, growing at a
//             very fast rate. Exclusive offers a diverse assortment in categories
//             ranging from consumer products to lifestyle items.
//           </p>

//         </div>
//       </div>

//       {/* IMAGE SIDE */}
//       <div className="relative hidden lg:block h-screen">
//         <div className="absolute inset-y-0 left-10 right-[-200px]">
//           <img
//             src="https://images.unsplash.com/photo-1713693212309-acdbf3a3feb4?q=80&w=1170&auto=format&fit=crop"
//             alt="About"
//             className="w-full h-full object-cover rounded-l-xl"
//           />
//         </div>
//       </div>

//     </section>
//   );
// }