"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { TerminalAnimation } from "./TerminalAnimation";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 lg:pt-40 lg:pb-32">
      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg opacity-30 mask-fade-bottom" />
        <div className="absolute left-1/2 top-1/3 -z-10 h-[520px] w-[800px] -translate-x-1/2 rounded-full bg-violet/15 blur-[160px]" />
        <div className="absolute right-[8%] top-1/4 -z-10 h-[280px] w-[280px] rounded-full bg-signal/15 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-edge bg-surface-2/60 px-3 py-1 text-xs font-medium text-ash backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            Coming soon · join the early access list
          </span>

          <h1 className="mt-6 text-balance text-[44px] font-medium leading-[1.05] tracking-tight sm:text-6xl lg:text-[78px]">
            <span className="gradient-text-soft">The agentic OS</span>
            <br />
            <span className="gradient-text-brand">for marketing teams.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-pretty text-lg text-ash sm:text-xl">
            MAGAS<span className="text-signal">7</span> spins up{" "}
            <span className="text-bone">seven specialist agents</span> that research, write, design,
            schedule, post, analyze, and protect your brand. You give direction. They do the work.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="https://app.magas7.com/login"
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3 text-base font-medium text-void transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Start free
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://app.magas7.com/login"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-edge bg-surface-2/60 px-6 py-3 text-base font-medium text-bone backdrop-blur transition-colors hover:border-edge-2 hover:bg-surface-2 sm:w-auto"
            >
              <Sparkles className="size-4 text-signal" />
              Sign in
            </a>
          </motion.div>

          <p className="mt-5 text-sm text-quiet">
            macOS · Windows · Linux · runs locally, talks to your stack
          </p>
        </motion.div>

        {/* Terminal mock */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto mt-16 max-w-5xl lg:mt-20"
        >
          <div className="absolute -inset-x-12 -top-12 -z-10 h-full rounded-full bg-violet/10 blur-3xl" />
          <TerminalAnimation />
        </motion.div>
      </div>
    </section>
  );
}
