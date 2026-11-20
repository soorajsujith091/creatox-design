-- Run once in the Supabase SQL editor. Only server-side service-role requests
-- can access private tables. Never expose the service-role key to the browser.
create table public.cms_posts (
  id uuid primary key default gen_random_uuid(), title text not null,
  slug text not null unique, excerpt text not null default '', body text not null,
  image text not null default '', category text not null default 'Insights',
  status text not null default 'draft' check(status in ('draft','published')),
  created_at timestamptz not null default now()
);
create table public.cms_media (
  id uuid primary key default gen_random_uuid(), name text not null,
  url text not null, created_at timestamptz not null default now()
);
create table public.cms_leads (
  id uuid primary key default gen_random_uuid(), name text not null,
  email text not null, phone text not null default '', service text not null default '',
  message text not null, status text not null default 'new' check(status in ('new','contacted','closed')),
  fingerprint text not null, created_at timestamptz not null default now()
);
alter table public.cms_posts enable row level security;
alter table public.cms_media enable row level security;
alter table public.cms_leads enable row level security;
revoke all on public.cms_posts, public.cms_media, public.cms_leads from anon, authenticated;
grant all on public.cms_posts, public.cms_media, public.cms_leads to service_role;
create index cms_leads_rate on public.cms_leads(fingerprint,created_at);
create function public.submit_cms_lead(lead_name text,lead_email text,lead_phone text,lead_service text,lead_message text,lead_fingerprint text)
returns boolean language plpgsql security invoker set search_path = public as $$
begin
  perform pg_advisory_xact_lock(hashtext(lead_fingerprint));
  if (select count(*) from cms_leads where fingerprint=lead_fingerprint and created_at > now()-interval '1 hour') >= 5 then return false; end if;
  insert into cms_leads(name,email,phone,service,message,fingerprint) values(lead_name,lead_email,lead_phone,lead_service,lead_message,lead_fingerprint);
  return true;
end; $$;
revoke all on function public.submit_cms_lead(text,text,text,text,text,text) from public, anon, authenticated;
grant execute on function public.submit_cms_lead(text,text,text,text,text,text) to service_role;
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('website-media','website-media',true,5242880,array['image/png','image/jpeg','image/webp','image/gif']);
