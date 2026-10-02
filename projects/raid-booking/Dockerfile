FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY Directory.Build.props ./
COPY raid-booking/RaidBooking.Api/RaidBooking.Api.csproj raid-booking/RaidBooking.Api/
RUN dotnet restore raid-booking/RaidBooking.Api
COPY raid-booking/RaidBooking.Api/ raid-booking/RaidBooking.Api/
RUN dotnet publish raid-booking/RaidBooking.Api -c Release -o /out --no-restore
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
RUN mkdir /data && chown app:app /data
COPY --from=build /out .
USER app
EXPOSE 8080
ENTRYPOINT ["dotnet", "RaidBooking.Api.dll"]
