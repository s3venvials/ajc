module.exports = (app) => {
    app.get("/api/ping", (req, res) => {
        res.json({ test: "pong" });
    });
}