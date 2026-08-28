import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

export const POST_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

export interface PostFormInitial {
  author_id?: string | null;
  category_id?: string | null;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  cover_image_url?: string | null;
  status?: string;
  featured?: boolean;
  published_at?: string | null;
}

export function PostForm({
  action,
  submitLabel,
  initial,
  footer,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initial?: PostFormInitial;
  footer?: ReactNode;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={initial?.title} required />
        <Field label="Slug" name="slug" defaultValue={initial?.slug} required />
      </div>
      <Field label="Excerpt" name="excerpt" defaultValue={initial?.excerpt ?? ""} textarea rows={3} />
      <Field label="Content" name="content" defaultValue={initial?.content ?? ""} textarea rows={12} required />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Author ID" name="author_id" defaultValue={initial?.author_id ?? ""} placeholder="Optional profile UUID" />
        <Field label="Category ID" name="category_id" defaultValue={initial?.category_id ?? ""} placeholder="Optional category UUID" />
      </div>
      <Field label="Cover image URL" name="cover_image_url" defaultValue={initial?.cover_image_url ?? ""} type="url" placeholder="https://..." />
      <div className="grid gap-5 md:grid-cols-3">
        <label className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <select name="status" defaultValue={initial?.status ?? "DRAFT"} className="h-10 w-full rounded-md border bg-background px-3 outline-none focus-visible:ring-2 focus-visible:ring-ring">
            {POST_STATUSES.map((status) => <option key={status} value={status}>{status.charAt(0) + status.slice(1).toLowerCase()}</option>)}
          </select>
        </label>
        <label className="space-y-2 text-sm">
          <span className="font-medium">Published at</span>
          <input name="published_at" type="datetime-local" defaultValue={initial?.published_at ? new Date(initial.published_at).toISOString().slice(0, 16) : ""} className="h-10 w-full rounded-md border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring" />
        </label>
        <label className="flex items-center gap-3 self-end pb-2 text-sm">
          <input type="checkbox" name="featured" defaultChecked={initial?.featured ?? false} className="size-4 rounded border" />
          <span className="font-medium">Featured</span>
        </label>
      </div>
      <div className="flex items-center justify-end gap-2 border-t pt-5">
        {footer}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

function Field({
  label, name, defaultValue, required, textarea, rows = 5, type = "text", placeholder,
}: {
  label: string; name: string; defaultValue?: string; required?: boolean;
  textarea?: boolean; rows?: number; type?: string; placeholder?: string;
}) {
  const className = "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";
  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium">{label}{required && <span className="text-destructive"> *</span>}</span>
      {textarea ? (
        <textarea name={name} defaultValue={defaultValue} required={required} rows={rows} placeholder={placeholder} className={className} />
      ) : (
        <input name={name} type={type} defaultValue={defaultValue} required={required} placeholder={placeholder} className={className} />
      )}
    </label>
  );
}
