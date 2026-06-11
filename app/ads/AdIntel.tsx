"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Facebook, Music2, Chrome, Clock, Layers, TrendingUp, Sparkles } from "lucide-react";

type Platform = "Meta" | "TikTok" | "Google";
type Ad = {
  brand: string;
  platform: Platform;
  days: number;
  variants: number;
  headline: string;
  copy: string;
  cta: string;
  angle: string;
  format: "Video" | "Image" | "Carousel";
  hot?: boolean;
};

const NICHES: Record<string, Ad[]> = {
  "Skincare DTC": [
    { brand: "Lumora", platform: "Meta", days: 94, variants: 18, headline: "Your serum is lying to you.", copy: "We ran 4,000 skin scans. Here's what actually moves the needle →", cta: "Take the quiz", angle: "Problem-Aware", format: "Video", hot: true },
    { brand: "Dewpoint", platform: "TikTok", days: 61, variants: 22, headline: "POV: you finally read the ingredient list", copy: "3 ingredients doing nothing. 1 doing everything.", cta: "Shop the 1", angle: "Education", format: "Video" },
    { brand: "Naked Atlas", platform: "Meta", days: 47, variants: 9, headline: "Sold out 3x. Back for 48 hours.", copy: "The cult moisturizer with a 19,000-person waitlist.", cta: "Get yours", angle: "Scarcity", format: "Carousel", hot: true },
    { brand: "Vera", platform: "Google", days: 120, variants: 6, headline: "Dermatologist-grade. Drugstore price.", copy: "Clinically tested retinol without the $90 markup.", cta: "Compare", angle: "Value", format: "Image" },
    { brand: "Dewpoint", platform: "Meta", days: 33, variants: 14, headline: "She tried it for 30 days. Look.", copy: "Real before/after from a real customer (not a model).", cta: "See results", angle: "Social Proof", format: "Image" },
    { brand: "Lumora", platform: "TikTok", days: 12, variants: 27, headline: "Estheticians are quietly switching", copy: "The unboxing that's been stitched 4,000+ times.", cta: "Watch why", angle: "Authority", format: "Video", hot: true },
  ],
  "AI SaaS": [
    { brand: "Flowstate", platform: "Meta", days: 76, variants: 11, headline: "Your team ships 3x slower than they think.", copy: "We measured 200 eng teams. The bottleneck isn't code.", cta: "See the data", angle: "Problem-Aware", format: "Video", hot: true },
    { brand: "Cortex", platform: "Google", days: 140, variants: 5, headline: "The AI copilot that actually reads your codebase.", copy: "Not autocomplete. A teammate.", cta: "Try free", angle: "Differentiation", format: "Image" },
    { brand: "Relay", platform: "Meta", days: 28, variants: 16, headline: "Cancel 4 tools. Keep one.", copy: "The all-in-one that replaced our entire stack.", cta: "Switch now", angle: "Consolidation", format: "Carousel" },
    { brand: "Flowstate", platform: "TikTok", days: 9, variants: 19, headline: "I automated my whole job in a weekend", copy: "Founder builds in public — 0 to 1k users.", cta: "Watch the build", angle: "Founder Story", format: "Video", hot: true },
    { brand: "Cortex", platform: "Meta", days: 52, variants: 8, headline: "10,000 devs can't be wrong.", copy: "The tool every senior engineer is quietly using.", cta: "Join them", angle: "Social Proof", format: "Image" },
    { brand: "Relay", platform: "Google", days: 88, variants: 4, headline: "From signup to shipped in 6 minutes.", copy: "No onboarding call. No demo gate.", cta: "Start free", angle: "Friction-Free", format: "Image" },
  ],
  "Fitness App": [
    { brand: "Forge", platform: "TikTok", days: 41, variants: 31, headline: "75 hard? No. 21 smart.", copy: "The program that doesn't require hating your life.", cta: "Start day 1", angle: "Anti-Hype", format: "Video", hot: true },
    { brand: "Pulse", platform: "Meta", days: 110, variants: 13, headline: "Your smartwatch is guessing.", copy: "Real recovery scoring, not vibes.", cta: "Get accurate", angle: "Problem-Aware", format: "Image" },
    { brand: "Forge", platform: "Meta", days: 24, variants: 17, headline: "She lost the 'last 10' without a gym.", copy: "Home workouts that actually progress.", cta: "See plan", angle: "Transformation", format: "Carousel", hot: true },
    { brand: "Pulse", platform: "Google", days: 67, variants: 6, headline: "The app trainers tell clients to use.", copy: "Coach-approved. Athlete-tested.", cta: "Try 14 days", angle: "Authority", format: "Image" },
    { brand: "Lift Lab", platform: "TikTok", days: 15, variants: 24, headline: "Stop counting calories. Do this.", copy: "The 1 habit that beat tracking for 9/10 testers.", cta: "Learn it", angle: "Contrarian", format: "Video" },
    { brand: "Lift Lab", platform: "Meta", days: 58, variants: 10, headline: "Cancel your gym. Keep your gains.", copy: "$9/mo vs $60/mo — same results.", cta: "Compare", angle: "Value", format: "Image" },
  ],
};

const PLATFORM_ICON: Record<Platform, typeof Facebook> = { Meta: Facebook, TikTok: Music2, Google: Chrome };
const FORMAT_COLOR: Record<string, string> = { Video: "text-cyan", Image: "text-amber", Carousel: "text-violet" };

export function AdIntel() {
  const niches = Object.keys(NICHES);
  const [niche, setNiche] = useState(niches[0]);
  const [plat, setPlat] = useState<Platform | "All">("All");
  const ads = NICHES[niche].filter((a) => plat === "All" || a.platform === plat);

  // synthesized "insights"
  const all = NICHES[niche];
  const angleCounts = all.reduce<Record<string, number>>((m, a) => ((m[a.angle] = (m[a.angle] || 0) + a.variants), m), {});
  const topAngles = Object.entries(angleCounts).sort((a, b) => b[1] - a[1]).slice(0, 4);
  const maxAngle = topAngles[0]?.[1] || 1;
  const fmtCounts = all.reduce<Record<string, number>>((m, a) => ((m[a.format] = (m[a.format] || 0) + 1), m), {});
  const topFormat = Object.entries(fmtCounts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Video";
  const avgDays = Math.round(all.reduce((s, a) => s + a.days, 0) / all.length);

  return (
    <div className="mt-14">
      {/* app chrome */}
      <div className="overflow-hidden rounded-2xl border border-edge bg-surface/60 shadow-[0_40px_120px_-60px_rgba(0,0,0,0.9)]">
        {/* toolbar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-edge bg-void/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <div className="flex min-w-[180px] flex-1 items-center gap-2 rounded-lg border border-edge bg-surface px-3 py-1.5">
            <Search className="size-3.5 text-quiet" />
            <span className="font-mono text-[12.5px] text-mute">{niche.toLowerCase()} · competitor ads</span>
          </div>
          <div className="flex items-center gap-1.5">
            {(["All", "Meta", "TikTok", "Google"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPlat(p)}
                className={`rounded-full px-3 py-1 font-mono text-[11px] transition-colors ${
                  plat === p ? "bg-signal text-void" : "border border-edge text-mute hover:text-bone"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* niche tabs */}
        <div className="flex flex-wrap gap-1.5 border-b border-edge px-4 py-2.5">
          {niches.map((n) => (
            <button
              key={n}
              onClick={() => { setNiche(n); setPlat("All"); }}
              className={`rounded-lg px-3 py-1.5 text-[12.5px] transition-colors ${
                niche === n ? "bg-surface-2 text-bone" : "text-mute hover:text-bone"
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1fr_300px]">
          {/* ad grid */}
          <div className="grid grid-cols-1 gap-3 p-4 sm:grid-cols-2">
            {ads.map((ad, i) => {
              const PIcon = PLATFORM_ICON[ad.platform];
              return (
                <motion.div
                  key={ad.brand + ad.headline}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className="group overflow-hidden rounded-xl border border-edge bg-void/50 transition-colors hover:border-edge-2"
                >
                  <div className="flex items-center justify-between px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="grid size-6 place-items-center rounded-md bg-surface-2 text-[11px] font-semibold text-bone">{ad.brand[0]}</span>
                      <span className="text-[13px] font-medium text-bone">{ad.brand}</span>
                    </div>
                    <PIcon className="size-3.5 text-quiet" />
                  </div>
                  {/* "creative" */}
                  <div className="relative mx-3.5 mb-2.5 flex h-24 items-center rounded-lg border border-edge bg-gradient-to-br from-surface-2 to-void px-3.5">
                    <div className="absolute inset-0 grid-bg opacity-30" />
                    <p className="relative text-[14px] font-medium leading-snug text-bone text-balance">{ad.headline}</p>
                    {ad.hot && (
                      <span className="absolute right-2 top-2 rounded-full bg-signal/15 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wide text-signal">scaling</span>
                    )}
                  </div>
                  <p className="px-3.5 text-[12.5px] leading-relaxed text-ash">{ad.copy}</p>
                  <div className="flex flex-wrap items-center gap-2 px-3.5 py-3">
                    <span className="rounded-md bg-signal/10 px-2 py-0.5 font-mono text-[10px] text-signal">▸ {ad.angle}</span>
                    <span className={`font-mono text-[10px] ${FORMAT_COLOR[ad.format]}`}>{ad.format}</span>
                    <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-quiet"><Clock className="size-3" />{ad.days}d</span>
                    <span className="flex items-center gap-1 font-mono text-[10px] text-quiet"><Layers className="size-3" />{ad.variants}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* insights panel */}
          <aside className="border-t border-edge p-4 lg:border-l lg:border-t-0">
            <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-signal">
              <Sparkles className="size-3.5" /> AI insights
            </div>
            <div className="mb-2 text-[12px] text-mute">Top winning angles</div>
            <div className="flex flex-col gap-2.5">
              {topAngles.map(([angle, count]) => (
                <div key={angle}>
                  <div className="mb-1 flex justify-between text-[12px]">
                    <span className="text-ash">{angle}</span>
                    <span className="font-mono text-quiet">{count}</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full rounded-full bg-gradient-to-r from-signal-glow to-signal" style={{ width: `${(count / maxAngle) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <div className="rounded-lg border border-edge bg-void/50 p-3">
                <div className="flex items-center gap-1.5 text-cyan"><TrendingUp className="size-3.5" /></div>
                <div className="mt-1 text-[15px] font-semibold text-bone">{topFormat}</div>
                <div className="font-mono text-[10px] text-quiet">winning format</div>
              </div>
              <div className="rounded-lg border border-edge bg-void/50 p-3">
                <div className="text-[15px] font-semibold text-bone">{avgDays}d</div>
                <div className="font-mono text-[10px] text-quiet">avg. run time</div>
                <div className="mt-1 text-[10px] text-mute">longer = working</div>
              </div>
            </div>
            <div className="mt-4 rounded-lg border border-signal/20 bg-signal/[0.06] p-3 text-[12px] leading-relaxed text-ash">
              <span className="font-medium text-bone">Scout's read:</span> {topAngles[0]?.[0]} is dominating this niche on {topFormat.toLowerCase()}. The longest-running ads lean {avgDays > 60 ? "problem-aware" : "social-proof"}. Want a variant brief?
            </div>
          </aside>
        </div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-quiet">Sample data shown · live Meta / TikTok / Google ad-library pulls at launch</p>
    </div>
  );
}
