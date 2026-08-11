"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ProjectVisual } from "@/components/shared/project-visual";

/**
 * Detail page cover: a single static visual when there's just one image, a
 * full carousel once there's more than one — never shows carousel controls
 * for a project that doesn't need them.
 */
export function ProjectCoverCarousel({
  images,
  title,
  fallbackAlt,
  featuredLabel,
}: {
  images: string[];
  title: string;
  fallbackAlt: string;
  featuredLabel?: string;
}) {
  if (images.length <= 1) {
    return (
      <ProjectVisual
        image={images[0]}
        title={title}
        fallbackAlt={fallbackAlt}
        featuredLabel={featuredLabel}
        className="aspect-video md:aspect-[21/9]"
        sizes="100vw"
      />
    );
  }

  return (
    <Carousel className="relative">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={image}>
            <ProjectVisual
              image={image}
              title={`${title} (${index + 1}/${images.length})`}
              fallbackAlt={fallbackAlt}
              featuredLabel={featuredLabel}
              className="aspect-video md:aspect-[21/9]"
              sizes="100vw"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
