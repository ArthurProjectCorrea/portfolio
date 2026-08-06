export type SocialId = "github" | "linkedin" | "email" | "whatsapp";

export interface SocialLink {
  id: SocialId;
  /** Set to null until the real URL is available; the footer skips null entries. */
  href: string | null;
}

// Source: CURRICULUM.md. Set `href` here when a new channel becomes
// available (e.g. linkedin) — no other file needs touching.
export const socialLinks: SocialLink[] = [
  { id: "github", href: "https://github.com/ArthurProjectCorrea" },
  { id: "email", href: "mailto:arthurdepaulacorrea@hotmail.com" },
  { id: "whatsapp", href: "https://wa.me/5565981366997" },
  { id: "linkedin", href: null },
];
