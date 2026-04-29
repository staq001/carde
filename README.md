[Description]

# carde

`carde` is a lightweight Bun + Express + Drizzle ORM API for managing cards in a MySQL database.

# Folder Structure

```bash
|---src
    |---index.ts
|---.gitignore
|---package.json
|---tsconfig.json
```

# Dependencies

- Bun.js
- TypeScript
- Express

# Getting Started

Before you begin, ensure you have the following installed on your machine:

- Bun.js
- Git

## Setup Instructions

### 1. Clone the Repository

First, clone the repository to your local machine using Git.

```bash
git clone https://github.com/staq001/carde.git
cd carde
```

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies.

```bash
bun install
```

### 3. Configure Environment Variables

Create a .env file in the root directory of the project and add your environment-specific variables. You can use the provided .env.example file as a reference.

```bash
cp .env.example .env
```

Edit the .env file to match your environment configuration.

### 4. Run the Development Server

Start the development server with the following command. This will also watch for any changes in your code and automatically restart the server.

```bash
bun run dev
```

### 5. Verify the Setup

Open your browser and navigate to http://localhost:3200 to verify that the application is running correctly.

# API Endpoints

Every API endpoint begins with:

```bash
/api/v1
```

## Card API

### Create a new card

- Method: `POST`
- URL: `/api/v1/`
- Body:
  ```json
  {
    "name": "My Card",
    "description": "Optional description"
  }
  ```
- Success response:
  - Status: `201`
  - Body:
    ```json
    {
      "status": 201,
      "message": "Card created successfully",
      "data": {
        "values": {
          "name": "My Card",
          "description": "Optional description"
        }
      }
    }
    ```
- Possible errors:
  - `400` Validation Failed
  - `409` Card with this name already exists
  - `500` Internal Server Error

### Verify a card

- Method: `POST`
- URL: `/api/v1/verify`
- Body:
  ```json
  {
    "id": "3f6e1a5d-3b9e-4d77-9b72-71c5d3e7c6f0"
  }
  ```
- Success response:
  - Status: `200`
  - Body:
    ```json
    {
      "status": 200,
      "message": "Card verified successfully",
      "data": {
        "id": "3f6e1a5d-3b9e-4d77-9b72-71c5d3e7c6f0",
        "name": "My Card",
        "description": "Optional description"
      }
    }
    ```
- Possible errors:
  - `400` Validation Failed or Invalid card ID format
  - `404` card not found
  - `500` Internal Server Error

## Health Check

- Method: `GET`
- URL: `/health`
- Success response:
  - Status: `200`
  - Body:
    ```json
    {
      "status": "OK",
      "message": "Health check passed"
    }
    ```

## Running with Docker Compose

Use Docker Compose to start both the API and MySQL database together:

```bash
docker-compose -f docker-compose-dev.yml up --build
```

This will start:

- `api-bun` - the Bun API service
- `db` - MySQL 8 based database service

## Database Migrations

This project uses `drizzle-kit` for schema generation and migrations.

- Generate schema output:

```bash
bun run db:generate
```

- Run migrations:

```bash
bun run db:migrate
```

- Push schema directly:

```bash
bun run db:push
```

## Testing

Run tests with Bun:

```bash
bun test
```
