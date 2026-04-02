interface TulipDividerProps {
  className?: string;
}

export function TulipDivider({ className = "" }: TulipDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-2 ${className}`}>
      <div
        className="h-px flex-1 bg-gradient-to-r from-transparent via-tulip-gold to-tulip-gold"
        style={{ opacity: 1 }}
      />
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={{ filter: "drop-shadow(0 0 6px rgba(200,163,90,0.8))" }}
      >
        <ellipse
          cx="14"
          cy="18"
          rx="4"
          ry="7"
          fill="oklch(0.73 0.1 70)"
          opacity="0.9"
        />
        <ellipse
          cx="9"
          cy="14"
          rx="3.5"
          ry="6"
          fill="oklch(0.73 0.1 70)"
          opacity="0.7"
          transform="rotate(-30 9 14)"
        />
        <ellipse
          cx="19"
          cy="14"
          rx="3.5"
          ry="6"
          fill="oklch(0.73 0.1 70)"
          opacity="0.7"
          transform="rotate(30 19 14)"
        />
        <ellipse
          cx="5"
          cy="18"
          rx="3"
          ry="5"
          fill="oklch(0.73 0.1 70)"
          opacity="0.5"
          transform="rotate(-50 5 18)"
        />
        <ellipse
          cx="23"
          cy="18"
          rx="3"
          ry="5"
          fill="oklch(0.73 0.1 70)"
          opacity="0.5"
          transform="rotate(50 23 18)"
        />
        <line
          x1="14"
          y1="25"
          x2="14"
          y2="27"
          stroke="oklch(0.73 0.1 70)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div
        className="h-px flex-1 bg-gradient-to-l from-transparent via-tulip-gold to-tulip-gold"
        style={{ opacity: 1 }}
      />
    </div>
  );
}
