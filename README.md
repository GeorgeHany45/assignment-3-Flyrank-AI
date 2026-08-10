# Supabase Authentication API

A Node.js and Express REST API that provides user authentication using Supabase Auth. The project includes user signup, login, logout, public and protected routes, JWT verification middleware, and Swagger API documentation.

## Features

* User signup with Supabase Auth
* User login with email and password
* JWT-based authentication
* Protected API routes
* Reusable authentication middleware
* User logout
* Swagger API documentation
* Environment variables for Supabase credentials

## Technologies

* Node.js
* Express.js
* Supabase
* Supabase Auth
* Swagger UI
* JavaScript

## Project Structure

```text
src/
├── middleware/
│   └── auth.js
├── server.js
└── swagger.js

.env
.gitignore
package.json
package-lock.json
README.md
```

## Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Assignment-3
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_key
PORT=3000
```

Replace the values with your own Supabase project credentials.

**Never commit the `.env` file or expose your Supabase keys publicly.**

### 4. Run the API

```bash
node src/server.js
```

The API will run at:

```text
http://localhost:3000
```

## API Reference

| Method | Endpoint       | Authentication   |
| ------ | -------------- | ---------------- |
| GET    | `/`            | No               |
| POST   | `/auth/signup` | No               |
| POST   | `/auth/login`  | No               |
| POST   | `/auth/logout` | No               |
| GET    | `/public`      | No               |
| GET    | `/private`     | Yes — Bearer JWT |

### Authentication

Protected endpoints require a valid Supabase access token.

Include the token in the request header:

```text
Authorization: Bearer YOUR_ACCESS_TOKEN
```

The `/private` endpoint returns the authenticated user's ID and email.

## Swagger Documentation

Swagger UI is available at:

```text
http://localhost:3000/docs
```

The Swagger interface provides interactive documentation for the API endpoints and allows protected endpoints to be tested with a Bearer JWT.

## Testing Flow

1. Create a user using `POST /auth/signup`.
2. Log in using `POST /auth/login`.
3. Copy the returned `access_token`.
4. Use the token as a Bearer token when calling `GET /private`.
5. Call `POST /auth/logout` when finished.

## Security

* Supabase credentials are stored in environment variables.
* `.env` is excluded from Git using `.gitignore`.
* Supabase access tokens are required for protected routes.
* Secrets must never be committed to the repository.
