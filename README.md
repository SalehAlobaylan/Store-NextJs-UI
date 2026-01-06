## Fake Store UI

Simple e-commerce frontend built with Next.js (App Router), TypeScript, Tailwind CSS, Zustand, and shadcn/ui.

Data will come from **https://fakestoreapi.com** following the Figma reference design (https://www.figma.com/community/file/1299098199775509142).

### Quickstart

```bash
npm install
npm run dev
```
#### open http://localhost:3000
Or use Docker:

#### Using Docker Compose
```bash
docker-compose up --build
```
#### Or using Docker directly
```
docker build -f .docker/Dockerfile -t store-nextjs-ui .
docker run -p 3000:3000 store-nextjs-ui
```
---

### Environment

Copy `.env.example` to `.env.local` if you need to override the default API URL.

```
NEXT_PUBLIC_API_URL=https://fakestoreapi.com
```