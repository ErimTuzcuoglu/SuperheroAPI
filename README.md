# Humble Superhero API

## Overview

The **Humble Superhero API** is a simple yet powerful backend service that allows users to add superheroes with their respective names, superpowers, and humility scores. The API provides endpoints to store and retrieve superheroes sorted by their humility scores.

## Features

- Add a superhero with their **name**, **superpower**, and **humility score**.
- Fetch a list of superheroes sorted by humility score (descending order).
- Basic validation to ensure the humility score is between 1 and 10.
- Unit tests for core functionality.

## Technologies Used

- **Backend:** NestJS (Fastify Platform)
- **Language:** TypeScript
- **Validation:** `class-validator`
- **Testing:** Jest, Supertest
- **API Documentation:** Swagger

## Project Structure

```
/src
  /config
  /modules
    /shared
    /...
  /persistence
app.modules.ts
main.ts
```

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/ErimTuzcuoglu/SuperheroAPI.git
   cd superhero-api
   ```

2. Install dependencies:

   ```sh
   yarn
   ```

3. Start the development server:
   ```sh
   yarn start:dev
   ```

## API Endpoints

### Add a Superhero

**Endpoint:** `POST /api/superheroes`

**Request Body:**

```json
{
  "name": "Superman",
  "superpower": "Flying",
  "humilityScore": 8
}
```

**Response:**

```json
{
  "errors": [],
  "succeeded": true,
  "data": {
    "name": "Superman",
    "superpower": "Flying",
    "humilityScore": 8,
    "id": "059cb213-000a-455d-a568-3530c8356bcc",
    "createdAt": "1738327045244"
  },
  "message": ""
}
```

### Get Superheroes (Sorted by Humility Score)

**Endpoint:** `GET /api/superheroes`

**Response:**

```json
{
  "errors": [],
  "succeeded": true,
  "data": [
    {
      "name": "Superman",
      "superpower": "Flying",
      "humilityScore": 8
      "id": "059cb213-000a-455d-a568-3530c8356bcc",
      "createdAt": "1738327045244"
    }
  ],
  "message": ""
}

```

## Testing

Run unit tests using:

```sh
yarn test
```

Run end-to-end tests using:

```sh
yarn test:e2e
```

## Collaboration

If working in a team:

- Use **GitHub Issues** for tracking tasks and bugs.
- Follow **feature branching** and **pull request** workflows.
- Use **code reviews** for quality assurance.

## If I Had More Time

- Implement a **persistent database** using PostgreSQL and Prisma ORM.
- Add user module and **authentication**.
- **Docker**ize app.

## Submission

To submit your solution:

- Push your code to a GitHub repository.
- Share the repository link or send a zipped file.

---

Thank you for your time! Looking forward to your feedback. 🚀
