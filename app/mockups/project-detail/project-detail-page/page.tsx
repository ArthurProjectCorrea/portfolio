"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { mockLabels, mockProjectDetails, type MockLocale } from "../mock-data";
import { ProjectDetailView } from "../project-detail-view";

export default function ProjectDetailPageMockup() {
  const [index, setIndex] = useState(0);
  const [locale, setLocale] = useState<MockLocale>("pt-BR");
  const [lastAction, setLastAction] = useState<string | null>(null);

  const project = mockProjectDetails[index];
  const previous = mockProjectDetails[index - 1];
  const next = mockProjectDetails[index + 1];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-6 py-10">
        <div className="flex flex-col gap-3 border border-dashed border-border p-4">
          <p className="text-xs text-muted-foreground">
            Painel de controle do mockup (não faz parte da tela real). Cada
            botão simula o acesso a `/{"{lang}"}/projects/{"{slug}"}` de um
            projeto diferente.
          </p>
          <div className="flex flex-wrap gap-2">
            {mockProjectDetails.map((item, itemIndex) => (
              <Button
                key={item.slug}
                size="sm"
                variant={index === itemIndex ? "default" : "outline"}
                onClick={() => {
                  setIndex(itemIndex);
                  setLastAction(`Slug acessado: ${item.slug}`);
                }}
              >
                {item.slug}
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
          <p className="text-xs text-muted-foreground">
            {lastAction ?? "Nenhuma ação executada ainda."}
          </p>
        </div>

        <ProjectDetailView
          project={project}
          locale={locale}
          previousTitle={previous?.title}
          nextTitle={next?.title}
          onAction={(label) => setLastAction(`Acionado: ${label}`)}
        />

        <p className="text-xs text-muted-foreground">
          Rótulos simulados nesta tela ({mockLabels.breadcrumbProjects},{" "}
          {mockLabels.back}, {mockLabels.repo}, {mockLabels.live}) vêm dos
          dicionários por locale no módulo real.
        </p>
      </div>
    </main>
  );
}
