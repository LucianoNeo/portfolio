# Projetos .NET

Três projetos para estudar tarefas e horas, reservas de raids e processamento de webhooks. O NeoTasks reúne a interface React com uma API .NET e PostgreSQL. Raid Booking e Webhook Inbox são APIs com SQLite.

| Projeto | Foco | Verificação |
| --- | --- | --- |
| [NeoTasks · React + .NET](neotasks-dotnet/README.md) | JWT, papéis, isolamento por organização, concorrência e interface integrada | PostgreSQL real, Docker Compose, fluxo de navegador com Playwright e persistência |
| [Raid Booking](raid-booking/README.md) | Capacidade, transações e idempotência | 20 solicitações concorrentes para uma vaga, repetição e cancelamento |
| [Webhook Inbox](webhook-inbox/README.md) | HMAC, deduplicação, persistência e retries | Duplicados concorrentes, conflito de payload, janela de replay, restart e dead letters |

## Avaliar o NeoTasks

Na pasta `neotasks-dotnet`, execute `docker compose up --build` e abra http://localhost:8080. O Compose inclui interface, API e PostgreSQL. Não é necessário instalar .NET ou Node separadamente. O [README](neotasks-dotnet/README.md) explica cadastro, permissões, volume e limites.

## As três APIs

O Compose desta pasta mantém as três APIs nas portas localhost 5081, 5082 e 5083. Ele inclui um PostgreSQL para NeoTasks; as outras APIs usam volumes SQLite. Para avaliar a interface NeoTasks, prefira o Compose da pasta daquele projeto.

As aplicações .NET nesta pasta usam `Directory.Build.props` para compartilhar o framework e as opções de compilação. O NeoTasks tem um repositório próprio: https://github.com/LucianoNeo/neotasks.

Os testes usam requisições HTTP e bancos reais. Para executar `dotnet test BackendLabs.slnx --configuration Release`, é preciso configurar uma instância PostgreSQL de testes em `NEOTASKS_TEST_DATABASE`, com um usuário que possa criar e excluir bancos isolados. Os detalhes estão no README do NeoTasks. As APIs de reservas e webhooks usam arquivos temporários SQLite. O GitHub Actions prepara esses bancos no runner.

## Decisões e próximos passos

- EF Core faz a persistência; as regras e endpoints ficam próximos para facilitar a leitura.
- SQLite nos outros dois exemplos simplifica o setup, mas seus testes de concorrência verificam comportamento, sem afirmar capacidade de atendimento.
- `EnsureCreated` cria os bancos de demonstração. Um banco duradouro precisa de migrations.
- Os containers das APIs usam o usuário `app`. As portas publicadas são vinculadas a localhost.
- O worker de webhooks grava efeitos no próprio banco; integrar outro serviço exigiria tratar idempotência e entrega, por exemplo com outbox.

## English

NeoTasks combines an existing React interface with a .NET 10 API and PostgreSQL. Run its own Compose stack to evaluate the complete application. Raid Booking and Webhook Inbox remain independent .NET APIs backed by SQLite. Each README explains setup, tested behavior and remaining work.

Development assistance: Codex.
