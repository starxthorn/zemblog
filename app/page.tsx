import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HomeBlogs from "@/components/HomeBlogs";

export default function Home() {
  return (
    <main className="w-full py-6 lg:py-8 px-6 lg:px-40">
      <Hero />
      <HomeBlogs />
      <Footer />
    </main>
  );
}
