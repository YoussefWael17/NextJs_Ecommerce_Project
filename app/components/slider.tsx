// "use client";

// import React, { useCallback, useEffect } from "react";
// import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";

// export function EmblaCarousel() {
//   const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [Autoplay()])
  
//   const scrollPrev = useCallback(() => {
//     emblaApi?.scrollPrev();
//   }, [emblaApi]);

//   const scrollNext = useCallback(() => {
//     emblaApi?.scrollNext();
//   }, [emblaApi]);

//   useEffect(() => {
//     if (!emblaApi) return
//     emblaApi.plugins().autoplay?.play()
//   }, [emblaApi])

//   return (
//     <div className="max-w-xl mx-auto">
//       {/* viewport */}
//       <div className="overflow-hidden" ref={emblaRef}>
        
//         {/* container */}
//         <div className="flex">

//           {/* slide */}
//           <div className="flex-[0_0_100%] min-w-0 p-10 bg-gray-200 text-center">
//             Slide 1
//           </div>

//           <div className="flex-[0_0_100%] min-w-0 p-10 bg-gray-300 text-center">
//             Slide 2
//           </div>

//           <div className="flex-[0_0_100%] min-w-0 p-10 bg-gray-400 text-center">
//             Slide 3
//           </div>

//         </div>
//       </div>

//       {/* controls */}
//       <div className="flex justify-center gap-3 mt-4">
//         <button
//           onClick={scrollPrev}
//           className="px-4 py-2 bg-black text-white rounded"
//         >
//           Prev
//         </button>

//         <button
//           onClick={scrollNext}
//           className="px-4 py-2 bg-black text-white rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }



// VIP
// <div class="flex w-full flex-row items-end justify-between bg-amber-100 p-4">
  
//   <div class="flex w-[75%] flex-col">
    
//     <div class="flex items-center">
//       <span class="h-10 w-5 bg-[#DB4444] rounded"></span>
//       <span class="ms-4 font-semibold text-[#DB4444]">Today's</span>
//     </div>

//     <div class="mt-2 flex items-center justify-between">
//       <h3 class="text-4xl font-semibold">Flash Sales</h3>

//       <div class="flex items-center text-[#DB4444]">
        
//         <div class="flex flex-col items-start">
//           <span class="font-medium text-sm text-black">Days</span>
//           <span class="font-bold text-3xl text-black">05</span>
//         </div>

//         <span class="mx-2">:</span>

//         <div class="flex flex-col items-center">
//           <span>Hours</span>
//           <span>12</span>
//         </div>

//         <span class="mx-2">:</span>

//         <div class="flex flex-col items-center">
//           <span>Minutes</span>
//           <span>30</span>
//         </div>

//         <span class="mx-2">:</span>

//         <div class="flex flex-col items-center">
//           <span>Seconds</span>
//           <span>45</span>
//         </div>

//       </div>
//     </div>

//   </div>

//   <div class="bg-blue-300 p-2">Arrows</div>

// </div>