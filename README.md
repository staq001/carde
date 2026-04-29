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
