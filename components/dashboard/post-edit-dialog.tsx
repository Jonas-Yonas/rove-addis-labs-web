"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { updatePost } from "@/lib/posts/actions";
import type { PostCategoryOption, PostFormInitial } from "./post-form";
import { PostForm } from "./post-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface EditablePost extends PostFormInitial {
  id: string;
}

interface PostEditDialogProps {
  post: EditablePost;
  categories: PostCategoryOption[];
}

export function PostEditDialog({ post, categories }: PostEditDialogProps) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);

    startTransition(async () => {
      try {
        await updatePost(post.id, formData);

        setOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Update post failed:", error);

        setError(
          error instanceof Error ? error.message : "Failed to update post.",
        );
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);

        if (!nextOpen) {
          setError(null);
        }
      }}
    >
      <DialogTrigger>
        <Button type="button" variant="outline">
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Edit Post</DialogTitle>
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
          submitLabel={isPending ? "Saving..." : "Save changes"}
          initial={post}
          categories={categories}
        />
      </DialogContent>
    </Dialog>
  );
}
