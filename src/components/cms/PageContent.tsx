"use client";
import { createContext, useContext, useEffect, useState, useCallback, useMemo, useRef, forwardRef, type ReactNode, type AnchorHTMLAttributes, type ImgHTMLAttributes, type HTMLAttributes, type CSSProperties } from "react";
import { usePathname } from "next/navigation";
import Image, { type ImageProps } from "next/image";
import Link, { type LinkProps } from "next/link";

export type PageField = { id: string; section: string; label: string; kind: "text" | "image" | "link"; original: string };
export type PageValues = Record<string, { kind: PageField["kind"]; value: string }>;
const Context = createContext<{ values: PageValues; register: (field: PageField) => () => void }>({ values: {}, register: () => () => {} });
function fingerprint(value: string) { let hash = 2166136261; for (let i = 0; i < value.length; i++) hash = Math.imul(hash ^ value.charCodeAt(i), 16777619); return (hash >>> 0).toString(36); }
export function PageContentProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [values, setValues] = useState<PageValues>({});
  const registry = useRef(new Map<string, PageField>());
  const timer = useRef<ReturnType<typeof setTimeout>>();
  const pathRef = useRef(pathname); pathRef.current = pathname;
  const emit = useCallback(() => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      if (window.parent !== window && new URLSearchParams(window.location.search).get("cms-preview") === "1") window.parent.postMessage({ type: "creatox:fields", path: pathRef.current, fields: Array.from(registry.current.values()) }, window.location.origin);
    }, 150);
  }, []);
  const register = useCallback((field: PageField) => { registry.current.set(field.id, field); emit(); return () => { registry.current.delete(field.id); emit(); }; }, [emit]);
  useEffect(() => {
    if (pathname.startsWith("/admin")) { setValues({}); return; }
    let active = true;
    const path = pathname === "/" ? "/" : `/${pathname.split("/").filter(Boolean).join("/")}/`;
    const preview = new URLSearchParams(window.location.search).get("cms-preview") === "1";
    const load = () => fetch(`/api/page-content?path=${encodeURIComponent(path)}${preview ? "&preview=1" : ""}`).then(response => response.ok ? response.json() : { content: {} }).then(data => { if (active) { setValues(data.content || {}); emit(); } }).catch(() => { if (active) setValues({}); });
    setValues({}); void load();
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== window.parent || !preview) return;
      if (event.data?.type === "creatox:refresh") void load();
      if (event.data?.type === "creatox:preview" && event.data.content) setValues(event.data.content);
      if (event.data?.type === "creatox:collect") emit();
    };
    window.addEventListener("message", onMessage);
    return () => { active = false; window.removeEventListener("message", onMessage); clearTimeout(timer.current); };
  }, [pathname, emit]);
  const context = useMemo(() => ({ values, register }), [values, register]);
  return <Context.Provider value={context}>{children}</Context.Provider>;
}
function useField(field: string, section: string, kind: PageField["kind"], original: string, label: string) {
  const { values, register } = useContext(Context);
  const id = `${field}_${fingerprint(original)}`;
  useEffect(() => {
    if (!original.trim()) return;
    return register({ id, section, kind, original, label });
  }, [register, id, section, kind, original, label]);
  return values[id]?.kind === kind ? values[id].value : original;
}
export function usePageText(field: string, section: string, original: string) { return useField(field, section, "text", original, "Animated text"); }
export function PageText({ field, section, children, label = "Text" }: { field: string; section: string; children: ReactNode; label?: string }) {
  const original = typeof children === "string" || typeof children === "number" ? String(children) : "";
  const value = useField(field, section, "text", original, label);
  return <>{original ? value : children}</>;
}
export function PageImage({ field, section, ...props }: ImageProps & { field: string; section: string }) {
  const original = typeof props.src === "string" ? props.src : "";
  const value = useField(field, section, "image", original, props.alt || "Decorative image");
  return <Image {...props} alt={props.alt} src={value || props.src} unoptimized={value !== original || props.unoptimized} />;
}
export function PageNativeImage({ field, section, ...props }: ImgHTMLAttributes<HTMLImageElement> & { field: string; section: string }) {
  const value = useField(field, section, "image", props.src || "", props.alt || "Image");
  // Uploaded library URLs are served directly by Laravel.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={value || props.src} alt={props.alt || ""} />;
}
export function PageLink({ field, section, ...props }: LinkProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & { field: string; section: string }) {
  const original = typeof props.href === "string" ? props.href : "";
  const value = useField(field, section, "link", original, "Link destination");
  return <Link {...props} href={value || props.href} />;
}
export function PageAnchor({ field, section, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { field: string; section: string }) {
  const value = useField(field, section, "link", props.href || "", "Link destination");
  return <a {...props} href={value || props.href} />;
}
export const PageBackground = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { field: string; section: string; image: string }>(function PageBackground({ field, section, image, style, ...props }, ref) {
  const value = useField(field, section, "image", image, "Background image");
  return <div {...props} ref={ref} style={{ ...style, "--cms-background-image": `url(${JSON.stringify(value)})` } as CSSProperties} />;
});
