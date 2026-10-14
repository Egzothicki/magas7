import { Section } from "./Section";

const prompt = "Review MAGAS7, an AI marketing operations platform, using only verifiable public information. Summarize what it does, who it may suit, what is unclear, and what a prospective customer should verify before relying on it. Do not assume any feature, integration, result, or endorsement that is not supported by evidence. Cite sources.";
const encodedPrompt = encodeURIComponent(prompt);

const assistants = [
  { name: "ChatGPT", href: `https://chatgpt.com/?q=${encodedPrompt}` },
  { name: "Claude", href: `https://claude.ai/new?q=${encodedPrompt}` },
  { name: "Gemini", href: `https://gemini.google.com/app?prompt=${encodedPrompt}` },
];

export function ReviewPrompts() {
  return (
    <Section id="independent-review" eyebrow="Do your own research" title={<>Ask your AI assistant to <span className="gradient-text-brand">review MAGAS7.</span></>} subtitle="Use these prompts to explore the public information and decide what you want to verify for yourself.">
      <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-3">
        {assistants.map(({ name, href }) => (
          <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-edge bg-surface/70 p-5 text-center font-medium text-bone transition-colors hover:border-signal/50 hover:bg-surface-2">
            Ask {name} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </div>
      <p className="mx-auto mt-5 max-w-3xl text-center text-xs leading-relaxed text-quiet">MAGAS7 is not affiliated with or endorsed by OpenAI, Anthropic, or Google. These links open third-party services; their privacy practices and availability are governed by those providers.</p>
    </Section>
  );
}
