import { Button } from "@/components/ui/button";
import { DateTimePicker } from "@/components/ui/date-time-picker";
import { MultiSelect } from "@/components/ui/multi-select";
import { SelectField } from "@/components/ui/select";

export const POST_STATUSES = ["DRAFT", "PUBLISHED", "ARCHIVED"] as const;

const STATUS_OPTIONS = POST_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0) + status.slice(1).toLowerCase(),
}));

export interface PostCategoryOption {
  id: string;
  name: string;
}

export interface PostTagOption {
  id: string;
  name: string;
}

export interface PostFormInitial {
  category_id?: string | null;
  title?: string;
  slug?: string;
  excerpt?: string | null;
  content?: string;
  cover_image_url?: string | null;
  status?: string;
  featured?: boolean;
  published_at?: string | null;
  tag_ids?: string[];
}

export function PostForm({
  action,
  submitLabel,
  initial,
  categories,
  tags,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initial?: PostFormInitial;
  categories: PostCategoryOption[];
  tags: PostTagOption[];
}) {
  const categoryList = categories ?? [];
  const tagList = tags ?? [];

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field
          label="Title"
          name="title"
          defaultValue={initial?.title}
          required
        />
        <Field label="Slug" name="slug" defaultValue={initial?.slug} required />
      </div>

      <Field
        label="Excerpt"
        name="excerpt"
        defaultValue={initial?.excerpt ?? ""}
        textarea
        rows={3}
      />

      <Field
        label="Content"
        name="content"
        defaultValue={initial?.content ?? ""}
        textarea
        rows={12}
        required
      />

      <div className="space-y-2 text-sm">
        <span className="font-medium">Category</span>
        <SelectField
          size="lg"
          name="category_id"
          defaultValue={initial?.category_id ?? ""}
          options={[
            { value: "", label: "No category" },
            ...categoryList.map((category) => ({
              value: category.id,
              label: category.name,
            })),
          ]}
        />
      </div>

      <div className="space-y-2 text-sm">
        <span className="font-medium">Tags</span>
        <MultiSelect
          name="tag_ids"
          defaultValue={initial?.tag_ids ?? []}
          options={tagList.map((tag) => ({ value: tag.id, label: tag.name }))}
          placeholder="Add tags"
          searchPlaceholder="Search tags..."
          emptyText="No tags yet. Create some under Content → Tags."
        />
      </div>

      <Field
        label="Cover image URL"
        name="cover_image_url"
        defaultValue={initial?.cover_image_url ?? ""}
        type="url"
        placeholder="https://..."
      />

      <div className="grid gap-5 md:grid-cols-3">
        <div className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <SelectField
            size="lg"
            name="status"
            defaultValue={initial?.status ?? "DRAFT"}
            options={STATUS_OPTIONS}
          />
        </div>

        <label className="space-y-2 text-sm">
          <span className="font-medium">Published at</span>
          <DateTimePicker
            name="published_at"
            defaultValue={initial?.published_at ?? undefined}
            placeholder="Select date and time"
          />
        </label>

        <label className="space-y-2 text-sm">
          <span className="font-medium">Featured</span>
          <span className="flex h-10 w-full cursor-pointer items-center gap-3 rounded-md border bg-background px-3 transition-colors hover:bg-muted/50 has-focus-visible:ring-2 has-focus-visible:ring-ring">
            <input
              type="checkbox"
              name="featured"
              defaultChecked={initial?.featured ?? false}
              className="size-4 shrink-0 cursor-pointer rounded border-input accent-primary focus-visible:outline-none"
            />
            <span className="font-medium">Featured post</span>
          </span>
        </label>
      </div>

      <div className="flex items-center justify-end border-t pt-5">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}

function Field({
  label,
  name,
  defaultValue,
  required,
  textarea,
  rows = 5,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
  type?: string;
  placeholder?: string;
}) {
  const className =
    "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <label className="block space-y-2 text-sm">
      <span className="font-medium">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </span>

      {textarea ? (
        <textarea
          name={name}
          defaultValue={defaultValue}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={className}
        />
      ) : (
        <input
          name={name}
          type={type}
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
