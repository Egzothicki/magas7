"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";

const NAV = [
  { href: "#agents", label: "Agents" },
  { href: "#tools", label: "Tools" },
  { href: "#how", label: "How it works" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-edge/80 bg-void/70 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#" className="flex items-center" aria-label="MAGAS7 home">
          <Logo className="text-base" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-ash transition-colors hover:bg-surface-2 hover:text-bone"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#waitlist"
            className="rounded-full border border-edge px-3.5 py-1.5 text-sm text-ash transition-colors hover:border-edge-2 hover:bg-surface-2 hover:text-bone"
          >
            Get waitlist
          </a>
          <a
            href="#download"
            className="group relative inline-flex items-center gap-2 rounded-full bg-signal px-4 py-1.5 text-sm font-medium text-void transition-transform hover:scale-[1.02]"
          >
            <span>Download</span>
            <span className="rounded-full bg-void/15 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-void/80">
              Soon
            </span>
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ash hover:text-bone md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-edge bg-void/90 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm text-ash hover:bg-surface-2 hover:text-bone"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#download"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-signal px-4 py-2 text-sm font-medium text-void"
              >
                Download
                <span className="text-[10px] font-semibold uppercase tracking-wider opacity-70">Soon</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
