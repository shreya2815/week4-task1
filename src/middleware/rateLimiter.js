const requests = new Map();

function rateLimiter(limit = 5, windowMs = 60000) {
    return (req, res, next) => {
        const client = req.ip;
        const now = Date.now();

        if (!requests.has(client)) {
            requests.set(client, []);
        }

        const timestamps = requests.get(client);

        const recentRequests = timestamps.filter(
            time => now - time < windowMs
        );

        if (recentRequests.length >= limit) {
            res.setHeader("X-RateLimit-Limit", limit);
            res.setHeader("X-RateLimit-Remaining", 0);
            res.setHeader(
                "X-RateLimit-Reset",
                Math.ceil((recentRequests[0] + windowMs) / 1000)
            );

            return res.status(429).json({
                message: "Too Many Requests"
            });
        }

        recentRequests.push(now);
        requests.set(client, recentRequests);

        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
            "X-RateLimit-Remaining",
            limit - recentRequests.length
        );
        res.setHeader(
            "X-RateLimit-Reset",
            Math.ceil((now + windowMs) / 1000)
        );

        next();
    };
}

module.exports = rateLimiter;