"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Image from "next/image";

interface ProjectCoverImageProps {
  src?: string | null;
  alt: string;
}

export function ProjectCoverImage({
  src,
  alt,
}: ProjectCoverImageProps) {
  const [hasError, setHasError] = useState(false);

  const showPlaceholder = !src || hasError;

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-muted">
      {showPlaceholder ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="flex size-14 items-center justify-center rounded-xl border bg-background shadow-sm">
            <ImageIcon className="size-7 text-muted-foreground" />
          </div>

          <div className="text-center">
            <p className="text-sm font-medium">
              No cover image
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Add a cover image from Edit Project.
            </p>
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          className="object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}