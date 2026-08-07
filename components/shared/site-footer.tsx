import Link from "next/link";
import { Link2, Mail } from "lucide-react";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";

import type { Locale } from "@/lib/i18n-config";
import { Button } from "@/components/ui/button";
import { socialLinks, type SocialId } from "@/data/socials";

// Simple Icons dropped its LinkedIn glyph after a cease-and-desist, and
// lucide never carried a brand icon either — Link2 is a neutral stand-in
// until an alternative brand-icon source is picked.
const socialIcons: Record<
  SocialId,
  React.ComponentType<{ className?: string }>
> = {
  github: SiGithub,
  linkedin: Link2,
  email: Mail,
  whatsapp: SiWhatsapp,
};

interface SiteFooterNavLabels {
  home: string;
  projects: string;
  about: string;
  contact: string;
}

interface SiteFooterLabels {
  linksHeading: string;
  socialHeading: string;
  copyright: string;
  builtWith: string;
  socialNames: Record<SocialId, string>;
}

export function SiteFooter({
  lang,
  nav,
  footer,
}: {
  lang: Locale;
  nav: SiteFooterNavLabels;
  footer: SiteFooterLabels;
}) {
  const links = [
    { href: `/${lang}`, label: nav.home },
    { href: `/${lang}#projects`, label: nav.projects },
    { href: `/${lang}/about`, label: nav.about },
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  const socials = socialLinks.filter((social) => social.href !== null);

  return (
    <footer className="border-t border-border bg-[color-mix(in_oklch,var(--background),black_6%)]">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:justify-between md:gap-20 md:px-8 md:py-14">
        <div className="flex flex-col gap-4">
          <h2 className="text-[13px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            {footer.linksHeading}
          </h2>
          <nav className="grid grid-cols-2 gap-x-8 gap-y-2.5 md:grid-cols-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-[13px] font-bold tracking-[0.08em] text-muted-foreground uppercase">
            {footer.socialHeading}
          </h2>
          <div className="flex gap-2.5">
            {socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <Button
                  key={social.id}
                  variant="outline"
                  size="icon"
                  nativeButton={false}
                  render={
                    <a
                      href={social.href ?? undefined}
                      target={social.id === "email" ? undefined : "_blank"}
                      rel={social.id === "email" ? undefined : "noreferrer"}
                    />
                  }
                >
                  <Icon className="size-4" />
                  <span className="sr-only">
                    {footer.socialNames[social.id]}
                  </span>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between md:px-8">
          <p>
            © {new Date().getFullYear()} {footer.copyright}
          </p>
          <p>{footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
