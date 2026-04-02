import { TulipDivider } from "./TulipDivider";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionTitle({
  title,
  subtitle,
  light = false,
}: SectionTitleProps) {
  return (
    <div className="text-center mb-10">
      <h2
        className={`font-display text-3xl md:text-4xl font-bold tracking-wide mb-3 text-glow-gold ${
          light ? "text-tulip-cream" : "text-tulip-mauve"
        }`}
      >
        {title}
      </h2>
      <TulipDivider />
      {subtitle && (
        <p
          className={`mt-4 text-base md:text-lg max-w-2xl mx-auto leading-relaxed font-medium ${
            light ? "text-tulip-cream opacity-90" : "text-foreground opacity-80"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
