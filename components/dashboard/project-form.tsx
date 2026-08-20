"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { ProjectStatus } from "@/lib/projects/types";

interface ProjectFormProps {
  action: (formData: FormData) => Promise<{
    success: boolean;
    error?: string;
  }>;
  submitLabel?: string;
  pendingLabel?: string;
  initialValues?: {
    title?: string;
    description?: string;
    client_name?: string | null;
    website_url?: string | null;
    status?: ProjectStatus;
    featured?: boolean;
    content?: string | null;
    cover_image_url?: string | null;
  };
  showContentFields?: boolean;
  onSuccess?: () => void;
}

const statuses: ProjectStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
];

export function ProjectForm({
  action,
  submitLabel = "Save project",
  pendingLabel = "Saving...",
  initialValues,
  showContentFields = false,
  onSuccess,
}: ProjectFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    setError(null);

    startTransition(async () => {
      const result = await action(formData);

      if (!result.success) {
        setError(result.error ?? "Unable to save project.");
        return;
      }

      onSuccess?.();
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="title">Project name</Label>

        <Input
          id="title"
          name="title"
          placeholder="e.g. Rove Addis"
          defaultValue={initialValues?.title ?? ""}
          required
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          placeholder="Briefly describe the project..."
          defaultValue={initialValues?.description ?? ""}
          rows={4}
          required
          disabled={isPending}
        />
      </div>

      {showContentFields && (
        <>
          <div className="space-y-2">
            <Label htmlFor="content">Project content</Label>

            <Textarea
              id="content"
              name="content"
              placeholder="Add detailed project content..."
              defaultValue={initialValues?.content ?? ""}
              rows={10}
              disabled={isPending}
            />

            <p className="text-xs text-muted-foreground">
              Detailed information about the project, its work, outcomes, and
              highlights.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="cover_image_url">Cover image URL</Label>

            <Input
              id="cover_image_url"
              name="cover_image_url"
              type="url"
              placeholder="https://example.com/project-cover.jpg"
              defaultValue={initialValues?.cover_image_url ?? ""}
              disabled={isPending}
            />

            <p className="text-xs text-muted-foreground">
              The project cover image. We&apos;ll add Supabase Storage upload
              later.
            </p>
          </div>
        </>
      )}

      <div className="space-y-2">
        <Label htmlFor="client_name">Client name</Label>

        <Input
          id="client_name"
          name="client_name"
          placeholder="e.g. Acme Corporation"
          defaultValue={initialValues?.client_name ?? ""}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website_url">Website URL</Label>

        <Input
          id="website_url"
          name="website_url"
          type="url"
          placeholder="https://example.com"
          defaultValue={initialValues?.website_url ?? ""}
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <select
          id="status"
          name="status"
          defaultValue={initialValues?.status ?? "PLANNED"}
          disabled={isPending}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="featured"
          name="featured"
          value="true"
          defaultChecked={initialValues?.featured ?? false}
          disabled={isPending}
        />

        <Label htmlFor="featured" className="cursor-pointer">
          Featured project
        </Label>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? pendingLabel : submitLabel}
      </Button>
    </form>
  );
}
