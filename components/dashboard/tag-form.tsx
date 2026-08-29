import { Button } from "@/components/ui/button";

export interface TagFormInitial {
  name?: string;
  slug?: string;
}

export function TagForm({
  action,
  submitLabel,
  initial,
}: {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  initial?: TagFormInitial;
}) {
  const inputClass =
    "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <form action={action} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block space-y-2 text-sm">
          <span className="font-medium">
            Name<span className="text-destructive"> *</span>
          </span>
          <input
            name="name"
            type="text"
            defaultValue={initial?.name}
            required
            className={inputClass}
          />
        </label>

        <label className="block space-y-2 text-sm">
          <span className="font-medium">Slug</span>
          <input
            name="slug"
            type="text"
            defaultValue={initial?.slug}
            placeholder="Auto-generated from the name"
            className={inputClass}
          />
        </label>
      </div>

      <div className="flex items-center justify-end border-t pt-5">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
