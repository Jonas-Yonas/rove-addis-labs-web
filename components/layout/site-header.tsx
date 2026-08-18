import Link from "next/link";

import { Brand } from "@/components/shared/brand";
import { MobileNav } from "@/components/layout/mobile-nav";
import { mainNavigation } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Brand />

        <nav
          className="hidden items-center gap-7 md:flex"
          aria-label="Main navigation"
        >
          {mainNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
          >
            Let&apos;s talk
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
