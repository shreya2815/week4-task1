# API Rate Limiting Middleware

## Overview
This project implements custom API rate limiting using Node.js and Express.

## Features
- Limits requests from each client IP address.
- Uses a rolling time window.
- Returns HTTP 429 when the request limit is exceeded.
- Provides rate-limit response headers.
- Includes automated tests using Jest and Supertest.

## Technologies Used
- Node.js
- Express.js
- Jest
- Supertest

## Installation

Install the dependencies:

```bash
npm install
```

## Run the Server

Start the server using:

```bash
node src/server.js
```

The server runs at http://localhost:5000.

## API Endpoints

### GET /
Returns a message confirming the API is running.

### GET /api/data
Returns sample data when the request is within the rate limit.

## Rate Limiting Configuration

- Request limit: 5 requests
- Time window: 60 seconds
- HTTP status when the limit is exceeded: 429
- Response message: Too Many Requests

## Rate Limit Headers

- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset

## Testing

Run the automated tests using:

```bash
npx jest
```

The tests verify successful requests and check that HTTP 429 is returned when the request limit is exceeded.

## Documentation

See `docs/rate-limiting-design.md` for details about the rate-limiting algorithm and its limitations.

## Limitations

The middleware stores request information in memory. This information is lost when the server restarts.

For applications running across multiple server instances, a shared data store such as Redis would be more suitable.

## Conclusion

This project demonstrates how rate-limiting middleware controls API request frequency and helps protect an Express.js application from excessive requests.