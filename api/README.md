# Heard Take Home

## Getting Started

## Requirements
* NodeJS & NPM
* Sqlite3

## Installation

To install both the frontend and backend dependencies, run the following command in the root directory:
```
npm install

```

## Setting up sqlite & Prisma

```
npx -w api prisma migrate dev
```

## Running the application
To run the backend server, run the following command in the root directory:
```
npm -w api start
```

The API server will be running on `http://localhost:3000`

To run the frontend server, run the following command in the root directory:
```
npm -w frontend run dev
```

The frontend server will be running on `http://localhost:5173


