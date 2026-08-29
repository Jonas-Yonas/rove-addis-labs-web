import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select";

export const EXPERIMENT_STATUSES = [
  "EXPLORING",
  "PROTOTYPE",
  "EXPERIMENTAL",
  "INCUBATING",
  "ARCHIVED",
] as const;

const STATUS_OPTIONS = EXPERIMENT_STATUSES.map((status) => ({
  value: status,
  label: status.charAt(0) + status.slice(1).toLowerCase(),
}));

interface ExperimentFormProps {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initial?: {
    title?: string;
    slug?: string;
    summary?: string;
    content?: string | null;
    cover_image_url?: string | null;
    status?: string;
    featured?: boolean;
  };
  footer?: ReactNode;
}

export function ExperimentForm({
  action,
  submitLabel,
  initial,
  footer,
}: ExperimentFormProps) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Title" name="title" defaultValue={initial?.title} required />
        <Field label="Slug" name="slug" defaultValue={initial?.slug} required />
      </div>

      <Field
        label="Summary"
        name="summary"
        defaultValue={initial?.summary}
        required
        textarea
      />

      <Field
        label="Content"
        name="content"
        defaultValue={initial?.content ?? ""}
        textarea
        rows={10}
      />

      <Field
        label="Cover image URL"
        name="cover_image_url"
        defaultValue={initial?.cover_image_url ?? ""}
        type="url"
        placeholder="https://..."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 text-sm">
          <span className="font-medium">Status</span>
          <SelectField
            size="lg"
            name="status"
            defaultValue={initial?.status ?? "EXPLORING"}
            options={STATUS_OPTIONS}
          />
        </div>

        <label className="flex items-center gap-3 self-end pb-2 text-sm">
          <input
            type="checkbox"
            name="featured"
            defaultChecked={initial?.featured ?? false}
            className="size-4 rounded border"
          />
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
