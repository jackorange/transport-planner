This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy

Application will be deployed to Vercel. To start CI/CD process you need to push changes to main branch and wait few minutes until server will restart with updates and that's it! Url for app: <https://transport-planner-amber.vercel.app/>

## How to use the app

Application supports system based theme (dark & light mode).

1. Main page: You need to set data for two input fields: "From" & "To, both are required. It's autcomplete inputs so they will suggest you exisiting stations to choose. Start to type name of the city/station and choose the correct one and click "Search".
2. Schedule page: After clicking "Search" on Main page you will be redirected to page with schedule for direction you choose ("From" & "To" params are reflected in URL so you can reuse this link for instance to share with your friends.). Here you will see table with all nearest connections for your destination with some details. If results more than 10 you need to use navigation at the bottom of the page to see further departure connections.
If you want go back on Main page you need to click on arrow that placed on top left corner from the table (or just use browser go back functionality). If you want to see details about specific connection you need to click on it in Schedule table row and after that modal (Schedule details) with connection details will appear.
3. Schedule details: This page contains info about your direction and every interchange with details. To close it just click outside of modal.

