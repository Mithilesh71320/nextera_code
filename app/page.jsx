
import HeroSection from "@/components/home/HeroSection";
import AboutUs from "@/components/home/AboutUs";
import Features from "@/components/home/Features";
import Contact from "@/components/home/Contact";
import HomeNav from "@/components/home/HomeNav";

export default function HomePage() {
  return (
    <div>
      <HomeNav />
      <HeroSection />
      <AboutUs />
      <Features />
      <Contact />
    </div>
  );
}
