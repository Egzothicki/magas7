"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowRight, Mail, Loader2, CheckCircle2 } from "lucide-react";
import { Section } from "./Section";

export function FinalCta() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("sending");
    // Placeholder — wire to real waitlist endpoint when API is ready.
    try {
      await new Promise((r) => setTimeout(r, 700));
      setState("done");
    } catch {
      setState("error");
    }
  }

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
            Limited early-access cohort
          </span>

          <h2 className="mt-6 text-balance text-4xl font-medium tracking-tight text-bone sm:text-5xl lg:text-6xl">
            Stop doing the work. <br />
            <span className="gradient-text-brand">Start directing it.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-pretty text-ash">
            Get on the MAGAS7 waitlist. First invites go out before the public download. Early-access pricing locks in for life.
          </p>

          <form onSubmit={onSubmit} className="mx-auto mt-9 max-w-md">
            <div className="flex items-center gap-2 rounded-full border border-edge bg-void/80 p-1.5 pl-4 backdrop-blur transition-colors focus-within:border-signal">
              <Mail className="size-4 text-mute" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@team.com"
                disabled={state === "done"}
                className="flex-1 bg-transparent py-2 text-sm text-bone placeholder:text-quiet focus:outline-none"
              />
              <button
                type="submit"
                disabled={state === "sending" || state === "done"}
                className="inline-flex items-center gap-1.5 rounded-full bg-signal px-4 py-2 text-sm font-medium text-void transition-transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100"
              >
                {state === "sending" && <Loader2 className="size-3.5 animate-spin" />}
                {state === "done" && <CheckCircle2 className="size-3.5" />}
                {state === "idle" && <ArrowRight className="size-3.5" />}
                {state === "done" ? "You're in" : state === "sending" ? "Sending…" : "Join waitlist"}
              </button>
            </div>
            <p className="mt-3 text-xs text-quiet">
              No spam. One email when invites open.{" "}
              <a href="#privacy" className="underline-offset-2 hover:underline">Privacy</a>.
            </p>
          </form>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-edge bg-surface-2/80 px-5 py-2.5 text-sm font-medium text-bone backdrop-blur hover:border-edge-2"
            >
              <Download className="size-4 text-signal" />
              Download for macOS
              <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-signal">
                Soon
              </span>
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-edge bg-surface-2/80 px-5 py-2.5 text-sm font-medium text-bone backdrop-blur hover:border-edge-2"
            >
              <Download className="size-4 text-signal" />
              Download for Windows
              <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-signal">
                Soon
              </span>
            </a>
            <a
              href="#download"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-edge bg-surface-2/80 px-5 py-2.5 text-sm font-medium text-bone backdrop-blur hover:border-edge-2"
            >
              <Download className="size-4 text-signal" />
              Linux
              <span className="rounded-full bg-signal/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-signal">
                Soon
              </span>
            </a>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
