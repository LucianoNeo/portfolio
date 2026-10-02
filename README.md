# Luciano Neo — C# / .NET portfolio

My portfolio, in Portuguese and English. Includes work experience, selected projects and a printable professional summary. The visual style takes cues from electronic RPG menus.

## Website

Published portfolio: [lucianoneo.github.io/portfolio](https://lucianoneo.github.io/portfolio/).
The `pages.yml` workflow publishes only the static website files on changes to `main`.

Plain HTML, CSS and JavaScript; no build dependency or framework. Serve the site directory with any static server. In this source checkout it is `dist/`; in the GitHub `portfolio` repository the static files are at the root for GitHub Pages compatibility.

```sh
# This source checkout
python -m http.server 4173 --directory dist
# GitHub checkout: python -m http.server 4173
```

Open `http://localhost:4173`. Language preference is stored locally when browser storage is available. Project filters and case studies are keyboard accessible. The professional summary supports printing to PDF in either language.

## Back-end projects

See [projects/README.md](projects/README.md) for the three independently runnable .NET 10 labs:

- **NeoTasks .NET:** organizations, JWT, roles, tasks and time tracking.
- **Raid Booking API:** capacity, transactions, idempotency and anonymous player credentials.
- **Webhook Inbox:** HMAC, deduplication, persistent worker and recovery.

Each API has setup instructions, HTTP examples and integration tests. They run locally; the portfolio website does not host them. Development assistance: Codex.

## Verification

```sh
dotnet test projects/BackendLabs.slnx --configuration Release
node --check script.js
```

The GitHub Actions workflow validates website JavaScript and restores, builds and runs all back-end integration tests. The public static Site is published separately. Docker recipes are optional.

## Content accuracy

- New .NET labs are labelled as demonstrations and have no public API deployment.
- Existing .NET 6 studies remain accessible as earlier work.
- Redis Rate Limiting integrates a third-party library; it does not claim authorship of that library.
- Professional experience, roles, dates, education and training are sourced from the user-supplied CV. The original PDF and residential contact details are not published. See `docs/profile-sources.md`.
- The NeoTasks React demo still uses its original Fastify back end.
- Game/mod assets retain their project origins and credits. Project screenshots are from their respective repositories; the three lab images are architecture diagrams.

## Português

Portfólio PT/EN focado em back-end C#/.NET, com visual inspirado em RPG eletrônico. Os novos projetos estão em `projects/`, possuem testes e documentação e podem ser extraídos para repositórios próprios. O site é estático; as APIs precisam ser executadas separadamente. O histórico profissional, a formação e os cursos do currículo enviado aparecem em PT/EN no site e no resumo profissional; fontes em `docs/profile-sources.md`.
