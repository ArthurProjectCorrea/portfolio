import Link from "next/link";
import { lang } from "next/root-params";
import { ArrowLeft, FolderGit2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { defaultLocale, hasLocale } from "@/lib/i18n-config";
import { getDictionary } from "../../dictionaries";

export default async function ProjectNotFound() {
  const rawLocale = await lang();
  // The boundary can render for an address whose locale never resolved, so it
  // falls back to the default locale instead of failing with the page.
  const locale = hasLocale(rawLocale) ? rawLocale : defaultLocale;
  const dict = await getDictionary();

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 px-6 py-12 md:px-8">
      <Empty className="border border-border">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <FolderGit2 />
          </EmptyMedia>
          <EmptyTitle>{dict.projectDetail.notFound.title}</EmptyTitle>
          <EmptyDescription>
            {dict.projectDetail.notFound.description}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="outline"
            nativeButton={false}
            render={<Link href={`/${locale}/projects`} />}
          >
            <ArrowLeft aria-hidden />
            {dict.projectDetail.back}
          </Button>
        </EmptyContent>
      </Empty>
    </section>
  );
}
