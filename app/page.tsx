import Image from "next/image";
// import { EmblaCarousel } from "./components/slider";
import HeroSection from "./components/hero-section";
import FlashSale from "./components/flash-sale";
import CategoriesSlider from "./components/categories-slider";
import BestSelling from "./components/best-selling";
import FeaturedProducts from "./components/featured-products";
import ProductCard from "./components/product-card";
import NewArrival from "./components/new-arrival-section";
import ServicesSection from "./components/services-section";

export default function Home() {
  return (
    <div>

      <HeroSection />
      <FlashSale />
      <CategoriesSlider />
      <BestSelling />

      <div className="w-full py-16">
        <div className="mx-auto max-w-7xl px-4">

          <div className="grid grid-cols-1 md:grid-cols-2 bg-black rounded-lg overflow-hidden">

            {/* LEFT SIDE */}
            <div className="p-10 flex flex-col justify-center text-white">

              <p className="text-[#00FF66] font-semibold mb-3">
                Categories
              </p>

              <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                Enhance Your <br /> Music Experience
              </h2>

              {/* COUNTDOWN */}
              <div className="flex gap-4 mt-8 flex-wrap">

                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">23</span>
                  <span className="text-xs">Hours</span>
                </div>

                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">05</span>
                  <span className="text-xs">Days</span>
                </div>

                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">59</span>
                  <span className="text-xs">Minutes</span>
                </div>

                <div className="bg-white text-black rounded-full w-16 h-16 flex flex-col items-center justify-center">
                  <span className="text-lg font-bold">35</span>
                  <span className="text-xs">Seconds</span>
                </div>

              </div>

              {/* BUTTON */}
              <button className="mt-8 bg-[#00FF66] hover:bg-red-600 transition text-white px-8 py-3 rounded-md w-fit">
                Buy Now
              </button>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative flex items-center justify-center bg-black">

              <div className="relative flex items-center justify-center bg-black">

              {/* WHITE GLOW */}
              <div className="absolute w-87.5 h-87.5 bg-white/20 blur-3xl rounded-full"></div>

              {/* SECOND SOFT LAYER (optional for depth) */}
              <div className="absolute w-62.5 h-62.5 bg-white/10 blur-2xl rounded-full"></div>

              {/* IMAGE */}
              <img
                src="https://www.pngmart.com/files/7/Bluetooth-Speaker-PNG-Image.png"
                // src="https://pngimg.com/uploads/headphones/headphones_PNG101975.png"
                className="relative z-10 h-80 object-contain drop-shadow-[0_0_40px_rgba(255,255,255,0.25)]"
                alt="headphones"
              />

            </div>

            </div>

          </div>

        </div>
      </div>

      <FeaturedProducts />
      <NewArrival />
      <ServicesSection />
      
    </div>
  );
}
