import { Button } from "@/components/ui/button";
import { socialLinks } from "@/data/socials";
import { SocialIcon } from "@/components/shared/social-icon";
import { ContactForm, type ContactFormLabels } from "./contact-form";

export interface ContactSectionLabels {
  eyebrow: string;
  heading: string;
  form: ContactFormLabels;
  quickLinks: {
    heading: string;
    whatsapp: string;
    email: string;
    github: string;
    linkedin: string;
    whatsappMessage: string;
  };
  info: {
    responseTime: string;
    openTo: string;
  };
}

export function ContactSection({ contact }: { contact: ContactSectionLabels }) {
  const whatsapp = socialLinks.find((social) => social.id === "whatsapp");
  const quickLinks = [
    whatsapp?.href
      ? {
          id: "whatsapp" as const,
          label: contact.quickLinks.whatsapp,
          href: `${whatsapp.href}?text=${encodeURIComponent(contact.quickLinks.whatsappMessage)}`,
        }
      : null,
    ...socialLinks
      .filter((social) => social.id !== "whatsapp")
      .map((social) =>
        social.href
          ? {
              id: social.id,
              label: contact.quickLinks[social.id],
              href: social.href,
            }
          : null,
      ),
  ].filter((link): link is NonNullable<typeof link> => link !== null);

  return (
    <section
      id="contact"
      className="scroll-mt-[60px] border-t border-border px-5 py-16 md:scroll-mt-[72px] md:px-10 md:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-2 md:items-start md:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <span className="text-[13px] font-semibold tracking-[0.12em] text-primary uppercase">
              {contact.eyebrow}
            </span>
            <h2 className="font-heading text-[26px] font-bold tracking-tight md:text-[34px]">
              {contact.heading}
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold tracking-wide text-foreground uppercase">
              {contact.quickLinks.heading}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {quickLinks.map((link) => (
                <Button
                  key={link.id}
                  variant="outline"
                  nativeButton={false}
                  className="h-auto flex-col gap-2 py-4"
                  render={
                    <a
                      href={link.href}
                      target={link.id === "email" ? undefined : "_blank"}
                      rel={link.id === "email" ? undefined : "noreferrer"}
                    />
                  }
                >
                  <SocialIcon id={link.id} className="size-5" />
                  <span className="text-xs font-medium">{link.label}</span>
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1.5 text-sm text-muted-foreground">
            <p>{contact.info.responseTime}</p>
            <p>{contact.info.openTo}</p>
          </div>
        </div>

        <ContactForm labels={contact.form} />
      </div>
    </section>
  );
}
