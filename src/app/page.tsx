import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Nosotros from "@/components/Nosotros";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="mx-3 sm:mx-6 lg:mx-10 xl:mx-auto xl:max-w-[1440px] overflow-hidden rounded-2xl">
      <Navbar />
      <Hero />
      <Servicios />
      <Nosotros />
      <Contacto />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
