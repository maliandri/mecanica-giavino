"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CheckCircle, MapPin, Clock, Award } from "lucide-react";

const features = [
  "Diagnóstico computarizado profesional",
  "Mecánicos con más de 5 años de experiencia",
  "Trabajo garantizado en todas las reparaciones",
  "Presupuesto sin cargo antes de comenzar",
  "Atención personalizada para cada cliente",
  "Trabajamos con todas las marcas y modelos",
];

const badges = [
  { icon: Award, label: "5★ en Google", sub: "15 reseñas" },
  { icon: Clock, label: "Lun–Sáb", sub: "9am a 18hs" },
  { icon: MapPin, label: "Neuquén", sub: "José Herce 54" },
];

export default function Nosotros() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="nosotros" className="py-24 px-6 lg:px-12" style={{ background: "#050a14" }}>
      <div className="max-w-7xl mx-auto">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT - visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Main card */}
            <div
              className="relative rounded-3xl p-8 overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(230,51,41,0.08), rgba(8,15,30,0.8))",
                border: "1px solid rgba(230,51,41,0.15)",
              }}
            >
              {/* Big number decoration */}
              <span
                className="absolute top-4 right-6 text-[120px] font-black leading-none select-none pointer-events-none"
                style={{ color: "rgba(230,51,41,0.04)" }}
              >
                5
              </span>

              <div className="relative z-10">
                <p
                  className="text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: "#e63329" }}
                >
                  Experiencia
                </p>
                <h3 className="text-5xl font-black text-white mb-1">+5 años</h3>
                <p className="text-slate-400 text-sm mb-8">
                  en el rubro automotriz en Neuquén
                </p>

                {/* Progress bars */}
                {[
                  { label: "Satisfacción del cliente", value: 98 },
                  { label: "Diagnóstico correcto a la 1ra vez", value: 95 },
                  { label: "Trabajos en tiempo acordado", value: 92 },
                ].map((item, i) => (
                  <div key={i} className="mb-4">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-400">{item.label}</span>
                      <span className="text-white font-bold">{item.value}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ background: "linear-gradient(90deg, #e63329, #ff6b5e)" }}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${item.value}%` } : {}}
                        transition={{ duration: 1, delay: 0.3 + i * 0.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating badges */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {badges.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <b.icon size={18} style={{ color: "#e63329" }} className="mx-auto mb-2" />
                  <p className="text-white text-xs font-bold">{b.label}</p>
                  <p className="text-slate-500 text-xs">{b.sub}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT - text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <span
                className="inline-block text-xs font-bold tracking-widest uppercase mb-4 px-4 py-1.5 rounded-full"
                style={{
                  background: "rgba(230,51,41,0.1)",
                  color: "#e63329",
                  border: "1px solid rgba(230,51,41,0.2)",
                }}
              >
                Quiénes somos
              </span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Mecánicos de{" "}
                <span style={{ color: "#e63329" }}>confianza</span>{" "}
                en Neuquén
              </h2>
            </div>

            <p className="text-slate-400 text-base leading-relaxed">
              En Mecánica Giavino trabajamos con honestidad y dedicación desde hace más de 5 años.
              Diego Giavino se especializa en el diagnóstico y reparación de todo tipo de
              vehículos, ofreciendo soluciones reales a precios justos.
            </p>

            <p className="text-slate-400 text-base leading-relaxed">
              Contamos con equipamiento de diagnóstico computarizado moderno para identificar
              problemas con precisión y brindarte el mejor servicio posible.
            </p>

            {/* Feature list */}
            <ul className="space-y-3">
              {features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.08 }}
                  className="flex items-center gap-3 text-sm text-slate-300"
                >
                  <CheckCircle size={16} style={{ color: "#e63329", flexShrink: 0 }} />
                  {f}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
