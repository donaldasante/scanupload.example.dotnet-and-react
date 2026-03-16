# ScanUpload dot net and react example

[ScanUpload](https://app.scanupload.net/) enables the integration and the ability to use QR codes to scan and upload files directly from a mobile device to your webapp.


# Quickstart
1. Please generate a client id and secret at [ScanUpload](https://app.scanupload.net/) and save the details.

## Docker
You need to have [Docker Desktop](https://www.docker.com/products/docker-desktop/) and git installed on your machine.

Open a command line, powershell or bash session and clone the git repo into
```sh
git clone https://github.com/donaldasante/scanupload.example.dotnet-and-react.git
```
Goto the repo folder (`cd .\scanupload.example.dotnet-and-react`) and create an .env file and replace the placeholders with your client id and secret details and save the file.
```sh
ScanUploadProxy__KeycloakClientId=your-client-id
ScanUploadProxy__KeycloakClientSecret=your-client-secret
```
Run docker compose
```sh
docker compose build
docker compose up -d
```
Navigate to http://localhost:3002.

## Running the .NET API locally

The API can be run either from the command line or directly from Visual Studio. In both cases, you must provide your ScanUpload client credentials using a `secrets.json` file.

- .NET SDK (matching the version used by the API)
- Git
- Visual Studio 2022 or later (for IDE support)

### Configure user secrets
The API uses ASP.NET Core user secrets for local development. These values are **not** committed to source control.
From the API project directory, initialize user secrets:

```sh
dotnet user-secrets init
```
Add your ScanUpload credentials:

```sh
dotnet user-secrets set "ScanUploadProxy:KeycloakClientId"  "your-client-id"  
dotnet user-secrets set "ScanUploadProxy:KeycloakClientSecret"  "your-client-secret"
```
This creates a `secrets.json` file in your local user profile, for example:

```json
{
  "ScanUploadProxy": {
    "KeycloakClientId": "your-client-id",
    "KeycloakClientSecret": "your-client-secret"
  }
}

```

### Run from the command line
Navigate to the API project folder and run:

```sh
dotnet restore
dotnet dev-certs https --trust
dotnet run --launch-profile https
```
The API will start and listen on the configured development URLs. If this is your first time running HTTPS locally, trust the ASP.NET Core development certificate. These are displayed in the console output when the application starts. Defaults are https://7021 and http://5071

### Run from Visual Studio
1. Open the solution in Visual Studio.
2. Set the API project as the startup project.
3. Select **https** from launchsettings profile. Should be set automatically.
4. Ensure the **Development** environment is selected.
5. Press **F5** or click **Run**.

Visual Studio automatically loads `secrets.json` for the project when running locally.

### Notes
- `secrets.json` is only used for local development.
- Docker uses environment variables instead of user secrets.
- Never commit secrets or `.env` files to source control.

## Running the React client locally
The React client is located in the `client-app` folder and uses **Vite** as the development server. By default, it runs on:

    http://localhost:3002
    
The dev server proxies API requests to the .NET backend, so no CORS configuration is required during development.

### Prerequisites
-   Node.js (LTS recommended)
-   npm (included with Node.js)
-   The .NET API running locally or via Docker

### Install dependencies

    npm install

Run the development server
### Local development (non‑Docker)

    https://localhost:7021
Start the Vite dev server:

    npm run dev
    
The application will be available at:

    http://localhost:3002

### Notes
- The dev server uses a **strict port** and will fail if port `3002` is already in use.
- HTTPS is handled by the backend API; the Vite dev server runs over HTTP.
- No environment variables are required for local frontend development.    