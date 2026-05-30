# LUKA

LUKA is a Next.js 14 starter for a metadata-driven AI app generator platform.
The current scaffold is built around a premium dark design system and includes
marketing pages, auth shells, dashboard routes, Supabase integration helpers, and
backend migration files.

## Project Goal

The long-term goal of this codebase is to let a user describe an application as a
JSON config and then:

1. Validate that config.
2. Render a live preview of the generated app.
3. Persist the app definition in Supabase.
4. Support workflows, auth, and GitHub export.

This repository currently contains the foundation for that experience.

## Tech Stack

- Next.js 14 App Router
- React 18
- TypeScript
- Tailwind CSS 3
- Framer Motion
- Supabase Auth, PostgreSQL, and Row Level Security
- Lucide icons
- Zod for validation

## Available Scripts

Use the scripts defined in [package.json](./package.json):

- `npm run dev` - start the local development server
- `npm run build` - create a production build
- `npm run start` - run the production server after build
- `npm run lint` - run the Next.js lint command

## Repository Structure

```txt
app/
  layout.tsx
  globals.css
  (marketing)/
    page.tsx
    pricing/page.tsx
    docs/page.tsx
  (auth)/
    login/page.tsx
    signup/page.tsx
    auth/callback/route.ts
  (dashboard)/
    layout.tsx
    dashboard/page.tsx
    apps/
      page.tsx
      new/page.tsx
      [id]/
        page.tsx
        preview/page.tsx
        builder/page.tsx
        workflows/page.tsx
        settings/page.tsx
    profile/page.tsx
    settings/page.tsx

components/
  marketing/
  ui/

lib/
  motion.ts
  utils.ts
  supabase/
    client.ts
    server.ts

utils/
  supabase/
    client.ts
    server.ts
    middleware.ts

public/
  manifest.json

supabase/
  config.toml
  migrations/
```

## Features In The Scaffold

### Marketing Site

- Premium dark landing page
- Navigation bar
- Hero section with motion styling
- Feature cards
- Pricing page
- Docs page

### Auth Shells

- Login page
- Signup page
- Supabase OAuth callback route

### Dashboard Shell

- Dashboard layout
- Apps list page
- New app creation page
- App detail page
- App preview page
- App builder page
- Workflows page
- App settings page
- Workspace profile page
- Workspace settings page

### Backend Starter

- Supabase browser client helper
- Supabase server client helper
- Middleware guard for protected routes
- Supabase config file
- SQL migrations for core tables, workflows, and RLS policies

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a real `.env.local` file using `.env.example` as the template.

### 3. Run the app

```bash
npm run dev
```

The app will usually be available at:

```txt
http://localhost:3000
```

## Environment Variables

All environment files in this repo currently share the same starter values:

- `.env`
- `.env.local`
- `.env.example`

### Required Variables

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Browser-safe Supabase publishable key |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Legacy fallback if you are still using anon-key naming |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin key for privileged backend tasks |
| `NEXT_PUBLIC_SITE_URL` | Base URL used for auth redirects and links |

### Optional Variables

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | Placeholder for future workflow email actions |

### Important Notes

- Keep `SUPABASE_SERVICE_ROLE_KEY` out of client-side code.
- Use `.env.example` as the source of truth for new contributors.
- `.env.local` is the file Next.js will use for local development.

## Supabase Backend Setup

The Supabase starter lives in the `supabase/` directory.

### Files

- `supabase/config.toml` - local Supabase project configuration
- `supabase/migrations/001_initial_schema.sql` - core tables and auth profile trigger
- `supabase/migrations/002_workflows.sql` - workflow and run history tables
- `supabase/migrations/003_rls_policies.sql` - row level security policies

### Migration Order

Run the SQL files in this exact order:

1. `001_initial_schema.sql`
2. `002_workflows.sql`
3. `003_rls_policies.sql`

### What the schema covers

- `profiles` - user profile extension for `auth.users`
- `apps` - generated app records and metadata
- `app_versions` - version history for app configs
- `app_entities` - generated entities and field definitions
- `app_data` - row data stored by generated apps
- `app_pages` - page definitions for generated apps
- `import_jobs` - CSV or data import tracking
- `notifications` - user notification stream
- `workflows` - trigger/action automation configs
- `workflow_runs` - execution logs and run state

## Auth Flow

The auth callback route is located at:

- `app/(auth)/auth/callback/route.ts`

It exchanges the Supabase OAuth `code` for a session and redirects the user to
`/dashboard` after a successful sign-in.

### Google sign-in

- Enable the Google provider in your Supabase dashboard.
- Set the redirect URL to `https://your-domain.com/auth/callback`.
- The login page uses Supabase OAuth with the Google provider and preserves the `next` route when redirecting back.

### Deployment Checklist

1. **Vercel env:** Add `NEXT_PUBLIC_SITE_URL=https://luka-azure.vercel.app` to your Vercel project environment variables (Production). Optionally set `NEXT_PUBLIC_APP_URL=https://luka-azure.vercel.app`.
2. **Supabase redirects:** In Supabase Dashboard → Authentication → Settings → Redirect URLs add `https://luka-azure.vercel.app/auth/callback` (and keep `http://localhost:3000/auth/callback` for local dev if needed).
3. **Supabase site URL:** In Supabase Authentication settings set `Site URL` to `https://luka-azure.vercel.app`.
4. **Supabase env vars on Vercel:** Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (or `NEXT_PUBLIC_SUPABASE_ANON_KEY`) are set in Vercel. Do NOT expose `SUPABASE_SERVICE_ROLE_KEY` to the browser — only set it in server-only environment variables.
5. **Redeploy:** After updating Vercel env vars, redeploy your Vercel preview/production build so the changes take effect.
6. **Clear session:** Clear cookies or test in an incognito window when validating OAuth flows to avoid local session interfering with redirects.

Following these steps ensures OAuth callbacks and built URLs use your deployed domain rather than `localhost`.

## Styling And Motion

This scaffold uses a dark, premium visual language with:

- CSS variables in `app/globals.css`
- Tailwind theme extension in `tailwind.config.js`
- Shared motion variants in `lib/motion.ts`
- Google fonts loaded in `app/layout.tsx`

## OpenRouter Agent

The local generation entrypoint lives in `agent.py`.

### Environment

Set these values in `.env.local`:

- `OPENROUTER_API_KEY`
- `OPENROUTER_MODEL=openrouter/free`

### Run

```bash
python agent.py "Build a premium landing page for a productivity app"
```

The script will:

- call OpenRouter with the `openrouter/free` router by default
- generate exactly three files
- save them under `generated-sites/<project-name>/`

Each generated site contains:

- `index.html`
- `styles.css`
- `script.js`

### In-App Agent Workspace

Open the dashboard route at:

- `/apps/new`

Paste a valid JSON config into the editor, then:

- click `Run agent`
- or press `Ctrl+Enter`

The page will:

- run `agent.py` on the server
- save the generated project locally
- show the `index.html`, `styles.css`, and `script.js` output inline
- render a live preview on the same page

## Current Status

The repository is currently a scaffold, not a finished product.

Implemented:

- Layout shell
- Core routes
- Shared UI primitives
- Supabase helper files
- Migration files
- Env templates

Still to be built:

- JSON config validator
- JSON editor
- App renderer
- Workflow engine
- GitHub export flow
- React Bits components
- Real auth UI wiring
- Database-backed CRUD flows

## Recommended Next Steps

1. Install dependencies and confirm the app runs.
2. Replace the placeholder env values with your real Supabase project values.
3. Add the JSON editor and preview renderer.
4. Wire the auth pages to Supabase sign-in and sign-up flows.
5. Implement the workflow engine and GitHub export integration.

## Notes For Contributors

- Use ASCII text unless a file already requires Unicode.
- Keep secrets out of git.
- Update this README when the backend or route structure changes.
