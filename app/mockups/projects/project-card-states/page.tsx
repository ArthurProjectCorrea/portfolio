"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import { mockProjects, type MockLocale } from "../mock-data";
import { ProjectCard, ProjectCardSkeleton } from "../project-card";

const CASES: { slug: string; caption: string }[] = [
  {
    slug: "portfolio",
    caption:
      "Projeto em destaque, com imagem, repositório público e sem deploy.",
  },
  {
    slug: "example-no-deploy",
    caption:
      "Sem imagem (fallback gráfico) e sem deploy — CTA 'Deploy' desabilitado.",
  },
  {
    slug: "example-no-repo",
    caption:
      "Com imagem e deploy, sem repositório — CTA 'GitHub' desabilitado.",
  },
  {
    slug: "example-long-copy",
    caption:
      "Título e descrição longos + 7 tecnologias: valida recorte de texto e excedente de badges.",
  },
  {
    slug: "example-links-none",
    caption: "Sem repositório e sem deploy — apenas 'Ver Detalhes' habilitado.",
  },
];

export default function ProjectCardStatesMockup() {
  const [locale, setLocale] = useState<MockLocale>("pt-BR");
  const [forceHover, setForceHover] = useState(false);
  const [lastAction, setLastAction] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">
            Anatomia e estados do card de projeto
          </h1>
          <p className="text-sm text-muted-foreground">
            Cada card abaixo isola uma variação de dados que o grid precisa
            suportar sem quebrar o alinhamento.
          </p>
        </header>

        <div className="flex flex-col gap-3 rounded-none border border-dashed border-border p-4">
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={forceHover ? "default" : "outline"}
              onClick={() => {
                setForceHover((value) => !value);
                setLastAction(
                  forceHover
                    ? "Hover forçado desligado"
                    : "Hover forçado ligado (elevação + overlay escuro)",
                );
              }}
            >
              Forçar hover
            </Button>
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {CASES.map((item) => {
            const project = mockProjects.find(
              (candidate) => candidate.slug === item.slug,
            );
            if (!project) return null;

            return (
              <figure key={item.slug} className="flex flex-col gap-2">
                <ProjectCard
                  project={project}
                  locale={locale}
                  forceHover={forceHover}
                  onAction={(label) => setLastAction(`Acionado: ${label}`)}
                />
                <figcaption className="text-xs text-muted-foreground">
                  {item.caption}
                </figcaption>
              </figure>
            );
          })}

          <figure className="flex flex-col gap-2">
            <ProjectCardSkeleton />
            <figcaption className="text-xs text-muted-foreground">
              Estado de carregamento com as mesmas proporções do card.
            </figcaption>
          </figure>
        </div>
      </div>
    </main>
  );
}
