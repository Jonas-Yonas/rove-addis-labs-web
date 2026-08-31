"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

import { Brand } from "@/components/shared/brand";
import { brand } from "@/config/brand";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "Solutions", href: "/solutions" },
      { label: "Work", href: "/work" },
      { label: "Products", href: "/products" },
      { label: "Labs", href: "/labs" },
      { label: "Insights", href: "/blog" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Sign in", href: "/auth/login" },
    ],
  },
];

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border/60 bg-muted/20">
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="max-w-md">
            <Brand compact />

            <p className="mt-5 text-sm leading-6 text-muted-foreground">
              {brand.description}
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
            >
              Start a project
              <ArrowUpRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:justify-items-end">
            {columns.map((column) => (
              <nav key={column.heading} aria-label={column.heading}>
                <p className="text-xs font-semibold tracking-[0.16em] text-foreground uppercase">
                  {column.heading}
                </p>

                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border/60 pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {brand.name}
          </p>

          <p className="tracking-wide">
            {brand.location} · Built for everywhere
          </p>
        </div>
      </div>
    </footer>
  );
}
