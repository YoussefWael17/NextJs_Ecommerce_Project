import Image from "next/image";
// import { EmblaCarousel } from "./components/slider";
import HeroSection from "../components/hero-section";
import FlashSale from "../components/flash-sale";
import CategoriesSlider from "../components/categories-slider";
import BestSelling from "../components/best-selling";
import FeaturedProducts from "../components/featured-products";
import NewArrival from "../components/new-arrival-section";
import ServicesSection from "../components/services-section";
import PromoBanner from "../components/promo-banner";

export default function Home() {
  return (
    <div>

      <HeroSection />
      <FlashSale />
      <CategoriesSlider />
      <BestSelling />

      <PromoBanner />

      <FeaturedProducts />
      <NewArrival />
      <ServicesSection />
      
    </div>
  );
}
