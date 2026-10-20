# Tidy Bunny Cleaning Service

A responsive website for Tidy Bunny, a home and short-stay cleaning service in Kumasi, Ghana. Visitors can explore services and pricing, then build a personalized quote in GHS and send the request through WhatsApp.

## Features

- Service information for homes, short-stays, hotels, and guest houses
- Pricing guide and interactive quote calculator
- Quote requests prepared for WhatsApp
- Responsive navigation and animated page sections

## Getting started

**Requirements:** Node.js 20.9 or later and npm.

```bash
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Build the production site |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Site pages

- `/` — Home
- `/services` — Complete service menu
- `/for-homes` — Residential cleaning
- `/for-short-stays` — Short-stay and hospitality cleaning
- `/pricing` — Pricing guide
- `/quote` — Personalized quote form
- `/about` — About Tidy Bunny
- `/contact` — Contact information

## Built with

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Radix UI, and Framer Motion.

No environment variables are required for local development. Quote requests are composed in the browser and handed off to WhatsApp; the project does not include a quote-submission backend.
