"use client";

import { motion } from "framer-motion";

const TOOLS = [
  "Slack", "Notion", "Figma", "HubSpot", "Salesforce", "Shopify",
  "Meta Ads", "Google Ads", "LinkedIn", "X / Twitter", "TikTok", "YouTube",
  "Mailchimp", "Klaviyo", "Webflow", "Vercel", "Stripe", "Posthog",
  "Mixpanel", "Amplitude", "Segment", "Zapier", "Make", "Linear",
];

export function LogoMarquee() {
  return (
    <section className="relative border-y border-edge/60 bg-void/60 py-10">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-quiet"
        >
          Native to the marketing stack you already run
        </motion.p>
        <div className="relative mask-fade-edges">
          <div className="flex w-max gap-12 animate-marquee whitespace-nowrap py-2 will-change-transform">
            {[...TOOLS, ...TOOLS].map((t, i) => (
              <span
                key={`${t}-${i}`}
                className="font-mono text-sm text-mute transition-colors hover:text-bone"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
