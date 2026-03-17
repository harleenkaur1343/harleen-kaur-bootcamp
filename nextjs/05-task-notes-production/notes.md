## Deployment
The features required for this project are covered in the 02-task-notes-design folder (which is covering the features for other sub modules as well). Due to limited specifications of the system, I have merged the functionality of the similar projects in one 

### Live URLs
- **Frontend:** https://harleen-kaur-bootcamp.vercel.app/
- **Backend:** https://harleen-kaur-bootcamp-taskapp.onrender.com
- **Database:** Neon (PostgreSQL)

---

### Architecture
```
User → Vercel (Next.js) → Render (Node.js API) → Neon (PostgreSQL)
```

---

### Frontend — Vercel

Deployed via Vercel's GitHub integration. Every push to `main` triggers an
automatic production deployment built with `next build` and served via Vercel's
edge network.

**Environment variables (Vercel dashboard):**
```bash
NEXT_PUBLIC_API_URL = https://harleen-kaur-bootcamp-taskapp.onrender.com/api
JWT_SECRET          = <production secret>
NODE_ENV            = production
```

**Static asset caching (`next.config.ts`):**

| Route | Cache Policy |
|---|---|
| `/_next/static/*` | 1 year, immutable |
| `/images/*` | 1 day, stale-while-revalidate 7 days |
| `/api/*` | no-store |

**Bundle optimization:**
```ts
experimental: {
  optimizePackageImports: [
    "framer-motion", "lucide-react",
    "@radix-ui/react-dialog", "@radix-ui/react-select"
  ]
}
```

---

### Backend — Render

Node.js/Express API deployed as a Render Web Service. Automatically redeploys
on push to `main`.

**Environment variables (Render dashboard):**
```bash
DATABASE_URL  = postgresql://...neon.tech/neondb?sslmode=require
JWT_SECRET    = <production secret>
PORT          = 9000
NODE_ENV      = production
FRONTEND_URL  = https://harleen-kaur-bootcamp.vercel.app
HTTP_TIMEOUT  = 5000
HTTP_RETRIES  = 3
```

**CORS** is restricted to the production frontend URL only:
```ts
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}))
```

**Health check:**
```
GET /api/health
```
Verifies the backend is running and the database connection is healthy. Render
uses this endpoint for uptime monitoring.

---

### Database — Neon

Serverless PostgreSQL on Neon (ap-southeast-2). Connection uses SSL
(`sslmode=require`) with Neon's pooler endpoint for efficient connection
management.

---

### Environment Variables

All secrets are managed via platform dashboards — never committed to git.
`.env` files are gitignored. A `.env.example` is committed with empty values
as reference.

**Frontend `.env.local` (development):**
```bash
NEXT_PUBLIC_API_URL=http://localhost:9000/api
JWT_SECRET=local-dev-secret
NODE_ENV=development
```

**Backend `.env` (development):**
```bash
DATABASE_URL=postgres://<dbuser>:<userpass>@localhost:5432/taskapp_dev
JWT_SECRET=local-dev-secret
PORT=9000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
HTTP_TIMEOUT=5000
HTTP_RETRIES=3
```

---

### Performance

Server components handle all data fetching so content arrives with the initial
HTML. `loading.tsx` under `/tasks` renders a skeleton UI during server-side
fetch.

---

### Error Handling

| Layer | Behaviour |
|---|---|
| Network / API failure | `error.tsx` boundary shows "Try Again" with `reset()` |
| 401 Unauthorized | `api-client.ts` deletes cookies, middleware redirects to `/login` |
| Task not found | `notFound()` renders the nearest `not-found.tsx` |
| Form validation failure | Thrown error caught by `error.tsx` or returned via `useActionState` |
| Invalid / expired token | Middleware sets `isValidToken = false`, redirects and clears cookies |