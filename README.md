# Classic SRS Speaking

Mobile-first PWA do codziennej nauki hiszpanskiego z naciskiem na mowienie, limitowany SRS i lokalny workflow bez logowania.

## MVP features

- `Today` z planem dnia `20 min` oraz fallbackiem `5+5+5`
- `SRS` produkcyjne `PL -> ES` z prostym `SM-2`
- `Inbox` i pipeline `Capture -> Card -> Spoken`
- `Input` z krotkimi materialami i szybkim przechwytywaniem fraz
- `Speak` z lokalnym nagraniem audio, odsluchem i self-checkiem
- `Tutor` z prepem, notatkami po lekcji i transferem do SRS
- `Progress` z tygodniowym trackingiem i snapshotami `1/7/14`
- `PWA + offline`
- local-first persystencja przez `IndexedDB` via `Dexie`
- opcjonalne endpointy AI:
  - `POST /api/ai/prompt`
  - `POST /api/ai/feedback`

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Dexie
- Vitest
- Playwright

## Local development

Prerequisites:

- Node.js `20+`

Install and run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run test
npm run test:e2e
```

## Deploy (Vercel via GitHub)

1. Push repository to `main`.
2. Import the repository in Vercel as a Next.js project.
3. Keep default Next.js build settings.
4. Enable preview deployments for feature branches.
5. If you want optional AI, add `OPENAI_API_KEY` and optionally `OPENAI_MODEL`.
