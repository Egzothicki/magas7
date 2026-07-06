"use client";

import { useEffect, useRef } from "react";

/**
 * Cinematic hero backdrop: a living neural network of agent nodes.
 * Pure canvas, no deps. Mouse-reactive, brand-colored, respects reduced motion.
 */
export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const COLORS = ["#b1ff5a", "#9d6cff", "#6cf0ff"];
    let W = 0, H = 0, raf = 0, dpr = Math.min(2, window.devicePixelRatio || 1);
    const mouse = { x: -9999, y: -9999 };

    type Node = { x: number; y: number; vx: number; vy: number; r: number; c: string; hub: boolean };
    let nodes: Node[] = [];

    const build = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width; H = rect.height;
      canvas.width = Math.floor(W * dpr);
      canvas.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(64, Math.floor((W * H) / 22000));
      nodes = Array.from({ length: count }, (_, i) => {
        const hub = i < 7; // the seven agents
        return {
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: hub ? 2.6 + Math.random() * 1.4 : 1 + Math.random() * 1.2,
          c: hub ? COLORS[i % COLORS.length] : "#ffffff",
          hub,
        };
      });
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const R = 150;
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        // gentle pull toward cursor
        const dmx = mouse.x - n.x, dmy = mouse.y - n.y;
        const dm = Math.hypot(dmx, dmy);
        if (dm < 200) { n.x += (dmx / dm) * 0.25; n.y += (dmy / dm) * 0.25; }
      }
      // links
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < R) {
            const o = (1 - d / R) * (a.hub || b.hub ? 0.5 : 0.28);
            ctx.strokeStyle = a.hub ? hexA(a.c, o) : b.hub ? hexA(b.c, o) : `rgba(180,190,210,${o})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        const near = Math.hypot(n.x - mouse.x, n.y - mouse.y) < R;
        if (n.hub) {
          ctx.shadowColor = n.c; ctx.shadowBlur = near ? 18 : 10;
          ctx.fillStyle = n.c;
        } else {
          ctx.shadowBlur = 0;
          ctx.fillStyle = `rgba(255,255,255,${near ? 0.9 : 0.45})`;
        }
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      }
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(tick);
    };

    build();
    tick();
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ maskImage: "radial-gradient(120% 75% at 50% 35%, #000 25%, transparent 78%)", WebkitMaskImage: "radial-gradient(120% 75% at 50% 35%, #000 25%, transparent 78%)" }}
    />
  );
}

function hexA(hex: string, a: number): string {
  const h = hex.replace("#", "");
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}
