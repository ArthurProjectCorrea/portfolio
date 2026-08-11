import type { ComponentType } from "react";
import { Link2, Mail } from "lucide-react";
import { SiGithub, SiWhatsapp } from "@icons-pack/react-simple-icons";
import type { SocialId } from "@/data/socials";

// Simple Icons dropped its LinkedIn glyph after a cease-and-desist, and
// lucide never carried a brand icon either — Link2 is a neutral stand-in
// until an alternative brand-icon source is picked.
export const socialIcons: Record<
  SocialId,
  ComponentType<{ className?: string }>
> = {
  github: SiGithub,
  linkedin: Link2,
  email: Mail,
  whatsapp: SiWhatsapp,
};

export function SocialIcon({
  id,
  className,
}: {
  id: SocialId;
  className?: string;
}) {
  const Icon = socialIcons[id];
  return <Icon className={className} />;
}
