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
