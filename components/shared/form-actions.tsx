import Link from "next/link";

import { Button } from "@/components/ui/button";

interface FormActionsProps {
  cancelHref?: string;
  cancelLabel?: string;
  submitLabel?: string;
  pendingLabel?: string;
  isPending?: boolean;
}

export function FormActions({
  cancelHref,
  cancelLabel = "Cancel",
  submitLabel = "Save",
  pendingLabel = "Saving...",
  isPending = false,
}: FormActionsProps) {
  return (
    <div className="flex items-center justify-end gap-3">
      {cancelHref && (
        <Button variant="outline" disabled={isPending}>
          <Link href={cancelHref}>{cancelLabel}</Link>
        </Button>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? pendingLabel : submitLabel}
      </Button>
    </div>
  );
}
