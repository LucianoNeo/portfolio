# Projetos .NET

Duas APIs demonstrativas independentes: reservas para raids e processamento de webhooks. Os projetos usam SQLite e podem ser avaliados com seus próprios testes e documentação.

| Projeto | Foco | Verificação |
| --- | --- | --- |
| [Raid Booking](raid-booking/README.md) | Capacidade, transações e idempotência | Solicitações concorrentes, repetição e cancelamento |
| [Webhook Inbox](webhook-inbox/README.md) | HMAC, deduplicação, persistência e retries | Entregas duplicadas, conflitos, replay, restart e dead letters |

O [NeoTasks](https://github.com/LucianoNeo/neotasks) está em seu próprio repositório e tem um Compose com interface React, API .NET e PostgreSQL.

## As APIs nesta pasta

O Compose mantém as duas APIs nas portas localhost 5082 e 5083. Ambas usam volumes SQLite. O `Directory.Build.props` desta pasta define o .NET 10 e opções compartilhadas pela solução.

Para executar `dotnet test BackendLabs.slnx --configuration Release`, use um ambiente compatível com .NET 10. Os testes exercitam as APIs com bancos SQLite temporários; não usam dados de produção.

## Decisões

- Os containers usam o usuário `app`; as portas são vinculadas a localhost.
- SQLite simplifica a avaliação das duas APIs demonstrativas.
- O worker de webhooks grava efeitos no próprio banco; integrar outro serviço exigiria tratar idempotência e entrega, por exemplo com outbox.

## English

Two independent .NET 10 demo APIs: raid reservations and webhook processing. Both use SQLite and have their own Docker Compose and test suite. NeoTasks is maintained in its [dedicated repository](https://github.com/LucianoNeo/neotasks). Run `dotnet test BackendLabs.slnx --configuration Release` to verify the APIs in this folder.
