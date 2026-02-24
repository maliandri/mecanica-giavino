"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock, Instagram } from "lucide-react";

const info = [
  {
    icon: MapPin,
    title: "Dirección",
    lines: ["José Herce 54", "Sector Ferroviario, Q8300 Neuquén"],
    link: "https://maps.google.com/?q=José+Herce+54+Neuquén",
    linkText: "Cómo llegar",
  },
  {
    icon: Phone,
    title: "Teléfono",
    lines: ["0299 590-6564"],
    link: "tel:02995906564",
    linkText: "Llamar ahora",
  },
  {
    icon: Clock,
    title: "Horarios",
    lines: ["Lunes a Viernes: 9:00 a 18:00", "Sábados: 9:00 a 13:00"],
    link: null,
    linkText: null,
  },
  {
    icon: Instagram,
    title: "Redes",
    lines: ["@mecanicagiavino", "@diego_giavino (TikTok)"],
    link: "https://www.instagram.com/mecanicagiavino/",
    linkText: "Ver Instagram",
  },
];

export default function Contacto() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contacto"
      className="py-24 px-6 lg:px-12 relative overflow-hidden"
      style={{ background: "#080f1e" }}
    >
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(230,51,41,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="section-divider mb-16" />

      <div ref={ref} className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span
            className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(230,51,41,0.1)",
              color: "#e63329",
              border: "1px solid rgba(230,51,41,0.2)",
            }}
          >
            Encontranos
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Contacto y <span style={{ color: "#e63329" }}>Ubicación</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-lg mx-auto">
            Estamos en el Sector Ferroviario de Neuquén. Pasá sin turno o escribinos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {info.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl p-5 flex gap-4 items-start"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(230,51,41,0.1)",
                    border: "1px solid rgba(230,51,41,0.2)",
                  }}
                >
                  <item.icon size={18} style={{ color: "#e63329" }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
                    {item.title}
                  </p>
                  {item.lines.map((line, j) => (
                    <p key={j} className="text-white text-sm font-medium">
                      {line}
                    </p>
                  ))}
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs mt-1.5 inline-block font-semibold transition-colors"
                      style={{ color: "#e63329" }}
                    >
                      {item.linkText} →
                    </a>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Big WhatsApp button */}
            <motion.a
              href="https://wa.me/5492995906564?text=Hola%20Mecánica%20Giavino%2C%20quiero%20pedir%20un%20turno"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="btn-primary flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-bold text-white text-base"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Escribir por WhatsApp
            </motion.a>
          </motion.div>

          {/* Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-3xl overflow-hidden"
            style={{
              border: "1px solid rgba(230,51,41,0.15)",
              minHeight: "400px",
            }}
          >
            <iframe
              title="Mecánica Giavino ubicación"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d-68.1579125!3d-38.9528092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x960bcdeb716feaa3%3A0xd472afd3016625c3!2sMec%C3%A1nica%20Giavino!5e0!3m2!1ses!2sar!4v1740000000000!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px", filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
