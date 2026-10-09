# Rate Limiting Design

## 1. Overview
This project implements custom rate-limiting middleware
using Node.js and Express.

## 2. Algorithm
The middleware uses a rolling time window.
It tracks request timestamps for each client IP address.

## 3. Configuration
- Request limit: 5 requests
- Time window: 60 seconds
- HTTP status on limit exceeded: 429

## 4. Response Headers
- X-RateLimit-Limit
- X-RateLimit-Remaining
- X-RateLimit-Reset

## 5. Testing
Automated tests use Jest and Supertest.
The tests check successful requests and HTTP 429 responses.

## 6. Limitations
The current implementation stores request data in memory.
Data is lost when the server restarts.
For multiple server instances, a shared store such as Redis
would be more suitable.