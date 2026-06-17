"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Circle, CheckCircle2, Loader2 } from "lucide-react";

/**
 * Animated terminal that types out a marketing brief, then shows agents
 * spinning up and reporting back. Loops forever.
 */

type Step =
  | { kind: "user"; text: string }
  | { kind: "thinking"; text: string }
  | { kind: "agent"; agent: AgentName; text: string }
  | { kind: "done"; text: string };

type AgentName =
  | "Scout"
  | "Scribe"
  | "Studio"
  | "Director"
  | "Conductor"
  | "Oracle"
  | "Sentinel";

const AGENT_COLOR: Record<AgentName, string> = {
  Scout: "text-cyan",
  Scribe: "text-signal",
  Studio: "text-violet",
  Director: "text-amber",
  Conductor: "text-cyan",
  Oracle: "text-signal",
  Sentinel: "text-violet",
};

const SCRIPT: Step[] = [
  { kind: "user", text: "launch campaign \"summer-pricing-A/B\" : get me 3 ad variants, 2 LP drafts, paid + organic plan, ship by Friday" },
  { kind: "thinking", text: "MAGAS7 routing brief to 7 agents …" },
  { kind: "agent", agent: "Director", text: "plan locked: 6 day window · 2 hypotheses · $4.2k test budget · channels [Meta · LinkedIn · Reddit · X · Newsletter]" },
  { kind: "agent", agent: "Scout", text: "pulled 47 competitor ads · 12 SOV reports · audience: 4 segments scored by ICP-fit" },
  { kind: "agent", agent: "Scribe", text: "3 ad variants drafted (long / short / contrarian) · 2 LP copies · 6 subject lines · tone aligned to brand voice file" },
  { kind: "agent", agent: "Studio", text: "9 visuals generated · 4 figma frames · brand tokens applied · variants exported in 5 ratios" },
  { kind: "agent", agent: "Conductor", text: "scheduled across 5 channels · UTM tagged · pixels live · approval link sent to #marketing" },
  { kind: "agent", agent: "Sentinel", text: "brand & legal QA passed · 1 claim flagged, see PR #41" },
  { kind: "agent", agent: "Oracle", text: "tracking dashboard built · winner-detection threshold set @ 0.12 CPA delta · alerts wired to Slack" },
  { kind: "done", text: "campaign ready. push to live? [Y/n]" },
];

const TYPE_SPEED = 18; // ms per char for user/thinking lines

function useTypewriter(text: string, speed: number, run: boolean) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (!run) {
      setShown(text);
      return;
    }
    setShown("");
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, run]);
  return shown;
}

export function TerminalAnimation() {
  const [stepIdx, setStepIdx] = useState(0);
  const [loopKey, setLoopKey] = useState(0);

  const visibleSteps = useMemo(() => SCRIPT.slice(0, stepIdx + 1), [stepIdx]);
  const current = SCRIPT[stepIdx];

  useEffect(() => {
    let delay = 800;
    if (current?.kind === "user") delay = current.text.length * TYPE_SPEED + 700;
    else if (current?.kind === "thinking") delay = 950;
    else if (current?.kind === "agent") delay = 700;
    else if (current?.kind === "done") delay = 3000;

    const id = setTimeout(() => {
      if (stepIdx >= SCRIPT.length - 1) {
        // Reset
        setTimeout(() => {
          setStepIdx(0);
          setLoopKey((k) => k + 1);
        }, 600);
      } else {
        setStepIdx((i) => i + 1);
      }
    }, delay);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIdx, loopKey]);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-edge bg-surface/80 shadow-2xl backdrop-blur-xl">
      {/* Window chrome */}
      <div className="flex items-center justify-between border-b border-edge bg-surface-2/80 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <Circle className="size-3 fill-[#ff5f57] text-[#ff5f57]" />
          <Circle className="size-3 fill-[#febc2e] text-[#febc2e]" />
          <Circle className="size-3 fill-[#28c840] text-[#28c840]" />
        </div>
        <div className="flex items-center gap-2 text-[11px] font-mono text-mute">
          <span className="size-1.5 rounded-full bg-signal animate-pulse-glow" />
          magas7 · session #ad8a2 · 7 agents online
        </div>
        <div className="w-12" />
      </div>

      {/* Terminal body */}
      <div className="grid-bg-fine relative min-h-[440px] px-5 py-5 font-mono text-[13.5px] leading-relaxed sm:px-7 sm:py-6 sm:text-sm">
        {visibleSteps.map((step, i) => (
          <Line
            key={`${loopKey}-${i}`}
            step={step}
            isCurrent={i === visibleSteps.length - 1}
            isLast={i === SCRIPT.length - 1 && stepIdx === SCRIPT.length - 1}
          />
        ))}

        {/* Bottom prompt line */}
        <div className="mt-4 flex items-center gap-2 text-mute">
          <span className="text-signal">magas7 ›</span>
          <span className="inline-block h-4 w-[8px] -mb-0.5 bg-signal animate-caret" />
        </div>
      </div>
    </div>
  );
}

function Line({ step, isCurrent, isLast }: { step: Step; isCurrent: boolean; isLast: boolean }) {
  const shouldType =
    isCurrent && (step.kind === "user" || step.kind === "thinking" || step.kind === "done");
  const text = useTypewriter(step.text, TYPE_SPEED, shouldType);

  if (step.kind === "user") {
    return (
      <div className="mb-3 flex items-start gap-2">
        <span className="select-none text-signal">›</span>
        <p className="text-bone">
          {text}
          {shouldType && text.length < step.text.length && (
            <span className="ml-0.5 inline-block h-4 w-[7px] -mb-0.5 bg-bone animate-caret" />
          )}
        </p>
      </div>
    );
  }

  if (step.kind === "thinking") {
    return (
      <div className="mb-3 flex items-start gap-2 text-mute">
        <Loader2 className={`mt-0.5 size-4 ${isCurrent ? "animate-spin text-cyan" : "text-quiet"}`} />
        <span className="animate-shimmer rounded-sm px-1">{text}</span>
      </div>
    );
  }

  if (step.kind === "agent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-2.5 flex items-start gap-3"
      >
        <span className={`mt-0.5 inline-flex shrink-0 items-center gap-1 rounded-md border border-edge bg-void/60 px-2 py-0.5 text-[11px] font-medium ${AGENT_COLOR[step.agent]}`}>
          <span className="size-1.5 rounded-full bg-current" />
          {step.agent}
        </span>
        <span className="text-ash">{step.text}</span>
      </motion.div>
    );
  }

  // done
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: 0.1 }}
      className="mt-4 flex items-start gap-2 border-t border-edge pt-4"
    >
      <CheckCircle2 className="mt-0.5 size-4 text-signal" />
      <span className="text-bone">
        {text}
        {isLast && text.length === step.text.length && (
          <span className="ml-1 inline-block h-4 w-[7px] -mb-0.5 bg-signal animate-caret" />
        )}
      </span>
    </motion.div>
  );
}
