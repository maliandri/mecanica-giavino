"use client";

import { Instagram, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-6 lg:px-12 border-t"
      style={{ background: "#050a14", borderColor: "rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/LOGO-GIAVINO.svg"
                alt="Mecánica Giavino"
                style={{ height: "40px", width: "auto" }}
              />
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              Taller mecánico en Neuquén. Más de 20 años de experiencia. Diagnóstico, mantenimiento y reparaciones.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Navegación</h4>
            <ul className="space-y-2">
              {["Inicio", "Servicios", "Nosotros", "Contacto"].map((l) => (
                <li key={l}>
                  <a
                    href={`#${l.toLowerCase()}`}
                    className="text-slate-500 text-sm hover:text-white transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={14} style={{ color: "#e63329" }} />
                José Herce 54, Neuquén
              </li>
              <li>
                <a
                  href="tel:02995906564"
                  className="flex items-center gap-2 text-slate-500 text-sm hover:text-white transition-colors"
                >
                  <Phone size={14} style={{ color: "#e63329" }} />
                  0299 590-6564
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mecanicagiavino/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-slate-500 text-sm hover:text-white transition-colors"
                >
                  <Instagram size={14} style={{ color: "#e63329" }} />
                  @mecanicagiavino
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-600"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p>© {year} Mecánica Giavino. Todos los derechos reservados.</p>
          <p>Neuquén Capital, Argentina</p>
        </div>
      </div>
    </footer>
  );
}
