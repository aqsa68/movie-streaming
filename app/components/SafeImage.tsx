// app/components/SafeImage.tsx
"use client";
import { ImgHTMLAttributes, useState } from "react";

interface SafeImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

export default function SafeImage({ fallback = "https://via.placeholder.com/600x900?text=No+Image", alt = "", ...props }: SafeImageProps) {
  const [errored, setErrored] = useState(false);
  const src = errored ? fallback : (props.src as string|undefined);
  return <img {...props} src={src} alt={alt} loading="lazy" onError={() => setErrored(true)} />;
}
