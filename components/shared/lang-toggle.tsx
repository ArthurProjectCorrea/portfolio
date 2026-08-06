"use client";

import { Languages } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { locales, type Locale } from "@/lib/i18n-config";

interface LangToggleLabels {
  toggle: string;
  locales: Record<Locale, string>;
}

export function LangToggle({
  lang,
  labels,
}: {
  lang: Locale;
  labels: LangToggleLabels;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (target: string) => {
    const segments = pathname.split("/");
    segments[1] = target;
    router.push(segments.join("/"));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="icon" />}>
        <Languages />
        <span className="sr-only">{labels.toggle}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={lang} onValueChange={switchTo}>
          {locales.map((locale) => (
            <DropdownMenuRadioItem key={locale} value={locale}>
              {labels.locales[locale]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
