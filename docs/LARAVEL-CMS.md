# Creatox local CMS

## Open the studio

- Website: http://localhost:3000
- Admin: http://localhost:3000/admin
- Backend health: http://127.0.0.1:8000/up
- Database: MariaDB/MySQL, `127.0.0.1:3307`, database `creatox_cms`.
- Initial administrator: `soorajsujith091@gmail.com`. The randomly generated password is in the Git-ignored `docs/LOCAL-CMS-ACCESS.txt` file.

The existing XAMPP MySQL instance on port 3306 was not accepting connections and crashed after its approved restart. Existing database files were not modified. This CMS uses XAMPP's MariaDB binaries with its own data folder at `backend/storage/mysql` and port **3307**, bound to loopback only.

## Everyday use

1. Sign in to **Studio Admin**.
2. **Overview** shows published stories, drafts, new leads, and media totals.
3. **Media library**: upload PNG, JPEG, WebP, or GIF files up to 5 MB. In **Website images**, select a library image for a named section and save. Refresh the website to see it. Current editable slots cover the footer banner, Our Story artwork, and all six service covers.
4. **Blog articles**: write a title, introduction, and content. Choose a category and cover. Save as a draft or set visibility to Published. Published stories appear on the homepage, blog listing, and `/blog/your-slug` detail page. Return an article to Draft to unpublish it. Body content uses plain paragraphs; HTML is intentionally displayed as text.
5. **Lead inbox**: website contact and career submissions appear here. Search by name/email, reply by email, and mark New, Contacted, or Closed. Leads are stored in SQL; email notifications are not configured.
6. Sign out when finished.

## Restart locally

From the repository root:

```powershell
powershell.exe -ExecutionPolicy Bypass -File scripts/start-cms.ps1
npm.cmd run dev
```

The first command starts the isolated database and Laravel in hidden background processes and writes server logs under `backend/storage/logs`. The second starts Next.js; if port 3000 is already serving this checkout, use that server. Laravel upload limits are configured by the startup script.

To create another administrator interactively:

```powershell
C:/xampp/php/php.exe backend/artisan cms:create-admin another-admin@example.com
```

## Architecture

- Laravel API and SQL migrations: `backend/` (Composer dependencies are installed in `backend/vendor`).
- Next.js admin interface: `src/app/admin`.
- Next.js API proxies: `src/app/api`; backend URL in Git-ignored `.env.local`.
- Upload files: `backend/storage/app/public/uploads`, served through `backend/public/storage`.
- Images use stored slot overrides with original website imagery as fallback.
- API tokens are random, stored hashed in SQL, expire after eight hours, and are revoked on logout. The browser holds its token only in an HTTP-only, same-site cookie.
- Login and enquiry routes are rate limited. Admin writes require authentication; Next.js mutation proxies enforce same-origin requests. File contents, types, sizes, and article fields are validated by Laravel.

The old Supabase scaffold is no longer used by the application. No Supabase credentials are needed.

## Checks

```powershell
cd backend
C:/xampp/php/php.exe artisan test --compact
cd ..
npx.cmd tsc --noEmit
npm.cmd run build
```

Feature tests use an isolated in-memory SQLite database, never the live CMS SQL database. They cover authentication/logout, enquiry validation and lead status, private drafts/public publishing, image upload validation, and website image assignment. End-to-end checks have also exercised the running Next.js → Laravel → MySQL flow, with temporary records removed afterward.

## Local versus production

This setup runs locally only. Vercel cannot run a PHP Laravel server or connect to this machine's loopback database. A future deployment needs a PHP-capable host, a persistent MySQL service, HTTPS media URLs, and the deployed `LARAVEL_API_URL` configured in Next.js. Back up the CMS database and uploaded images together; both are excluded from Git. Never publish `.env`, database files, or the initial-access file.
