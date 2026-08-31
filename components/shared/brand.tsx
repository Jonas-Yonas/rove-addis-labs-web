import Image from "next/image";
import Link from "next/link";

import { brand } from "@/config/brand";

interface BrandProps {
  compact?: boolean;
}

export function Brand({ compact = false }: BrandProps) {
  return (
    <Link
      href="/"
      className="group inline-flex items-center gap-2.5"
      aria-label={`${brand.name} home`}
    >
      <Image
        src="/brand/logo-mark.svg"
        alt=""
        width={512}
        height={512}
        priority
        className="size-8 shrink-0 rounded-lg transition-opacity group-hover:opacity-85"
      />

      <span className="leading-none">
        <span className="block text-sm font-semibold tracking-tight text-foreground">
          {brand.name}
        </span>

        {!compact && (
          <span className="mt-1 block text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            {brand.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
