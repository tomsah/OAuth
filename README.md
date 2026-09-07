# OAuth Demo Progress Log

This project is a learning/demo implementation of the OAuth 2.0 authorization code flow using TypeScript, Express, and Auth0.

The README is written as a project progress log. Each time a new change is pushed, add a short entry under **Progress Updates** describing what changed, what works now, and what still needs attention.

## Current Status

The client app can start an OAuth login flow, redirect the user to Auth0, receive an authorization code on callback, exchange that code for an access token, and gate a basic `/my-account` route based on whether a token exists in memory.

The protected resource server is still an early scaffold and does not yet validate incoming access tokens.

## Progress Updates

### Initial Scaffold

Added the first version of the OAuth demo:

- Created a TypeScript/Express client app.
- Added a basic login page with a `/login` link.
- Implemented an Auth0 authorization redirect.
- Added a `/callback` route that exchanges an authorization code for an access token.
- Added a simple `/my-account` route.
- Started a separate resource server scaffold for future token validation work.
- Added TypeScript configuration, npm scripts, and dependency setup.

### README Progress Format

Updated the README to work as a release/progress log while the project is still in development.

Use this section to keep a high-level history of the project as it evolves.

### Shared Root Package

Moved npm package management to the project root so both the client app and resource server use the same `node_modules` directory.

What changed:

- Moved `package.json` and `package-lock.json` from `client/` to the project root.
- Moved `node_modules/` from `client/` to the project root.
- Added separate scripts for running the client and resource server.
- Confirmed `express` resolves from both `client/` and `ressource_server/`.

## Next Steps

- Validate the OAuth `state` value during the callback.
- Move token handling out of a single in-memory variable.
- Add proper error handling for failed token exchanges.
- Complete the resource server implementation.
- Parse access tokens from the `Authorization` header.
- Validate JWT access tokens using Auth0 JWKS.
- Decide how the client should call the resource server after login.

## Run The Project

### Prerequisites

- Node.js
- npm
- An Auth0 application configured for the authorization code flow

### Environment Variables

Create a `.env` file in `client/` with the following values:

```env
AUTH0_URL=https://your-auth0-domain
CLIENT_ID=your-client-id
CLIENT_SECRET=your-client-secret
```

In Auth0, configure the application callback URL as:

```text
http://localhost:3000/callback
```

### Start The Client

Install dependencies:

```bash
npm install
```

Start the client development server:

```bash
npm run dev:client
```

Open the app:

```text
http://localhost:3000
```

### Start The Resource Server

Start the resource server development server:

```bash
npm run dev:resource
```

## Routes

- `GET /` serves the login page.
- `GET /login` redirects the user to Auth0.
- `GET /callback` exchanges the authorization code for an access token.
- `GET /my-account` returns a basic account response when an access token exists.

## Project Structure

```text
.
├── client/
│   ├── index.ts
│   └── public/
│       └── index.html
├── node_modules/
├── package-lock.json
├── package.json
├── ressource_server/
│   └── index.ts
├── tsconfig.json
└── README.md
```

## Development Notes

- The current implementation stores the access token in memory for learning/demo purposes.
- The `state` value is generated but not yet validated on callback.
- The resource server scaffold still needs token parsing and JWT validation.

## References

- [RFC 6749 - Authorization Code Grant](https://datatracker.ietf.org/doc/html/rfc6749#autoid-58): OAuth 2.0 authorization code flow used by the client login and callback routes.
- [RFC 6750 - Bearer Token Usage](https://datatracker.ietf.org/doc/html/rfc6750): How access tokens should be sent to protected resource servers using the `Authorization: Bearer` header.
- [RFC 9068 - Validating JWT Access Tokens](https://www.rfc-editor.org/rfc/rfc9068.html#name-validating-jwt-access-token): Guidance for validating JWT access tokens on the resource server.
