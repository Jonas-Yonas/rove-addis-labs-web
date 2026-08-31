import Link from "next/link";

import { Brand } from "@/components/shared/brand";
import { ThemeToggle } from "@/components/dashboard/theme-toggle";
import { MobileNav } from "@/components/layout/mobile-nav";
import { SiteNav } from "@/components/layout/site-nav";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Brand compact />

        <SiteNav />

        <div className="flex items-center gap-1.5">
          <ThemeToggle />

          <Link
            href="/auth/login"
            className="hidden rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground md:inline-flex md:items-center"
          >
            Sign in
          </Link>

          <Link
            href="/contact"
            className="hidden h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-all hover:-translate-y-px hover:opacity-90 md:inline-flex"
          >
            Let&apos;s talk
          </Link>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
