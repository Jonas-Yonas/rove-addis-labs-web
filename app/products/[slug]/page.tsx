import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

import { ArticleLayout, StatusPill } from "@/components/public/article-layout";
import { Prose } from "@/components/public/prose";
import { getProductBySlug } from "@/lib/public/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.tagline ?? product.description.slice(0, 150),
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <ArticleLayout
      backHref="/products"
      backLabel="All products"
      section="Products"
      meta={
        <>
          {product.logo_url && (
            <span className="relative size-8 overflow-hidden rounded-lg border bg-background">
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
          <StatusPill>{product.status}</StatusPill>
        </>
      }
      aside={
        <>
          <p>Status: {product.status.toLowerCase()}</p>
          {product.website_url && (
            <a
              href={product.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-accent transition-colors hover:text-foreground"
            >
              Visit site
              <ExternalLink className="size-3.5" />
            </a>
          )}
        </>
      }
      title={product.name}
      lead={product.tagline}
      coverUrl={product.cover_image_url}
    >
      <Prose text={product.description} />

      {product.website_url && (
        <a
          href={product.website_url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Visit {product.name}
          <ExternalLink className="size-4" />
        </a>
      )}
    </ArticleLayout>
  );
}
