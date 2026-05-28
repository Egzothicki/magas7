export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[15px] tracking-tight ${className}`}>
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#b1ff5a" />
            <stop offset="0.55" stopColor="#6cf0ff" />
            <stop offset="1" stopColor="#9d6cff" />
          </linearGradient>
        </defs>
        <path
          d="M2 18 L2 4 L7.5 4 L11 11 L14.5 4 L20 4 L20 18 L16.5 18 L16.5 9.5 L13 16.5 L9 16.5 L5.5 9.5 L5.5 18 Z"
          fill="url(#logoGrad)"
        />
        <circle cx="20" cy="18" r="2" fill="#b1ff5a" className="animate-pulse-glow" />
      </svg>
      <span className="font-semibold tracking-tight">
        <span className="text-bone">MAGAS</span>
        <span className="ml-px text-signal">7</span>
      </span>
    </span>
  );
}
