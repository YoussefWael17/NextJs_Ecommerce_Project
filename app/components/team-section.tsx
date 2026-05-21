"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

export default function TeamSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const team = [
    {
        id: 1,
        name: "Ahmed Hassan",
        role: "Founder & Chairman",
        image: "https://www.pngplay.com/wp-content/uploads/1/Teacher-Free-PNG-Image.png",
    },
    {
        id: 2,
        name: "Sara Mohamed",
        role: "Managing Director",
        image: "https://static.vecteezy.com/system/resources/previews/067/217/874/large_2x/confident-businessman-holding-laptop-against-transparent-background-for-corporate-branding-business-presentations-or-professional-campaigns-free-png.png",
    },
    {
        id: 3,
        name: "Omar Khaled",
        role: "Product Designer",
        image: "https://png.pngtree.com/png-vector/20241217/ourmid/pngtree-the-modern-businessman-png-image_14741328.png",
    },
    {
        id: 4,
        name: "Mariam Ali",
        role: "Frontend Developer",
        image: "https://static.vecteezy.com/system/resources/thumbnails/051/966/255/small_2x/a-man-in-glasses-holding-a-laptop-free-png.png",
    },
    {
        id: 5,
        name: "Youssef Adel",
        role: "Backend Developer",
        image: "https://static.vecteezy.com/system/resources/thumbnails/057/190/065/small_2x/smiling-young-professional-with-laptop-modern-business-stock-image-free-png.png",
    },
    ];


  // Embla events
  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    setSelectedIndex(emblaApi.selectedScrollSnap());

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div className="flex min-h-screen w-full items-center mb-10">
      <div className="mx-auto w-full max-w-screen-xl px-4">

        {/* EMBLA VIEWPORT */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">

            {team.map((member) => (
              <div
                key={member.id}
                className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] min-w-0"
              >
                {/* CARD */}
                <div className="bg-white shadow-md hover:shadow-xl transition-all duration-300 h-[550px] flex flex-col group hover:-translate-y-2 overflow-hidden">

                  {/* IMAGE */}
                  <div className="h-[70%] bg-gray-50 flex items-center justify-center">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* INFO */}
                  <div className="h-[30%] p-5 flex flex-col justify-between">

                    {/* TEXT */}
                    <div className="text-left">
                      <h3 className="text-[28px] font-medium text-black">
                        {member.name}
                      </h3>
                      <p className="text-[15px] text-gray-500 mt-1">
                        {member.role}
                      </p>
                    </div>

                    {/* SOCIAL */}
                    <div className="flex gap-3 justify-start">
                      <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#DB4444] hover:text-white transition">
                        <FaFacebookF size={12} />
                      </a>

                      <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#DB4444] hover:text-white transition">
                        <FaTwitter size={12} />
                      </a>

                      <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#DB4444] hover:text-white transition">
                        <FaLinkedinIn size={12} />
                      </a>

                      <a className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#DB4444] hover:text-white transition">
                        <FaInstagram size={12} />
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-8">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? "w-6 bg-[#DB4444]"
                  : "w-2.5 bg-gray-300"
              }`}
            />
          ))}
        </div>

      </div>
    </div>
  );
}