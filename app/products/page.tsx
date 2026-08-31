import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Package } from "lucide-react";

import { PublicHero } from "@/components/public/public-hero";
import { SectionCta } from "@/components/public/section-cta";
import { getPublicProducts } from "@/lib/public/queries";

export const metadata: Metadata = {
  title: "Products",
  description: "Products built by Rove Addis Labs.",
};

export default async function ProductsPage() {
  const products = await getPublicProducts();

  return (
    <>
      <PublicHero
        eyebrow="Our products"
        title="Products we believe should exist."
        description="Software we build and run ourselves — shaped by the problems we see around us."
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {products.length === 0 ? (
          <div className="flex flex-col items-center rounded-2xl border border-dashed py-20 text-center">
            <span className="flex size-11 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <Package className="size-5" />
            </span>
            <p className="mt-4 font-medium">Nothing to show yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Our products will appear here as they launch.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
              >
                <div className="relative aspect-16/10 overflow-hidden bg-muted">
                  {product.cover_image_url ? (
                    <Image
                      src={product.cover_image_url}
                      alt=""
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_25%,rgba(40,181,177,0.18),transparent_62%)]" />
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3">
                    {product.logo_url && (
                      <span className="relative size-8 shrink-0 overflow-hidden rounded-lg border bg-background">
                        <Image
                          src={product.logo_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="32px"
                          unoptimized
                        />
                      </span>
                    )}
                    <h2 className="text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {product.name}
                    </h2>
                    <span className="ml-auto rounded-full border px-2 py-0.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                      {product.status}
                    </span>
                  </div>

                  {product.tagline && (
                    <p className="mt-3 text-sm font-medium text-foreground/80">
                      {product.tagline}
                    </p>
                  )}
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
                    {product.description}
                  </p>

                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Learn more
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <SectionCta
          title="Building a product?"
          description="We take products from idea to launch — and keep improving them after."
          cta="Talk to us"
        />
      </div>
    </>
  );
}
