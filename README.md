# Classic Countdown

Desktop-first countdown app inspired by APplus Classic. It calculates time remaining to the end of the workday and supports local schedule settings.

## Features

- Desktop-first APplus-like shell (`top bar + left nav + center + right panel`)
- Countdown states:
  - `before_work`
  - `in_work`
  - `after_work`
  - `weekend`
- Configurable local schedule (`startTime`, `endTime`, `workDays`)
- Local persistence via `localStorage`
- Unit, integration, and E2E test scaffolding

## Tech stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
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
2. Import `bighatpoland/classic-countdown` in Vercel.
3. Keep default Next.js build settings.
4. Enable preview deployments for feature branches.

