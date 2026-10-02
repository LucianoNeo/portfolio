FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props ./
COPY webhook-inbox/WebhookInbox.Api/WebhookInbox.Api.csproj webhook-inbox/WebhookInbox.Api/
RUN dotnet restore webhook-inbox/WebhookInbox.Api
COPY webhook-inbox/WebhookInbox.Api/ webhook-inbox/WebhookInbox.Api/
RUN dotnet publish webhook-inbox/WebhookInbox.Api -c Release -o /out --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
RUN mkdir /data && chown app:app /data
COPY --from=build /out .
USER app
EXPOSE 8080
ENTRYPOINT ["dotnet", "WebhookInbox.Api.dll"]
