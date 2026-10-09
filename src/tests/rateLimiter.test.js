const express = require("express");
const request = require("supertest");
const rateLimiter = require("../middleware/rateLimiter");

describe("Rate Limiter Middleware", () => {
    let app;

    beforeEach(() => {
        app = express();
        app.use(rateLimiter(2, 60000));

        app.get("/test", (req, res) => {
            res.json({ message: "Success" });
        });
    });

    test("should allow requests within the limit", async () => {
        const response = await request(app).get("/test");

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Success");
    });

    test("should return 429 when the limit is exceeded", async () => {
        await request(app).get("/test");
        await request(app).get("/test");

        const response = await request(app).get("/test");

        expect(response.status).toBe(429);
        expect(response.body.message).toBe("Too Many Requests");
    });
});
