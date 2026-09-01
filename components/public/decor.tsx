import { cn } from "@/lib/utils";

/** Faint dot grid. Set the colour with a `text-*` class. */
export function DotGrid({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 h-full w-full text-foreground/5",
        className,
      )}
    >
      <defs>
        <pattern
          id="dot-grid"
          width="26"
          height="26"
          patternUnits="userSpaceOnUse"
          x="-1"
          y="-1"
        >
          <circle cx="1" cy="1" r="1.4" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dot-grid)" />
    </svg>
  );
}

/** The Rove ◐ mark as a decorative glyph. Colour via `text-*`. */
export function BrandGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden="true"
      className={cn("pointer-events-none", className)}
    >
      <path
        d="M160 256C160 202.981 202.981 160 256 160C309.019 160 352 202.981 352 256"
        stroke="currentColor"
        strokeWidth="58"
        strokeLinecap="round"
      />
      <path
        d="M160 256C160 309.019 202.981 352 256 352C309.019 352 352 309.019 352 256"
        stroke="currentColor"
        strokeWidth="58"
        strokeLinecap="round"
        opacity="0.45"
      />
      <circle cx="256" cy="256" r="42" fill="currentColor" />
    </svg>
  );
}
