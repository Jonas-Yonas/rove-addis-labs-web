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
      className="group inline-flex items-center gap-2"
      aria-label={`${brand.name} home`}
    >
      <Image
        src="/brand/logo-full.svg"
        alt={brand.name}
        width={180}
        height={54}
        priority
        className="h-auto w-37.5 transition-opacity group-hover:opacity-85"
      />

      <span className="leading-none">
        <span className="block text-sm font-semibold tracking-tight">
          {brand.name}
        </span>

        {!compact && (
          <span className="mt-0.5 block text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            {brand.tagline}
          </span>
        )}
      </span>
    </Link>
  );
}
