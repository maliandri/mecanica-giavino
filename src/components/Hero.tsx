"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, type Variants } from "framer-motion";
import { ChevronDown, Star } from "lucide-react";

// Gauge SVG component
function Gauge({
  value,
  max,
  label,
  unit,
  color = "#e63329",
  size = 140,
  animate: animateGauge = true,
}: {
  value: number;
  max: number;
  label: string;
  unit: string;
  color?: string;
  size?: number;
  animate?: boolean;
}) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.38;
  const startAngle = -220;
  const endAngle = 40;
  const totalArc = endAngle - startAngle;
  const valueAngle = startAngle + (value / max) * totalArc;

  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const arcX = (angle: number) => cx + r * Math.cos(toRad(angle));
  const arcY = (angle: number) => cy + r * Math.sin(toRad(angle));

  const describeArc = (from: number, to: number) => {
    const x1 = arcX(from), y1 = arcY(from);
    const x2 = arcX(to), y2 = arcY(to);
    const large = to - from > 180 ? 1 : 0;
    return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
  };

  // Needle
  const needleLen = r * 0.78;
  const needleX = cx + needleLen * Math.cos(toRad(valueAngle));
  const needleY = cy + needleLen * Math.sin(toRad(valueAngle));

  // Tick marks
  const ticks = Array.from({ length: 9 }, (_, i) => {
    const angle = startAngle + (i / 8) * totalArc;
    const inner = r * 0.82;
    const outer = r * 0.96;
    return {
      x1: cx + inner * Math.cos(toRad(angle)),
      y1: cy + inner * Math.sin(toRad(angle)),
      x2: cx + outer * Math.cos(toRad(angle)),
      y2: cy + outer * Math.sin(toRad(angle)),
    };
  });

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={size * 0.48} fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />

      {/* Track */}
      <path d={describeArc(startAngle, endAngle)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={size * 0.055} strokeLinecap="round" />

      {/* Filled arc */}
      <path d={describeArc(startAngle, valueAngle)} fill="none" stroke={color} strokeWidth={size * 0.055} strokeLinecap="round"
        style={animateGauge ? { transition: "stroke-dasharray 1.2s ease" } : {}}
      />

      {/* Glow arc */}
      <path d={describeArc(startAngle, valueAngle)} fill="none" stroke={color} strokeWidth={size * 0.1} strokeLinecap="round" opacity="0.12" />

      {/* Ticks */}
      {ticks.map((t, i) => (
        <line key={i} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2}
          stroke={i <= Math.round((value / max) * 8) ? color : "rgba(255,255,255,0.15)"}
          strokeWidth="1.5" strokeLinecap="round"
        />
      ))}

      {/* Needle */}
      <line x1={cx} y1={cy} x2={needleX} y2={needleY}
        stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.9"
      />
      {/* Needle center dot */}
      <circle cx={cx} cy={cy} r={size * 0.045} fill={color} />
      <circle cx={cx} cy={cy} r={size * 0.022} fill="white" opacity="0.6" />

      {/* Value text */}
      <text x={cx} y={cy + size * 0.16} textAnchor="middle" fill="white" fontSize={size * 0.17} fontWeight="bold" fontFamily="Inter, sans-serif">
        {value}
      </text>
      {/* Unit */}
      <text x={cx} y={cy + size * 0.29} textAnchor="middle" fill={color} fontSize={size * 0.09} fontWeight="600" fontFamily="Inter, sans-serif">
        {unit}
      </text>
      {/* Label */}
      <text x={cx} y={cy + size * 0.42} textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize={size * 0.08} fontFamily="Inter, sans-serif">
        {label}
      </text>
    </svg>
  );
}

// Animated dashboard panel
function Dashboard() {
  const [speed, setSpeed] = useState(0);
  const [rpm, setRpm] = useState(0);
  const [temp, setTemp] = useState(0);
  const [phase, setPhase] = useState<"idle" | "revving" | "cruising" | "cooling">("idle");

  useEffect(() => {
    // Sequence: idle → rev up → cruise → cool down → repeat
    const sequence = async () => {
      // Rev up
      setPhase("revving");
      const revUp = setInterval(() => {
        setSpeed(s => Math.min(s + 3, 120));
        setRpm(r => Math.min(r + 120, 4800));
        setTemp(t => Math.min(t + 2, 92));
      }, 40);
      await new Promise(r => setTimeout(r, 1600));
      clearInterval(revUp);

      // Cruise
      setPhase("cruising");
      await new Promise(r => setTimeout(r, 1800));

      // Cool down
      setPhase("cooling");
      const coolDown = setInterval(() => {
        setSpeed(s => Math.max(s - 4, 0));
        setRpm(r => Math.max(r - 150, 0));
        setTemp(t => Math.max(t - 1, 0));
      }, 40);
      await new Promise(r => setTimeout(r, 1400));
      clearInterval(coolDown);

      setPhase("idle");
      await new Promise(r => setTimeout(r, 1200));
    };

    const loop = async () => {
      while (true) await sequence();
    };
    const t = setTimeout(loop, 600);
    return () => clearTimeout(t);
  }, []);

  const tempColor = temp > 80 ? "#ff6b5e" : temp > 60 ? "#e63329" : "#c8cdd6";

  return (
    <div
      className="relative rounded-3xl p-6 w-full max-w-[400px]"
      style={{
        background: "linear-gradient(135deg, rgba(13,21,32,0.95), rgba(5,10,20,0.98))",
        border: "1px solid rgba(230,51,41,0.2)",
        boxShadow: "0 0 60px rgba(230,51,41,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between mb-5 px-1">
        <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Panel de Control</span>
        <span
          className="flex items-center gap-1.5 text-xs font-semibold"
          style={{ color: phase === "idle" ? "#c8cdd6" : "#e63329" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: phase === "idle" ? "#c8cdd6" : "#e63329",
              boxShadow: phase === "idle" ? "0 0 6px #c8cdd6" : "0 0 6px #e63329",
              animation: "pulse 1.2s ease-in-out infinite",
            }}
          />
          {phase === "idle" ? "EN REPOSO" : phase === "revving" ? "ACELERANDO" : phase === "cruising" ? "EN MARCHA" : "FRENANDO"}
        </span>
      </div>

      {/* Main gauges row */}
      <div className="flex items-center justify-center gap-2">
        {/* Speed */}
        <div className="flex flex-col items-center">
          <Gauge value={speed} max={200} label="VELOCIDAD" unit="km/h" size={148} color="#c8cdd6" />
        </div>

        {/* RPM — center, slightly larger */}
        <div className="flex flex-col items-center -mt-2">
          <Gauge value={rpm} max={8000} label="RPM" unit="×1000" size={168} color="#e63329" />
        </div>

        {/* Temp */}
        <div className="flex flex-col items-center">
          <Gauge value={temp} max={120} label="TEMPERATURA" unit="°C" size={148} color={tempColor} />
        </div>
      </div>

      {/* Bottom info bar */}
      <div
        className="mt-4 rounded-2xl px-5 py-3 flex items-center justify-between"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="text-center">
          <p className="text-xs text-slate-600 uppercase tracking-wider">Combustible</p>
          <div className="flex gap-1 mt-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="w-4 h-1.5 rounded-full" style={{ background: i <= 4 ? "#e63329" : "rgba(255,255,255,0.08)" }} />
            ))}
          </div>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-600 uppercase tracking-wider">Batería</p>
          <p className="text-sm font-bold text-white mt-0.5">12.6V</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-600 uppercase tracking-wider">Diagnóstico</p>
          <p className="text-xs font-bold mt-0.5" style={{ color: "#c8cdd6" }}>OK ✓</p>
        </div>
      </div>
    </div>
  );
}

// Animated particles
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-red-500"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            opacity: 0.2,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Animated counter
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = target / 50;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span ref={ref} className="text-4xl font-black text-white">
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050a14 0%, #080f1e 50%, #0a0415 100%)" }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(230,51,41,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(230,51,41,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Radial glow center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(230,51,41,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Top glow streak */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #e63329, transparent)" }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <Particles />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 lg:px-20 lg:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
        >
          {/* LEFT - Text */}
          <div className="space-y-6 flex flex-col items-center text-center lg:items-start lg:text-left">
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase"
                style={{ background: "rgba(230,51,41,0.12)", border: "1px solid rgba(230,51,41,0.3)", color: "#e63329" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse inline-block" />
                Neuquén Capital
              </span>
            </motion.div>

            {/* Main title */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl lg:text-7xl font-black leading-none tracking-tight">
                <span className="block text-white">MECÁNICA</span>
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, #e63329, #ff6b5e, #e63329)",
                    backgroundSize: "200% auto",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    animation: "shimmer 3s linear infinite",
                  }}
                >
                  GIAVINO
                </span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0"
            >
              Mecánico de confianza.
              Diagnóstico computarizado, trabajo de precisión y honestidad garantizada.
            </motion.p>

            {/* Stars */}
            <motion.div variants={itemVariants} className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="#e63329" color="#e63329" />
                ))}
              </div>
              <span className="text-sm font-semibold text-white">5.0</span>
              <span className="text-sm text-slate-500">· 15 reseñas en Google</span>
            </motion.div>

            {/* CTAs */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 pt-2 justify-center lg:justify-start">
              <a
                href="https://wa.me/5492995906564?text=Hola%20Mecánica%20Giavino%2C%20quiero%20hacer%20una%20consulta"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm tracking-wide"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Pedir Turno
              </a>
              <a
                href="#servicios"
                className="btn-outline inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-white text-sm tracking-wide"
              >
                Ver Servicios
                <ChevronDown size={16} />
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              variants={itemVariants}
              className="flex gap-8 pt-4 border-t border-white/5 justify-center lg:justify-start"
            >
              <div>
                <Counter target={5} suffix="+" />
                <p className="text-xs text-slate-500 mt-1">años experiencia</p>
              </div>
              <div className="w-px bg-white/5" />
              <div>
                <Counter target={600} suffix="+" />
                <p className="text-xs text-slate-500 mt-1">clientes satisfechos</p>
              </div>
              <div className="w-px bg-white/5" />
              <div>
                <Counter target={5} suffix="★" />
                <p className="text-xs text-slate-500 mt-1">en Google</p>
              </div>
            </motion.div>
          </div>

          {/* RIGHT - Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="relative flex items-center justify-center pt-4 lg:pt-0"
          >
            {/* Outer ring glow - solo en desktop */}
            <motion.div
              className="absolute w-[420px] h-[420px] rounded-full hidden lg:block"
              style={{ border: "1px solid rgba(230,51,41,0.12)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute w-[340px] h-[340px] rounded-full hidden lg:block"
              style={{ border: "1px dashed rgba(230,51,41,0.06)" }}
              animate={{ rotate: -360 }}
              transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            />

            {/* Center glow blob - solo en desktop */}
            <div
              className="absolute w-96 h-80 rounded-full pointer-events-none hidden lg:block"
              style={{
                background: "radial-gradient(ellipse, rgba(230,51,41,0.1) 0%, transparent 70%)",
                filter: "blur(30px)",
              }}
            />

            {/* Dashboard escalado en mobile */}
            <div className="scale-[0.72] sm:scale-[0.88] lg:scale-100 origin-center">
              <Dashboard />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs text-slate-600 tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="text-slate-600" />
      </motion.div>
    </section>
  );
}
