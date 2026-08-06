"use client";

import Image from "next/image";
import { ExternalLink, ImageOff } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import { mockLabels, type MockLocale, type MockProject } from "./mock-data";

const MAX_VISIBLE_TECHNOLOGIES = 4;

/**
 * Mockup-only card. Presentational: every action just logs/announces through
 * `onAction` so the screens are clickable without real navigation.
 */
export function ProjectCard({
  project,
  locale,
  forceHover = false,
  onAction,
}: {
  project: MockProject;
  locale: MockLocale;
  forceHover?: boolean;
  onAction: (label: string) => void;
}) {
  const visible = project.technologies.slice(0, MAX_VISIBLE_TECHNOLOGIES);
  const overflow = project.technologies.length - visible.length;

  return (
    <Card
      className={cn(
        "group h-full gap-0 overflow-hidden p-0 transition-all duration-200",
        "hover:-translate-y-1 hover:shadow-lg",
        forceHover && "-translate-y-1 shadow-lg",
      )}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover p-8 transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 via-muted to-background text-muted-foreground">
            <ImageOff className="size-6" aria-hidden />
            <span className="text-xs">{mockLabels.imageFallbackAlt}</span>
          </div>
        )}

        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-200 group-hover:opacity-100",
            forceHover && "opacity-100",
          )}
        />

        {project.featured ? (
          <Badge className="absolute top-2 left-2 z-10">
            {mockLabels.featured}
          </Badge>
        ) : null}
      </div>

      <CardContent className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <CardTitle className="line-clamp-2 text-base leading-snug">
            {project.title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm">
            {project.description[locale]}
          </CardDescription>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {visible.map((technology) => (
            <Badge key={technology} variant="outline">
              {technology}
            </Badge>
          ))}
          {overflow > 0 ? (
            <Badge variant="secondary">{`+${overflow}`}</Badge>
          ) : null}
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-2 border-t border-border p-5 pt-4">
        <Button
          size="sm"
          onClick={() => onAction(`${mockLabels.details} — ${project.slug}`)}
        >
          {mockLabels.details}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={!project.repoUrl}
          onClick={() => onAction(`${mockLabels.repo} — ${project.repoUrl}`)}
        >
          <SiGithub aria-hidden />
          {mockLabels.repo}
        </Button>
        <Button
          size="sm"
          variant="outline"
          disabled={!project.liveUrl}
          onClick={() => onAction(`${mockLabels.live} — ${project.liveUrl}`)}
        >
          <ExternalLink aria-hidden />
          {mockLabels.live}
        </Button>
      </CardFooter>
    </Card>
  );
}

/** Loading placeholder mirroring the card's own proportions. */
export function ProjectCardSkeleton() {
  return (
    <Card className="h-full gap-0 overflow-hidden p-0">
      <Skeleton className="aspect-video w-full" />
      <CardContent className="flex flex-col gap-3 p-5">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-5/6" />
        <div className="flex gap-1.5 pt-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-14" />
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 border-t border-border p-5 pt-4">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </CardFooter>
    </Card>
  );
}
