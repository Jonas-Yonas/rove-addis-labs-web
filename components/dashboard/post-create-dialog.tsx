"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { createPost } from "@/lib/posts/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PostCategoryOption, PostForm } from "./post-form";

interface PostCreateDialogProps {
  categories: PostCategoryOption[];
}

export function PostCreateDialog({ categories }: PostCreateDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      try {
        const result = await createPost(formData);

        if (result.success === false) {
          setError(result.error ?? "Failed to create post.");
          return;
        }

        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Create post failed:", error);

        setError(
          error instanceof Error ? error.message : "Failed to create post.",
        );
      }
    });
  }

  function handleOpenChange(nextOpen: boolean) {
    setOpen(nextOpen);

    if (!nextOpen) {
      setError(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger>
        <Button type="button">
          <Plus className="mr-2 size-4" />
          New Post
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Create Post</DialogTitle>
        </DialogHeader>

        {error && (
          <div
            role="alert"
            className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive"
          >
            {error}
          </div>
        )}

        <PostForm
          action={handleSubmit}
          submitLabel={isPending ? "Creating..." : "Create Post"}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
