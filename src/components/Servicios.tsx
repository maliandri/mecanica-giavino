"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wrench,
  Zap,
  Settings,
  Shield,
  Gauge,
  Thermometer,
  Car,
  CircleDot,
} from "lucide-react";

const servicios = [
  {
    icon: Gauge,
    title: "Diagnóstico Computarizado",
    description:
      "Escáner electrónico de última generación para detectar fallas en tu vehículo con precisión total.",
    highlight: true,
  },
  {
    icon: Wrench,
    title: "Service Completo",
    description:
      "Cambio de aceite, filtros, bujías y revisión general. Mantenimiento preventivo para alargar la vida de tu auto.",
    highlight: false,
  },
  {
    icon: CircleDot,
    title: "Frenos",
    description:
      "Revisión y reemplazo de pastillas, discos y líquido de frenos. Seguridad ante todo.",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Electricidad Automotriz",
    description:
      "Diagnóstico y reparación de sistemas eléctricos, sensores, luces y módulos de control.",
    highlight: false,
  },
  {
    icon: Settings,
    title: "Motor y Transmisión",
    description:
      "Reparaciones de motor, caja de cambios, embrague y sistemas de transmisión.",
    highlight: false,
  },
  {
    icon: Thermometer,
    title: "Sistema de Refrigeración",
    description:
      "Revisión de radiador, termostato, bomba de agua y mangueras. Evitá el recalentamiento.",
    highlight: false,
  },
  {
    icon: Car,
    title: "Suspensión y Dirección",
    description:
      "Amortiguadores, bujes, rótulas y alineación. Confort y control en cada curva.",
    highlight: false,
  },
  {
    icon: Shield,
    title: "Garantía en Mano de Obra",
    description:
      "Todos nuestros trabajos tienen garantía. Tu tranquilidad es nuestra prioridad.",
    highlight: false,
  },
];

function ServiceCard({
  servicio,
  index,
}: {
  servicio: (typeof servicios)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      className={`service-card rounded-2xl p-6 group cursor-default relative overflow-hidden ${
        servicio.highlight
          ? "border-red-500/30"
          : ""
      }`}
    >
      {servicio.highlight && (
        <div
          className="absolute inset-0 opacity-5 rounded-2xl"
          style={{ background: "radial-gradient(circle at top left, #e63329, transparent)" }}
        />
      )}

      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: servicio.highlight
            ? "rgba(230,51,41,0.2)"
            : "rgba(230,51,41,0.08)",
          border: "1px solid rgba(230,51,41,0.2)",
        }}
      >
        <servicio.icon
          size={22}
          style={{ color: "#e63329" }}
        />
      </div>

      <h3 className="text-white font-bold text-base mb-2 group-hover:text-red-400 transition-colors">
        {servicio.title}
      </h3>
      <p className="text-slate-500 text-sm leading-relaxed">
        {servicio.description}
      </p>

      {servicio.highlight && (
        <span
          className="absolute top-4 right-4 text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            background: "rgba(230,51,41,0.15)",
            color: "#e63329",
            border: "1px solid rgba(230,51,41,0.3)",
          }}
        >
          DESTACADO
        </span>
      )}
    </motion.div>
  );
}

export default function Servicios() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section id="servicios" className="py-24 px-6 lg:px-12 relative" style={{ background: "#080f1e" }}>
      {/* Top divider */}
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
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
            Lo que hacemos
          </span>
          <h2 className="text-4xl lg:text-5xl font-black text-white mb-4">
            Nuestros <span style={{ color: "#e63329" }}>Servicios</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl mx-auto">
            Más de 20 años brindando soluciones mecánicas en Neuquén. Trabajamos con todas las marcas.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {servicios.map((s, i) => (
            <ServiceCard key={i} servicio={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-slate-500 text-sm mb-4">
            ¿No ves el servicio que buscás? Consultanos
          </p>
          <a
            href="https://wa.me/5492995906564?text=Hola%20quiero%20consultar%20sobre%20un%20servicio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            Consultar por WhatsApp
          </a>
        </motion.div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
}
