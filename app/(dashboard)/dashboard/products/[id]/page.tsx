import { ArrowLeft, ExternalLink, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductDeleteAction } from "@/components/dashboard/product-delete-action";
import { ProductEditDialog } from "@/components/dashboard/product-edit-dialog";
import { CoverImage } from "@/components/dashboard/cover-image";
import { StatusBadge } from "@/components/shared/status-badge";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/products/queries";

interface ProductDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="w-full min-w-0 space-y-6">
      {/* Back */}
      <div>
        <Button variant="ghost" size="sm">
          <Link href="/dashboard/products" className="flex items-center gap-2">
            <ArrowLeft className="size-4" />
            Products
          </Link>
        </Button>
      </div>

      {/* Product */}
      <div className="overflow-hidden rounded-xl border bg-card">
        {/* Cover */}
        <CoverImage
          src={product.cover_image_url}
          alt={`${product.name} cover image`}
          item="Product"
        />

        {/* Header + content */}
        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex min-w-0 items-start gap-4">
              {/* Logo */}
              <div className="relative flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-muted">
                {product.logo_url ? (
                  <Image
                    src={product.logo_url}
                    alt={`${product.name} logo`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">No logo</span>
                )}
              </div>

              {/* Name / status */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    {product.name}
                  </h1>

                  <StatusBadge status={product.status} />

                  {product.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-xs font-medium">
                      <Star className="size-3 fill-current" />
                      Featured
                    </span>
                  )}
                </div>

                {product.tagline && (
                  <p className="mt-2 text-muted-foreground">
                    {product.tagline}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 gap-2">
              <ProductEditDialog product={product} />

              <ProductDeleteAction
                productId={product.id}
                productName={product.name}
              />
            </div>
          </div>

          {/* Content */}
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_280px]">
            {/* About */}
            <div>
              <h2 className="font-semibold">About this product</h2>

              <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-muted-foreground">
                {product.description}
              </p>
            </div>

            {/* Website */}
            <div className="rounded-lg border bg-muted/30 p-4">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Website
              </p>

              {product.website_url ? (
                <a
                  href={product.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
                >
                  Visit website
                  <ExternalLink className="size-3.5" />
                </a>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">—</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
