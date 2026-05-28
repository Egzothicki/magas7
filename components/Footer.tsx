import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="relative border-t border-edge/80 bg-void/80">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-14 sm:grid-cols-4 lg:px-8">
        <div className="col-span-2 sm:col-span-1">
          <Logo className="text-base" />
          <p className="mt-4 max-w-xs text-sm text-mute">
            Marketing Agents. The agentic OS for marketing teams.
          </p>
          <p className="mt-3 text-xs text-quiet">© {new Date().getFullYear()} MAGAS7. All rights reserved.</p>
        </div>

        <FooterCol
          title="Product"
          links={[
            { href: "#agents", label: "The 7 agents" },
            { href: "#tools", label: "Toolset" },
            { href: "#how", label: "How it works" },
            { href: "#pricing", label: "Pricing" },
            { href: "#download", label: "Download (soon)" },
          ]}
        />

        <FooterCol
          title="Company"
          links={[
            { href: "#vision", label: "Vision" },
            { href: "#waitlist", label: "Waitlist" },
            { href: "#faq", label: "FAQ" },
            { href: "mailto:hello@magas7.com", label: "Contact" },
          ]}
        />

        <FooterCol
          title="Legal"
          links={[
            { href: "#privacy", label: "Privacy" },
            { href: "#terms", label: "Terms" },
            { href: "#security", label: "Security" },
          ]}
        />
      </div>

      <div className="border-t border-edge/60 py-5 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-quiet">
        Built by humans · directed via agents
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-quiet">{title}</div>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className="text-sm text-ash transition-colors hover:text-bone">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
