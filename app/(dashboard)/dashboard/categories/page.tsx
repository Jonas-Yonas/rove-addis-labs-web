import { Tags } from "lucide-react";

import { CategoryCreateDialog } from "@/components/dashboard/category-create-dialog";
import { CategoryDeleteAction } from "@/components/dashboard/category-delete-action";
import { CategoryEditDialog } from "@/components/dashboard/category-edit-dialog";
import { CategoryFilters } from "@/components/dashboard/category-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { getCategories } from "@/lib/categories/queries";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const categories = await getCategories({ search, page, pageSize: 10 });

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Content"
        title="Categories"
        description="Organize posts into topical groups for Rove Addis Labs."
        action={<CategoryCreateDialog />}
      />

      <CategoryFilters search={search} />

      {categories.data.length === 0 ? (
        <EmptyState
          icon={Tags}
          title={search ? "No categories found" : "No categories yet"}
          description={
            search
              ? "Try a different search term."
              : "Create your first category to start grouping posts."
          }
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border bg-card">
            <ul className="divide-y">
              {categories.data.map((category) => (
                <li
                  key={category.id}
                  className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-medium">{category.name}</span>
                      <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                        /{category.slug}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {category.postCount}{" "}
                        {category.postCount === 1 ? "post" : "posts"}
                      </span>
                    </div>

                    {category.description && (
                      <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <CategoryEditDialog category={category} />
                    <CategoryDeleteAction
                      categoryId={category.id}
                      categoryName={category.name}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Pagination
            page={categories.page}
            pageSize={categories.pageSize}
            totalItems={categories.count}
            noun="categories"
          />
        </>
      )}
    </div>
  );
}
