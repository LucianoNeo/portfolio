# Verification record — 2026-10-01

## Back-end

SDK: .NET 10.0.401. ASP.NET / EF packages: 10.0.12.

`dotnet test projects/BackendLabs.slnx --configuration Release` (at the time of this record, the solution also included NeoTasks; its current source and CI live in the [dedicated repository](https://github.com/LucianoNeo/neotasks)).

- Raid Booking: 20 players concurrently contesting one seat, repeated booking/cancellation and cancellation ownership.
- Webhook Inbox: 10 duplicate deliveries, payload conflict, signature and timestamp validation, persistent pending event after restart, retry/dead-letter with controlled time.

Tests use temporary SQLite databases; no production or private data. No throughput claims are derived from the concurrency tests.

## Website

- PT/EN content, project filtering and case-study dialog reviewed in the browser.
- Desktop and 390px mobile layouts reviewed.
- Navigation includes Projects, About, Experience and Contact.
- Professional history and printable summary use the user-supplied CV in both languages.
- `node --check` validates JavaScript syntax.

## Limits

Docker CLI is installed, but the Docker Desktop engine is not running; Dockerfiles and Compose configuration were prepared but not run here. The APIs are not deployed publicly. They use EnsureCreated and development configuration for easy local evaluation. Production requires migrations, identity lifecycle and operational configuration appropriate to each project.
