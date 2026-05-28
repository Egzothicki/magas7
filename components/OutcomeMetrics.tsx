"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Section } from "./Section";

const METRICS = [
  { label: "Campaigns per week, per operator", from: 1.8, to: 12, suffix: "×" },
  { label: "Days from brief → live", from: 14, to: 2, suffix: " days" },
  { label: "Variants tested per launch", from: 3, to: 27, suffix: "" },
  { label: "Hours of manual work removed", from: 0, to: 36, suffix: " /wk" },
];

function CountUp({ from, to, suffix }: { from: number; to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [v, setV] = useState(from);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1400;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setV(from + (to - from) * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, from, to]);

  const isInt = Number.isInteger(to);
  return (
    <span ref={ref}>
      {isInt ? Math.round(v) : v.toFixed(1)}
      {suffix}
    </span>
  );
}

export function OutcomeMetrics() {
  return (
    <Section
      eyebrow="The outcome"
      title={<>What changes when <span className="gradient-text-brand">agents do the work.</span></>}
      subtitle="Modeled on early MAGAS7 alpha workloads against control teams of comparable size. Results vary — you're not buying a chart, you're buying compounding."
    >
      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {METRICS.map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="rounded-2xl border border-edge bg-surface/60 p-6 backdrop-blur-sm"
          >
            <div className="font-mono text-[42px] font-semibold leading-none tracking-tight gradient-text-brand">
              <CountUp from={m.from} to={m.to} suffix={m.suffix} />
            </div>
            <p className="mt-3 text-sm text-ash">{m.label}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
