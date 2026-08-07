"use client";

import { ArrowLeft, ArrowRight, ExternalLink, ImageOff } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import {
  mockLabels,
  type MockLocale,
  type MockProjectDetail,
} from "./mock-data";

/**
 * Mockup-only detail view. Presentational: every action just reports through
 * `onAction` so the screens are clickable without real navigation.
 */
export function ProjectDetailView({
  project,
  locale,
  previousTitle,
  nextTitle,
  onAction,
}: {
  project: MockProjectDetail;
  locale: MockLocale;
  previousTitle?: string;
  nextTitle?: string;
  onAction: (label: string) => void;
}) {
  const paragraphs = project.longDescription?.[locale];
  const highlights = project.highlights?.[locale];

  return (
    <article className="flex flex-col gap-8">
      <nav aria-label="Trilha de navegação">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <li>
            <button
              type="button"
              className="underline-offset-4 hover:underline"
              onClick={() => onAction("Trilha — Início")}
            >
              {mockLabels.breadcrumbHome}
            </button>
          </li>
          <li aria-hidden>/</li>
          <li>
            <button
              type="button"
              className="underline-offset-4 hover:underline"
              onClick={() => onAction("Trilha — Projetos")}
            >
              {mockLabels.breadcrumbProjects}
            </button>
          </li>
          <li aria-hidden>/</li>
          <li aria-current="page" className="text-foreground">
            {project.title}
          </li>
        </ol>
      </nav>

      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-muted">
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/15 via-muted to-background text-muted-foreground">
          <ImageOff className="size-8" aria-hidden />
          <span className="text-xs">{mockLabels.imageFallbackAlt}</span>
        </div>
        {project.featured ? (
          <Badge className="absolute top-3 left-3 z-10">
            {mockLabels.featured}
          </Badge>
        ) : null}
      </div>

      <header className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.title}
        </h1>
        <p className="max-w-[68ch] text-lg text-muted-foreground">
          {project.description[locale]}
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            disabled={!project.repoUrl}
            onClick={() => onAction(`${mockLabels.repo} — ${project.repoUrl}`)}
          >
            <SiGithub aria-hidden />
            {mockLabels.repo}
          </Button>
          <Button
            variant="outline"
            disabled={!project.liveUrl}
            onClick={() => onAction(`${mockLabels.live} — ${project.liveUrl}`)}
          >
            <ExternalLink aria-hidden />
            {mockLabels.live}
          </Button>
        </div>
      </header>

      <Separator />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-8">
          <section className="flex flex-col gap-3">
            <h2 className="text-xl font-semibold">{mockLabels.about}</h2>
            {paragraphs && paragraphs.length > 0 ? (
              paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="max-w-[68ch] leading-relaxed text-muted-foreground"
                >
                  {paragraph}
                </p>
              ))
            ) : (
              <p className="max-w-[68ch] leading-relaxed text-muted-foreground">
                {project.description[locale]}
              </p>
            )}
          </section>

          {highlights && highlights.length > 0 ? (
            <section className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold">{mockLabels.highlights}</h2>
              <ul className="flex max-w-[68ch] list-disc flex-col gap-2 pl-5 text-muted-foreground">
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="lg:sticky lg:top-8 lg:self-start">
          <Card>
            <CardContent className="flex flex-col gap-4 p-5">
              <h2 className="text-sm font-semibold tracking-wide uppercase">
                {mockLabels.factSheet}
              </h2>
              <dl className="flex flex-col gap-3 text-sm">
                <div className="flex flex-col gap-1">
                  <dt className="text-muted-foreground">
                    {mockLabels.completedAt}
                  </dt>
                  <dd>{project.completedAt}</dd>
                </div>
                {project.role ? (
                  <div className="flex flex-col gap-1">
                    <dt className="text-muted-foreground">{mockLabels.role}</dt>
                    <dd>{project.role[locale]}</dd>
                  </div>
                ) : null}
                <div className="flex flex-col gap-2">
                  <dt className="text-muted-foreground">
                    {mockLabels.technologies}
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {project.technologies.map((technology) => (
                      <Badge key={technology} variant="outline">
                        {technology}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Separator />

      <nav
        aria-label="Navegação entre projetos"
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <Button
          variant="ghost"
          disabled={!previousTitle}
          onClick={() => onAction(`${mockLabels.previous} — ${previousTitle}`)}
        >
          <ArrowLeft aria-hidden />
          {previousTitle ?? mockLabels.previous}
        </Button>
        <Button variant="outline" onClick={() => onAction(mockLabels.back)}>
          {mockLabels.back}
        </Button>
        <Button
          variant="ghost"
          disabled={!nextTitle}
          onClick={() => onAction(`${mockLabels.next} — ${nextTitle}`)}
        >
          {nextTitle ?? mockLabels.next}
          <ArrowRight aria-hidden />
        </Button>
      </nav>
    </article>
  );
}

/** Loading placeholder mirroring the detail view's own proportions. */
export function ProjectDetailSkeleton() {
  return (
    <div className="flex flex-col gap-8">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="aspect-video w-full rounded-lg" />
      <div className="flex flex-col gap-3">
        <Skeleton className="h-9 w-2/3" />
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-4/5" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    </div>
  );
}

/** View shown when the requested slug matches no published project. */
export function ProjectNotFoundView({
  onAction,
}: {
  onAction: (label: string) => void;
}) {
  return (
    <Empty className="border border-border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ImageOff />
        </EmptyMedia>
        <EmptyTitle>{mockLabels.notFoundTitle}</EmptyTitle>
        <EmptyDescription>{mockLabels.notFoundDescription}</EmptyDescription>
      </EmptyHeader>
      <Button variant="outline" onClick={() => onAction(mockLabels.back)}>
        <ArrowLeft aria-hidden />
        {mockLabels.back}
      </Button>
    </Empty>
  );
}
