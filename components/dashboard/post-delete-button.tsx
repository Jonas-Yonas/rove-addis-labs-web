 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { deletePost } from "@/lib/posts/actions";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export function PostDeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);

  async function handleDelete() {
    setPending(true);
    try {
      const result = await deletePost(id);
      if (!result.success) throw new Error(result.error);
      setOpen(false);
      router.push("/dashboard/posts");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="destructive" />}>
        <Trash2 className="mr-2 size-4" />
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader><DialogTitle>Delete this post?</DialogTitle></DialogHeader>
        <p className="text-sm text-muted-foreground">This action cannot be undone. The post will be permanently removed.</p>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} disabled={pending}>Cancel</Button>
          <Button variant="destructive" onClick={handleDelete} disabled={pending}>{pending ? "Deleting..." : "Delete post"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
