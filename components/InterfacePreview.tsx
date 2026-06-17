"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import {
  Sparkles, Layers, GitBranch, MessageSquare,
  PlayCircle, FileText, Image as ImageIcon,
  BarChart3, Send, ShieldCheck,
} from "lucide-react";

export function InterfacePreview() {
  return (
    <Section id="interface" eyebrow="The interface" title={<>One command surface. <span className="gradient-text-brand">Seven specialists.</span></>}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto mt-14 max-w-6xl"
      >
        {/* Glow halo */}
        <div className="pointer-events-none absolute -inset-x-10 -inset-y-12 -z-10 rounded-[40px] bg-gradient-to-br from-violet/15 via-signal/5 to-cyan/15 blur-3xl" />

        <div className="overflow-hidden rounded-2xl border border-edge bg-surface/80 shadow-2xl backdrop-blur-xl">
          {/* Chrome */}
          <div className="flex items-center justify-between border-b border-edge bg-surface-2/80 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="size-3 rounded-full bg-[#ff5f57]" />
              <span className="size-3 rounded-full bg-[#febc2e]" />
              <span className="size-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="font-mono text-[11px] text-mute">magas7 · workspace · acme-marketing</div>
            <div className="w-12" />
          </div>

          {/* App grid */}
          <div className="grid min-h-[520px] grid-cols-12">
            {/* Sidebar */}
            <aside className="col-span-3 hidden border-r border-edge p-3 lg:block">
              <div className="mb-3 px-2 text-[10px] font-semibold uppercase tracking-widest text-quiet">Workspaces</div>
              <SidebarItem icon={<Layers className="size-3.5" />} active>acme-marketing</SidebarItem>
              <SidebarItem icon={<Layers className="size-3.5" />}>acme-product</SidebarItem>

              <div className="mt-5 mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-quiet">Threads</div>
              <SidebarItem icon={<MessageSquare className="size-3.5" />} active>summer-pricing A/B</SidebarItem>
              <SidebarItem icon={<MessageSquare className="size-3.5" />}>q3 launch · narrative</SidebarItem>
              <SidebarItem icon={<MessageSquare className="size-3.5" />}>weekly newsletter</SidebarItem>
              <SidebarItem icon={<GitBranch className="size-3.5" />}>brand voice rev. 4</SidebarItem>

              <div className="mt-5 mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-quiet">Agents</div>
              {[
                ["Scout", "text-cyan"],
                ["Scribe", "text-signal"],
                ["Studio", "text-violet"],
                ["Director", "text-amber"],
                ["Conductor", "text-cyan"],
                ["Oracle", "text-signal"],
                ["Sentinel", "text-violet"],
              ].map(([name, color]) => (
                <div key={name} className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs text-ash hover:bg-surface-2">
                  <span className={`size-1.5 rounded-full bg-current ${color}`} />
                  {name}
                </div>
              ))}
            </aside>

            {/* Main thread */}
            <div className="col-span-12 border-r border-edge lg:col-span-6">
              <div className="border-b border-edge px-5 py-3">
                <div className="flex items-center gap-2 text-xs text-mute">
                  <Sparkles className="size-3.5 text-signal" /> Thread · summer-pricing A/B · 7 agents active
                </div>
              </div>
              <div className="space-y-4 p-5">
                <Bubble role="you">
                  Run a 6-day pricing test. Two hypotheses, $4.2k budget, 5 channels.
                </Bubble>
                <Bubble role="director">
                  Plan locked. <span className="text-signal">Hypothesis A</span> = anchor on annual savings. <span className="text-violet">Hypothesis B</span> = single-bullet ROI claim. Channel mix attached.
                </Bubble>
                <Bubble role="scribe">
                  3 ad variants per hypothesis, 2 landing-page drafts, 6 subject lines. Tone matches brand-voice.v4.
                </Bubble>
                <Bubble role="studio">
                  9 visuals · 4 Figma frames · all brand-token approved. <span className="underline decoration-violet underline-offset-2">View assets ↗</span>
                </Bubble>
                <Bubble role="sentinel">
                  QA pass. 1 claim flagged on LP-B. Substantiation needed before launch.
                </Bubble>
              </div>
              <div className="border-t border-edge px-5 py-3">
                <div className="flex items-center gap-2 rounded-xl border border-edge bg-void/70 px-3 py-2">
                  <span className="text-signal">›</span>
                  <span className="flex-1 text-sm text-mute">Type a goal or paste a brief…</span>
                  <Send className="size-3.5 text-mute" />
                </div>
              </div>
            </div>

            {/* Right rail */}
            <aside className="col-span-12 border-t border-edge p-4 lg:col-span-3 lg:border-l lg:border-t-0">
              <div className="mb-3 text-[10px] font-semibold uppercase tracking-widest text-quiet">Live workspace</div>
              <Card icon={<FileText className="size-3.5" />} title="ad-variant-a.md" meta="Scribe · 2m ago" />
              <Card icon={<ImageIcon className="size-3.5" />} title="hero-frame.png" meta="Studio · 4m ago" />
              <Card icon={<FileText className="size-3.5" />} title="landing-page-b.tsx" meta="Scribe · 5m ago" />
              <Card icon={<BarChart3 className="size-3.5" />} title="dashboard / cpa-watch" meta="Oracle · live" badge="●" />
              <Card icon={<PlayCircle className="size-3.5" />} title="Push to live" meta="Conductor · ready" cta />
              <Card icon={<ShieldCheck className="size-3.5" />} title="QA passed (1 flag)" meta="Sentinel · 30s ago" warn />
            </aside>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}

function SidebarItem({ icon, children, active }: { icon: React.ReactNode; children: React.ReactNode; active?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs ${
        active ? "bg-surface-2 text-bone" : "text-ash hover:bg-surface-2/60"
      }`}
    >
      <span className="text-mute">{icon}</span>
      <span className="truncate">{children}</span>
    </div>
  );
}

function Bubble({ role, children }: { role: "you" | "director" | "scribe" | "studio" | "sentinel"; children: React.ReactNode }) {
  const label = role === "you" ? "You" : role[0].toUpperCase() + role.slice(1);
  const tone =
    role === "you"
      ? "border-edge bg-surface-2"
      : role === "director"
      ? "border-amber/30 bg-amber/5"
      : role === "scribe"
      ? "border-signal/25 bg-signal/5"
      : role === "studio"
      ? "border-violet/30 bg-violet/5"
      : "border-violet/25 bg-violet/5";

  const labelColor =
    role === "you"
      ? "text-ash"
      : role === "director"
      ? "text-amber"
      : role === "scribe"
      ? "text-signal"
      : "text-violet";

  return (
    <div className={`rounded-xl border p-3 text-sm text-bone ${tone}`}>
      <div className={`mb-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${labelColor}`}>
        {label}
      </div>
      <div className="text-ash">{children}</div>
    </div>
  );
}

function Card({ icon, title, meta, badge, cta, warn }: { icon: React.ReactNode; title: string; meta: string; badge?: string; cta?: boolean; warn?: boolean }) {
  return (
    <div
      className={`mb-2 flex items-center justify-between rounded-lg border px-2.5 py-2 transition-colors hover:bg-surface-2 ${
        cta
          ? "border-signal/40 bg-signal/5 hover:bg-signal/10"
          : warn
          ? "border-amber/30 bg-amber/5"
          : "border-edge bg-void/40"
      }`}
    >
      <div className="flex min-w-0 items-center gap-2">
        <span className={cta ? "text-signal" : warn ? "text-amber" : "text-mute"}>{icon}</span>
        <div className="min-w-0">
          <div className="truncate text-xs text-bone">{title}</div>
          <div className="truncate text-[10px] text-quiet">{meta}</div>
        </div>
      </div>
      {badge && <span className={`text-[10px] ${cta ? "text-signal" : "text-cyan animate-pulse-glow"}`}>{badge}</span>}
    </div>
  );
}
