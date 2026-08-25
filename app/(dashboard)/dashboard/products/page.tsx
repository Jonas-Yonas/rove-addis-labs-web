import { Package } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { StatusBadge } from "@/components/shared/status-badge";
import { getProducts } from "@/lib/products/queries";

import { ProductCreateDialog } from "@/components/dashboard/product-create-dialog";
import { ProductFilters } from "@/components/dashboard/product-filters";
import Link from "next/link";

interface ProductsPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const status = params.status ?? "ALL";

  const parsedPage = Number(params.page);

  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const products = await getProducts({
    search,
    status,
    page,
    pageSize: 9,
  });

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Workspace"
        title="Products"
        description="Manage the products and solutions built by Rove Addis Labs."
        action={<ProductCreateDialog />}
      />

      <ProductFilters search={search} status={status} />

      {products.data.length === 0 ? (
        <EmptyState
          icon={Package}
          title={
            search || status !== "ALL" ? "No products found" : "No products yet"
          }
          description={
            search || status !== "ALL"
              ? "Try adjusting your search or filters."
              : "Create your first product to start building your product portfolio."
          }
        />
      ) : (
        <>
          <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {products.data.map((product) => (
              <Link
                key={product.id}
                href={`/dashboard/products/${product.id}`}
                className="block min-w-0 rounded-xl border bg-card p-5 transition-colors hover:bg-muted/50"
              >
                {/* <div key={product.id} className="rounded-xl border bg-card p-5"> */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="truncate font-semibold">{product.name}</h2>

                    {product.tagline && (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {product.tagline}
                      </p>
                    )}
                  </div>

                  <StatusBadge status={product.status} />
                </div>

                <p className="mt-4 line-clamp-3 text-sm text-muted-foreground">
                  {product.description}
                </p>

                {product.featured && (
                  <div className="mt-4 text-xs font-medium text-muted-foreground">
                    Featured
                  </div>
                )}
              </Link>
            ))}
          </div>

          <Pagination
            page={products.page}
            pageSize={products.pageSize}
            totalItems={products.count}
          />
        </>
      )}
    </div>
  );
}
