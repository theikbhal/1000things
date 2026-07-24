# 1000 Things 🎯

A gamified collection tracker. Collect 1000 things — ideas, links, videos, images, counters, checkboxes, and more. Level up as you fill your grid.

## Features

- **13 Cell Types** — Text, Link, Counter, Checkbox, Image, YouTube, YouTube Short, Instagram Reel, Instagram Profile, Twitter/X, Pinterest, Video, Input
- **1000 Cell Grid** — Default 25×40 layout, customizable M×N
- **Bulk Operations** — Multi-select, mass type change, text fill, import/export
- **Gamification** — 6 levels (Starter → Legend), confetti celebration, progress tracking
- **Calendar View** — See your entries organized by date
- **Grid Presets** — Quick switch between common sizes
- **Dark Mode** — Premium dark UI throughout
- **Mobile Responsive** — Touch-friendly interactions
- **Onboarding Tour** — Step-by-step introduction
- **Supabase Sync** — Optional cloud backup (add auth to enable)
- **Keyboard Friendly** — Click/Shift-click/Ctrl-click for multi-select

## Levels

| Level | Cells | Color |
|-------|-------|-------|
| 🪴 Starter | 0 | Gray |
| 🏆 Collector | 100 | Green |
| ⚡ Curator | 300 | Blue |
| 🏗️ Architect | 500 | Purple |
| 👑 Master | 700 | Amber |
| 🔥 Legend | 1000 | Red |

## Tech Stack

- **Next.js 16** — App Router, Turbopack
- **Tailwind CSS v4** — Utility-first styling
- **Supabase** — Database & auth
- **Lucide React** — Icons
- **date-fns** — Date utilities
- **Sonner** — Toast notifications
- **react-confetti** — Celebration effects

## Getting Started

```bash
npm install
npm run dev
```

### Environment Variables

Copy `.env.local` and add your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase Setup

Run the SQL in `supabase-schema.sql` in your Supabase SQL editor to create the required tables.

## Deployment

Deploy to Vercel with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

## Usage

1. **Start** — The onboarding tour walks you through the basics
2. **Fill Cells** — Click to select, double-click to edit text/input cells
3. **Change Types** — Select cells → use the Type button in the toolbar
4. **Bulk Fill** — Select cells → Fill → paste text (one line per cell)
5. **Demo Data** — Click Demo to populate with sample data
6. **Level Up** — Fill 100 cells to reach Collector, 300 for Curator, etc.
7. **Export** — Save your grid as JSON, import it later
8. **Views** — Toggle between Grid and Calendar views

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main grid page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── help/page.tsx     # Help & docs
├── components/
│   ├── CellCard.tsx      # Individual cell component
│   ├── GridView.tsx      # Grid layout
│   ├── CalendarView.tsx  # Calendar view
│   ├── BulkToolbar.tsx   # Bulk operations toolbar
│   ├── TypeSelector.tsx  # Cell type picker
│   ├── SettingsPanel.tsx # Grid settings
│   ├── Header.tsx        # App header with level display
│   ├── ConfettiOverlay.tsx # Celebration effects
│   └── Onboarding.tsx    # Tour guide
├── hooks/
│   ├── useGrid.ts        # Grid state management
│   └── useGamification.ts # Level/progress system
└── lib/
    ├── types.ts          # TypeScript types & constants
    ├── supabase.ts       # Supabase client
    ├── constants.ts      # App constants
    └── dummyData.ts      # Sample data generator
```

## License

MIT
