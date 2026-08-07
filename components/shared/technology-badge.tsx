import { Badge } from "@/components/ui/badge";
import { renderTechnologyIcon } from "@/components/shared/technology-icon";
import type { Technology } from "@/data/technologies";

/** Outline badge tinted with the technology's brand color and icon, when set. */
export function TechnologyBadge({
  technology,
  className,
}: {
  technology: Technology;
  className?: string;
}) {
  return (
    <Badge
      variant="outline"
      className={className}
      style={
        technology.color
          ? { borderColor: technology.color, color: technology.color }
          : undefined
      }
    >
      {renderTechnologyIcon(technology.id, technology.color)}
      {technology.name}
    </Badge>
  );
}
