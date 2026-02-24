"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";

const links = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(5, 10, 20, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
        }}
      >
        <div
          className="max-w-7xl mx-auto h-24 flex items-center justify-between"
          style={{ paddingLeft: "5rem", paddingRight: "5rem" }}
        >
          {/* Logo */}
          <a href="#inicio" className="flex items-center">
            <img
              src="/LOGO-GIAVINO.svg"
              alt="Mecánica Giavino"
              style={{ height: "88px", width: "auto" }}
            />
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-colors relative group"
              >
                {l.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-px bg-red-500 transition-all duration-300 group-hover:w-full"
                />
              </a>
            ))}
          </div>

          {/* CTA + burger */}
          <div className="flex items-center gap-3">
            <a
              href="tel:02995906564"
              className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              <Phone size={14} style={{ color: "#e63329" }} />
              0299 590-6564
            </a>
            <a
              href="https://wa.me/5492995906564?text=Hola%20quiero%20pedir%20un%20turno"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex btn-primary items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold text-white"
            >
              Pedir Turno
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden text-white p-1"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-24 left-0 right-0 z-40 md:hidden"
            style={{
              background: "rgba(5,10,20,0.97)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(230,51,41,0.2)",
            }}
          >
            <div className="px-6 py-6 space-y-4">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-semibold text-slate-300 hover:text-white transition-colors py-2 border-b border-white/5"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://wa.me/5492995906564"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-white mt-4"
              >
                Pedir Turno por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
