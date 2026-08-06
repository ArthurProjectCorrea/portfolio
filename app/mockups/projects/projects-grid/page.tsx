"use client";

import { useState } from "react";
import { FolderGit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";

import { mockLabels, mockProjects, type MockLocale } from "../mock-data";
import { ProjectCard, ProjectCardSkeleton } from "../project-card";

type GridState = "default" | "featured-only" | "loading" | "empty" | "single";

const STATES: { id: GridState; label: string }[] = [
  { id: "default", label: "Lista completa" },
  { id: "featured-only", label: "Somente destaques" },
  { id: "single", label: "Um único projeto" },
  { id: "loading", label: "Carregando" },
  { id: "empty", label: "Vazio" },
];

export default function ProjectsGridMockup() {
  const [state, setState] = useState<GridState>("default");
  const [locale, setLocale] = useState<MockLocale>("pt-BR");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const projects =
    state === "featured-only"
      ? mockProjects.filter((project) => project.featured)
      : state === "single"
        ? mockProjects.slice(0, 1)
        : mockProjects;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-10">
        <div className="flex flex-col gap-3 rounded-none border border-dashed border-border p-4">
          <p className="text-xs text-muted-foreground">
            Painel de controle do mockup (não faz parte da tela real).
          </p>
          <div className="flex flex-wrap gap-2">
            {STATES.map((item) => (
              <Button
                key={item.id}
                size="sm"
                variant={state === item.id ? "default" : "outline"}
                onClick={() => {
                  setState(item.id);
                  setLastAction(`Estado alterado para: ${item.label}`);
                }}
              >
                {item.label}
              </Button>
            ))}
            <Separator orientation="vertical" className="h-8" />
            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                const next = locale === "pt-BR" ? "en" : "pt-BR";
                setLocale(next);
                setLastAction(`Idioma da descrição: ${next}`);
              }}
            >
              {`Descrição: ${locale}`}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {lastAction ?? "Nenhuma ação executada ainda."}
          </p>
        </div>

        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            {mockLabels.heading}
          </h1>
          <p className="text-muted-foreground">{mockLabels.subheading}</p>
        </header>

        {state === "loading" ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {state === "empty" ? (
          <Empty className="border border-border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <FolderGit2 />
              </EmptyMedia>
              <EmptyTitle>{mockLabels.emptyTitle}</EmptyTitle>
              <EmptyDescription>{mockLabels.emptyDescription}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : null}

        {state !== "loading" && state !== "empty" ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                onAction={(label) => setLastAction(`Acionado: ${label}`)}
              />
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
