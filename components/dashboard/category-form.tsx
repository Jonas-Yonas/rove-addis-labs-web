import { Button } from "@/components/ui/button";

export interface CategoryFormInitial {
  name?: string;
  slug?: string;
  description?: string | null;
}

export function CategoryForm({
  action,
  submitLabel,
  initial,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initial?: CategoryFormInitial;
}) {
  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" defaultValue={initial?.name} required />
        <Field
          label="Slug"
          name="slug"
          defaultValue={initial?.slug}
          placeholder="Auto-generated from the name"
        />
      </div>

      <Field
        label="Description"
        name="description"
        defaultValue={initial?.description ?? ""}
        textarea
        rows={4}
      />

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
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  required?: boolean;
  textarea?: boolean;
  rows?: number;
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
          type="text"
          defaultValue={defaultValue}
          required={required}
          placeholder={placeholder}
          className={className}
        />
      )}
    </label>
  );
}
