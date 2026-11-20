import "server-only";
import { cookies } from "next/headers";
export const configured = () => Boolean(process.env.LARAVEL_API_URL);
export async function laravel(path: string, init: RequestInit = {}, authenticated = false) {
  if (!configured()) throw new Error("The content server is not configured.");
  const headers = new Headers(init.headers);
  headers.set("Accept", "application/json");
  if (authenticated) {
    const token = cookies().get("creatox-cms")?.value;
    if (!token) return new Response(JSON.stringify({ error: "Please sign in." }), { status: 401 });
    headers.set("Authorization", `Bearer ${token}`);
  }
  return fetch(`${process.env.LARAVEL_API_URL!.replace(/\/$/, "")}${path}`, { ...init, headers, cache: "no-store", signal: AbortSignal.timeout(15000) });
}
export async function isAdmin() {
  if (!configured() || !cookies().get("creatox-cms")?.value) return false;
  try { return (await laravel("/session", {}, true)).ok; } catch { return false; }
}
export function sameOrigin(request: Request) { return request.headers.get("origin") === new URL(request.url).origin; }
export async function db(path: string) {
  const slug = /slug=eq\.([^&]+)/.exec(path)?.[1];
  const response = await laravel(slug ? `/articles/${encodeURIComponent(slug)}` : "/articles");
  if (!response.ok) return [];
  const data = await response.json();
  return slug ? [data] : data;
}
