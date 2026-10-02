# .NET API examples

Three small APIs for task tracking, raid bookings and webhook processing. Each runs locally with .NET 10 and SQLite. The HTTP integration tests check the access rules, concurrent requests and failure recovery.

| Project | Engineering focus | Tests |
| --- | --- | --- |
| [NeoTasks .NET](neotasks-dotnet/README.md) | JWT, roles, tenant isolation, optimistic concurrency | Organization boundaries, permissions, validation, stale updates |
| [Raid Booking](raid-booking/README.md) | Capacity, transactions, idempotency | 20 concurrent players for one seat, replay, cancellation ownership |
| [Webhook Inbox](webhook-inbox/README.md) | HMAC, persistence, retries, local transactional effect | Concurrent duplicates, payload conflict, replay window, restart, dead letters |

## Requirements and verification

Install the [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0), then from this folder:

```sh
dotnet restore BackendLabs.slnx
dotnet test BackendLabs.slnx --configuration Release
```

No external database is required. Each test uses an isolated temporary database. Docker is optional: from this folder, `docker compose up --build` starts the three APIs on localhost ports 5081, 5082 and 5083. Each has `/health` and a development-only `/openapi/v1.json`. JSON API documentation is provided; no Swagger UI is bundled.

Each application is independently runnable. The parent `Directory.Build.props` supplies the target framework and compiler settings; include it when extracting a project into a separate repository.

## Why SQLite and HTTP tests

- Endpoints and their rules sit together; EF Core handles persistence.
- SQLite runs without an external server. It serializes writes, so the concurrency tests check correctness rather than throughput.
- Tests verify behavior through HTTP rather than mocking EF Core.
- `EnsureCreated` creates the sample databases. Add migrations before changing the schema on a database you need to keep.
- Secrets have explicit **development-only** defaults. Production startup requires configured keys. Docker binds to loopback and runs as the non-root `app` user.

## Planned evolution

The next useful steps are PostgreSQL tests and migrations, followed by connecting NeoTasks .NET to the React interface. The webhook worker currently writes to its own database; calling another service would require an outbox and idempotency at the destination.

## Português

Três exemplos em .NET 10: tarefas por organização, reservas de raids e processamento de webhooks. Rodam localmente com SQLite. Os READMEs explicam os comandos e as regras verificadas pelos testes.

Development assistance: Codex.
