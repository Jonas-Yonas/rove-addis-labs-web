 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { updatePost } from "@/lib/posts/actions";
import { PostForm } from "./post-form";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PostEditDialog({ post }: { post: any }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function action(formData: FormData) {
    await updatePost(post.id, formData);
    setOpen(false);
    router.refresh();
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><Button variant="outline"><Pencil className="mr-2 size-4" />Edit</Button></DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader><DialogTitle>Edit Post</DialogTitle></DialogHeader>
        <PostForm action={action} submitLabel="Save changes" initial={post} />
      </DialogContent>
    </Dialog>
  );
}
