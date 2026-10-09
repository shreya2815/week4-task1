const express = require("express");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();

app.use(express.json());

app.use(rateLimiter(5, 60000));

app.get("/", (req, res) => {
res.json({
message: "API Rate Limiting Demo"
});
});

app.get("/api/data", (req, res) => {
res.json({
message: "Data fetched successfully"
});
});

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});