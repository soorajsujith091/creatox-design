"use client";
import { type ImageProps } from "next/image";
import { PageImage } from "./cms/PageContent";
import { useEffect, useState } from "react";
let imageRequest: Promise<Record<string, string>> | undefined;
export function CmsImage({ slot, ...props }: ImageProps & { slot: string }) {
  const [override, setOverride] = useState<string>();
  useEffect(() => {
    let active = true;
    imageRequest ??= fetch("/api/images").then(response => response.ok ? response.json() : {}).catch(() => ({}));
    imageRequest.then(images => { if (active && images[slot]) setOverride(images[slot]); });
    return () => { active = false; };
  }, [slot]);
  return <PageImage field={`slot_${slot}`} section="Website images" {...props} alt={props.alt} src={override || props.src} unoptimized={!!override || props.unoptimized} />;
}
