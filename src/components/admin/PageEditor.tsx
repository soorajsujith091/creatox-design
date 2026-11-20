"use client";
import { useEffect, useRef, useState } from "react";
import { FileText, Eye, Save, Send, RotateCcw, Search } from "lucide-react";
import type { PageField, PageValues } from "@/components/cms/PageContent";
import type { Media } from "@/lib/cms/types";
import "./page-editor.css";
type Page = { path: string; title: string; group: string };
export function PageEditor({ media }: { media: Media[] }) {
  const [pages, setPages] = useState<Page[]>([]);
  const [path, setPath] = useState("/");
  const [fields, setFields] = useState<PageField[]>([]);
  const [content, setContent] = useState<PageValues>({});
  const [version, setVersion] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [query, setQuery] = useState("");
  const [pageSearch, setPageSearch] = useState("");
  const [section, setSection] = useState("");
  const preview = useRef<HTMLIFrameElement>(null);
  useEffect(() => { fetch("/api/cms/pages").then(async response => { const data = await response.json(); if (!response.ok) throw new Error(data.error); setPages(data); }).catch(error => setNotice(error.message)); }, []);
  useEffect(() => {
    let active = true; setReady(false); setFields([]); setQuery(""); setSection("");
    fetch(`/api/cms/pages?path=${encodeURIComponent(path)}`).then(async response => {
      const data = await response.json(); if (!response.ok) throw new Error(data.error);
      if (active) { setContent(data.draft || {}); setVersion(data.version); setDirty(false); setReady(true); }
    }).catch(error => { if (active) setNotice(error.message); });
    return () => { active = false; };
  }, [path]);
  useEffect(() => {
    const receive = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== preview.current?.contentWindow || event.data?.type !== "creatox:fields") return;
      const receivedPath = event.data.path === "/" ? "/" : `/${String(event.data.path).split("/").filter(Boolean).join("/")}/`;
      if (receivedPath === path && Array.isArray(event.data.fields)) setFields(event.data.fields);
    };
    window.addEventListener("message", receive); return () => window.removeEventListener("message", receive);
  }, [path]);
  useEffect(() => {
    if (ready) preview.current?.contentWindow?.postMessage({ type: "creatox:preview", content }, window.location.origin);
  }, [content, ready]);
  async function save(action: "draft" | "publish" | "restore") {
    if (action === "restore" && !window.confirm("Discard this draft and return to the published version?")) return;
    setBusy(true); setNotice("");
    try {
      const response = await fetch("/api/cms/pages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path, content, version, action }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || data.message || "Unable to save.");
      setVersion(data.version); setDirty(false);
      if (action === "restore") { const restored = await fetch(`/api/cms/pages?path=${encodeURIComponent(path)}`).then(r => r.json()); setContent(restored.draft || {}); }
      setNotice(action === "publish" ? "Page published. Visitors will see the changes on their next page load." : action === "draft" ? "Draft saved. The live website is unchanged." : "Published version restored to the editor.");
    } catch (error) { setNotice((error as Error).message); } finally { setBusy(false); }
  }
  function update(field: PageField, value: string) {
    setContent(current => ({ ...current, [field.id]: { kind: field.kind, value } })); setDirty(true);
  }
  function choosePage(nextPath: string) {
    if (nextPath === path || busy) return;
    if (dirty && !window.confirm("Leave this page? Unsaved edits will be lost.")) return;
    setPath(nextPath); setNotice("");
  }
  const sections = Array.from(new Set(fields.map(field => field.section)));
  const visible = fields.filter(field => (!section || field.section === section) && `${field.original} ${field.section} ${field.label}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="cms-pages-editor">
    <nav className="cms-page-directory" aria-label="Website page navigation">
      <div className="cms-page-directory-top"><div><h2>Website pages</h2><p>Select a page to edit its sections, text, and images.</p></div><label><Search size={16} aria-hidden="true" /> Find a page<input type="search" value={pageSearch} onChange={event => setPageSearch(event.target.value)} placeholder="Search page name or URL" /></label></div>
      <div className="cms-page-directory-groups">{["Main pages", "Services", "Projects", "Articles"].map(group => {
        const matches = pages.filter(page => page.group === group && `${page.title} ${page.path}`.toLowerCase().includes(pageSearch.toLowerCase()));
        if (!matches.length) return null;
        return <div key={group} className="cms-page-nav-group"><h3>{group} <span>{matches.length}</span></h3><ul>{matches.map(page => <li key={page.path}><button type="button" aria-current={path === page.path ? "page" : undefined} disabled={busy} onClick={() => choosePage(page.path)}><FileText size={14} aria-hidden="true" /><span>{page.title}<small>{page.path}</small></span></button></li>)}</ul></div>;
      })}</div>
      {!!pages.length && !pages.some(page => `${page.title} ${page.path}`.toLowerCase().includes(pageSearch.toLowerCase())) && <p className="cms-empty">No pages match your search.</p>}
    </nav>
    <div className="cms-pages-toolbar"><label>Choose a page<select value={path} onChange={event => choosePage(event.target.value)}>{pages.map(page => <option key={page.path} value={page.path}>{page.title} — {page.path}</option>)}</select></label><div><button disabled={!ready || busy} onClick={() => save("draft")}><Save size={16} /> Save draft</button><button disabled={!ready || busy} onClick={() => save("publish")}><Send size={16} /> Publish page</button><button className="cms-secondary" disabled={!ready || busy} onClick={() => save("restore")}><RotateCcw size={16} /> Restore published</button></div></div>
    <p className="cms-pages-help">Edit the fields below. The preview updates as you type. Upload new images in Media library first. Navigation, page layouts, animations, forms, and code remain managed by the website.</p>
    {notice && <p className="cms-notice" role="status">{notice}</p>}
    <div className="cms-pages-workspace"><div className="cms-pages-fields"><div className="cms-pages-filters"><label><Search size={15} /> Find content<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search text or section" /></label><label>Section<select value={section} onChange={event => setSection(event.target.value)}><option value="">All sections ({sections.length})</option>{sections.map(name => <option key={name} value={name}>{name}</option>)}</select></label></div>
      <p className="cms-pages-count"><FileText size={14} /> {visible.length} editable fields {dirty ? "· Unsaved changes" : ""}</p>
      {!fields.length && <p className="cms-empty">Loading page fields. Scroll inside the preview to reveal any lazy-loaded sections.</p>}
      {visible.map(field => <div key={field.id} className="cms-page-field"><span>{field.section} / {field.label}</span>
        {field.kind === "image" ? <><img src={content[field.id]?.value || field.original} alt={field.label} /><label>Image<select value={content[field.id]?.value || field.original} onChange={event => update(field, event.target.value)}><option value={field.original}>Original website image</option>{media.map(image => <option key={image.id} value={image.url}>{image.name}</option>)}</select></label></> : field.kind === "link" ? <label>Destination<input value={content[field.id]?.value ?? field.original} onChange={event => update(field, event.target.value)} /></label> : <label>{field.label}<textarea rows={field.original.length > 120 ? 4 : 2} maxLength={12000} value={content[field.id]?.value ?? field.original} onChange={event => update(field, event.target.value)} /></label>}
        {content[field.id] && <button className="cms-secondary" onClick={() => { setContent(current => { const next = { ...current }; delete next[field.id]; return next; }); setDirty(true); }}>Reset field to original</button>}
      </div>)}
    </div><div className="cms-pages-preview"><div><Eye size={16} /> Draft preview <a href={path} target="_blank" rel="noreferrer">Open live page ↗</a></div>{ready && <iframe ref={preview} key={path} src={`${path}?cms-preview=1`} title="Page draft preview" onLoad={() => { preview.current?.contentWindow?.postMessage({ type: "creatox:collect" }, window.location.origin); preview.current?.contentWindow?.postMessage({ type: "creatox:preview", content }, window.location.origin); }} />}</div></div>
  </section>;
}
