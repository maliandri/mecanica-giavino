import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Servicios from "@/components/Servicios";
import Nosotros from "@/components/Nosotros";
import Contacto from "@/components/Contacto";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

export default function Home() {
  return (
    <main className="mx-auto max-w-[1440px] w-full">
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
