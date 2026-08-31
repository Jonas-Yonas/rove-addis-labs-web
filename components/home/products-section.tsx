import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { getPublicProducts } from "@/lib/public/queries";

export async function ProductsSection() {
  const products = await getPublicProducts();

  if (products.length === 0) return null;

  const [feature, ...rest] = products;
  const more = rest.slice(0, 3);

  return (
    <section className="bg-[#0F2933] text-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-[#28B5B1] uppercase">
              Our products
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-5xl">
              Products we believe should exist.
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#28B5B1] transition-colors hover:text-white"
          >
            View all products
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <Link
          href={`/products/${feature.slug}`}
          className="group mt-14 block overflow-hidden rounded-2xl border border-white/10 bg-white/3 transition-colors hover:border-[#28B5B1]/40"
        >
          <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
            <div className="flex min-h-80 flex-col justify-between p-8 sm:p-12">
              <div>
                <span className="inline-flex items-center rounded-full border border-[#28B5B1]/30 px-3 py-1 text-xs font-semibold tracking-wide text-[#28B5B1] uppercase">
                  {feature.status}
                </span>

                <h3 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">
                  {feature.name}
                </h3>

                {feature.tagline && (
                  <p className="mt-4 text-xl text-white/80">{feature.tagline}</p>
                )}

                <p className="mt-5 max-w-xl leading-7 text-white/60">
                  {feature.description}
                </p>
              </div>

              <span className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-[#28B5B1]">
                Explore {feature.name}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>

            <div className="relative min-h-64 overflow-hidden bg-[radial-gradient(circle_at_50%_40%,rgba(40,181,177,0.22),transparent_50%)] lg:min-h-full">
              {feature.cover_image_url ? (
                <Image
                  src={feature.cover_image_url}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  unoptimized
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-5xl font-bold tracking-[-0.08em]">
                    {feature.name.slice(0, 1)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </Link>

        {more.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.slug}`}
                className="group rounded-2xl border border-white/10 bg-white/3 p-6 transition-colors hover:border-[#28B5B1]/40"
              >
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold tracking-tight">
                    {product.name}
                  </h3>
                  <span className="text-[11px] font-semibold tracking-wide text-white/50 uppercase">
                    {product.status}
                  </span>
                </div>
                {product.tagline && (
                  <p className="mt-2 line-clamp-2 text-sm text-white/60">
                    {product.tagline}
                  </p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
