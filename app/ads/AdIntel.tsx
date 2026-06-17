"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Facebook, Music2, Chrome, Clock, Layers, TrendingUp, Sparkles, Loader2 } from "lucide-react";

type Platform = "Meta" | "TikTok" | "Google";
type Ad = {
  brand: string; platform: Platform; days: number; variants: number;
  headline: string; copy: string; cta: string; angle: string;
  format: "Video" | "Image" | "Carousel"; hot?: boolean;
};
type Insights = { topAngles: { angle: string; weight: number }[]; topFormat: string; avgDays: number; scoutRead: string };

const PLATFORM_ICON: Record<string, typeof Facebook> = { Meta: Facebook, TikTok: Music2, Google: Chrome };
const FORMAT_COLOR: Record<string, string> = { Video: "text-cyan", Image: "text-amber", Carousel: "text-violet" };
const EXAMPLES = ["cold plunge tubs", "AI SaaS", "skincare DTC", "meal prep", "fitness app", "pet supplements"];

export function AdIntel() {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("");
  const [plat, setPlat] = useState<Platform | "All">("All");
  const [ads, setAds] = useState<Ad[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  async function run(q: string) {
    const term = q.trim();
    if (!term) return;
    setActive(term); setLoading(true); setErr(""); setPlat("All");
    try {
      const r = await fetch(`/api/ad-intel?q=${encodeURIComponent(term)}`);
      if (!r.ok) throw new Error("request failed");
      const d = await r.json();
      if (!Array.isArray(d.ads) || !d.ads.length) throw new Error("no results");
      setAds(d.ads); setInsights(d.insights ?? null);
    } catch {
      setErr("Couldn't pull ads for that. Try another term.");
    } finally {
      setLoading(false);
    }
  }
  // initial load
  useEffect(() => { run("AI SaaS"); /* eslint-disable-next-line */ }, []);

  const shown = ads.filter((a) => plat === "All" || a.platform === plat);
  const maxW = insights?.topAngles?.reduce((m, a) => Math.max(m, a.weight), 1) ?? 1;

  return (
    <div className="mt-12">
      {/* search */}
      <form
        onSubmit={(e) => { e.preventDefault(); run(query); inputRef.current?.blur(); }}
        className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-edge bg-surface/70 p-2 focus-within:border-edge-2"
      >
        <Search className="ml-2 size-4 shrink-0 text-quiet" />
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter any product, niche, or competitor, e.g. cold plunge tubs"
          className="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] text-bone outline-none placeholder:text-quiet"
        />
        <button type="submit" className="shrink-0 rounded-lg bg-signal px-4 py-2 text-sm font-medium text-void transition-transform hover:scale-[1.02]">
          Spy
        </button>
      </form>
      <div className="mx-auto mt-3 flex max-w-2xl flex-wrap items-center justify-center gap-1.5">
        <span className="font-mono text-[11px] text-quiet">try:</span>
        {EXAMPLES.map((ex) => (
          <button key={ex} onClick={() => { setQuery(ex); run(ex); }}
            className="rounded-full border border-edge px-2.5 py-1 font-mono text-[11px] text-mute transition-colors hover:border-edge-2 hover:text-bone">
            {ex}
          </button>
        ))}
      </div>

      {/* dashboard */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-edge bg-surface/60 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
        <div className="flex flex-wrap items-center gap-3 border-b border-edge bg-void/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" /><span className="size-2.5 rounded-full bg-[#febc2e]" /><span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="font-mono text-[12.5px] text-mute">
            {loading ? "scanning ad libraries…" : <>results for <span className="text-signal">{active || "…"}</span></>}
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {(["All", "Meta", "TikTok", "Google"] as const).map((p) => (
              <button key={p} onClick={() => setPlat(p)} disabled={loading}
                className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors disabled:opacity-40 ${plat === p ? "bg-signal text-void" : "border border-edge text-mute hover:text-bone"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px]">
          <div className="min-h-[320px] p-4">
            {loading ? (
              <div className="flex h-72 flex-col items-center justify-center gap-3 text-mute">
                <Loader2 className="size-6 animate-spin text-signal" />
                <span className="font-mono text-[12.5px]">pulling competitor ads for “{active}”…</span>
              </div>
            ) : err ? (
              <div className="flex h-72 items-center justify-center px-6 text-center text-[14px] text-mute">{err}</div>
            ) : (
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {shown.map((ad, i) => {
                  const PIcon = PLATFORM_ICON[ad.platform] ?? Facebook;
                  return (
                    <motion.div key={ad.brand + ad.headline + i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: i * 0.03 }}
                      className="group overflow-hidden rounded-xl border border-edge bg-void/50 transition-colors hover:border-edge-2">
                      <div className="flex items-center justify-between px-3.5 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="grid size-6 place-items-center rounded-md bg-surface-2 text-[11px] font-semibold text-bone">{ad.brand?.[0] ?? "?"}</span>
                          <span className="text-[13px] font-medium text-bone">{ad.brand}</span>
                        </div>
                        <PIcon className="size-3.5 text-quiet" />
                      </div>
                      <div className="relative mx-3.5 mb-2.5 flex h-24 items-center rounded-lg border border-edge bg-gradient-to-br from-surface-2 to-void px-3.5">
                        <div className="absolute inset-0 grid-bg opacity-30" />
                        <p className="relative text-[14px] font-medium leading-snug text-bone text-balance">{ad.headline}</p>
                        {ad.hot && <span className="absolute right-2 top-2 rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-signal">scaling</span>}
                      </div>
                      <p className="px-3.5 text-[12.5px] leading-relaxed text-ash">{ad.copy}</p>
                      <div className="flex flex-wrap items-center gap-2 px-3.5 py-3">
                        <span className="rounded-md bg-signal/10 px-2 py-0.5 font-mono text-[10px] text-signal">▸ {ad.angle}</span>
                        <span className={`font-mono text-[10px] ${FORMAT_COLOR[ad.format] ?? "text-mute"}`}>{ad.format}</span>
                        <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-quiet"><Clock className="size-3" />{ad.days}d</span>
                        <span className="flex items-center gap-1 font-mono text-[10px] text-quiet"><Layers className="size-3" />{ad.variants}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>

          {/* insights */}
          <aside className="border-t border-edge p-4 lg:border-l lg:border-t-0">
            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal"><Sparkles className="size-3.5" /> AI insights</div>
            {loading || !insights ? (
              <div className="font-mono text-[12px] text-quiet">{loading ? "synthesizing…" : "…"}</div>
            ) : (
              <>
                <div className="mb-2 text-[12px] text-mute">Top winning angles</div>
                <div className="flex flex-col gap-2.5">
                  {insights.topAngles?.slice(0, 4).map((a) => (
                    <div key={a.angle}>
                      <div className="mb-1 flex justify-between text-[12px]"><span className="text-ash">{a.angle}</span><span className="font-mono text-quiet">{a.weight}</span></div>
                      <div className="h-1.5 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-gradient-to-r from-signal-glow to-signal" style={{ width: `${(a.weight / maxW) * 100}%` }} /></div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2.5">
                  <div className="rounded-lg border border-edge bg-void/50 p-3">
                    <div className="flex items-center gap-1.5 text-cyan"><TrendingUp className="size-3.5" /></div>
                    <div className="mt-1 text-[15px] font-semibold text-bone">{insights.topFormat}</div>
                    <div className="font-mono text-[10px] text-quiet">winning format</div>
                  </div>
                  <div className="rounded-lg border border-edge bg-void/50 p-3">
                    <div className="text-[15px] font-semibold text-bone">{insights.avgDays}d</div>
                    <div className="font-mono text-[10px] text-quiet">avg. run time</div>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-signal/20 bg-signal/[0.06] p-3 text-[12px] leading-relaxed text-ash">
                  <span className="font-medium text-bone">Scout's read:</span> {insights.scoutRead}
                </div>
              </>
            )}
          </aside>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-quiet">AI-synthesized competitor examples · live Meta / TikTok / Google ad-library pulls at launch</p>
    </div>
  );
}
