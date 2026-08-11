import {
  Bot,
  Cloud,
  Code2,
  Database,
  Server,
  Sparkles,
  Wrench,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Progress } from "@/components/ui/progress";
import { renderTechnologyIcon } from "@/components/shared/technology-icon";
import {
  technologyCategories,
  type TechnologyCategory,
} from "@/data/technologies";
import { getTopSkillsByCategory } from "@/lib/skills";

const categoryIcons: Record<TechnologyCategory, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  database: Database,
  devops: Cloud,
  tools: Wrench,
  ai: Bot,
};

export interface SkillsSectionLabels {
  eyebrow: string;
  heading: string;
  categories: Record<TechnologyCategory, string>;
  empty: {
    title: string;
    description: string;
  };
}

export function SkillsSection({ skills }: { skills: SkillsSectionLabels }) {
  const skillsByCategory = getTopSkillsByCategory();
  const categoriesWithSkills = technologyCategories.filter(
    (category) => skillsByCategory[category].length > 0,
  );

  return (
    <section
      id="skills"
      className="scroll-mt-[60px] border-t border-border px-5 py-16 md:scroll-mt-[72px] md:px-10 md:py-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <div className="flex flex-col gap-2">
          <span className="text-[13px] font-semibold tracking-[0.12em] text-primary uppercase">
            {skills.eyebrow}
          </span>
          <h2 className="font-heading text-[26px] font-bold tracking-tight md:text-[34px]">
            {skills.heading}
          </h2>
        </div>

        {categoriesWithSkills.length === 0 ? (
          <Empty className="border border-border">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Sparkles />
              </EmptyMedia>
              <EmptyTitle>{skills.empty.title}</EmptyTitle>
              <EmptyDescription>{skills.empty.description}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categoriesWithSkills.map((category) => {
              const CategoryIcon = categoryIcons[category];
              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 uppercase tracking-wide">
                      <CategoryIcon
                        className="size-4 text-primary"
                        aria-hidden
                      />
                      {skills.categories[category]}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex flex-col gap-4">
                    {skillsByCategory[category].map(({ technology, level }) => (
                      <div
                        key={technology.id}
                        className="flex flex-col gap-1.5"
                      >
                        <div className="flex items-center justify-between gap-2 text-xs font-medium">
                          <span className="flex items-center gap-1.5 [&>svg]:size-3.5">
                            {renderTechnologyIcon(technology)}
                            {technology.name}
                          </span>
                          <span className="text-muted-foreground tabular-nums">
                            {level}%
                          </span>
                        </div>
                        <Progress value={level} aria-label={technology.name} />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
