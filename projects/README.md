# Back-end engineering labs

Three runnable **.NET 10 demonstration APIs**, maintained alongside Luciano Neo's portfolio. They demonstrate specific engineering rules, with HTTP integration tests against a real SQLite database. They are new labs, not claims of production deployments or previous employment deliverables.

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

## Design choices

- Small vertical API slices keep the rules visible, with EF Core persistence.
- SQLite lowers setup cost. Its serialized writers make these correctness examples unsuitable as distributed scalability benchmarks.
- Tests verify behavior through HTTP rather than mocking EF Core.
- `EnsureCreated` is a lab convenience, not a migration strategy. Schema evolution needs versioned migrations.
- Secrets have explicit **development-only** defaults. Production startup requires configured keys. Docker binds to loopback and runs as the non-root `app` user.
- No fictitious user counts, performance claims or production availability metrics.

## Planned evolution

PostgreSQL integration tests, versioned migrations, identity lifecycle, rate limiting, deployment with TLS and observability, and integration of NeoTasks .NET with the existing React interface. Webhook external side effects require an outbox and destination idempotency; the current guarantee is scoped to one local database.

## Português

Três APIs de demonstração executáveis em .NET 10. Os testes exercitam isolamento, permissões, concorrência, idempotência e recuperação com um banco SQLite real. Não são sistemas publicados em produção. Consulte os READMEs de cada projeto, os exemplos HTTP e o roadmap antes de avaliar seu escopo.

Created with Codex assistance; review and understand the decisions before presenting these labs in interviews.
