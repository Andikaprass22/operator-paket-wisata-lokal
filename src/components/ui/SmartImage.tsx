import { useState } from "react";

const FALLBACK_SRC = "/images/placeholder.svg";

export function SmartImage({
  src,
  alt,
  className = "",
  ratio = "aspect-[4/3]",
  fallbackLabel,
  fill = false,
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  ratio?: string;
  fallbackLabel?: string;
  fill?: boolean;
  priority?: boolean;
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  if (currentSrc !== src) {
    setCurrentSrc(src);
    setFailed(false);
  }

  const img = (
    <img
      src={failed ? FALLBACK_SRC : src}
      alt={alt}
      title={failed ? fallbackLabel : undefined}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover"
    />
  );

  if (fill) {
    return (
      <div className={`absolute inset-0 overflow-hidden bg-sand-200 ${className}`}>
        {img}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden bg-sand-200 ${ratio} ${className}`}>
      {img}
    </div>
  );
}
