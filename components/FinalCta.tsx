"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Section } from "./Section";

const APP_URL = "https://app.magas7.com/login";

export function FinalCta() {
  return (
    <Section id="waitlist" className="!pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-edge bg-gradient-to-br from-surface via-surface-2 to-void p-10 sm:p-14"
      >
        {/* Background glows */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-violet/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 size-72 rounded-full bg-signal/15 blur-3xl" />
        <div className="absolute inset-0 -z-10 grid-bg opacity-20 mask-fade-bottom" />

        <div className="relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-void/60 px-3 py-1 text-xs text-ash">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Now live · early-access pricing
          </span>

          <h2 className="mt-6 text-balance text-4xl font-medium tracking-tight text-bone sm:text-5xl lg:text-6xl">
            Stop doing the work. <br />
            <span className="gradient-text-brand">Start directing it.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-ash">
            Spin up your agents in minutes. Connect your brand, give the Director a goal, and approve
            what ships. Free to start — upgrade when you&apos;re ready.
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={APP_URL}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-base font-medium text-void transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Start free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={APP_URL}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-edge bg-surface-2/80 px-6 py-3 text-base font-medium text-bone backdrop-blur hover:border-edge-2 sm:w-auto"
            >
              <Sparkles className="size-4 text-signal" />
              Sign in
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
