"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { getSectionHref } from "@/lib/nav-links";
import type { Locale } from "@/lib/i18n-config";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { LangToggle } from "@/components/shared/lang-toggle";

interface SiteHeaderNavLabels {
  brand: string;
  home: string;
  projects: string;
  about: string;
  skills: string;
  contact: string;
  menu: string;
  menuTitle: string;
}

interface ModeToggleLabels {
  light: string;
  dark: string;
  system: string;
  toggle: string;
  footerLabel: string;
}

interface LangToggleLabels {
  toggle: string;
  locales: Record<Locale, string>;
}

export function SiteHeader({
  lang,
  nav,
  themeLabels,
  langLabels,
}: {
  lang: Locale;
  nav: SiteHeaderNavLabels;
  themeLabels: ModeToggleLabels;
  langLabels: LangToggleLabels;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const isHome = pathname === `/${lang}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy for the home page's anchor sections (#home, #about,
  // #projects) — the nav item for whichever section is currently in view
  // gets the active underline, instead of only reacting to the pathname.
  useEffect(() => {
    if (!isHome) return;

    const sections = ["home", "about", "skills", "projects", "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const mostVisible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (mostVisible) setActiveSection(mostVisible.target.id);
      },
      { rootMargin: "-96px 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    sections.forEach((section) => observer.observe(section));

    // The rootMargin above shrinks the observed viewport from the bottom, so
    // the last section can never scroll up into that shrunk window once the
    // page is scrolled all the way down — force it active at page bottom.
    const lastSectionId = sections[sections.length - 1].id;
    function onScroll() {
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) setActiveSection(lastSectionId);
    }
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const links = [
    { href: getSectionHref(lang, "home"), label: nav.home },
    { href: getSectionHref(lang, "about"), label: nav.about },
    { href: getSectionHref(lang, "skills"), label: nav.skills },
    { href: getSectionHref(lang, "projects"), label: nav.projects },
    { href: getSectionHref(lang, "contact"), label: nav.contact },
  ];

  const isActive = (href: string) => {
    const [path, hash] = href.split("#");
    if (path === `/${lang}`) {
      if (!isHome) return false;
      const current = activeSection ?? "home";
      return hash ? current === hash : current === "home";
    }
    return pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-[60px] items-center justify-between gap-3 border-b border-border bg-background/80 px-5 backdrop-blur-sm transition-shadow md:h-[72px] md:px-10",
        scrolled && "shadow-sm",
      )}
    >
      <Link
        href={`/${lang}`}
        className="min-w-0 shrink truncate font-heading text-[22px] font-bold tracking-tight text-foreground transition-opacity hover:opacity-80 md:text-[40px]"
      >
        {nav.brand}
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList className="gap-6">
          {links.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                active={isActive(link.href)}
                render={<Link href={link.href} />}
                className={cn(
                  "rounded-none border-b-2 border-transparent bg-transparent px-1 py-2 text-sm font-medium text-muted-foreground normal-case transition-colors hover:bg-transparent hover:text-foreground focus:bg-transparent",
                  isActive(link.href) &&
                    "border-primary text-primary hover:text-primary data-active:bg-transparent",
                )}
              >
                {link.label}
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-2">
        <LangToggle lang={lang} labels={langLabels} />
        <ModeToggle labels={themeLabels} />

        <Sheet open={open} onOpenChange={setOpen}>
          <Button
            variant="outline"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu />
            <span className="sr-only">{nav.menu}</span>
          </Button>
          <SheetContent side="right" className="md:hidden">
            <SheetTitle className="p-4 pb-0">{nav.menuTitle}</SheetTitle>
            <nav className="flex flex-col p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "border-b border-border py-3 text-base font-medium text-foreground transition-colors last:border-none hover:text-primary",
                    isActive(link.href) && "text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <SheetFooter className="flex-row items-center justify-between border-t border-border">
              <span className="text-sm text-muted-foreground">
                {themeLabels.footerLabel}
              </span>
              <ModeToggle labels={themeLabels} />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
