import Link from "next/link";
import { Link2, Mail } from "lucide-react";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";

import type { Locale } from "@/lib/i18n-config";
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
    { href: `/${lang}/projects`, label: nav.projects },
    { href: `/${lang}/about`, label: nav.about },
    { href: `/${lang}/contact`, label: nav.contact },
  ];

  const socials = socialLinks.filter((social) => social.href !== null);

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 md:flex-row md:justify-between md:px-8 md:py-12">
        <div>
          <h2 className="mb-3 text-sm font-medium text-foreground">
            {footer.linksHeading}
          </h2>
          <nav className="grid grid-cols-2 gap-2 sm:grid-cols-4">
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

        <div>
          <h2 className="mb-3 text-sm font-medium text-foreground">
            {footer.socialHeading}
          </h2>
          <div className="flex gap-4">
            {socials.map((social) => {
              const Icon = socialIcons[social.id];
              return (
                <a
                  key={social.id}
                  href={social.href ?? undefined}
                  target={social.id === "email" ? undefined : "_blank"}
                  rel={social.id === "email" ? undefined : "noreferrer"}
                  aria-label={footer.socialNames[social.id]}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Icon className="size-5" />
                </a>
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
