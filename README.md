# Portfolio

[ ... Resumo do projeto ... ]

[![Next.js](https://img.shields.io/badge/Next.js-16.3.0-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=flat&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-4.16.1-000000?style=flat&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![ESLint](https://img.shields.io/badge/ESLint-9.39.5-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![wakatime](https://wakatime.com/badge/github/ArthurProjectCorrea/portfolio.svg)](https://wakatime.com/badge/github/ArthurProjectCorrea/portfolio)

## Getting Started

### Prerequisites

- Node.js (LTS)
- npm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app reloads as you edit files.

## Commands

| Command          | Description                       |
| ---------------- | --------------------------------- |
| `npm run dev`    | Start the development server      |
| `npm run build`  | Build the production bundle       |
| `npm run start`  | Serve the production build        |
| `npm run lint`   | Run ESLint                        |
| `npm run format` | Format the codebase with Prettier |

Linting and formatting also run automatically on staged files via a Husky pre-commit hook.

## Documentation

- [`ARCHITECTURE.md`](ARCHITECTURE.md) — how the codebase is structured: routing, internationalization, naming conventions, directory shape.
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to set up, contribute, and commit changes.
- [`LICENSE`](LICENSE) — MIT.

## Internationalization

Routes are locale-prefixed and every piece of user-facing text is sourced from a per-locale dictionary — see the i18n section of [`ARCHITECTURE.md`](ARCHITECTURE.md) for how locale resolution, routing, and translations fit together.
