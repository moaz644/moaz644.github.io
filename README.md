# Moaz Alnor Portfolio

A static Next.js + Tailwind CSS portfolio for Moaz Alnor.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Static export

```bash
npm run build
npx serve out
```

## Contact form

Set `NEXT_PUBLIC_FORMSPREE_ENDPOINT` in `.env.local` to enable Formspree. Without it, the form uses a mailto fallback.

## Deployment

The project includes:
- `output: 'export'` in `next.config.mjs`
- unoptimized images for static export
- `public/CNAME` set to `moazalnor.me`
- GitHub Pages workflow in `.github/workflows/deploy.yml`
