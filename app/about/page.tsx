import React from 'react'
import AboutSection from '../components/about-section'
import Link from 'next/link'
import StatsSection from '../components/stats-section'
import TeamSection from '../components/team-section'
import ServicesSection from '../components/services-section'

export default function AboutPage() {
  return (
    <div>
        <div className="mx-auto w-full max-w-screen-xl py-10">
            
            {/* BREADCRUMB */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
                <Link href="/" className="hover:text-black transition">
                    Home
                </Link>

                <span>/</span>

                <span className="text-black font-medium">
                    My Account
                </span>
            </div>
        </div>

    <AboutSection />
    <StatsSection />
    <TeamSection />
    <ServicesSection />
    </div>
  )
}


// import React from "react";
// import AboutSection from "../components/about-section";
// import Link from "next/link";

// export default function AboutPage() {
//   return (
//     <div className="mx-auto max-w-screen-xl px-6 py-10">
      
//       {/* BREADCRUMB */}
//       <div className="flex items-center gap-2 text-sm text-gray-500 mb-10">
//         <Link href="/" className="hover:text-black transition">
//           Home
//         </Link>

//         <span>/</span>

//         <span className="text-black font-medium">About</span>
//       </div>

//     </div>
//   );
// }