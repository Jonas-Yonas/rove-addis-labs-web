import { cn } from "@/lib/utils";

/**
 * Renders plain-text body content (from a CMS textarea) as readable prose:
 * blank lines become paragraph breaks, single newlines are kept as line breaks.
 */
export function Prose({ text, className }: { text: string; className?: string }) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  if (paragraphs.length === 0) return null;

  return (
    <div
      className={cn(
        "max-w-2xl text-base leading-8 text-foreground/85 sm:text-[1.0625rem]",
        "[&>p+p]:mt-6",
        className,
      )}
    >
      {paragraphs.map((block, index) => (
        <p key={index} className="whitespace-pre-line">
          {block}
        </p>
      ))}
    </div>
  );
}
