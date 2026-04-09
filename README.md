# Consignment Prototype

Interactive prototype for the Fanatics Collect submission wizard flow.

## Stack

- **Next.js 15** (App Router)
- **Radix Dialog** — Side panel primitive (same as collect-web)
- **DS1 Design Tokens** — CSS custom properties ported from collect-web
- **Tailwind CSS 4** — Utility styling
- **Lucide React** — Icons

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and click **Start Submission** to open the wizard.

## Flow Steps

| Step | Screen | Notes |
|------|--------|-------|
| 0 | Introduction | "How it Works" overview |
| 1 | Item Type | Category selection + condition (trading cards only) |
| 2 | Grading Company | Expandable cards with service tier selection (raw cards only) |
| 3 | Listing Intent | Weekly/Premier Auction or Vault (conditional) |
| 4 | Review | Summary of all selections |
| 5 | Confirmation | "You're All Set" + shipping instructions |

## Upgrading to one-ui

To use production DS1 components from `@fanatics-live/one-ui`:

1. Add `.npmrc` with GitHub Packages registry config
2. `npm install @fanatics-live/one-ui`
3. Replace DS1 tokens in `globals.css` with `@import "@fanatics-live/one-ui/dist/styles/v3-compat.css"`
4. Swap hand-built radio/button components with one-ui equivalents
