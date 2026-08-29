import { Hash } from "lucide-react";

import { TagCreateDialog } from "@/components/dashboard/tag-create-dialog";
import { TagDeleteAction } from "@/components/dashboard/tag-delete-action";
import { TagEditDialog } from "@/components/dashboard/tag-edit-dialog";
import { TagFilters } from "@/components/dashboard/tag-filters";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeader } from "@/components/shared/page-header";
import { Pagination } from "@/components/shared/pagination";
import { getTags } from "@/lib/tags/queries";

export default async function TagsPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page?: string }>;
}) {
  const params = await searchParams;
  const search = params.search ?? "";
  const parsedPage = Number(params.page);
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const tags = await getTags({ search, page, pageSize: 12 });

  return (
    <div className="w-full min-w-0 space-y-6">
      <PageHeader
        eyebrow="Content"
        title="Tags"
        description="Label posts with keywords so readers can find related content."
        action={<TagCreateDialog />}
      />

      <TagFilters search={search} />

      {tags.data.length === 0 ? (
        <EmptyState
          icon={Hash}
          title={search ? "No tags found" : "No tags yet"}
          description={
            search
              ? "Try a different search term."
              : "Create your first tag to start labelling posts."
          }
        />
      ) : (
        <>
          <div className="overflow-hidden rounded-xl border bg-card">
            <ul className="divide-y">
              {tags.data.map((tag) => (
                <li
                  key={tag.id}
                  className="flex items-center justify-between gap-3 p-4"
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <span className="font-medium">{tag.name}</span>
                    <span className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground">
                      /{tag.slug}
                    </span>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <TagEditDialog tag={tag} />
                    <TagDeleteAction tagId={tag.id} tagName={tag.name} />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <Pagination
            page={tags.page}
            pageSize={tags.pageSize}
            totalItems={tags.count}
            noun="tags"
          />
        </>
      )}
    </div>
  );
}
