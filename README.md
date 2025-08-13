# Pack Your Bags — Pro (TypeScript + Zustand + Next.js App Router)

A production-ready baseline of your trekking comparison MVP.

## What's inside
- **TypeScript** everywhere (strict)
- **Zustand** global state for filters and compare tray
- **Hooks** (`useTreks`) encapsulate filtering & sorting logic
- **Dynamic routes** for trek detail pages (`/treks/[id]`)
- **TailwindCSS** styling
- Data in JSON (`/data/treks.json`) ready to swap with API

## Dev
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Structure
- `app/page.tsx` — list view + filters + compare tray
- `app/(routes)/treks/[id]/page.tsx` — trek detail
- `store/useAppStore.ts` — global state
- `app/hooks/useTreks.ts` — data, filters, sorting
- `types/trek.ts` — shared types
- `utils/format.ts` — helpers

## Next steps
- Swap `/data/treks.json` with an API or CMS
- Add auth + wishlists
- Map view + images
