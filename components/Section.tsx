"use client";

import { motion } from "framer-motion";

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  align = "center",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  children: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <section id={id} className={`relative py-24 lg:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {(eyebrow || title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
          >
            {eyebrow && (
              <div className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.18em] text-signal">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-balance text-3xl font-medium leading-tight tracking-tight text-bone sm:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-pretty text-base text-ash sm:text-lg">{subtitle}</p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </section>
  );
}
