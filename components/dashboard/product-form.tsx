"use client";

import { useState, useTransition } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/lib/supabase/client";

import { FormActions } from "../shared/form-actions";

type ProductStatus =
  | "IDEA"
  | "DEVELOPMENT"
  | "BETA"
  | "LIVE"
  | "PAUSED"
  | "ARCHIVED";

interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  description: string;
  logo_url: string | null;
  cover_image_url: string | null;
  website_url: string | null;
  status: ProductStatus;
  featured: boolean;
  published?: boolean;
}

interface ProductFormProps {
  product?: Product;

  action:
    | ((formData: FormData) => Promise<{
        success: boolean;
        error?: string;
      }>)
    | ((
        productId: string,
        formData: FormData,
      ) => Promise<{
        success: boolean;
        error?: string;
      }>);

  submitLabel?: string;
  pendingLabel?: string;

  initialValues?: {
    name?: string;
    slug?: string;
    tagline?: string | null;
    description?: string;
    logo_url?: string | null;
    cover_image_url?: string | null;
    website_url?: string | null;
    status?: ProductStatus;
    featured?: boolean;
    published?: boolean;
  };

  onSuccess?: () => void;
}

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

export function ProductForm({
  product,
  action,
  submitLabel = "Save product",
  pendingLabel = "Saving...",
  initialValues,
  onSuccess,
}: ProductFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const values = product ?? initialValues;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const logoImage = formData.get("logo_image");
    const coverImage = formData.get("cover_image");

    formData.delete("logo_image");
    formData.delete("cover_image");

    setError(null);

    startTransition(async () => {
      try {
        const supabase = createClient();

        /*
         * Upload new logo only when the user selected one.
         */
        if (logoImage instanceof File && logoImage.size > 0) {
          const logoUrl = await uploadImage(
            supabase,
            logoImage,
            product ? `products/${product.id}/logos` : "logos",
          );

          if (!logoUrl) {
            setError("Failed to upload logo.");
            return;
          }

          formData.set("logo_url", logoUrl);
        }

        /*
         * Upload new cover only when the user selected one.
         */
        if (coverImage instanceof File && coverImage.size > 0) {
          const coverUrl = await uploadImage(
            supabase,
            coverImage,
            product ? `products/${product.id}/covers` : "products",
          );

          if (!coverUrl) {
            setError("Failed to upload cover image.");
            return;
          }

          formData.set("cover_image_url", coverUrl);
        }

        let result;

        if (product) {
          result = await (
            action as (
              productId: string,
              formData: FormData,
            ) => Promise<{
              success: boolean;
              error?: string;
            }>
          )(product.id, formData);
        } else {
          result = await (
            action as (formData: FormData) => Promise<{
              success: boolean;
              error?: string;
            }>
          )(formData);
        }

        if (!result.success) {
          setError(result.error ?? "Unable to save product.");
          return;
        }

        onSuccess?.();
      } catch (error) {
        console.error("Failed to save product:", error);

        setError("Unable to save product. Please try again.");
      }
    });
  }

  async function uploadImage(
    supabase: ReturnType<typeof createClient>,
    file: File,
    folder: string,
  ) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image.");
      return null;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setError("Images must be smaller than 5 MB.");
      return null;
    }

    const extension = getFileExtension(file);

    if (!extension) {
      setError("Unsupported image format.");
      return null;
    }

    const filePath = `${folder}/${crypto.randomUUID()}.${extension}`;

    const { error: uploadError } = await supabase.storage
      .from("rove-labs-project-covers")
      .upload(filePath, file, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Failed to upload image:", uploadError);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("rove-labs-project-covers")
      .getPublicUrl(filePath);

    return publicUrl;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Product name</Label>

        <Input
          id="name"
          name="name"
          placeholder="e.g. Nexabot"
          defaultValue={values?.name ?? ""}
          required
          disabled={isPending}
        />
      </div>

      {/* Slug */}
      <div className="space-y-2">
        <Label htmlFor="slug">Slug</Label>

        <Input
          id="slug"
          name="slug"
          placeholder="e.g. nexabot"
          defaultValue={values?.slug ?? ""}
          required
          disabled={isPending}
        />
      </div>

      {/* Tagline */}
      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline</Label>

        <Input
          id="tagline"
          name="tagline"
          placeholder="A short description of the product"
          defaultValue={values?.tagline ?? ""}
          disabled={isPending}
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          placeholder="Describe the product..."
          defaultValue={values?.description ?? ""}
          rows={5}
          required
          disabled={isPending}
        />
      </div>

      {/* Logo */}
      <div className="space-y-2">
        <Label htmlFor="logo_image">Logo</Label>

        <Input
          id="logo_image"
          name="logo_image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isPending}
        />

        {values?.logo_url && (
          <p className="text-xs text-muted-foreground">
            A logo is already uploaded. Select a new file to replace it.
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          JPG, PNG, or WebP. Maximum size: 5 MB.
        </p>
      </div>

      {/* Cover */}
      <div className="space-y-2">
        <Label htmlFor="cover_image">Cover image</Label>

        <Input
          id="cover_image"
          name="cover_image"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          disabled={isPending}
        />

        {values?.cover_image_url && (
          <p className="text-xs text-muted-foreground">
            A cover image is already uploaded. Select a new file to replace it.
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          JPG, PNG, or WebP. Maximum size: 5 MB.
        </p>
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label htmlFor="website_url">Website URL</Label>

        <Input
          id="website_url"
          name="website_url"
          type="url"
          placeholder="https://example.com"
          defaultValue={values?.website_url ?? ""}
          disabled={isPending}
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <Select name="status" defaultValue={values?.status ?? "IDEA"}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select status" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="IDEA">Idea</SelectItem>
            <SelectItem value="DEVELOPMENT">Development</SelectItem>
            <SelectItem value="BETA">Beta</SelectItem>
            <SelectItem value="LIVE">Live</SelectItem>
            <SelectItem value="PAUSED">Paused</SelectItem>
            <SelectItem value="ARCHIVED">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="featured"
          name="featured"
          value="true"
          defaultChecked={values?.featured ?? false}
          disabled={isPending}
        />

        <Label htmlFor="featured" className="cursor-pointer">
          Featured product
        </Label>
      </div>

      {/* Public visibility */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="published"
          name="published"
          value="true"
          defaultChecked={values?.published ?? true}
          disabled={isPending}
        />

        <Label htmlFor="published" className="cursor-pointer">
          Show on the public site
        </Label>
      </div>

      {/* Error */}
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
