FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props ./
COPY neotasks-dotnet/NeoTasks.Api/NeoTasks.Api.csproj neotasks-dotnet/NeoTasks.Api/
RUN dotnet restore neotasks-dotnet/NeoTasks.Api
COPY neotasks-dotnet/NeoTasks.Api/ neotasks-dotnet/NeoTasks.Api/
RUN dotnet publish neotasks-dotnet/NeoTasks.Api -c Release -o /out --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
RUN mkdir /data && chown app:app /data
COPY --from=build /out .
USER app
EXPOSE 8080
ENTRYPOINT ["dotnet", "NeoTasks.Api.dll"]
