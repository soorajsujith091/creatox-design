"use client";
import { useEffect, useState } from "react";
import type { Media } from "@/lib/cms/types";
type Slot = { key: string; label: string; url: string };
export function WebsiteImages({ media }: { media: Media[] }) {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => { fetch("/api/cms/images").then(async response => {
    if (!response.ok) throw new Error("Unable to load website images.");
    setSlots(await response.json());
  }).catch(error => setStatus(error.message)); }, []);
  async function save(slot: Slot) {
    setSaving(true); setStatus("");
    try {
      const response = await fetch("/api/cms/images", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(slot) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || data.message || "Unable to save image.");
      setStatus(`${slot.label} updated. Refresh the website to see it.`);
    } catch (error) { setStatus((error as Error).message); } finally { setSaving(false); }
  }
  return <section className="cms-website-images"><h2>Website images</h2><p>Upload an image below, choose where it belongs, then save. Your website updates without editing code.</p>
    {status && <p role="status" className="cms-notice">{status}</p>}
    <div className="cms-media-grid">{slots.map(slot => <article key={slot.key}>
      <img src={slot.url} alt={`${slot.label} preview`} /><strong>{slot.label}</strong>
      <label>Choose a library image<select value={slot.url} disabled={saving} onChange={event => setSlots(current => current.map(item => item.key === slot.key ? { ...item, url: event.target.value } : item))}>
        {!media.some(image => image.url === slot.url) && <option value={slot.url}>Current website image</option>}
        {media.map(image => <option key={image.id} value={image.url}>{image.name}</option>)}
      </select></label><button disabled={saving || !media.some(image => image.url === slot.url)} onClick={() => save(slot)}>Save website image</button>
    </article>)}</div><h2 style={{ marginTop: 40 }}>Uploaded media library</h2>
  </section>;
}
