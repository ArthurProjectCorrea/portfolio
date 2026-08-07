import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getProjectCodingTime } from "@/lib/wakatime";

/**
 * Coding-time badge for a single project, styled to match the site's own
 * badges rather than embedding WakaTime's external SVG. Renders nothing when
 * the API key is unset or the project has no WakaTime data — never blocks
 * the card/detail page on a third-party outage.
 */
export async function WakatimeBadge({
  project,
  label,
  className,
}: {
  project: string;
  label: string;
  className?: string;
}) {
  const stats = await getProjectCodingTime(project);
  if (!stats) return null;

  return (
    <span
      title={label}
      className={cn(
        "inline-flex items-center gap-1.5 border border-border px-2 py-0.5 text-xs text-muted-foreground",
        className,
      )}
    >
      <Clock className="size-3" aria-hidden />
      <span className="sr-only">{label}: </span>
      {stats.text}
    </span>
  );
}
