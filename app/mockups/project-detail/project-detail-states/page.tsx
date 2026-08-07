"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { mockProjectDetails, type MockLocale } from "../mock-data";
import {
  ProjectDetailSkeleton,
  ProjectDetailView,
  ProjectNotFoundView,
} from "../project-detail-view";

type DetailState =
  "extended" | "facts-only" | "no-links" | "loading" | "not-found";

const STATES: { id: DetailState; label: string; note: string }[] = [
  {
    id: "extended",
    label: "Conteúdo estendido",
    note: "Projeto com descrição longa, destaques técnicos, papel e os dois links externos.",
  },
  {
    id: "facts-only",
    label: "Somente fatos do grid",
    note: "Projeto sem descrição longa, sem destaques e sem papel: a página cai para a descrição curta e omite as seções ausentes.",
  },
  {
    id: "no-links",
    label: "Sem repositório público",
    note: "Projeto com deploy mas sem repositório: a ação indisponível permanece visível e desabilitada.",
  },
  {
    id: "loading",
    label: "Carregando",
    note: "Esqueleto com as mesmas proporções da página real.",
  },
  {
    id: "not-found",
    label: "Slug inexistente",
    note: "Endereço que não corresponde a nenhum projeto publicado. Na tela real, isso é uma resposta 'não encontrado', nunca conteúdo fabricado.",
  },
];

export default function ProjectDetailStatesMockup() {
  const [state, setState] = useState<DetailState>("extended");
  const [locale, setLocale] = useState<MockLocale>("pt-BR");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const current = STATES.find((item) => item.id === state);

  const project =
    state === "facts-only"
      ? mockProjectDetails.find((item) => item.slug === "example-minimal")
      : state === "no-links"
        ? mockProjectDetails.find((item) => item.slug === "example-no-repo")
        : mockProjectDetails.find((item) => item.slug === "example-full");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-3 border border-dashed border-border p-4">
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
                const nextLocale = locale === "pt-BR" ? "en" : "pt-BR";
                setLocale(nextLocale);
                setLastAction(`Idioma do conteúdo: ${nextLocale}`);
              }}
            >
              {`Conteúdo: ${locale}`}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">{current?.note}</p>
          <p className="text-xs text-muted-foreground">
            {lastAction ?? "Nenhuma ação executada ainda."}
          </p>
        </div>

        {state === "loading" ? <ProjectDetailSkeleton /> : null}

        {state === "not-found" ? (
          <ProjectNotFoundView
            onAction={(label) => setLastAction(`Acionado: ${label}`)}
          />
        ) : null}

        {state !== "loading" && state !== "not-found" && project ? (
          <ProjectDetailView
            project={project}
            locale={locale}
            previousTitle={mockProjectDetails[0].title}
            nextTitle={undefined}
            onAction={(label) => setLastAction(`Acionado: ${label}`)}
          />
        ) : null}
      </div>
    </main>
  );
}
