export type Post = { id: string; title: string; slug: string; excerpt: string; body: string; image: string; category: string; status: "draft" | "published"; created_at: string };
export type Lead = { id: string; name: string; email: string; phone: string; service: string; message: string; status: "new" | "contacted" | "closed"; created_at: string };
export type Media = { id: string; name: string; url: string; created_at: string };
