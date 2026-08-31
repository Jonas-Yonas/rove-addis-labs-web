import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function SectionCta({
  title,
  description,
  href = "/contact",
  cta = "Start a conversation",
}: {
  title: string;
  description: string;
  href?: string;
  cta?: string;
}) {
  return (
    <div className="mt-16 overflow-hidden rounded-2xl bg-[#0F2933] px-6 py-10 text-white sm:px-10 sm:py-12">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-white/65">{description}</p>
        </div>

        <Link
          href={href}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-[#28B5B1] px-6 text-sm font-medium text-[#0F2933] transition-transform hover:-translate-y-0.5"
        >
          {cta}
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  );
}
