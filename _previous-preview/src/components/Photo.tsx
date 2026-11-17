import { photos, type PhotoId } from "../photos";

export function Photo({
  id,
  alt,
  className,
  priority = false,
}: {
  id: PhotoId;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const photo = photos[id];
  return (
    <img
      className={className}
      src={photo.src}
      width={photo.w}
      height={photo.h}
      alt={alt}
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}
