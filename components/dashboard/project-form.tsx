"use client";

import { useState, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SelectField } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createClient } from "@/lib/supabase/client";

import type { ProjectStatus } from "@/lib/projects/types";
import { FormActions } from "../shared/form-actions";

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
    published?: boolean;
    content?: string | null;
    cover_image_url?: string | null;
  };
  showContentFields?: boolean;
  storagePathPrefix?: string;
  onSuccess?: () => void;
}

const statuses: ProjectStatus[] = [
  "PLANNED",
  "IN_PROGRESS",
  "COMPLETED",
  "ARCHIVED",
];

const STATUS_OPTIONS = statuses.map((status) => ({
  value: status,
  label: status.replace("_", " "),
}));

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

function getFileExtension(file: File) {
  switch (file.type) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    default:
      return null;
  }
}

export function ProjectForm({
  action,
  submitLabel = "Save project",
  pendingLabel = "Saving...",
  initialValues,
  showContentFields = false,
  storagePathPrefix = "projects",
  onSuccess,
}: ProjectFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const coverImage = formData.get("cover_image");

    // Never send the actual file through the Server Action.
    formData.delete("cover_image");

    setError(null);

    startTransition(async () => {
      try {
        if (coverImage instanceof File && coverImage.size > 0) {
          if (!ALLOWED_IMAGE_TYPES.includes(coverImage.type)) {
            setError("Please upload a JPG, PNG, or WebP image.");
            return;
          }

          if (coverImage.size > MAX_IMAGE_SIZE) {
            setError("Cover image must be smaller than 5 MB.");
            return;
          }

          const extension = getFileExtension(coverImage);

          if (!extension) {
            setError("Unsupported image format.");
            return;
          }

          const supabase = createClient();

          const filePath = `${storagePathPrefix}/${crypto.randomUUID()}.${extension}`;

          const { error: uploadError } = await supabase.storage
            .from("rove-labs-project-covers")
            .upload(filePath, coverImage, {
              contentType: coverImage.type,
              cacheControl: "3600",
              upsert: false,
            });

          if (uploadError) {
            console.error("Failed to upload cover image:", uploadError);

            setError("Failed to upload cover image. Please try again.");
            return;
          }

          const {
            data: { publicUrl },
          } = supabase.storage
            .from("rove-labs-project-covers")
            .getPublicUrl(filePath);

          formData.set("cover_image_url", publicUrl);
        }

        const result = await action(formData);

        if (!result.success) {
          setError(result.error ?? "Unable to save project.");
          return;
        }

        onSuccess?.();
      } catch (error) {
        console.error("Failed to save project:", error);

        setError("Unable to save project. Please try again.");
      }
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
            <Label htmlFor="cover_image">Cover image</Label>

            <Input
              id="cover_image"
              name="cover_image"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              disabled={isPending}
            />

            <p className="text-xs text-muted-foreground">
              Upload a JPG, PNG, or WebP image. Maximum size: 5 MB.
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

        <SelectField
          id="status"
          name="status"
          aria-label="Status"
          defaultValue={initialValues?.status ?? "PLANNED"}
          disabled={isPending}
          options={STATUS_OPTIONS}
        />
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

      <div className="flex items-center gap-3">
        <Checkbox
          id="published"
          name="published"
          value="true"
          defaultChecked={initialValues?.published ?? true}
          disabled={isPending}
        />

        <Label htmlFor="published" className="cursor-pointer">
          Show on the public site
        </Label>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}

      <FormActions
        submitLabel={submitLabel}
        pendingLabel={pendingLabel}
        isPending={isPending}
      />
    </form>
  );
}
