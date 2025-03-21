FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 5000
EXPOSE 5001

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["Job.Positions.Api.csproj", "./"]
RUN dotnet restore "./Job.Positions.Api.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Job.Positions.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Job.Positions.Api.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Job.Positions.Api.dll"]