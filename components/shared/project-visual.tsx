"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * 16:9 visual of a project, shared by the listing card and the detail page.
 * Falls back to the generated placeholder whenever there's no `image`, or
 * whenever it fails to load (e.g. the deploy screenshot isn't reachable) —
 * a broken image is never left on screen.
 *
 * The pointer/keyboard highlight is driven by the closest ancestor marked
 * `group`; without one the overlay simply never shows.
 */
export function ProjectVisual({
  image,
  title,
  fallbackAlt,
  featuredLabel,
  className,
  iconClassName,
  badgeClassName,
  sizes,
}: {
  image?: string;
  title: string;
  fallbackAlt: string;
  /** Label of the featured badge. Omit it to render no badge at all. */
  featuredLabel?: string;
  className?: string;
  iconClassName?: string;
  badgeClassName?: string;
  sizes?: string;
}) {
  const [failed, setFailed] = useState(false);
  const showImage = image && !failed;

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden bg-muted",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={image}
          alt={title}
          fill
          sizes={sizes ?? "100vw"}
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div
          role="img"
          aria-label={fallbackAlt}
          className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 via-muted to-background text-muted-foreground"
        >
          <ImageOff className={cn("size-6", iconClassName)} aria-hidden />
          <span className="text-xs">{fallbackAlt}</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100 motion-reduce:transition-none" />

      {featuredLabel ? (
        <Badge className={cn("absolute top-2 left-2 z-10", badgeClassName)}>
          {featuredLabel}
        </Badge>
      ) : null}
    </div>
  );
}
