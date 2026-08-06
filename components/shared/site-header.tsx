"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/i18n-config";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
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
  blog: string;
  contact: string;
  menu: string;
}

interface ModeToggleLabels {
  light: string;
  dark: string;
  system: string;
  toggle: string;
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}/projects`, label: nav.projects },
    { href: `/${lang}/about`, label: nav.about },
    { href: `/${lang}/blog`, label: nav.blog },
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  const isActive = (href: string) =>
    href === `/${lang}` ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 flex h-[60px] items-center justify-between border-b border-transparent bg-background/80 px-4 backdrop-blur-sm transition-shadow md:px-8",
        scrolled && "border-border shadow-sm",
      )}
    >
      <Link
        href={`/${lang}`}
        className="flex h-8 items-center border border-foreground bg-foreground px-2 text-xs font-bold tracking-tight text-background [font-family:var(--font-sans)] sm:text-sm"
      >
        {nav.brand}
      </Link>

      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                active={isActive(link.href)}
                render={<Link href={link.href} />}
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
            <SheetTitle className="p-4 pb-0">{nav.brand}</SheetTitle>
            <nav className="flex flex-col gap-1 p-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                    isActive(link.href) && "bg-muted text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
